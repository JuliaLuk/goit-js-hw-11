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

    if (json.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      if (!input.target || !input.trim()) {
        console.log(input);
        Notiflix.Notify.failure('string is empty or only contains spaces');
      }
      total.classList.add('is-hidden');
      return;
    }

    let images = json.hits;
    let total = json.totalHits;
    return { images, total };
  } catch (error) {
    throw new Error(`HTTP error! status: ${error.response.status}`);
  }
}

// export function createCard(images) {
//   const markup = images
//     .map(
//       image => `<div class="photo-card">
//   <a href="${image.largeImageURL}" class="lightbox">

//   <img class="gallery_link" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width = "350px"/>
//   <div class="info">
//     <p class="info-item">
//       <b class="text">Likes: ${image.likes}</b>
//     </p>
//     <p class="info-item">
//       <b class="text">Views: ${image.views}</b>
//     </p>
//     <p class="info-item">
//       <b class="text">Comments: ${image.comments}</b>
//     </p>
//     <p class="info-item">
//       <b class="text">Downloads: ${image.downloads}</b>
//     </p>
//   </div></div>`
//     )
//     .join('');
//   gallery.insertAdjacentHTML('beforeend', markup);
//   lightbox.refresh();

//   if (images.length > 40 || images.length < 40) {
//     loadMore.style.display = 'none';
//   } else {
//     loadMore.style.display = 'block';
//   }
// }
