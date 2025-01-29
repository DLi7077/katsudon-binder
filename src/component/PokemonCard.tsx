import React, { CSSProperties, useState } from "react";
import SellIcon from "@mui/icons-material/Sell";
import { CARD_WIDTH } from "../constants";

const classes: Record<string, CSSProperties> = {
  card: {
    // aspect ratio: 250 x 350
    boxSizing: "border-box",
    width: window.innerWidth < 1000 ? `200px` : `${CARD_WIDTH}px`,
    aspectRatio: "5/7",
    borderRadius: "9px",
    display: "block",
    boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.5)'
  },
  priceTag: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    margin: "4px",
    boxSizing: "border-box",
    padding: "2px",
    paddingInline: "4px",
    borderRadius: "4px",
  },
};
export default function PokemonCard(props: { pokemon: Pokemon; changeSpotlightPokemon: (pokemon: Pokemon) => void }) {
  const { pokemon, changeSpotlightPokemon } = props;
  const [hovering, setHover] = useState<boolean>(false);

  const hoverStyle = {
    WebkitFilter: "brightness(69%)",
    cursor: "pointer",
  };
  return (
    <div style={{ position: "relative" }}>
      <img
        src={pokemon.sm_img_url}
        style={hovering ? { ...classes.card, ...hoverStyle } : classes.card}
        onClick={() => changeSpotlightPokemon(pokemon)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      <div style={classes.priceTag}>
        ${pokemon.price?.toFixed(2)}
        <SellIcon />
      </div>
    </div>
  );
}
