function printTypeSelector() {
  console.log(9999999);
  fetch('https://pokeapi.co/api/v2/type')
    .then((response) => response.json())
    .then((pokes) => {
      const body = document.querySelector('body');
      const div = document.createElement('div');
      div.classList.add('selector__container');
      body.appendChild(div);
      const { results } = pokes;
      console.log(results);
      let counter = 1;
      results.forEach((move) => {
        const btn = document.createElement('button');
        btn.innerText = move.name;
        btn.classList.add(move.name, 'btn-type');
        btn.value = counter;
        div.appendChild(btn);
        btn.addEventListener('click', () => { fetchTypePokemons(btn.value); });
        counter += 1;
      });
    });
}

function fetchTypePokemons(btn) {
  const container = document.querySelector('.selector__container');
  container.remove();
  console.log(btn);
  fetch(`https://pokeapi.co/api/v2/type/${btn}`)
    .then((response) => response.json())
    .then((pokes) => {
      console.log(pokes);
      const { pokemon } = pokes;
      const lista = document.getElementById('pokelista');
      lista.textContent = '';
      let counter = 0;
      pokemon.forEach((poke) => {
        do {
          counter += 1;
          console.log(counter);
          const pokeId = parseIdFromApi(poke.pokemon);
          const pokeApi = pokeApiUrl(pokeId);
          const liElement = document.createElement('div');
          liElement.classList.add('poke-div');
          liElement.classList.add(`${poke.name}`);

          const aElement = document.createElement('a');
          aElement.href = generateUrl(pokeId);
          pokeCap = capitalize(poke.pokemon.name);
          aElement.textContent += `${pokeCap}`;
          liElement.appendChild(aElement);

          pokeData(pokeApi);
          lista.appendChild(liElement);
        } while (counter < 10);
      });
    });
}
