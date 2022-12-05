import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useGlobalAppCtxProvider } from "../contexts/AppContext";

//this is kinda cool, I saw kibana's popup calender with quick options so I decided to customize one...it came out okay

export default function BasicPopover() {
  const { setRange, executeGetData } = useGlobalAppCtxProvider();

  const [anchorEl, setAnchorEl] = React.useState(null);

  //this is to set the anchor on the span to positon the popover
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSetRange = (hoursBack: number) => {
    setRange({ start: `now-${hoursBack}h`, end: "now" });
    executeGetData();
  };

  return (
    <>
      <span
        style={{
          color: "brown",
          display: "inline-flex",
          paddingRight: "8px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        Choose quick date ranges
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow:
              "rgba(50, 50, 93, 0.32) 5px 12px 30px -30px, rgba(0, 0, 0, 0.3) 0px 28px 56px -25px",
            borderRadius: "10px",
          },
        }}
      >
        <Card raised={true}>
          <Box
            sx={{
              position: "relative",
              mt: "15px",
              "&::before": {
                position: "absolute",
                top: "-10px",
                left: "calc(50% - 10px)",
                width: "20px",
                height: "20px",
                border: "1px solid #80808038",
                borderBottom: "0",
                borderRight: "0",
                background: "white",
                transform: "rotate(45deg)",
                content: '""',
              },
            }}
          />
          <Grid
            sx={{
              padding: "2vw",
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px Solid #80808038",
              boxShadow: " !important",
            }}
          >
            <Stack spacing={2} direction="column">
              <Button variant="text" onClick={() => handleSetRange(24)}>
                Last 24 hours
              </Button>
              <Button variant="text" onClick={() => handleSetRange(48)}>
                Last 48 hours
              </Button>
              <Button variant="text" onClick={() => handleSetRange(72)}>
                Last 72 hours
              </Button>
            </Stack>
          </Grid>
        </Card>
      </Popover>
    </>
  );
}
