import React from "react";
import { Chart } from "react-google-charts";
import { iHit } from "../interfaces/iHit";
import { useGlobalAppCtxProvider, Rates } from "../contexts/AppContext";
import { isArray } from "lodash";

//bar chart is library import, just had to set the data
//ranges and a way to group timespans could be a whoe new project
//I started with reduce to group and eventually changed to what I have here (seperate fuctions to split hour/minute/day)

interface Props {
  initialValues?: iHit[];
  loading?: boolean;
}

export const options = {
  chart: {
    title: "Hits",
    subtitle: "per hour",
  },
};

const extractGroups = (vals: iHit[], splitType: string) => {
  const groups: any = {};

  vals.forEach(function (val) {
    const day = val._source.timestamp.toString().split("T")[0];
    const time = val._source.timestamp.toString().split("T")[1];
    const hour = time.split(":")[0];
    const min = time.split(":")[1];
    if (splitType === "day") {
      if (day in groups) {
        groups[day].push(val._id);
      } else {
        groups[day] = new Array(val._id);
      }
    }
    if (splitType === "hour") {
      if (day + " " + hour + "00" in groups) {
        groups[day + " " + hour + "00"].push(val._id);
      } else {
        groups[day + " " + hour + "00"] = new Array(val._id);
      }
    }
    if (splitType === "minute") {
      if (day + " " + hour + min in groups) {
        groups[day + " " + hour + min].push(val._id);
      } else {
        groups[day + " " + hour + min] = new Array(val._id);
      }
    }
  });
  const data = [["timestamp per hour", "Count"]];
  for (const [key, value] of Object.entries(groups)) {
    data.push([key, isArray(value) ? value.length.toString() : "0"]);
  }

  return data;
};

function sortArrayTimestamp(inArray: iHit[]) {
  const n = inArray;
  return n
    .sort((x, y) => {
      return new Date(x._source.timestamp) < new Date(y._source.timestamp)
        ? 1
        : -1;
    })
    .reverse();
}

export default function BarChart({ initialValues }: Props) {
  const { rate } = useGlobalAppCtxProvider();
  let data: any = [];

  const handleSetData = (val: string[][]) => {
    data = val;
  };

  if (initialValues && initialValues.length > 0) {
    const sortedOut = sortArrayTimestamp(initialValues);

    switch (rate) {
      case Rates.Minute: {
        handleSetData(extractGroups(sortedOut, "minute"));
        break;
      }
      case Rates.Hourly: {
        //group by every 24 hours for 7 days
        handleSetData(extractGroups(sortedOut, "hour"));
        break;
      }
      case Rates.Daily: {
        handleSetData(extractGroups(sortedOut, "day"));
        break;
      }
      default: {
        //todo
      }
    }
  }

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
