import axios from 'axios';

const cardsList = document.querySelector('.cards__list');
loadPopular();

async function getPopular() {
  const { data } = await axios.get(
    'https://api.themoviedb.org/3/trending/movie/week?api_key=004aa31770cc2729c6dd319813b8b5dc'
  );
  console.log(data);
  return data.results;
}

async function renderMarkup(movies) {
  const markup = movies
    .map(movie => {
      return `<li class="cards__item">
          <img
            class="cards__photo"
            alt="movie"
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            width="450"
            loading="lazy"
          />
          <h3 class="cards__title">${movie.title}</h3>
          <p class="cards__info">${movie.genre_ids} | ${movie.release_date}</p>
        </li>`;
    })
    .join('');
  cardsList.insertAdjacentHTML('beforeend', markup);
}

async function loadPopular() {
  try {
    const popularMovies = await getPopular();
    renderMarkup(popularMovies);
  } catch (error) {
    console.log(error);
  }
}
