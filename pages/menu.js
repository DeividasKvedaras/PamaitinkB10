"use client";
import React from "react";
import json from "@/mergedMenu.json";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";

export default function Menu({ params }) {
  const [venueMenu, setVenueMenu] = React.useState(
    json.map((venue) => ({
      id: venue.id,
      name: venue.name,
      menu: venue.menu.map((menuItem) => menuItem.items).flat(),
    })),
  );

  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const filtered = venueMenu.filter((venue) => {
      const items = venue.menu
        .map((menuItem) => menuItem.name)
        .filter((item) => item.includes(searchTerm));
      console.log(items);
      return items.length;
    });

    console.log("FILTERED", filtered);
  }, [searchTerm]);

  return (
    <div>
      <TextField
        label="With normal TextField"
        id="filled-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        value={searchTerm}
        variant="filled"
      />
      {venueMenu.map((venue) => (
        <div key={venue.id}>
          <h1>{venue.name}</h1>
          {venue.menu.map((menuItem, index) => (
            <div key={`${venue.id}-${index}`}>
              <div>{menuItem.name}</div>
              <div>{menuItem.price}</div>
              <div>{menuItem.desc}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
