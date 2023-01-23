import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { renderMarkup } from './popular';
import { getGenresName } from './popular';
import { getGenres } from './popular';

const searchForm = document.querySelector('.form');
const searchInput = document.querySelector('#search');
const notification = document.querySelector('.notification');

searchInput.addEventListener('keyup', event => {
  notification.classList.add('close');
});

searchForm.addEventListener('submit', searchFilm);

function searchFilm(event) {
  event.preventDefault();
  Loading.standard();
  Loading.remove(800);
  const {
    elements: { search },
  } = event.currentTarget;
  console.log(search.value);
  if (search.value.length < 2) {
    Notify.warning('Its name too short.Enter the correct movie name, please.');
    event.currentTarget.reset();
    return;
  }
  try {
    const resultByName = getByName(search.value.trim()).then(result => {
      const cardsList = document.querySelector('.cards__list');
      if (cardsList) {
        cardsList.innerHTML = '';
      }
      if (Array.isArray(result) && result.length) {
        // console.log(result.ganres);
        renderMarkup(result);
        //  renderMarkup(result, result.ganres);
      } else {
        notification.classList.remove('close');
      }
    });
  } catch (error) {
    console.log(error);
  }
}
async function getByName(name) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=004aa31770cc2729c6dd319813b8b5dc&query=${name}`
  );
  console.log(data);
  console.log(data.results);
  return data.results;
}
