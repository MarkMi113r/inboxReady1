import * as React from "react";
import Grid from "@mui/material/Grid";
import { iHit } from "../interfaces/iHit";
import CollapsibleTable from "../components/collTable";
import BarChart from "../components/barChart";
import DateSelector from "../components/dateRangePicker";
import { useGlobalAppCtxProvider } from "../contexts/AppContext";

function getHits(hitsData: Array<iHit>) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <DateSelector />
      </Grid>
      <Grid item xs={12} sm={12}>
        <BarChart initialValues={hitsData} />
      </Grid>
      <Grid item xs={12} sm={12}>
        <CollapsibleTable initialValues={hitsData} />
      </Grid>
    </Grid>
  );
}

export function Discover() {
  const { data, setData, range } = useGlobalAppCtxProvider();

  const theHits = React.useMemo(() => {
    if (data) {
      return getHits(data);
    }
  }, [data]);

  if (data) return <> {theHits}</>;
  else {
    return <>Loading...</>;
  }
}
