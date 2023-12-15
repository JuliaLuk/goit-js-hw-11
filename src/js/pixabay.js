import axios from 'axios';
import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41150713-bfede5582ab5c0a4976e7b783';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export async function fetchImages(query, page = 1) {
  try {
    const response = await api.get('', {
      params: {
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 40,
        safesearch: true,
        page: page,
      },
    });

    const json = response.data;

    if (json.hits.length === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      total.classList.add('is-hidden');
      return;
    }

    let images = json.hits;
    // console.log(images.length);
    let total = json.totalHits;
    // console.log(total);

    return { images, total };
  } catch (error) {
    throw new Error(`HTTP error! status: ${error.response.status}`);
  }
}
