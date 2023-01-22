'use strict';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

import { cardsList } from './popular';

const modalBackdrop = document.querySelector('.backdrop__modal-film');
const buttonCloseModal = document.querySelector('#modal-close-button');
const modalCardInfo = document.querySelector('.modal-film__info');
const btnWatched = document.querySelector('.modal-film__btn-watched');
const btnQueue = document.querySelector('.modal-film__btn-queue');
// const filterWatched = document.querySelector(".filter-watched__btn");
// const filterQueue = document.querySelector(".filter-queue__btn");
const libraryWatched = JSON.parse(localStorage.getItem('watched')) || [];
const libraryQueue = JSON.parse(localStorage.getItem('queue')) || [];

cardsList.addEventListener('click', onOpenModal);

btnWatched.addEventListener('click', setToLocalStorageWatched);
btnQueue.addEventListener('click', setToLocalStorageQueue);
// filterWatched.addEventListener('click', onfilterWatched);
// filterQueue.addEventListener('click', onfilterQueue)

async function onOpenModal(event) {
  if (!event.target.closest('[data-id]')) {
    return;
  }

  const currentCardId = event.target.closest('li').dataset.id;
  const movieRes = await addMovieInfo(currentCardId);
  createMovieCard(movieRes);

  modalBackdrop.classList.remove('is-hidden');
  window.addEventListener('click', closeModalbyBackdrop);
  window.addEventListener('keydown', onKeyClick);
  buttonCloseModal.addEventListener('click', closeModalbyCross);
}

async function addMovieInfo(id) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=004aa31770cc2729c6dd319813b8b5dc`
  );
  return data;
}

function closeModalbyCross() {
  modalBackdrop.classList.add('is-hidden');
  modalCardInfo.innerHTML = '';
  clearBackdropListeners();
}

function onKeyClick(event) {
  if (event.code !== 'Escape') {
    return;
  }
  modalBackdrop.classList.add('is-hidden');
  modalCardInfo.innerHTML = '';
  clearBackdropListeners();
}

function closeModalbyBackdrop(event) {
  if (event.target === modalBackdrop) {
    modalBackdrop.classList.add('is-hidden');
    modalCardInfo.innerHTML = '';
    clearBackdropListeners();
  }
}

function clearBackdropListeners() {
  window.removeEventListener('keydown', onKeyClick);
  window.removeEventListener('click', closeModalbyBackdrop);
  buttonCloseModal.removeEventListener('click', closeModalbyCross);
}

function createMovieCard(obj) {
  const {
    id,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    overview,
    genres,
    poster_path,
  } = obj;
  const genresArr = genres.map(el => el.name);

  const markup = ` 
        <div class="film-card"> 
            <img class="film-card__picture" src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${title}" data-id="${id}"> 
            <h2 class="film-card__title">${title}</h2> 
            <div class="film-card__general-info"> 
                <p class="info-item">Vote/Votes<span>${vote_average}/${vote_count}</span></p> 
                <p class="info-item">Popularity<span>${popularity}</span></p> 
                <p class="info-item">Original Title<span>${original_title}</span></p> 
                <p class="info-item">Genre<span>${[...genresArr]}</span></p> 
            </div> 
            <p class="film-card__overview-title">About</p> 
            <p class="film-card__overview">${overview}</p> 
        </div> 
    `;
  modalCardInfo.insertAdjacentHTML('beforeend', markup);
}

async function setToLocalStorageWatched(evt) {
  const idWatched =
    evt.currentTarget.parentNode.previousElementSibling.firstElementChild
      .firstElementChild.dataset.id;

  if (libraryWatched.some(movie => movie.id === Number(idWatched))) return;
  const currentFilm = await addMovieInfo(idWatched);

  libraryWatched.push(currentFilm);

  try {
    const valueToSet = JSON.stringify(libraryWatched);
    localStorage.setItem('watched', valueToSet);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
  console.log(JSON.parse(localStorage.getItem('watched')));
}

async function setToLocalStorageQueue(evt) {
  const idQueue =
    evt.currentTarget.parentNode.previousElementSibling.firstElementChild
      .firstElementChild.dataset.id;
  if (libraryQueue.some(movie => movie.id === Number(idQueue))) return;
  const currentFilm = await addMovieInfo(idQueue);

  libraryQueue.push(currentFilm);

  try {
    const valueToSet = JSON.stringify(libraryQueue);
    localStorage.setItem('queue', valueToSet);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
  const queue = JSON.parse(localStorage.getItem('queue'));
  console.log(queue);
}
