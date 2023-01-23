import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { cardsList, getGenres, getGenresName } from './popular';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const watchedBtn = document.querySelector('.filter-watched__btn');
const queueBtn = document.querySelector('.filter-queue__btn');

watchedBtn.addEventListener('click', renderWatched);
queueBtn.addEventListener('click', renderQueue);

function renderWatched() {
  Loading.standard();
  Loading.remove(800);
  cardsList.innerHTML = '';
  const watchedMovies = JSON.parse(localStorage.getItem('watched')) || [];
  if (!watchedMovies.length) {
    return Notify.warning('There is no added movie');
  }
  renderMarkupLibrary(watchedMovies);
}

function renderQueue() {
  Loading.standard();
  Loading.remove(800);
  cardsList.innerHTML = '';
  const queueMovies = JSON.parse(localStorage.getItem('queue')) || [];
  if (!queueMovies.length) {
    return Notify.warning('There is no added movie');
  }
  renderMarkupLibrary(queueMovies);
}

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
          )} | ${movie.release_date.split('-')[0]}</p>
        </li>`;
    })
    .join('');
  cardsList.insertAdjacentHTML('beforeend', markup);
}

function getGenresNameLibrary(movieGenres) {
  const genresName = movieGenres.map(genre => genre.name);
  return genresName.length > 2 ? genresName.slice(0, 2) : genresName;
}
