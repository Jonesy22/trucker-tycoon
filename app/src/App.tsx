import React from "react";
import "./App.css";
import { LoadBoard } from "./components/loadboard/LoadBoard";
import { StateProvider } from "./components/state/StateProvider";
import { Container, Grid } from "@mui/material";
import { TruckerStatus } from "./components/trucker-status/TruckerStatus";
import { TopBar } from "./components/top-bar/TopBar";
import { DATTheme } from "./components/theme/DATTheme";
import { BankTransactions } from "./components/bank-transactions/BankTransactions";
import { BookedLoads } from "./components/booked-loads/BookedLoads";

function App() {
  return (
    <StateProvider>
      <DATTheme>
        <TopBar />
        <Container style={{ marginTop: "2em" }} className="App">
            <TruckerStatus />
            <LoadBoard />
            <Grid container spacing={1}>
              <Grid item md={6}>
                <BankTransactions />
              </Grid>
              <Grid item md={6}>
                <BookedLoads />
              </Grid>
            </Grid>
        </Container>
      </DATTheme>
    </StateProvider>

  );
}

export default App;
