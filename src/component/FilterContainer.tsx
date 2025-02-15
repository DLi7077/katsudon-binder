import { Box, Button, TextField } from "@mui/material";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../api/englishtcg";
import { LOCALSTORAGE_KEYS, RARITIES, SETS } from "../constants";
import { RootState } from "../store";
import { setDisplay } from "../store/reducers/display";
import { FilterState, setFilters } from "../store/reducers/filters";
import Filter from "./Filter";

export default function FilterContainer() {
  const filters = useSelector((state: RootState) => state.filter);
  const display = useSelector((state: RootState) => state.display);
  const dispatch = useDispatch();

  function handleRarityChange(rarities: string[]) {
    dispatch(setFilters({ rarities }));
  }
  function handleSetChange(sets: string[]) {
    dispatch(setFilters({ sets }));
  }
  function handleArtistChange(artist: string) {
    dispatch(setFilters({ artist }));
  }
  function handleNameChange(cardName: string) {
    dispatch(setFilters({ cardName }));
  }

  function saveFilters(filters: FilterState) {
    localStorage.setItem(LOCALSTORAGE_KEYS.RARITIES, JSON.stringify(filters.rarities));
    localStorage.setItem(LOCALSTORAGE_KEYS.SETS, JSON.stringify(filters.sets));
    localStorage.setItem(LOCALSTORAGE_KEYS.ARTIST, filters.artist);
    localStorage.setItem(LOCALSTORAGE_KEYS.CARDNAME, filters.cardName);
    localStorage.setItem(LOCALSTORAGE_KEYS.OWNED, JSON.stringify([...filters.owned]));
  }

  async function search(filters: FilterState) {
    const query: pokemonTcgQuery = {
      name: filters.cardName,
      rarity: filters.rarities,
      setName: filters.sets,
      artist: filters.artist,
    };

    dispatch(setDisplay({ isLoading: true }));

    getCards(query).then((pokemonList) => {
      const filteredPokemonList =
        filters.showOwned === "All"
          ? pokemonList
          : pokemonList.filter((pokemon) =>
              filters.showOwned === "Owned" ? filters.owned.includes(pokemon.id) : !filters.owned.includes(pokemon.id)
            );

      dispatch(
        setDisplay({
          pages: _.chunk(filteredPokemonList, display.rows * display.columns),
        })
      );
      setTimeout(() => {
        dispatch(setDisplay({ isLoading: false }));
        dispatch(setDisplay({ page: 0 }));
      }, 300);
    });
  }

  useEffect(() => {
    // search on page load
    search(filters);
  }, []);

  return (
    <Box
      component={"form"}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        columnGap: "2rem",
        alignItems: "flex-end",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <Filter
        options={RARITIES}
        selected={filters.rarities}
        handleFilterChange={handleRarityChange}
        label={"Rarities"}
      />
      <Filter options={SETS} selected={filters.sets} handleFilterChange={handleSetChange} label={"Sets"} />
      <TextField
        variant="standard"
        label="Artist"
        value={filters.artist}
        style={{ width: "120px" }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleArtistChange(event.target.value)}
      />
      <TextField
        variant="standard"
        label="Card Name"
        value={filters.cardName}
        style={{ width: "120px" }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleNameChange(event.target.value)}
      />
      <Button
        variant="outlined"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          saveFilters(filters);
          search(filters);
        }}
        style={{ marginTop: "1rem" }}
      >
        Search
      </Button>
    </Box>
  );
}
