"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import json from "../db.json";

import styles from "./page.module.css";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function Home() {
  const [data, setData] = useState(json.places);
  const [colleguesNumber, setColleguesNumber] = useState(
    json.places.reduce(
      (allNumbers, place) => [
        ...allNumbers,
        { id: place.id, colleguesNumber: 0 },
      ],
      []
    )
  );

  const handleClick = (params) => {
    setColleguesNumber((prevState) => {
      const index = prevState.findIndex((element) => element.id === params.id);
      const clone = [...prevState];
      clone[index] = { id: params.id, colleguesNumber: 1 };
      return clone;
    });
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
      renderCell: (params) =>
        colleguesNumber.find((current) => current.id === params.id)
          .colleguesNumber,
    },
    {
      field: "actions",
      flex: 1,
      headerName: "Pasirenku",
      renderCell: (params) => (
        <Button onClick={() => handleClick(params)} variant="text">
          <AddCircleIcon />
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
