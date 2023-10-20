
const  pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon  = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name   = pokeDetail.name
    const types    = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type]   = types

    pokemon.types  = types
    pokemon.type   = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}   

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)

}

pokeApi.getPokemons = (offset=0,limit=5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        }
// Este documento javaScript cria um objeto que tem uma requisição HTTP como propriedade para poder consumir uma API de pokemons. Nele podemos ver que já converte a resposta em um documento json, que é a resposta real recebida da requisição. E então ele pega uma parte específica do body.