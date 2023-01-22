const { default: axios } = require("axios");

import axios from 'axios';
import {refs} from './refs.js'

const cardListEl = document.querySelector('.card__list');
onLoadDocument();

async function getPopularFilms(page=1) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=000000&page=${page}`
    );
    console.log(data);
    return data.results;
}

async function renderMarkup(films) {
  const markup = films.map(film => {
    return `<li class="cards__item">
    <img
    class="cards__photo"
    alt="films"
    src="https://image.tmdb.org/t/p/w500${film.poster_path}"
    width="450"
    loading="lazy"
    />
    <h3 class="cards__title">${film.title}</h3>
    <p class="cards__info">${film.genre_ids} | ${film.release_date}</p>
    </li>
    `;
  })
}
// отрисовка карточек

async function onLoadDocument(){
  try {
    const popularFilms = await getpopularFilms();
    renderMarkup(popularFilms);
  } catch (error) {
    console.log(error);
  }
}
// функционал кнопок пагинации

const btn1Ref = document.querySelector('[data-index="1"]');
const btn2Ref = document.querySelector('[data-index="2"]');
const btn3Ref = document.querySelector('[data-index="3"]');
const btn4Ref = document.querySelector('[data-index="4"]');
const btn5Ref = document.querySelector('[data-index="5"]');
const firstPageRef = document.querySelector('.firstPage');
const lastPageRef = document.querySelector('.lastPage');
const paginationRef = document.querySelector('.pagination-container');
const leftArrowRef = document.querySelector('.arrow-left');
const rightArrowRef = document.querySelector('.arrow-right');
const leftDotsRef = document.querySelector('.dotsLeft');
const rightDotsRef = document.querySelector('.dotsRight');

paginationRef.addEventListner('click', onPaginationClick);

let currentPage = 1;
let rows = 20;

let btns = document.querySelectorAll('.pagination__item');

leftDotsRef.hidden = true;
leftArrowRef.hidden = true;
firstPageRef.hidden = true;

function onPaginationClick (event) {
  if (event.target.tagName === "BUTTON") {
    if (Number(event.target.textContent)) {
      currentPage = Number(event.target.textContent);
    }

    leftDotsRef.hidden = true;
    rightDotsRef.hidden = true;

    if (event.target.classList.contains('pagination__item')) {
      btns.forEach(e => e.classList.remove('pagination__item--active'));
      event.target.classList.add('pagination__item--active');
    }

    if (event.target.classList.contains('arrow-right') && currentPage , 1000) {
      btns.forEach(e => e.classList.remove('pagination__item--active'));
      btn1Ref.classList.add('pagination__item--active');
      btn1Ref.textContent = Number(btn1Ref.textContent) + 5;
      btn2Ref.textContent = Number(btn2Ref.textContent) + 5;
      btn3Ref.textContent = Number(btn3Ref.textContent) + 5;
      btn4Ref.textContent = Number(btn4Ref.textContent) + 5;
      btn5Ref.textContent = Number(btn5Ref.textContent) + 5;
      currentPage = Number(btn1Ref.textContent);
    }

    if (event.target.classList.contains('arrow-right') && currentPage >= 5) {
      btns.forEach(e => e.classList.remove('pagination__item--active'));
      btn1Ref.textContent = Number(btn1Ref.textContent) - 5;
      btn2Ref.textContent = Number(btn2Ref.textContent) - 5;
      btn3Ref.textContent = Number(btn3Ref.textContent) - 5;
      btn4Ref.textContent = Number(btn4Ref.textContent) - 5;
      btn5Ref.textContent = Number(btn5Ref.textContent) - 5;
      btn5Ref.classList.add('pagination__item--active');
      currentPage = Number(btn5Ref.textContent);
    }

    if (event.target.classList.contains('firstPage')) {
      btns.forEach(e => e.classList.remove('pagination__item--active'));
      btn1Ref.textContent = 1;
      btn2Ref.textContent = 2;
      btn3Ref.textContent = 3;
      btn4Ref.textContent = 4;
      btn5Ref.textContent = 5;
      btn1Ref.classList.add('pagination__item--active');
      currentPage = Number(btn1Ref.textContent);
      leftArrowRef.hidden = true;
      leftDotsRef.hidden = true;
      firstPageRef.hidden = true;
    }

    if (event.target.classList.contains('lastPage')) {
      btns.forEach(e => e.classList.remove('pagination__item--active'));
      btn1Ref.textContent = Number(btn1Ref.textContent) - 4;
      btn2Ref.textContent = Number(btn2Ref.textContent) - 3;
      btn3Ref.textContent = Number(btn3Ref.textContent) - 2;
      btn4Ref.textContent = Number(btn4Ref.textContent) - 1;
      btn5Ref.textContent = lastPageRef.textContent;
      btn5Ref.classList.add('pagination__item--active');
      currentPage = Number(btn5Ref.textContent);
      rightArrowRef.hidden = true;
      rightDotsRef.hidden = true;
      lastPageRef.hidden = true;
    }

    if (currentPage > 5) {
      leftArrowRef.hidden = false;
      leftDotsRef.hidden = false;
      firstPageRef.hidden = false;
    } else {
      leftArrowRef.hidden = true;
      leftDotsRef.hidden = true;
      firstPageRef.hidde = true;
    }

    if (currentPage < 996) {
      rightArrowRef.hidden = false;
      rightDotsRef.hidden = false;
      lastPageRef.hidden = false;
    }

    // main.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    getPopularFilms(currentPage).tnen(data => console.log(data));

  //   if (requestAnimationFrame.serchForm.value !== '') {
  //     getPopularFilms(refs.searchForm.value, currentPage);
  //   } else {
  //     startPage();
  // }
  }
}




let pageSize = 9;

function defineResultPerPage() {
  if (window.innerWidth >= 1024) {
    pageSize = 9;
  } else if (window.innerWidth >=768 && window.innerWidth < 1024) {
    pageSize = 8;
  } else if (window.innerWidth < 768) {
    pageSize = 4;
  }
  return pageSize;
}

// startPage();

// async function getData() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await response.json();
//   return data;
// }

// async function main() {
//   const postsData = await getData();
//   let currentPage = 1;
//   let rows = 20;

//   function displayList(arrData, rowPerPage, page) {
//     const postsEl = document.querySelector('.posts');
//     postsEl.innerHTML = '';
//     page--;

//     const start = rowPerPage * page;
//     const end = start + rowPerPage;
//     const paginatedData = arrData.slice(start, end);

//     paginatedData.forEach(el => {
//       const postEl = document.createElement('div');
//       postEl.classList.add('post');
//       postEl.innerText = `${el.title}`;
//       postsEl.appendChild(postEl);
//     });
//   }

//   function displayPagination(arrData, rowPerPage) {
//     const paginationEl = document.querySelector('.pagination');
//     const pagesCount = Math.ceil(arrData.length / rowPerPage);
//     const ulEl = document.createElement('ul');
//     ulEl.classList.add('pagination__list');

//     for (let i = 0; i < pagesCount; i++) {
//       const liEl = displayPaginationBtn(i + 1);
//       ulEl.appendChild(liEl);
//     }
//     paginationEl.appendChild(ulEl);
//   }

//   function displayPaginationBtn(page) {
//     const liEl = document.createElement('li');
//     liEl.classList.add('pagination__item');
//     liEl.innerText = page;

//     if (currentPage == page) liEl.classList.add('pagination__item--active');

//     liEl.addEventListener('click', () => {
//       currentPage = page;
//       displayList(postsData, rows, currentPage);

//       let currentItemLi = document.querySelector('li.pagination__item--active');
//       currentItemLi.classList.remove('pagination__item--active');

//       liEl.classList.add('pagination__item--active');
//     });

//     return liEl;
//   }

//   displayList(postsData, rows, currentPage);
//   displayPagination(postsData, rows);
// }

// main();
