import axios from 'axios';
import { getPopular } from './popular.js';
console.log(getPopular);
// const totalPage = getPopular().data.results;
// console.log(totalPage);

// функционал кнопок пагинации

const btn1Ref = document.querySelector('[data-index="1"]');
const btn2Ref = document.querySelector('[data-index="2"]');
const btn3Ref = document.querySelector('[data-index="3"]');
const btn4Ref = document.querySelector('[data-index="4"]');
const btn5Ref = document.querySelector('[data-index="5"]');
const firstPageRef = document.querySelector('.firstPage');
const lastPageRef = document.querySelector('.lastPage');
const containerRef = document.querySelector('.pagination-container');

const leftArrowRef = document.querySelector('.arrow-left');
const rightArrowRef = document.querySelector('.arrow-right');
const leftDotsRef = document.querySelector('.dotsLeft');
const rightDotsRef = document.querySelector('.dotsRight');

let currentPage = 1;
// totalPage надо получить из запроса на сервер!!!!!!!
let totalPage = 1000;

lastPageRef.textContent = totalPage;

containerRef.addEventListener ('click', onPaginationClick);

let allBtnPagination = document.querySelectorAll('.pagination__item');

leftDotsRef.disabled = true;
console.log(leftDotsRef.disabled);
leftArrowRef.disabled = true;
firstPageRef.disabled = true;

function onPaginationClick (event) {
  if (event.target.tagName === "BUTTON") {
    if (Number(event.target.textContent)) {
      currentPage = Number(event.target.textContent);
    }

    leftDotsRef.disabled = true;
    rightDotsRef.disabled = true;

    if (event.target.classList.contains('pagination__item')) {
      allBtnPagination.forEach(e => e.classList.remove('pagination__item--active'));
      event.target.classList.add('pagination__item--active');
    }

    if (event.target.classList.contains('arrow-right') && currentPage < totalPage) {
      allBtnPagination.forEach(e => e.classList.remove('pagination__item--active'));
      btn1Ref.classList.add('pagination__item--active');
      btn1Ref.textContent = Number(btn1Ref.textContent) + 5;
      btn2Ref.textContent = Number(btn2Ref.textContent) + 5;
      btn3Ref.textContent = Number(btn3Ref.textContent) + 5;
      btn4Ref.textContent = Number(btn4Ref.textContent) + 5;
      btn5Ref.textContent = Number(btn5Ref.textContent) + 5;
      currentPage = Number(btn1Ref.textContent);
      console.log(currentPage);
    }

    if (event.target.classList.contains('arrow-left') && currentPage >= 5) {
      allBtnPagination.forEach(e => e.classList.remove('pagination__item--active'));
      btn1Ref.textContent = Number(btn1Ref.textContent) - 5;
      btn2Ref.textContent = Number(btn2Ref.textContent) - 5;
      btn3Ref.textContent = Number(btn3Ref.textContent) - 5;
      btn4Ref.textContent = Number(btn4Ref.textContent) - 5;
      btn5Ref.textContent = Number(btn5Ref.textContent) - 5;
      btn5Ref.classList.add('pagination__item--active');
      currentPage = Number(btn5Ref.textContent);
      console.log(currentPage);
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
      leftArrowRef.disabled = true;
      leftDotsRef.disabled = true;
      firstPageRef.disabled = true;
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
      rightArrowRef.disabled = true;
      rightDotsRef.disabled = true;
      lastPageRef.disabled = true;
    }

    if (currentPage > 5) {
      leftArrowRef.disabled = false;
      leftDotsRef.disabled = false;
      firstPageRef.disabled = false;
    } else {
      leftArrowRef.disabled = true;
      leftDotsRef.disabled = true;
      firstPageRef.disabled = true;
    }

    if (currentPage < (totalPage-4)) {
      rightArrowRef.disabled = false;
      rightDotsRef.disabled = false;
      lastPageRef.disabled = false;
    }

    // getPopular(currentPage).then(data => console.log(data));
  }
}

