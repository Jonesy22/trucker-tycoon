import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { currencyFormatter, dateFormatterShort } from "../../core/helpers";
import { BookedLoad, useGameContext } from "../state/StateProvider";
import { LoadBoardColumns } from "../../core/load.model";

const tableData: { headers: { text: string; key: keyof BookedLoad }[] } = {
  headers: [
    { text: "Date", key: "bookedDayIncrement" },
    { text: "Lane", key: "lane" },
    { text: "Rate", key: LoadBoardColumns.RATE },
    { text: "DTP", key: "daysUntilPayment" },
  ],
};

export function BookedLoads() {
  const gameContext = useGameContext();
  const loadHistory = [...gameContext.state.loadHistory].reverse();

  const renderCellData = (load: BookedLoad, headerKey: keyof BookedLoad) => {
    if (headerKey === LoadBoardColumns.RATE) {
      return currencyFormatter.format(
        load[headerKey as keyof BookedLoad] as number
      );
    }
    if (headerKey === "bookedDayIncrement") {
      return dateFormatterShort(load.bookedDayIncrement);
    }
    return load[headerKey as keyof BookedLoad];
  };

  return (
    <Paper>
      <h2>Booked Loads</h2>
      <TableContainer sx={{ maxHeight: 315 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {tableData.headers.map((header) => {
                return (
                  <TableCell
                    key={"header-" + header.key}
                    style={{
                      textAlign:
                        header.key == LoadBoardColumns.RATE ? "right" : "left",
                    }}
                  >
                    {header.text}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {loadHistory.length === 0 && (
              <TableRow>
                <TableCell colSpan={tableData.headers.length}>
                  No loads booked yet.
                </TableCell>
              </TableRow>
            )}
            {loadHistory.map((load) => {
              return (
                <TableRow
                  key={`${load.lane}-${load.bookedDayIncrement}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {tableData.headers.map((header) => {
                    return (
                      <TableCell
                        key={`${load.id}-${header.key}`}
                        style={{
                          textAlign:
                            header.key == LoadBoardColumns.RATE
                              ? "right"
                              : "left",
                        }}
                      >
                        {renderCellData(load, header.key)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
