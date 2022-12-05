import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useGlobalAppCtxProvider, Rates } from "../contexts/AppContext";
import BasicPopover from "../components/popover";
import Grid from "@mui/material/Grid";
import { iRange } from "../interfaces/iRange";

export default function DateSelector() {
  //using Context api for custom hook here to store the rate
  const { rate, setRate, setRange, executeGetData } = useGlobalAppCtxProvider();

  function handleChange(event: SelectChangeEvent) {
    //setting a default range
    const r = event.target.value;
    const defaultRange: iRange = {
      start: "now-1d/d",
      end: "now",
    };
    //example of setting context range, i just picked a few
    switch (r) {
      case Rates.Daily: {
        setRange({ start: "now-7d/d", end: "now" });
        break;
      }
      case Rates.Minute: {
        setRange({ start: "now-60m", end: "now" });
        break;
      }
      case Rates.Hourly: {
        setRange({ start: "now-12h", end: "now" });
        break;
      }
      default: {
        setRange(defaultRange);
      }
    }
    setRate(event.target.value as string);
    //executing when selecting
    executeGetData();
  }

  return (
    <Grid container>
      <Grid item xs={8} style={{ float: "right" }}>
        <BasicPopover />
      </Grid>
      <Grid item xs={4} style={{ float: "right" }}>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Rate</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rate}
              label="Rate"
              onChange={handleChange}
            >
              <MenuItem value={Rates.Minute}>Minute</MenuItem>
              <MenuItem value={Rates.Hourly}>Hourly</MenuItem>
              <MenuItem value={Rates.Daily}>Daily</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}
