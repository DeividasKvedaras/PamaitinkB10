"use client";
import React, { useState } from "react";
import Image from "next/image";
import json from "../filteredRestaurants.json";

import styles from "./page.module.css";

import AddCircle from "@mui/icons-material/AddCircle";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import { purple } from "@mui/material/colors";
import Venue from "@/app/venue";

export default function Home() {
  const [data] = useState(json);
  const [hasChosen, setHasChosen] = useState(false);
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
      flex: 1,
      headerName: "Pavadinimas",
    },
    {
      field: "rating",
      flex: 1,
      headerName: "Įvertinimas",
      valueGetter: (value) => value?.score || "-",
    },
    {
      field: "distance",
      flex: 1,
      headerName: "Atstumas",
    },
    {
      field: "duration",
      flex: 1,
      headerName: "Kelionės trukmė",
    },
    {
      field: "colleguesNumber",
      flex: 1,
      headerName: "Kolegų skaičius",
      renderCell: (params) => colleaguesNumber[params.id].colleaguesNumber,
    },
    {
      field: "actions",
      flex: 1,
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
        <DataGrid autoHeight columns={columns} rows={data}></DataGrid>
      </div>
    </main>
  );
}
