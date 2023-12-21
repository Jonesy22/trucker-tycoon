import * as React from "react";
import { Alert, Button, Grid, Paper } from "@mui/material";
import { useGameContext } from "../state/StateProvider";
import { add, format } from "date-fns";
import {
  currencyFormatter,
  dateFormatter,
  daysUntilFirstDayOfNextMonth,
} from "../../core/helpers";

export function TruckerStatus() {
  const gameContext = useGameContext();
  return (
    <Paper style={{ marginBottom: "1em" }}>
      <Grid
        container
        spacing={1}
        style={{ padding: "1em" }}
        alignItems={"flex-start"}
      >
        <Grid item md={12} style={{ padding: ".2em" }} textAlign={"left"}>
          {gameContext.state.walletFunds <= 0 && (
            <Alert severity="error" variant="filled">
              YOU HAVE OVERDRAWN YOUR BANK ACCOUNT!
            </Alert>
          )}
        </Grid>
        <Grid item md={4} style={{ padding: ".2em" }} textAlign={"left"}>
          <strong>Bank Account: </strong>
          {currencyFormatter.format(gameContext.state.walletFunds)}
        </Grid>
        <Grid item md={4} style={{ padding: ".2em" }} textAlign={"left"}>
          <strong>Daily Expenses: </strong>
          {currencyFormatter.format(gameContext.constants.dailyExpenses)}
        </Grid>
        <Grid item md={4} style={{ padding: ".2em" }} textAlign={"left"}>
          <strong>Days until Bills Due: </strong>
          {daysUntilFirstDayOfNextMonth(gameContext.state.days)}
        </Grid>
        <Grid item md={4} style={{ padding: ".2em" }} textAlign={"left"}>
          <strong>Today's Date: </strong>
          {dateFormatter(gameContext.state.days)}
        </Grid>
        <Grid item md={4} style={{ padding: ".2em" }} textAlign={"left"}>
          <strong>Monthly Expenses: </strong>
          {currencyFormatter.format(gameContext.constants.monthyExpenses)}
        </Grid>
        <Grid item md={8} style={{ padding: ".2em" }} textAlign={"left"}>
          <strong>Location: </strong>
          {gameContext.state.currentLoad
            ? `(En-route) ${gameContext.state.currentLoad!.destination}`
            : `${gameContext.state.location}`}
        </Grid>
        <Grid item md={12} style={{ padding: ".2em" }} textAlign={"right"}>
          <Button
            variant="contained"
            onClick={() => {
              gameContext.endCurrentDay();
            }}
          >
            Next day {"->"}
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "1em" }}
            disabled={!gameContext.state.currentLoad}
            onClick={() => {
              gameContext.fastForwardToLoadDestination();
            }}
          >
            Fast Forward to Destination {"->"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
