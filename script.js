const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImg = document.getElementById('sprite')
const types = document.getElementById('types')
const stats = document.getElementsByClassName("stats");


const validPokemonsUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const searchBtn = document.getElementById("search-button");
const idOrNameInput = document.getElementById('search-input');
let validPokemons = [];
let pokemon = {};

fetch(validPokemonsUrl)
    .then(res => {
      return res.json();
    })
    .then(data => {
      validPokemons = data.results;
    }).catch((err) => {
  console.log("error on fetching validpokemons: " + err);
})

const getPokemon = async () => {
  try {
    const pokemonNameOrId = removeSpecialChars(idOrNameInput.value);
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    return await response.json();
  } catch (err) {
    console.log("getPokemon func error:" + err);
  }
}

const isValidPokemon = (idOrName) => {
  idOrName = removeSpecialChars(idOrName);
  return validPokemons.find(({id, name}) => {
    return idOrName === id.toString() || idOrName === name;
  });
}

const removeSpecialChars = (string) => {
  let regex = /[^a-zA-Z0-9\s]/g;
  return string.replace(regex, '').toLowerCase();
}

const displayDefault = () => {
  types.innerText = " ";
  pokemonName.innerText = " ";
  pokemonId.innerText = " ";
  pokemonWeight.innerText = " ";
  pokemonHeight.innerText = " ";
  pokemonImg.setAttribute("src", "");
  for(let i = 0; i<=5; i++) {
    stats[i].innerHTML =" ";
  }

}


searchBtn.addEventListener("click", async e => {
      e.preventDefault();
      let a = isValidPokemon(idOrNameInput.value);
      if (a) {
        pokemon = await getPokemon();
        types.innerText = "";
        pokemonName.innerText = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.split('-')[0].slice(1, pokemon.name.split('-')[0].length)}`;
        pokemonId.innerText = '#' + pokemon.id;
        pokemonWeight.innerText = `Weight: ${pokemon.weight}`;
        pokemonHeight.innerText = `Height: ${pokemon.height}`;
        pokemonImg.setAttribute("src", pokemon.sprites.front_default)
        for(let i = 0; i<=5; i++) {
          stats[i].innerHTML = pokemon.stats[i].base_stat;
        }
        pokemon.types.forEach(({type}) => {
          let {name} = type;
          let span = document.createElement('span');
          span.setAttribute('class', name);
          span.innerText = name.toUpperCase();
          console.log(name);
          types.append(span);
        })
      } else {
        alert("Pokémon not found");
        displayDefault();
      }
    }
)
