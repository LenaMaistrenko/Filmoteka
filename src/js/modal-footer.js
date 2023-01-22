'use strict';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const openModal = document.querySelector('[data-open-modal]');
const closeModal = document.querySelector('[data-close-modal]');
const modalFooterBackdrop = document.querySelector('[data-backdrop]');

openModal.addEventListener('click', onOpenModal);

async function onOpenModal() {
  modalFooterBackdrop.classList.remove('is-hidden');
  window.addEventListener('click', closeModalbyBackdrop);
  closeModal.addEventListener('click', closeModalbyCross);
  console.log('Help');
}

function closeModalbyCross() {
  modalFooterBackdrop.classList.add('is-hidden');
  clearBackdropListeners();
}

function onKeyClick(event) {
  if (event.code !== 'Escape') {
    return;
  }
  modalFooterBackdrop.classList.add('is-hidden');
  clearBackdropListeners();
}

function closeModalbyBackdrop(event) {
  if (event.target === modalFooterBackdrop) {
    modalFooterBackdrop.classList.add('is-hidden');
    clearBackdropListeners();
  }
}

function clearBackdropListeners() {
  window.removeEventListener('keydown', onKeyClick);
  window.removeEventListener('click', closeModalbyBackdrop);
  closeModal.removeEventListener('click', closeModalbyCross);
}

// console.log(openModal);
// openModal.addEventListener('click', onOpenModal);
// closeModal.addEventListener('click', onCloseModal);

// function onOpenModal() {
//   modalFooterBackdrop.classList.remove('is-hidden');
// }

// function onCloseModal() {
//   modalFooterBackdrop.classList.add('is-hidden');
// }
