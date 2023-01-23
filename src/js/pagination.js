import axios from 'axios';
import { getPopular } from './popular.js';
import { getByName } from './search';

import { renderMarkup } from './popular.js';
let functionKeyNumber = '';
const paginationBox = document.querySelector('.pagination-container');
console.log('paginationBox', paginationBox);
let globalCurrentpage = 0;
export function pagination(currentPage, allPages, key) {
  let markup = '';
  let beforeTwoPage = currentPage - 2;
  let beforePage = currentPage - 1;
  let afterPage = currentPage + 1;
  let afterTwoPage = currentPage + 2;
  functionKeyNumber = key;
  globalCurrentpage = currentPage;
  if (currentPage > 1) {
    markup += `<li>&#129144;</li>`;
    markup += `<li>1</li>`;
  }
  if (currentPage > 4) {
    markup += `<li>...</li>`;
  }
  if (currentPage > 3) {
    markup += `<li>${beforeTwoPage}</li>`;
  }
  if (currentPage > 2) {
    markup += `<li>${beforePage}</li>`;
  }
  markup += `<li><b>${currentPage}</b></li>`;
  if (allPages - 1 > currentPage) {
    markup += `<li>${afterPage}</li>`;
  }
  if (allPages - 2 > currentPage) {
    markup += `<li>${afterTwoPage}</li>`;
  }
  if (allPages - 3 > currentPage) {
    markup += `<li>...</li>`;
  }
  if (allPages > currentPage) {
    markup += `<li>${allPages}</li>`;
    markup += `<li>&#129146;<li>`;
  }

  paginationBox.innerHTML = markup;
}
paginationBox.addEventListener('click', handlerPagination);
function handlerPagination(evt) {
  if (evt.target.nodeName !== 'LI') {
    return;
  }
  if (evt.target.textContent === '...') {
    return;
  }
  if (evt.target.textContent === '🡸') {
    getPopular((globalCurrentpage -= 1)).then(
      ({ results, page, total_pages }) => {
        renderMarkup(results);
        pagination(page, total_pages);
      }
    );
    return;
  }
  if (evt.target.textContent === '🡺') {
    getPopular((globalCurrentpage += 1)).then(
      ({ results, page, total_pages }) => {
        renderMarkup(results);
        pagination(page, total_pages);
      }
    );
    return;
  }
  //
  const page = evt.target.textContent;
  console.log(page);
  getPopular(page).then(({ results, page, total_pages }) => {
    renderMarkup(results);
    pagination(page, total_pages);
  });
}
