import { Eta } from "eta";

const filterPoekmon = (pokemons, searchedPokemon, type) =>
  pokemons.filter((pokemon) => {
    const matchesType = type === "all" ||
      pokemon.types.some((t) => t.type.name === type);

    const matchesSearch = !searchedPokemon ||
      pokemon.name.toLowerCase().includes(searchedPokemon);

    return matchesType && matchesSearch;
  });

export const displayPokemons = (c) => {
  const pokemons = c.get("pokemons");
  const type = c.req.param("type") || "all";
  const pokemon = c.req.query("pokemon")?.toLowerCase() || "";
  const path = new URL(c.req.url).pathname;

  const eta = new Eta({ views: "./public/templates" });
  const filteredPokemon = filterPoekmon(pokemons, pokemon, type);
  const page = eta.render("pokemons.html", {
    pokemons: filteredPokemon,
    selectedType: type,
    searchQuery: pokemon,
    path,
  });

  return c.html(page);
};
