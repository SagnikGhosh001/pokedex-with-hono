import { createApp } from "./src/app.js";

const getPokemonData = () => {
  try {
    return JSON.parse(Deno.readTextFileSync("./pokemons.json"));
  } catch {
    return [];
  }
};

const main = () => {
  const pokemons = getPokemonData();
  const app = createApp(pokemons);
  Deno.serve(app.fetch);
};

main();
