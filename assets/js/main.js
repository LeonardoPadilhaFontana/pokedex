const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecords = 151;
const limit = 5;
let offset = 0;

function loadPokemonItens(offset, limit){
    const pokemonList = document.getElementById('pokemonList');
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{
        const newHTML = pokemons.map((pokemon) =>`
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>

                </li>
                `
        ).join('');
        pokemonList.innerHTML += newHTML;
    })
    .catch((error)   => console.log(error))
}

loadPokemonItens(offset, limit);// faz a leitura pela primeira vez da lista

loadMoreButton.addEventListener('click', () =>{
    offset += limit;
    const qtdRecordNextPage = offset + limit;
    if (qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else  {
        loadPokemonItens(offset, limit);
    }
})