import React, { createContext } from "react";
import axios from "axios";
import { noop } from "lodash";
import { iRange } from "../interfaces/iRange";
import { iHit } from "../interfaces/iHit";

//I thought I heard Jeffery say that there was a need to switch to Context API
//so instead of Redux store....I decided to build out this context...leading to pulling in the hooks into components

export enum Rates {
  Minute = "minute",
  Hourly = "hourly",
  Daily = "daily",
}

interface GlobalState {
  data: iHit[] | undefined;
  setData: (val: iHit[]) => void;
  rate: string;
  setRate: (val: string) => void;
  range: iRange | undefined;
  setRange: (val: iRange) => void;
  executeGetData: () => void;
}

const initialState: GlobalState = {
  data: undefined,
  setData: noop,
  rate: "hourly",
  setRate: noop,
  range: undefined,
  setRange: noop,
  executeGetData: noop,
};

const Globalctx = createContext<GlobalState>(initialState);

export default function GlobalAppCtxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rateState, setRateState] = React.useState(initialState.rate);

  const setRate = React.useCallback((val: string) => {
    setRateState(val);
  }, []);

  const [range, setRange] = React.useState(initialState.range);

  const [data, setData] = React.useState<any | undefined>(undefined);

  //range resets the query filter
  const queryDtTm = React.useMemo(() => {
    const q = {
      query: {
        range: {
          timestamp: {
            gte: range?.start,
            lt: range?.end,
          },
        },
      },
      size: 25,
    };
    return q;
  }, [range]);

  //to pull data, i used axios, I set a range in a state hook here in te context that can get called from the
  //datepicking component or anywhere else...it then sets the range to elastic being a memoized hook with range as dependency
  //for CORS Blocking issues, i used cors-anywhere on localhost:8080 ---it puts a request header for Origin Access that elastic was not.
  //might be my setup...or my Chome.

  //http://localhost:8080/http://localhost:9200/kibana_sample_data_logs/_searc
  const execGetData = React.useCallback(async () => {
    axios
      .get("http://localhost:9200/kibana_sample_data_logs/_search", {
        method: "POST",
        timeout: 0,
        headers: {
          accept: "application/json",
        },
        params: {
          source: JSON.stringify(queryDtTm),
          source_content_type: "application/json",
        },
      })
      .then((response: any) => {
        setData(response.data.hits.hits);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [queryDtTm]);

  //runs on first open of app, subsequent calls are made directly as execGetData is exposed to components
  React.useEffect(() => {
    //set the context profile when we have a user with claimed profile
    if (!data) {
      execGetData();
    }
  }, [data, execGetData]);

  return (
    <Globalctx.Provider
      value={{
        data: data,
        setData: setData,
        rate: rateState,
        setRate: setRate,
        range: range,
        setRange: setRange,
        executeGetData: execGetData,
      }}
    >
      {children}
    </Globalctx.Provider>
  );
}

//exposing Provider
export const useGlobalAppCtxProvider = (): GlobalState =>
  React.useContext(Globalctx);
