interface Pokemon {
  name: string;
  price?: number;
  rarity: string;
  sm_img_url: string;
  lg_img_url: string;
  set_id: string;
  set: string;
  set_logo: string;
  set_icon: string;
  set_card_id: string;
  set_printed_total: number;
  tcg_player_url: string;
  artist: string;
  id: string;
}

interface Binder {
  x: number;
  y: number;
  pages: Pokemon[][];
  isLoading: boolean;
}

interface BinderPage {
  x: number;
  y: number;
  page: Pokemon[];
}

interface pokemonTcgQuery {
  rarity: string[];
  name: string;
  setName: string[];
  artist: string;
}
