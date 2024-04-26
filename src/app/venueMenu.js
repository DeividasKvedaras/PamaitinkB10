"use client"
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating } from "@mui/material";
import { purple } from "@mui/material/colors";
import PlaceIcon from "@mui/icons-material/Place";
import { Link } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";


export default function venueMenu({ params }) {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        <Button sx={{ color: "purple" }} variant="text" onClick={handleClickOpen}>
          <RestaurantMenuIcon/>
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{params.row.name}</DialogTitle>
          <DialogContent>

          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }