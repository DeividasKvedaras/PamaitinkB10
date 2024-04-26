import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating } from "@mui/material";
import { purple } from "@mui/material/colors";
import PlaceIcon from "@mui/icons-material/Place";

export default function Venue({ params }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(2);

  console.log(params);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button sx={{ color: "purple" }} variant="text" onClick={handleClickOpen}>
        Plačiau
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{params.row.name}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-address"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <PlaceIcon sx={{ color: "purple" }} />
            {params.row.address}
          </DialogContentText>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ padding: "15px 15px 15px 0" }}
          >
            {params.row.short_description}
          </DialogContentText>
          <DialogContentText>Įvertinkite {params.row.name}</DialogContentText>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{ padding: "15px 15px 15px 0" }}
            ></Rating>
            <Button sx={{ color: "purple" }} onClick={handleClose}>Išsaugoti</Button>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
