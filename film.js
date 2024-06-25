let titleH1;
let producerSpan;
let episode_idSpan;
let directorSpan;
let release_dateSpan
let charactersDiv;
let planetsDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  titleH1 = document.querySelector('h1#title');
  producerSpan = document.querySelector('span#producer');
  episode_idSpan = document.querySelector('span#episode_id');
  directorSpan = document.querySelector('span#director');
  release_dateSpan = document.querySelector('span#release_date');
  charactersUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.characters = await fetchCharacters(film)
    film.planets = await fetchPlanets(film)
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);

}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
    console.log(characters);
  return characters;
}

async function fetchPlanets(film) {
  const url = `${baseUrl}/films/${film?.id}/planets`;
  const planets = await fetch(url)
    .then(res => res.json())
  return planets;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their title
  titleH1.textContent = film?.title;
  producerSpan.textContent = film?.producer;
  episode_idSpan.textContent = film?.episode_id;
  directorSpan.textContent = film?.director;
  release_dateSpan.textContent = film?.release_date;
  const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`);
  charactersUl.innerHTML = charactersLis.join("");
  const planetsLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`);
  planetsUl.innerHTML = planetsLis.join("");
}
