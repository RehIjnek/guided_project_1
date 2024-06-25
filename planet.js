let nameH1;
let climateSpan, terrainSpan;
let diameterSpan, rotationalPeriodSpan, orbitalPeriodSpan, gravitySpan, populationSpan, surfaceWaterSpan;
let filmsUl;
let charactersUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    climateSpan = document.querySelector('span#climate');
    terrainSpan = document.querySelector('span#terrain');
    diameterSpan = document.querySelector('span#diameter');
    rotationalPeriodSpan = document.querySelector('span#rotational_period');
    orbitalPeriodSpan = document.querySelector('span#orbital_period');
    gravitySpan = document.querySelector('span#gravity');
    populationSpan = document.querySelector('span#population');
    surfaceWaterSpan = document.querySelector('span#surface_water');
    characterUl = document.querySelector('#characters>ul');
    filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id)
  });

  async function getPlanet(id){
    let planet;
    try {
        planet = await fetchPlanet(id);
        planet.films = await fetchFilms(planet);
        planet.characters = await fetchCharacters(planet);
        console.log(`loaded planet ${id}: ${planet}`);
    }
    catch(ex){
        console.error(`Error reading planet ${id} data.`, ex.message);
    }
    renderPlanet(planet);
  }

  async function fetchPlanet(id) {
    let url = `${baseUrl}/planets/${id}`;
    return await fetch(url)
       .then(res => res.json());
  }

  async function fetchFilms(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/films`;
    console.log(url);
    const films = await fetch(url)
      .then(res => res.json())
    return films;
  }

  async function fetchCharacters(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/characters`;
    console.log(url);
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
  }

  const renderPlanet = planet => {
    document.title = `SWAPI _ ${planet?.name}`;
    nameH1.textContent = planet?.name;
    diameterSpan.textContent = planet?.diameter;
    rotationalPeriodSpan.textContent = planet?.rotation_period;
    orbitalPeriodSpan.textContent = planet?.orbital_period;
    gravitySpan.textContent = planet?.gravity;
    populationSpan.textContent = planet?.population;
    surfaceWaterSpan = planet?.surface_water;
    climateSpan.textContent = planet?.climate;
    terrainSpan.textContent = planet?.terrain;

    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    const charactersLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
    characterUl.innerHTML = charactersLis.join("");
    
  }

  