"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import styles from "./venueMenu.module.css";

export default function VenueMenu({ params, venueMenu }) {
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
        <RestaurantMenuIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{params.row.name}</DialogTitle>
        <DialogContent>
          <div className={styles.list}>
            {venueMenu.menu.map((menu, index) => (
              <React.Fragment key={`${venueMenu.name}-${index}`}>
                <div className={styles.content}>
                  <h3 className={styles.name}>{menu.name}</h3>
                  <div className={styles.desc}>{menu.desc}</div>
                </div>
                <h2 className={styles.price}>{menu.price}</h2>
              </React.Fragment>
            ))}
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
