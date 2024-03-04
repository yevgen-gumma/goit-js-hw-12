import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { render } from './render-functions';

const searchInput = document.querySelector('.searchInput');
const loader = document.querySelector('.loader');
const container = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page = 1;
let totalHits = 0;

const KEY = '42324270-89622daef349524aeb531ebd1';
const BASE_URL = 'https://pixabay.com/api/';
const otherParams =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=15';

export async function getImages() {
  page = 1;

  const query = searchInput.value.trim();
  const LINK = `${BASE_URL}?key=${KEY}&q=${query}&${otherParams}`;

  loader.classList.remove('hidden');
  container.innerHTML = '';

  try {
    const response = await axios.get(LINK);
    const data = response.data;

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
}

export async function loadMoreImages() {
  page += 1;

  const query = searchInput.value.trim();
  const LINK = `${BASE_URL}?key=${KEY}&q=${query}&${otherParams}&page=${page}`;

  let data;

  try {
    const response = await axios.get(LINK);
    data = response.data;
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
}

function smoothScrollToGallery() {
  const cardHeight = container.firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
