import React, { CSSProperties } from "react";
import { LARGE_CARD_WIDTH } from "../constants";
import { Button, Paper } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const classes: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: `min(${LARGE_CARD_WIDTH}px,60%)`,
    gap: "1rem",
    backgroundColor: "rgba(0,0,0,0.5)",
    boxSizing: "border-box",
    padding: "1rem",
    paddingInline: "1.5rem",
    borderRadius: "1rem",
    border: "1px solid gray",
  },
  card: {
    // aspect ratio: 250 x 350
    width: "100%",
    aspectRatio: "5/7",
    borderRadius: "9px",
    boxSizing: "border-box",
    contain: "size",
  },
  description: {
    boxSizing: "border-box",
    padding: "1rem",
    width: "100%",
    border: "1px solid gray",
  },
  line: { display: "flex", alignItems: "center", gap: "0.5rem" },
};

export default function PokemonCardSpotlight(props: Pokemon) {
  return (
    <div style={classes.container}>
      <img src={props.set_logo} style={{ width: "140px" }} />
      <img src={props.lg_img_url} style={classes.card} />
      <Paper style={classes.description}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div style={classes.line}>
            <div style={{ fontSize: "16px" }}>
              {props.name} - {props.rarity}
            </div>
          </div>
          <div style={classes.line}>
            <img src={props.set_icon} style={{ height: "20px" }} />{" "}
            <div style={{ fontSize: "12px" }}>
              {props.set} {props.set_card_id}/{props.set_printed_total}
            </div>
          </div>
          <div style={classes.line}>
            <div>Artist: {props.artist ?? "--"}</div>
          </div>
          <div style={classes.line}>
            <div>Trending Price: ${props.price ?? "--.--"}</div>
          </div>
          <ButtonGroup
            searchQuery={`${props.name} ${props.set_card_id}/${props.set_printed_total}`}
            tcgplayerUrl={props.tcg_player_url}
          />
        </div>
      </Paper>
    </div>
  );
}

function ButtonGroup(props: { searchQuery: string; tcgplayerUrl: string }) {
  const ebaySearch = `https://www.ebay.com/sch/i.html?_nkw=`;
  return (
    <div>
      <Button onClick={() => window.open(props.tcgplayerUrl)}>
        TCG Player <OpenInNewIcon />
      </Button>

      <Button onClick={() => window.open(ebaySearch + props.searchQuery)}>
        eBay <OpenInNewIcon />
      </Button>
    </div>
  );
}
