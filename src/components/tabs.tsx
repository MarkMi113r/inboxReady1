import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { iHit } from "../interfaces/iHit";
import { JsonTable } from "react-json-to-html";

//this was added pretty much out of the box from material
//it was a quick knockoff of kibana's expanded document view
//the react-json-to-table was a quick extra

interface Props {
  initialValues?: iHit;
  loading?: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const font = "Verdana";

const cssAsJs = {
  jsonTr: {
    height: "25px",
  },
  jsonTd: {
    padding: "5px",
    borderSpacing: "0px",
    borderRadius: "0px",
  },
  rowSpacer: {
    height: "0px",
  },
  rootElement: {
    padding: "5px",
    borderSpacing: "0px",
    backgroundColor: "#80bfff",
    fontWeight: "bold",
    fontFamily: font,
    borderRadius: "0px",
  },
  subElement: {
    padding: "5px",
    borderSpacing: "0px",
    backgroundColor: "#b3d9ff",
    fontWeight: "bold",
    fontFamily: font,
    borderRadius: "0px",
  },
  dataCell: {
    borderSpacing: "0px",
    backgroundColor: "#e6f2ff",
    fontFamily: font,
    borderRadius: "0px",
  },
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ initialValues, loading }: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="inboxreadytest tabs"
        >
          <Tab label="Table" {...a11yProps(0)} />
          <Tab label="JSON" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <JsonTable json={initialValues?._source} css={cssAsJs} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <pre>{JSON.stringify(initialValues, null, 2)}</pre>
      </TabPanel>
    </Box>
  );
}
