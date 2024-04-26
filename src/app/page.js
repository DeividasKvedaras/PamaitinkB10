"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import json from "../mergedMenu.json";

import styles from "./page.module.css";

import AddCircle from "@mui/icons-material/AddCircle";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, InputAdornment } from "@mui/material";
import { Rating } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { purple } from "@mui/material/colors";

import Venue from "@/app/venue";
import VenueMenu from "@/app/venueMenu";

export default function Home() {
  const [hasChosen, setHasChosen] = useState(false);
  const [value, setValue] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIds, setFilteredIds] = useState([]);
  const [filteredData, setFilteredData] = useState(json);

  const [colleaguesNumber, setColleaguesNumber] = useState(
    json.reduce(
      (allNumbers, venue) => ({
        ...allNumbers,
        [venue.id]: {
          colleaguesNumber: 0,
          chosen: false,
        },
      }),
      {},
    ),
  );

  const [venueMenu, setVenueMenu] = useState(
    json.map((venue) => ({
      id: venue.id,
      name: venue.name,
      menu: venue.menu.map((menuItem) => menuItem.items).flat(),
    })),
  );

  useEffect(() => {
    const filtered = venueMenu.filter((venue) => {
      const items = venue.menu
        .map((menuItem) => menuItem.name)
        .filter((item) => item.includes(searchTerm));
      return items.length;
    });

    setFilteredIds(filtered.map((venue) => venue.id));
  }, [searchTerm]);

  React.useEffect(() => {
    setFilteredData(json.filter((venue) => filteredIds.includes(venue.id)));
  }, [filteredIds]);

  const handleClick = (params) => {
    setHasChosen((prevState) => !prevState);
    setColleaguesNumber((prevState) => ({
      ...prevState,
      [params.id]: prevState[params.id].chosen
        ? {
            colleaguesNumber: prevState[params.id].colleaguesNumber - 1,
            chosen: false,
          }
        : {
            colleaguesNumber: prevState[params.id].colleaguesNumber + 1,
            chosen: true,
          },
    }));
  };
  const columns = [
    {
      field: "name",
      flex: 2,
      headerName: "Pavadinimas",
    },
    {
      field: "actions3",
      flex: 0.75,
      headerName: "Meniu",
      renderCell: (params) => <VenueMenu params={params} />,
    },
    {
      field: "rating",
      flex: 0.75,
      headerName: "Įvertinimas",
      valueGetter: (value) => value?.score || "-",
    },
    {
      field: "actions2",
      flex: 1,
      headerName: "LD Įvertinimas",
      renderCell: () => {
        return (
          <Rating
            name="simple-controlle"
            value={value}
            readOnly
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        );
      },
    },
    {
      field: "distance",
      flex: 0.75,
      headerName: "Atstumas",
    },
    {
      field: "duration",
      flex: 1,
      headerName: "Kelionės trukmė",
      valueFormatter: (value) => `${value} min.`,
    },
    {
      field: "colleguesNumber",
      flex: 0.75,
      headerName: "Kolegų skaičius",
      renderCell: (params) => colleaguesNumber[params.id].colleaguesNumber,
    },
    {
      field: "actions",
      flex: 0.75,
      headerName: "Pasirenku",
      renderCell: (params) => {
        const disabled = !colleaguesNumber[params.id].chosen && hasChosen;

        return (
          <Button
            disabled={disabled}
            onClick={() => handleClick(params)}
            variant="text"
          >
            {colleaguesNumber[params.id].chosen ? (
              <div className={styles.button}>
                <Image
                  alt="gif"
                  height={20}
                  src="/racoon-pedro.gif"
                  className={styles.pedro}
                  width={20}
                />
                <RemoveCircle sx={{ color: purple[600] }} />
              </div>
            ) : (
              <AddCircle sx={!disabled && { color: purple[600] }} />
            )}
          </Button>
        );
      },
    },
    {
      field: "actions1",
      flex: 1,
      headerName: "",
      renderCell: (params) => <Venue params={params} />,
    },
  ];
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          alt="logo"
          className={styles.logo}
          height={260}
          src="/logotipas.webp"
          width={260}
        />
        <h1 className={styles.title}>PamaitinkB10</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "24px",
          }}
        >
          <TextField
            label="Ką šiandien norėtumėte valgyti?"
            id="standard-adornment"
            color="secondary"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            sx={{ width: "450px" }}
            value={searchTerm}
          />
        </div>
        <DataGrid
          autoHeight
          rowSelection={false}
          columns={columns}
          rows={filteredData}
          sx={{ background: "white" }}
        ></DataGrid>
      </div>
    </main>
  );
}
