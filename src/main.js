import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImages, loadMoreImages } from './js/pixabay-api';

const submitForm = document.querySelector('.submitForm');
const searchInput = document.querySelector('.searchInput');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

submitForm.addEventListener('submit', event => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === '') {
    iziToast.show({
      position: 'topRight',
      timeout: 2000,
      message: 'Please, enter the word!',
      close: false,
      messageColor: 'white',
      backgroundColor: 'grey',
    });
    return;
  }

  getImages();
});

loadMoreBtn.addEventListener('click', () => {
  loadMoreBtn.classList.remove('hidden');
  loadMoreImages();
});
