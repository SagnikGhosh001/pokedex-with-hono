import { Eta } from "eta";

const filterPoekmon = (pokemons, type) =>
  pokemons.filter((pokemon) =>
    pokemon.types.some((t) => t.type.name === type) || type === "all"
  );

export const displayPokemons = (c) => {
  const pokemons = c.get("pokemons");
  const type = c.req.param("type") || "all";
  const eta = new Eta({ views: "./public/templates" });
  const filteredPokemon = filterPoekmon(pokemons, type);
  const page = eta.render("pokemons.html", {
    pokemons: filteredPokemon,
    selectedType: type,
  });
  return c.html(page);
};
