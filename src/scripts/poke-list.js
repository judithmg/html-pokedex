let pokenext = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=10";
let pokeprevious = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
const pokeApiFixed = "https://pokeapi.co/api/v2/pokemon/";

function pokeApiUrl(id) {
  return `${pokeApiFixed}${id}`;
}

function drawAsync(url) {
  fetch(url)
    .then((response) => response.json())
    .then((pokes) => {
      pokecount = pokes.count;
      pokenext = pokes.next;
      pokeprevious = pokes.previous;
      pokeresults = pokes.results;
      const lista = document.getElementById("pokelista");
      lista.textContent = "";
      pokeresults.forEach((poke) => {
        const pokeId = parseIdFromApi(poke);
        const pokeApi = pokeApiUrl(pokeId);
        const liElement = document.createElement("div");
        liElement.classList.add("poke-div");
        liElement.classList.add(`${poke.name}`);

        const aElement = document.createElement("a");
        aElement.href = generateUrl(pokeId);
        pokeCap = capitalize(poke.name);
        aElement.textContent += `${pokeCap}`;
        liElement.appendChild(aElement);

        pokeData(pokeApi);
        lista.appendChild(liElement);
      });
    });
}

function pokeData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((poke) => {
      generateImgs(poke);
      generateBackground(poke);
    });
}

function generateImgs(poke) {
  const pokemon = document.querySelector(`.${poke.name}`);
  const imgElementFront = document.createElement("img");
  imgElementFront.src = poke.sprites.front_default;
  imgElementFront.classList.add("img-float");

  const imgElementBack = document.createElement("img");
  imgElementBack.src = poke.sprites.back_default;
  pokemon.appendChild(imgElementFront);
}

function generateBackground(poke) {
  const pokemon = document.querySelector(`.${poke.name}`);
  if (poke.types[1]) {
    pokemon.style.background = `linear-gradient(to right, ${
      colorPalette[poke.types[0].type.name]
    } 50%, ${colorPalette[poke.types[1].type.name]} 50%)`;
  } else {
    pokemon.style.background = `${colorPalette[poke.types[0].type.name]}`;
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

function parseIdFromApi(poke) {
  const pokeUrl = poke.url;
  const pokeReplace = pokeUrl.replace("https://pokeapi.co/api/v2/pokemon/", "");
  const pokeId = pokeReplace.replace("/", "");
  console.log(pokeId);
  return +pokeId;
}

function generateUrl(poke) {
  return `./poke-detail.html?id=${poke}`;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
drawAsync(pokeprevious);
document.querySelector(".btn-jump").addEventListener("click", () => {
  const page = document.querySelector(".page-input").value;
  drawAsync(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`);
});
