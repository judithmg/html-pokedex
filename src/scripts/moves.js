function printPokeTypes(poke) {
  const mainElement = document.querySelector('.screen__description');
  const ulElement = document.createElement('ul');
  const liElement = document.createElement('li');
  liElement.innerText = poke[0].type.name;
  liElement.classList.add(poke[0].type.name, 'poketype');
  ulElement.appendChild(liElement);
  if (poke[1]) {
    const liElement1 = document.createElement('li');
    liElement1.innerText = poke[1].type.name;
    liElement1.classList.add(poke[1].type.name, 'poketype');
    ulElement.appendChild(liElement1);
  }
  mainElement.appendChild(ulElement);
}

function changePageMoves(url, page) {
  const toRemove = document.querySelector('.poke-moves');
  toRemove.remove();
  const ulElement = document.createElement('ul');
  ulElement.classList.add('poke-moves');
  const container = document.querySelector('.right-container__screen');
  container.appendChild(ulElement);

  fetch(url)
    .then((response) => response.json())
    .then((pokes) => {
      const pokemoves = pokes.moves;
      let i = page * 10;
      const max = i + 10;
      for (i; i < max; i++) {
        const movesUrl = pokemoves[i].move.url;
        fetch(movesUrl)
          .then((response) => response.json())
          .then((moves) => {
            const liElement = document.createElement('li');
            liElement.innerText = moves.name;
            liElement.classList.add(moves.type.name, 'poketype');
            ulElement.appendChild(liElement);
          });
      }
    });
}

function pokeMovesType(thismove) {
  const ulElement = document.createElement('ul');
  ulElement.classList.add('poke-moves');
  const container = document.querySelector('.right-container__screen');
  container.appendChild(ulElement);

  let counter = 0;
  thismove.forEach((pokemove) => {
    if (counter < 10) {
      const movesUrl = pokemove.move.url;
      fetch(movesUrl)
        .then((response) => response.json())
        .then((moves) => {
          const liElement = document.createElement('li');
          liElement.innerText = moves.name;
          liElement.classList.add(moves.type.name, 'poketype');
          ulElement.appendChild(liElement);
        });
      counter += 1;
    }
  });
}

function changePageMoves(page) {
  const toRemove = document.querySelector('.poke-moves');
  toRemove.remove();
  const ulElement = document.createElement('ul');
  ulElement.classList.add('poke-moves');
  const container = document.querySelector('.right-container__screen');
  container.appendChild(ulElement);
  page.next=page.next+1

  fetch(pokeApi)
    .then((response) => response.json())
    .then((pokes) => {
      const pokemoves = pokes.moves;
      let i = page.next * 10;
      const max = i + 10;
      for (i; i < max; i++) {
        if (pokemoves[i]) {
          const movesUrl = pokemoves[i].move.url;
        fetch(movesUrl)
          .then((response) => response.json())
          .then((moves) => {
            const liElement = document.createElement('li');
            liElement.innerText = moves.name;
            liElement.classList.add(moves.type.name, 'poketype');
            ulElement.appendChild(liElement);
          });
        } else {
          //REMOVE BUTTON
          const btnRem=document.querySelector('.right-button')
          btnRem.remove()
        }       
      }
      
    });
}

document.querySelector('.right-button').addEventListener('click', () => {changePageMoves(counterMove)})

let counterMove = {
  next: 1
};
