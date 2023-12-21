import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useGameContext } from "../state/StateProvider";
import { TruckerData } from "../state/StateProvider";


function TruckerExpenseDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const gameContext = useGameContext();
  const tmpTruckerData = new TruckerData();
  Object.assign(tmpTruckerData, gameContext.state.truckerDetails);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleApply = () => {
    // Handle the apply logic here
    // eslint-disable-next-line no-undef
    console.log(tmpTruckerData.getMonthlyExpenses);
    gameContext.updateTruckerDetails(tmpTruckerData);
    setDialogOpen(false);
  };

  return (
    <>
      <Button
        sx={{ marginLeft: "auto" }}
        color="inherit"
        onClick={() => setDialogOpen(true)}
      >
        Trucker Data
      </Button>

      <Dialog
        key={`dialog${dialogOpen}`}
        open={dialogOpen}
        onClose={handleClose}
      >
        <DialogTitle>Enter Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="truckPayment"
            label="Truck Payment"
            fullWidth
            defaultValue={gameContext.state.truckerDetails.truckPayment}
            onChange={(e) => {
              tmpTruckerData.truckPayment = parseFloat(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="trailerPayment"
            label="Trailer Payment"
            fullWidth
            defaultValue={gameContext.state.truckerDetails.trailerPayment}
            onChange={(e) => {
              tmpTruckerData.trailerPayment = parseFloat(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="autoInsurance"
            label="Auto Insurance"
            fullWidth
            defaultValue={gameContext.state.truckerDetails.autoInsurance}
            onChange={(e) => {
              tmpTruckerData.autoInsurance = parseFloat(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="cargoInsurance"
            label="Cargo Insurance"
            fullWidth
            defaultValue={gameContext.state.truckerDetails.cargoInsurance}
            onChange={(e) => {
              tmpTruckerData.cargoInsurance = parseFloat(e.target.value)
            }}
          />
          <TextField
            margin="dense"
            id="medicalInsurance"
            label="Medical Insurance"
            fullWidth
            defaultValue={gameContext.state.truckerDetails.healthInsurance}
            onChange={(e) => {
              tmpTruckerData.healthInsurance = parseFloat(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="permits"
            label="Permits"
            fullWidth
            defaultValue={gameContext.state.truckerDetails.permits}
            onChange={(e) => {
              tmpTruckerData.permits = parseFloat(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="equipmentMaintenance"
            label="Equipment Maintenance Savings"
            fullWidth
            defaultValue={gameContext.state.truckerDetails.emergencyFund}
            onChange={(e) => {
              tmpTruckerData.emergencyFund = parseFloat(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="dispatchService"
            label="Dispatch Service Costs"
            fullWidth
            defaultValue={gameContext.state.truckerDetails.dispatch}
            onChange={(e) => {
              tmpTruckerData.dispatch = parseFloat(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="foodLodging"
            label="Food and Lodging"
            fullWidth
            defaultValue={gameContext.state.truckerDetails.foodAndLodging}
            onChange={(e) => {
              tmpTruckerData.foodAndLodging = parseFloat(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="miscellaneous"
            label="Other Miscellaneous"
            fullWidth
            defaultValue={gameContext.state.truckerDetails.other}
            onChange={(e) => {
              tmpTruckerData.other = parseFloat(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleApply()} color="primary">
            Apply
          </Button>
          <Button onClick={() => handleClose()} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TruckerExpenseDialog;
