"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import json from "../db.json";

import styles from "./page.module.css";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import { purple } from '@mui/material/colors';

export default function Home() {
  const [data] = useState(json.places);
  const [colleaguesNumber, setColleaguesNumber] = useState(
    json.places.reduce(
      (allNumbers, place) => ({
          ...allNumbers,
          [place.id]: 0,
      }),
      {}
    )
  );

  const handleClick = (params) => {
    setColleaguesNumber((prevState) => ({
      ...prevState,
      [params.id]: prevState[params.id] + 1,
    }));
  };
  const columns = [
    {
      field: "displayName",
      flex: 1,
      headerName: "Pavadinimas",
      valueGetter: (params) => params.text,
    },
    {
      field: "distance",
      flex: 1,
      headerName: "Atstumas",
    },
    {
      field: "priceLevel",
      flex: 1,
      headerName: "Kaina",
    },
    {
      field: "rating",
      flex: 1,
      headerName: "Įvertinimas",
    },
    {
      field: "colleguesNumber",
      flex: 1,
      headerName: "Kolegų skaičius",
      renderCell: (params) => colleaguesNumber[params.id],
    },
    {
      field: "actions",
      flex: 1,
      headerName: "Pasirenku",
      renderCell: (params) => (
        <Button onClick={() => handleClick(params)}>
          <AddCircleIcon sx={{ color: purple[600] }}/>
        </Button>
      ),
    },
    {
      field: "actions1",
      flex: 1,
      headerName: "",
      renderCell: () => (
        <Button color="secondary" variant="outlined">
          Plačiau
        </Button>
      ),
    },
  ];
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          alt="logo"
          height={500}
          src="/logotipas.webp"
          width={500}
        ></Image>
        <h1>PamaitinkB10</h1>
        <DataGrid autoHeight columns={columns} rows={data}></DataGrid>
      </div>
    </main>
  );
}
