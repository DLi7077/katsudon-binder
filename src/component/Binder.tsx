/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Modal, Pagination, TextField } from "@mui/material";
import _ from "lodash";
import { CSSProperties, useEffect, useState } from "react";
import { getCards } from "../api/englishtcg";
import { BINDER_COLUMNS, BINDER_ROWS, RARITIES, SETS } from "../constants";
import BinderPage from "./BinderPage";
import BinderSkeleton from "./BinderSkeleton";
import Filter from "./Filter";
import PokemonCardSpotlight from "./PokemonCardSpotlight";

const classes: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: "1rem",
  },
  widePageContainer: {
    display: "flex",
    boxSizing: "border-box",
    border: "1px solid gray",
    width: "fit-content",
    justifyContent: "center",
    flexWrap: "wrap",
  },
};

export default function Binder() {
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [pages, setPages] = useState<Pokemon[][]>([]);
  const [x] = useState<number>(BINDER_ROWS);
  const [y] = useState<number>(BINDER_COLUMNS);
  const [page, setPage] = useState<number>(0);
  const [spotlightPokemon, setSpotlightPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  // filters
  const [rarities, setRarities] = useState<string[]>(JSON.parse(localStorage.getItem("rarities") ?? "[]"));
  const [sets, setSets] = useState<string[]>(JSON.parse(localStorage.getItem("sets") ?? "[]"));
  const [artist, setArtist] = useState<string>(localStorage.getItem("artist") ?? "");
  const [cardName, setCardName] = useState<string>(localStorage.getItem("card name") ?? "");

  const handleRarityChange = (updated: string[]) => setRarities(updated);
  const handleSetChange = (updated: string[]) => setSets(updated);

  const pageStyle: CSSProperties = {
    display: "grid",
    gridTemplateRows: `repeat(${y},1fr)`,
    gridTemplateColumns: `repeat(${x},1fr)`,
    gap: "1rem",
    padding: "1rem",
    paddingInline: "2rem",
    backgroundColor: "rgb(56, 69, 77)",
  };

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function search() {
    localStorage.setItem("rarities", JSON.stringify(rarities));
    localStorage.setItem("sets", JSON.stringify(sets));
    localStorage.setItem("artist", artist);
    localStorage.setItem("card name", cardName);
    const query: pokemonTcgQuery = {
      name: cardName,
      rarity: rarities,
      setName: sets,
      artist: artist,
    };
    setLoading(true);

    getCards(query).then((pokemonList) => {
      console.log(_.chunk(pokemonList, x * y));
      setPages(_.chunk(pokemonList, x * y));
      setTimeout(() => {
        setLoading(false);
        setPage(0);
      }, 300);
    });
  }

  function changeSpotlightPokemon(pokemon: Pokemon): void {
    setSpotlightPokemon(pokemon);
    setOpenModel(true);
  }

  const handleModelClose = () => setOpenModel(false);

  const isSmallScreen = window.innerWidth < 1000;
  const pagesOnScreen = isSmallScreen ? 1 : 2;
  return (
    <>
      <div style={classes.container}>
        <Box
          component={"form"}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "2rem",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <Filter options={RARITIES} selected={rarities} handleFilterChange={handleRarityChange} label={"Rarities"} />
          <Filter options={SETS} selected={sets} handleFilterChange={handleSetChange} label={"Sets"} />
          <TextField
            variant="standard"
            label="Artist"
            value={artist}
            style={{ width: "120px" }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setArtist(event.target.value)}
          />
          <TextField
            variant="standard"
            label="Card Name"
            value={cardName}
            style={{ width: "120px" }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCardName(event.target.value)}
          />
          <Button variant="outlined" type="submit" onClick={search}>
            Search
          </Button>
        </Box>
        <div
          style={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "rgb(56, 69, 77)",
            width: "fit-content",
            paddingInline: "1rem",
            borderRadius: "24px",
          }}
        >
          {!isLoading && (
            <Pagination
              count={Math.ceil(pages.length / (isSmallScreen ? 1 : 2))}
              onChange={(_, value) => setPage(value - 1)}
              style={{ borderBottom: "1px solid gray" }}
            />
          )}
        </div>
        <div style={classes.widePageContainer}>
          {(isLoading || pages.length === 0) && (
            <BinderSkeleton pageStyle={pageStyle} rows={x} columns={y} noData={!isLoading && pages.length === 0} />
          )}
          {!isLoading &&
            pages
              .slice(page * pagesOnScreen, page * pagesOnScreen + pagesOnScreen)
              .map((page) => (
                <BinderPage
                  pageStyle={pageStyle}
                  binderPage={{ page, x, y }}
                  changeSpotlightPokemon={changeSpotlightPokemon}
                />
              ))}
        </div>
      </div>
      {spotlightPokemon && (
        <Modal
          open={openModel}
          onClose={handleModelClose}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <PokemonCardSpotlight {...spotlightPokemon} />
        </Modal>
      )}
    </>
  );
}
