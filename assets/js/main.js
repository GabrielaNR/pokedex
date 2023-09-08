const limit = 10;
let offset = 0;

const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList')
/*
function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number} </span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                 </ol>

                 <img src="${pokemon.photo}"
                 alt="${pokemon.name}">

                </div>
    </li>
     `
}
*/
const maxRecords = 151;


function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number} </span>
            <span class="name">${pokemon.name}</span>
        
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li> 
        `).join('')
        pokemonList.innerHTML += newHTML
    })
}
    
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtRecordsNextPage = offset + limit

    if (qtRecordsNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
        loadPokemonItens(offset, limit)
    }
    
})

/*.catch((error) => console.error(error))*/
