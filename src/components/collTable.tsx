import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { iHit } from "../interfaces/iHit";
import BasicTabs from "../components/tabs";
import { useGlobalAppCtxProvider } from "../contexts/AppContext";

interface Props {
  initialValues?: iHit[];
  loading?: boolean;
}

function Row(props: { row: iHit }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row._source.timestamp as unknown as string}
        </TableCell>
        <TableCell align="right">{row._source.clientip}</TableCell>
        <TableCell align="right">{row._source.geo.srcdest}</TableCell>
        <TableCell align="right">{row._source.request}</TableCell>
        <TableCell align="right">{row._source.response}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Expanded Document
              </Typography>
              <BasicTabs initialValues={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function getRows(data: Array<iHit>) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <b>Time</b>
            </TableCell>
            <TableCell align="right">
              <b>clientip</b>
            </TableCell>
            <TableCell align="right">
              <b>geo.srcdest</b>
            </TableCell>
            <TableCell align="right">
              <b>request</b>
            </TableCell>
            <TableCell align="right">
              <b>response</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, k) => (
            <Row key={k} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function CollapsibleTable({ initialValues }: Props) {
  const { data, range, rate } = useGlobalAppCtxProvider();
  //loading the data on the select change, so rerendering the rows when the context data is changed
  const theRows = React.useMemo(() => {
    if (data) {
      return getRows(data);
    }
  }, [data]);

  if (data) return <> {theRows}</>;
  else {
    return <>Loading...</>;
  }
}
