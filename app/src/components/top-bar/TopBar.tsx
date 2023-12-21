import { Container, AppBar, Toolbar, Button } from "@mui/material";
import React, { useState } from "react";
import TruckerExpenseDialog from "../TruckerExpenseDialog/TruckerExpenseDialog";

export function TopBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          Trucker Tycoon
          <TruckerExpenseDialog />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
