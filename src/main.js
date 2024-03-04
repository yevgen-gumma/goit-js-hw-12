import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import { render } from './js/render-functions';

const submitForm = document.querySelector('.submitForm');
const searchInput = document.querySelector('.searchInput');
const loadMoreBtn = document.querySelector('.loadMoreBtn');
const loader = document.querySelector('.loader');
const container = document.querySelector('.gallery');

let page = 1;

submitForm.addEventListener('submit', async event => {
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

  try {
    loader.classList.remove('hidden');
    container.innerHTML = '';
    page = 1;

    const data = await fetchImages(query, page, iziToast);

    if (data.hits.length === 0) {
      loadMoreBtn.classList.add('hidden');
      iziToast.show({
        position: 'topRight',
        timeout: 3500,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        close: false,
        messageColor: 'white',
        backgroundColor: 'green',
      });
    } else {
      render(data.hits);
      if (data.hits.length >= 15) {
        loadMoreBtn.classList.remove('hidden');
      } else {
        loadMoreBtn.classList.add('hidden');
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Error while rendering images',
      position: 'topRight',
      timeout: 2500,
    });
  } finally {
    loader.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  loadMoreBtn.classList.remove('hidden');

  let data;
  let totalHits;

  page += 1;

  const query = searchInput.value.trim();

  try {
    data = await fetchImages(query, page, iziToast);

    totalHits = data.totalHits;

    render(data.hits);

    smoothScrollToGallery();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Error while rendering images',
      position: 'topRight',
      timeout: 2500,
    });
  } finally {
    if (data && page * 15 >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');

      iziToast.show({
        position: 'topRight',
        timeout: 3500,
        message: "We're sorry, but you've reached the end of search results.",
        close: false,
        messageColor: 'white',
        backgroundColor: 'green',
      });
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  }
});

function smoothScrollToGallery() {
  const cardHeight = container.firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
