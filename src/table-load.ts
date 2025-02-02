/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

async function loadExpansion(expansionId: string) {
  const response: any = await axios.get(`https://api.pokemontcg.io/v2/sets/${expansionId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const expansion = response.data.data;

  return [
    {
      id: expansion.id,
      name: expansion.name,
      series: expansion.series,
      printedTotal: expansion.printedTotal,
      totalCards: expansion.total,
      releaseDate: expansion.releaseDate + " 00:00:00",
      logoUrl: expansion.images.logo,
      iconUrl: expansion.images.symbol,
    },
  ];
}

async function createExpansion(expansion: any) {
  return await axios.post(`http://localhost:8001/seed/expansion`, expansion);
}

async function loadExpansionCards(expansionId: string) {
  const result = [];
  let moreCardsToQuery = true;
  let page = 1;
  const pageSize = 250;

  while (moreCardsToQuery) {
    const response: any = await axios.get(
      `https://api.pokemontcg.io/v2/cards?q=set.id:${expansionId}&page=${page}&pageSize=${pageSize}`
    );

    const { data, count } = response.data;
    if (count < pageSize) moreCardsToQuery = false;

    result.push(
      ...data.map((pokemon: any) => ({
        cardId: pokemon.id,
        name: pokemon.name,
        expansionId: pokemon.set.id,
        expansionName: pokemon.set.name,
        expansionCardId: pokemon.number,
        expansionPrintedTotal: pokemon.set.printedTotal,
        expansionReleaseDate: pokemon.set.releaseDate + " 00:00:00",
        rarity: pokemon.rarity,
        imgUrlSmall: pokemon.images.small,
        imgUrlLarge: pokemon.images.large,
        artist: pokemon.artist,
        tcgPlayerUrl: pokemon.tcgplayer?.url,
        price: pokemon.tcgplayer?.prices?.holofoil?.market ?? pokemon.cardmarket?.prices?.trendPrice,
      }))
    );
    page++;
  }

  return result;
}

async function createCards(cards: any) {
  return await axios.post(`http://localhost:8001/seed/cards`, cards);
}

async function loadSetData(setId: string) {
  console.log("loading set", setId);
  const expansion = await loadExpansion(setId);

  createExpansion(expansion);

  const cards = await loadExpansionCards(setId);
  createCards(cards);
}

const setIds = [
  "swshp",
  "pgo",
  "swsh12",
  "swsh9",
  "swsh11tg",
  "swsh12pt5gg",
  "sv1",
  "svp",
  "fut20",
  "swsh10",
  "swsh9tg",
  "swsh10tg",
  "swsh11",
  "swsh12tg",
  "swsh12pt5",
  "sv2",
  "sve",
  "sv3",
  "sv3pt5",
  "sv4",
  "sv4pt5",
  "sv5",
  "sv6",
  "sv6pt5",
  "sv7",
  "sv8",
  "sv8pt5",
];

setIds.forEach(loadSetData);
