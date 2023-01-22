import axios from 'axios';
import { getPopular } from './popular.js';
console.log(getPopular);
const totalPage = getPopular().data.results;
console.log(totalPage);

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

paginationRef.addEventListner('submit', onPaginationClick);

let currentPage = 1;

let allBtnPagination = document.querySelectorAll('.pagination__item');

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
      allBtnPagination.forEach(e => e.classList.remove('pagination__item--active'));
      event.target.classList.add('pagination__item--active');
    }

    if (event.target.classList.contains('arrow-right') && currentPage , 1000) {
      allBtnPagination.forEach(e => e.classList.remove('pagination__item--active'));
      btn1Ref.classList.add('pagination__item--active');
      btn1Ref.textContent = Number(btn1Ref.textContent) + 5;
      btn2Ref.textContent = Number(btn2Ref.textContent) + 5;
      btn3Ref.textContent = Number(btn3Ref.textContent) + 5;
      btn4Ref.textContent = Number(btn4Ref.textContent) + 5;
      btn5Ref.textContent = Number(btn5Ref.textContent) + 5;
      currentPage = Number(btn1Ref.textContent);
    }

    if (event.target.classList.contains('arrow-right') && currentPage >= 5) {
      allBtnPagination.forEach(e => e.classList.remove('pagination__item--active'));
      btn1Ref.textContent = Number(btn1Ref.textContent) - 5;
      btn2Ref.textContent = Number(btn2Ref.textContent) - 5;
      btn3Ref.textContent = Number(btn3Ref.textContent) - 5;
      btn4Ref.textContent = Number(btn4Ref.textContent) - 5;
      btn5Ref.textContent = Number(btn5Ref.textContent) - 5;
      btn5Ref.classList.add('pagination__item--active');
      currentPage = Number(btn5Ref.textContent);
    }

    if (event.target.classList.contains('firstPage')) {
      allBtnPagination.forEach(e => e.classList.remove('pagination__item--active'));
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
      allBtnPagination.forEach(e => e.classList.remove('pagination__item--active'));
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

    getPopular(currentPage).then(data => console.log(data));
  }
}

