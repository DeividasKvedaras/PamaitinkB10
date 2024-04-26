import json from "@/mergedMenu.json";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";

export default function Menu({ params }) {
  const venueMenu = json.map((venue) => ({
    id: venue.id,
    name: venue.name,
    menu: venue.menu.map((menuItem) => menuItem.items).flat(),
  }));

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
        variant="filled"
      />
      {venueMenu.map((venue) => (
        <div key={venue.id}>
          <h1>{venue.name}</h1>
          {venue.menu.map((menuItem) => (
            <div key={menuItem.desc}>{menuItem.desc}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
