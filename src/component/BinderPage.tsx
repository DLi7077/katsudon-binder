import React, { CSSProperties } from "react";
import PokemonCard from "./PokemonCard";

export default function BinderPage(props: {
  binderPage: BinderPage;
  pageStyle: CSSProperties;
  changeSpotlightPokemon: (pokemon: Pokemon) => void;
}) {
  return (
    <div style={props.pageStyle}>
      {props.binderPage.page.map((pokemon, idx) => (
        <PokemonCard
          pokemon={pokemon}
          key={`${pokemon.id} ${idx}`}
          changeSpotlightPokemon={props.changeSpotlightPokemon}
        />
      ))}
    </div>
  );
}
