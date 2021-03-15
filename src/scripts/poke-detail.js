function parseIdFromLocation(currentLocation) {
  const idFromLocation = currentLocation.search;
  const idWithoutQuestionMark = idFromLocation.replace("?", "");
  const searchMatrix = idWithoutQuestionMark.split("&");
  const idQuery = searchMatrix.find((item) => item.includes("id"));

  const id = idQuery && idQuery.split("=")[1];
  return +id;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function pokeApiUrl(id) {
  return `${pokeApiFixed}${pokeId}`;
}

function printPokemonName(poke) {
  const mainElement = document.querySelector(".screen__header");
  const h2Element = document.createElement("h2");
  h2Element.innerText = capitalize(poke);
  mainElement.appendChild(h2Element);
}

function printPokeId(poke) {
  const mainElement = document.querySelector(".screen__header");
  const pElement = document.createElement("p");
  pElement.innerText = `#${poke}`;
  mainElement.appendChild(pElement);
}

function printPokeImg(poke) {
  const mainElement = document.querySelector(".screen__image");
  const imgElementFront = document.createElement("img");
  const imgElementBack = document.createElement("img");
  const imgElementFrontShiny = document.createElement("img");
  const imgElementBackShiny = document.createElement("img");
  imgElementBack.src = poke.back_default;
  imgElementFront.src = poke.front_default;
  imgElementFrontShiny.src = poke.front_shiny;
  imgElementBackShiny.src = poke.back_shiny;
  mainElement.appendChild(imgElementFront);
  mainElement.appendChild(imgElementBack);
  // mainElement.appendChild(imgElementFrontShiny);
  // mainElement.appendChild(imgElementBackShiny);
}

function printPokeElement(poke, element, text) {
  const mainElement = document.querySelector(".screen__description");
  const myElement = document.createElement(element);
  myElement.innerText = text + poke;
  mainElement.appendChild(myElement);
}

function printPokeStats(poke) {
  const mainElement = document.querySelector(".right-container__screen");
  const ulElement = document.createElement("ul");
  ulElement.classList.add("poke-stats");

  poke.forEach((poke) => {
    const liElement = document.createElement("li");
    const spanElement = document.createElement("span");
    const progressElement = document.createElement("progress");
    progressElement.setAttribute("max", 100);
    progressElement.setAttribute("value", `${poke.base_stat}`);
    spanElement.innerText = `${poke.stat.name}`.toUpperCase();
    if (poke.stat.name === "special-attack") {
      spanElement.innerText = "SP ATK";
    } else if (poke.stat.name === "special-defense") {
      spanElement.innerText = "SP DEF";
    } else if (poke.stat.name === "defense") {
      spanElement.innerText = "DEF";
    } else if (poke.stat.name === "attack") {
      spanElement.innerText = "ATK";
    }
    liElement.appendChild(progressElement);
    liElement.appendChild(spanElement);
    ulElement.appendChild(liElement);
  });
  mainElement.appendChild(ulElement);
}

function nextPokemon() {
  const nextUrl = `./poke-detail.html?id=${pokeId + 1}`;
  location.href = nextUrl;
}
function prevPokemon() {
  const nextUrl = `./poke-detail.html?id=${pokeId - 1}`;
  location.href = nextUrl;
}

function generateBackground(poke) {
  const pokemon = document.querySelector(".main-section__black");
  if (poke[1]) {
    pokemon.style.background = `linear-gradient(to right, ${
      colorPalette[poke[0].type.name]
    } 50%, ${colorPalette[poke[1].type.name]} 50%)`;
  } else {
    pokemon.style.background = `${colorPalette[poke[0].type.name]}`;
  }
}
const colorPalette = {
  normal: "#babaae",
  fighting: "#a75543",
  flying: "#78a2ff",
  poison: "#a95ca0",
  ground: "#eecc55",
  rock: "#ccbd72",
  bug: "#c2d21e",
  ghost: "#7975d7",
  steel: "#c4c2db",
  fire: "#fa5643",
  water: "#56adff",
  grass: "#8cd750",
  electric: "#fde139",
  psychic: "#fa65b4",
  ice: "#96f1ff",
  dragon: "#8673ff",
  dark: "#8d6855",
  fairy: "#f9aeff",
};

// this will get me THIS ATTACK type

const pokeApiFixed = "https://pokeapi.co/api/v2/pokemon/";
const pokeId = parseIdFromLocation(location);
const pokeApi = pokeApiUrl(pokeId);

function pokeData() {
  fetch(pokeApi)
    .then((response) => response.json())
    .then((pokes) => {
      const pokeabilities = pokes.abilities;
      const pokeforms = pokes.forms;
      const pokeweight = pokes.weight;
      const pokemoves = pokes.moves;
      const pokename = pokes.name;
      const pokesprites = pokes.sprites;
      const poketypes = pokes.types;
      const pokestats = pokes.stats;
      console.log(pokeforms);
      printPokemonName(pokename);
      printPokeId(pokeId);
      printPokeElement("", "div", `weight: ${pokeweight / 10} kg`);
      console.log(pokeabilities[0].ability.name);
      printPokeElement(
        "",
        "div",
        `abilities: ${pokeabilities[0].ability.name}, ${pokeabilities[1].ability.name}`
      );
      printPokeTypes(poketypes);
      printPokeImg(pokesprites);
      printPokeStats(pokestats);
      pokeMovesType(pokemoves);
      generateBackground(poketypes);
    });
}
pokeData();
