import axios from "axios";

export async function getCards(query: pokemonTcgQuery): Promise<Pokemon[]> {
  const result: Pokemon[] = [];
  console.log(queryToString(query));
  let page = 1;
  // let moreToQuery = true;

  // while (moreToQuery) {
  await axios
    .get(`https://api.pokemontcg.io/v2/cards`, {
      params: {
        q: queryToString(query),
        orderBy: `set.releaseDate`,
        pageSize: 250,
        page,
      },
      headers: {
        "X-Api-Key": "25e2dc79-cf29-41cd-87d4-7ada4afa16b7",
      },
      maxBodyLength: Infinity,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      const { data, count } = response.data;
      // if (count === 0) moreToQuery = false;

      // page++;
      result.push(
        ...data.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (pokemon: any) => ({
            id: pokemon.id,
            set_id: pokemon.set.id,
            set: pokemon.set.name,
            set_card_id: pokemon.number,
            set_logo: pokemon.set.images.logo,
            set_icon: pokemon.set.images.symbol,
            set_printed_total: pokemon.set.printedTotal,
            artist: pokemon.artist,
            name: pokemon.name,
            rarity: pokemon.rarity,
            tcg_player_url: pokemon.tcgplayer?.url,
            sm_img_url: pokemon.images.small,
            lg_img_url: pokemon.images.large,
            price: pokemon.tcgplayer?.prices?.holofoil?.market ?? pokemon.cardmarket?.prices?.trendPrice,
            // price: pokemon.tcgplayer?.prices?.holofoil?.market,
          })
        )
      );
    })
    .catch((error) => {
      console.log(error);
    });
  // }
  return result;
}

function joinFilters(field: string, values: string[]): string[] {
  return values.map((value) => `${field}:"${value}"`);
}
function queryToString(query: pokemonTcgQuery): string {
  const rarityString = query.rarity.length === 0 ? null : joinFilters("!rarity", query.rarity);
  const setName = query.setName.length === 0 ? null : joinFilters("!set.name", query.setName);
  const pokemonNameQuery = query.name.length > 0 ? [`name:"${query.name}"`] : null;
  const artistQuery = query.artist.length > 0 ? [`!artist:"${query.artist}"`] : null;

  return (
    [rarityString, setName, artistQuery, pokemonNameQuery]
      .filter((x) => !!x)
      .map((filter) => (filter.length >= 2 ? `(${filter.join(" OR ")})` : `${filter.join(" OR ")}`))
      .join(" AND ") ?? ""
  );
}
