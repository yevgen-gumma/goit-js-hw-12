import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const KEY = '42324270-89622daef349524aeb531ebd1';
const BASE_URL = 'https://pixabay.com/api/';
const otherParams =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=15';

export async function fetchImages(query, page, iziToast) {
  const LINK = `${BASE_URL}?key=${KEY}&q=${query}&${otherParams}&page=${page}`;

  try {
    const response = await axios.get(LINK);
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Error while fetching images',
      position: 'topRight',
      timeout: 2500,
    });
  }
}
