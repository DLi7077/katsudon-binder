import SellIcon from "@mui/icons-material/Sell";
import { CSSProperties, useState } from "react";
import { CARD_WIDTH } from "../constants";
import { IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeFromOwned, addToOwned } from "../store/reducers/filters";

const classes: Record<string, CSSProperties> = {
  card: {
    // aspect ratio: 250 x 350
    boxSizing: "border-box",
    width: `min(${CARD_WIDTH}px, 25vw)`,
    aspectRatio: "5/7",
    borderRadius: "min(9px,1.5vw)",
    display: "block",
    boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.5)",
  },
  priceTag: {
    position: "absolute",
    bottom: "4px",
    right: "4px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    boxSizing: "border-box",
    padding: "2px",
    paddingInline: "4px",
    borderRadius: "4px",
  },
  bookmarkPlacement: {
    position: "absolute",
    top: "-12px",
    right: "4px",
  },
  bookmark: {
    fontSize: "24px",
  },
  hover: {
    WebkitFilter: "brightness(69%)",
    cursor: "pointer",
  },
  owned: {
    border: "2px solid rgb(0,255,255)",
  },
};

export default function PokemonCard(props: { pokemon: Pokemon; changeSpotlightPokemon: (pokemon: Pokemon) => void }) {
  const { pokemon, changeSpotlightPokemon } = props;
  const { owned } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  const [hovering, setHover] = useState<boolean>(false);

  const additionalStyles = {
    ...(hovering ? classes.hover : {}),
    ...(owned.includes(pokemon.id) ? classes.owned : {}),
  };
  return (
    <div style={{ position: "relative" }}>
      <img
        src={pokemon.sm_img_url}
        style={{ ...classes.card, ...additionalStyles }}
        onClick={() => changeSpotlightPokemon(pokemon)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      <div style={classes.bookmarkPlacement}>
        <IconButton
          onClick={() => {
            if (owned.includes(pokemon.id)) dispatch(removeFromOwned(pokemon.id));
            else dispatch(addToOwned(pokemon.id));
          }}
        >
          {owned.includes(pokemon.id) ? (
            <BookmarkIcon style={{ ...classes.bookmark, color: "rgb(0,255,255)" }} />
          ) : (
            <BookmarkBorderIcon style={classes.bookmark} />
          )}
        </IconButton>
      </div>
      <div style={classes.priceTag}>
        ${pokemon.price?.toFixed(2)}
        <SellIcon />
      </div>
    </div>
  );
}
