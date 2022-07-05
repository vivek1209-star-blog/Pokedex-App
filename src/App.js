import React from "react";
import { Route, Switch } from "react-router-dom";
import { Pokedex } from '../src/Container/Pokedex'
import { PokemonCard } from "./Container/PokemonCard";
const App = () => (
  <Switch>
    <Route exact path="/" render={(props) => <Pokedex {...props} />} />
    <Route
      exact
      path="/:pokemonId"
      render={(props) => <PokemonCard {...props} />}
    />
  </Switch>
);

export default App;