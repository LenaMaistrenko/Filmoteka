import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.min.css';
// import { cardsList, getGenres, getGenresName } from './popular';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const cardsList = document.querySelector('.cards__list');
const watchedBtn = document.querySelector('.filter-watched__btn');
const queueBtn = document.querySelector('.filter-queue__btn');
// const noMovies = document.querySelector('.no-movies');

watchedBtn.addEventListener('click', renderWatched);
queueBtn.addEventListener('click', renderQueue);
// noMovies.classList.add('is-hidden');

if (window.location.pathname === '/library.html') {
  watchedBtn.focus();
  watchedBtn.click();
}

function renderWatched() {
  // noMovies.classList.add('is-hidden');
  Loading.standard();
  Loading.remove(800);
  cardsList.innerHTML = '';
  const watchedMovies = JSON.parse(localStorage.getItem('watched')) || [];
  if (!watchedMovies.length) {
    return Notify.info('No added movies!');
  }
  renderMarkupLibrary(watchedMovies);
}

function renderQueue() {
  // noMovies.classList.add('is-hidden');
  Loading.standard();
  Loading.remove(800);
  cardsList.innerHTML = '';
  const queueMovies = JSON.parse(localStorage.getItem('queue')) || [];
  if (!queueMovies.length) {
    return Notify.info('No added movies!');
  }
  renderMarkupLibrary(queueMovies);
}

// function renderNoMovies() {
//   noMovies.classList.remove('is-hidden');
// }

function renderMarkupLibrary(movies) {
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
          <p class="cards__info">${getGenresNameLibrary(movie.genres).join(
            ', '
          )} | ${
        movie.release_date.split('-')[0]
      } <span class="cards__vote"> ${movie.vote_average.toFixed(1)}</span></p>
        </li>`;
    })
    .join('');
  cardsList.insertAdjacentHTML('beforeend', markup);
}

function getGenresNameLibrary(movieGenres) {
  const genresName = movieGenres.map(genre => genre.name);
  return genresName.length > 2 ? genresName.slice(0, 2) : genresName;
}
