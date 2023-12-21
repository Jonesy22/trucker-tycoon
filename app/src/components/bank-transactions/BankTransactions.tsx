import React from "react";

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import { Transaction, useGameContext } from "../state/StateProvider";
import { currencyFormatter } from "../../core/helpers";

const tableData = {
  headers: [
    { text: "Date", key: "date" },
    { text: "Type", key: "type" },
    { text: "Amount", key: "amount" },
  ],
};

export function BankTransactions() {
  const gameContext = useGameContext();
  const transactionHistory = [
    ...gameContext.state.transactionHistory,
  ].reverse();

  return (
    <Paper>
      <h2>Bank Transactions</h2>
      <TableContainer sx={{ maxHeight: 315 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {tableData.headers.map((header) => {
                return (
                  <TableCell
                    key={"header-" + header.key}
                    style={{
                      textAlign: header.key == "amount" ? "right" : "left",
                    }}
                  >
                    {header.text}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionHistory.length === 0 && (
              <TableRow>
                <TableCell colSpan={tableData.headers.length}>
                  No transactions yet.
                </TableCell>
              </TableRow>
            )}
            {transactionHistory.map((transaction) => {
              return (
                <TableRow
                  key={`${transaction.date}-${transaction.type}-${transaction.amount}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {tableData.headers.map((header) => {
                    return (
                      <TableCell
                        key={`${header.key}-${transaction.date}-${transaction.type}-${transaction.amount}`}
                        style={{
                          textAlign: header.key == "amount" ? "right" : "left",
                        }}
                      >
                        {header.key === "amount"
                          ? currencyFormatter.format(
                              transaction[
                                header.key as keyof Transaction
                              ] as number
                            )
                          : transaction[header.key as keyof Transaction]}
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
