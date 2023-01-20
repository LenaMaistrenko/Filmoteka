import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const refs = {
  openModalBtn: document.querySelector('[data-open-modal]'),
  closeModalBtn: document.querySelector('[data-close-modal]'),
  backdrop: document.querySelector('[data-backdrop]'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  document.body.classList.toggle('data-open-modal');
  refs.backdrop.classList.toggle('is-hidden');
}
