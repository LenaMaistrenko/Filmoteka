import axios from 'axios';

export const cardsList = document.querySelector('.cards__list');
loadPopular();

let GENRES = [];

async function getPopular() {
  const { data } = await axios.get(
    'https://api.themoviedb.org/3/trending/movie/week?api_key=004aa31770cc2729c6dd319813b8b5dc'
  );
  console.log(data);
  return data.results;
}

export function renderMarkup(movies) {
  const markup = movies
    .map(movie => {
      return `<li class="cards__item" data-id="${movie.id}">

     
          <img
            class="cards__photo"
            alt="movie"
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            width="450"
            loading="lazy"
          />
          <h3 class="cards__title">${movie.title}</h3>
          <p class="cards__info">${getGenresName(GENRES, movie.genre_ids).join(
            ', '
          )} | ${movie.release_date.split('-')[0]}</p>
        </li>`;
    })
    .join('');
  cardsList.insertAdjacentHTML('beforeend', markup);
}

async function loadPopular() {
  try {
    const popularMovies = await getPopular();
    GENRES = await getGenres();
    renderMarkup(popularMovies);
  } catch (error) {
    console.log(error);
  }
}

export async function getGenres() {
  const { data } = await axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=004aa31770cc2729c6dd319813b8b5dc'
  );
  return data.genres;
}

export function getGenresName(allGenres, genreIds) {
  const genresName = allGenres.reduce((acc, genre) => {
    if (genreIds.includes(genre.id)) {
      return [...acc, genre.name];
    }
    return acc;
  }, []);
  return genresName.length > 2 ? genresName.slice(0, 2) : genresName;
}
