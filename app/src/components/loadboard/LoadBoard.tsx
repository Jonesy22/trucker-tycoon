import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { currencyFormatter } from "../../core/helpers";
import { getLoadsFromOriginCityState } from "../loadGenerator/LoadGenerator";
import { useGameContext } from "../state/StateProvider";
import {
  TableDataShape,
  LoadBoardColumns,
  LoadData,
} from "../../core/load.model";

const defaultTableData: TableDataShape = {
  headers: [
    { key: LoadBoardColumns.ORIGIN, text: "Origin" },
    { key: LoadBoardColumns.DESTINATION, text: "Destination" },
    { key: LoadBoardColumns.RATE, text: "Rate" },
    { key: LoadBoardColumns.RATE_PER_MILE, text: "Rate Per Mile" },
    { key: LoadBoardColumns.IS_FACTORABLE, text: "Is Factorable" },
    { key: LoadBoardColumns.DISTANCE, text: "Distance" },
    { key: LoadBoardColumns.DEADHEAD, text: "Deadhead" },
    { key: LoadBoardColumns.BOOK_BUTTON, text: "Book It!" },
  ],
  rows: [],
};

export function LoadBoard() {
  const gameContext = useGameContext();

  const [tableData, setTableData] = React.useState<TableDataShape>({
    ...defaultTableData,
    rows: getLoadsFromOriginCityState(gameContext.state.location),
  });

  React.useEffect(() => {
    setTableData((prevState) => ({
      ...prevState,
      rows: getLoadsFromOriginCityState(gameContext.state.location),
    }));
  }, [gameContext.state.location, gameContext.state.days]);

  if (gameContext.state.currentLoad) {
    return (
      <Paper style={{ padding: "1em", textAlign: "left" }}>
        <h1>Transporting load...</h1>
        <h2>{formatLoad(gameContext.state.currentLoad!)}</h2>
        <p>
          <strong>Rate: </strong>
          {currencyFormatter.format(gameContext.state.currentLoad!.rate)}
        </p>
        <p>
          <strong>Total trip:</strong>{" "}
          {gameContext.state.currentLoad!.distance +
            gameContext.state.currentLoad!.deadhead}{" "}
          Miles
        </p>
        <p>
          <strong>Days left in trip:</strong>{" "}
          {gameContext.state.daysRemainingInTrip}
        </p>
      </Paper>
    );
  }

  return (
    <TableContainer sx={{ minHeight: 200 }} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            {tableData.headers.map((header) => {
              const align =
                header.key !== LoadBoardColumns.ORIGIN &&
                  header.key !== LoadBoardColumns.DESTINATION
                  ? "right"
                  : "left";
              return (
                <TableCell key={header.key} style={{ textAlign: align }}>
                  {header.text}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.rows.length === 0 && (
            <TableRow
              id={"no-loads"}
              key={"no-loads"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell colSpan={7}>
                No loads for this origin today {":("}
              </TableCell>
            </TableRow>
          )}
          {tableData.rows.map((row: TableDataShape["rows"][0]) => (
            <TableRow
              id={row[LoadBoardColumns.ID]}
              key={row[LoadBoardColumns.ID]}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row[LoadBoardColumns.ORIGIN]}</TableCell>
              <TableCell>{row[LoadBoardColumns.DESTINATION]}</TableCell>
              <TableCell style={{ textAlign: "right" }}>
                {currencyFormatter.format(row[LoadBoardColumns.RATE])}
              </TableCell>
              <TableCell style={{ textAlign: "right" }}>
                {currencyFormatter.format(
                  row[LoadBoardColumns.RATE] /
                    (row[LoadBoardColumns.DISTANCE] +
                      row[LoadBoardColumns.DEADHEAD])
                )}
              </TableCell>
              <TableCell style={{ textAlign: "right" }}>{row[LoadBoardColumns.IS_FACTORABLE].toString()}</TableCell>
              <TableCell style={{ textAlign: "right" }}>
                {row[LoadBoardColumns.DISTANCE]}{" "}
                <small>
                  <em>miles</em>
                </small>
              </TableCell>
              <TableCell style={{ textAlign: "right" }}>
                {row[LoadBoardColumns.DEADHEAD]}{" "}
                <small>
                  <em>miles</em>
                </small>
              </TableCell>
              <TableCell style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    gameContext.chooseLoad(row);
                    setTableData((prevState) => ({
                      ...prevState,
                      rows: [],
                    }));
                  }}
                >
                  Book
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function formatLoad(load: LoadData) {
  return `${load.origin} -> ${load.destination}`;
}
