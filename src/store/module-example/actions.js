/*
export function someAction (context) {
}
*/

export function setPokemon (ctx, pokemon) {
//   ctx.setSelectedPokemon(pokemon)
  ctx.commit('setPokemon', pokemon)
}
