import Notiflix from 'notiflix';
import { fetchImages } from '/src/js/pixabay';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const input = form.elements.searchQuery;

const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.js-load');
const total = document.querySelector('.total');

let currentPage = 1;
let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionDelay: 250,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
});

loadMore.style.display = 'none';

function createCard(images) {
  const markup = images
    .map(
      image => `<div class="photo-card" >
  <a href="${image.largeImageURL}" class="lightbox">

  <img class="gallery_link" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width = "350px"/>
  <div class="info">
    <p class="info-item">
      <b class="text">Likes: ${image.likes}</b>
    </p>
    <p class="info-item">
      <b class="text">Views: ${image.views}</b>
    </p>
    <p class="info-item">
      <b class="text">Comments: ${image.comments}</b>
    </p>
    <p class="info-item">
      <b class="text">Downloads: ${image.downloads}</b>
    </p>
  </div></div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();

  if (images.length < 40) {
    loadMore.style.display = 'none';
  } else {
    loadMore.style.display = 'block';
  }
}
// ------
loadMore.addEventListener('click', onLoad);
function onLoad() {
  currentPage += 1;
  console.log(currentPage);

  fetchImages(input.value, currentPage).then(data => {
    createCard(data.images);
    if (data.images.length < 40) {
      loadMore.style.display = 'none';
      Notiflix.Notify.failure(
        'Wea re sorry, but you have reached the end of search results.'
      );
    }
    let totalH = data.total;
    const lastPage = Math.ceil(totalH / 40);
    console.log(data);

    if (currentPage >= lastPage) {
      loadMore.style.display = 'none';
      Notiflix.Notify.failure(
        'Wea re sorry, but you have reached the end of search results.'
      );
    }
  });
}
// ------
// спроба переписати на async await

// loadMore.addEventListener('click', onLoad);
// currentPage += 1;
// console.log(currentPage);
// async function onLoad() {
//   try {
//     const response = await fetchImages(input.value, currentPage);

//     const proces = await createCard(response);
//     console.log(proces);

//     if (data.images.length < 40) {
//       loadMore.style.display = 'none';
//       Notiflix.Notify.failure(
//         'Wea re sorry, but you have reached the end of search results.'
//       );
//     }
//     // let totalH = json.totalHits;
//     // const lastPage = Math.ceil(totalH / 40);
//     // console.log(lastPage);

//     if (currentPage >= 13) {
//       loadMore.style.display = 'none';
//       Notiflix.Notify.failure(
//         'Wea re sorry, but you have reached the end of search results.'
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// lightbox.refresh();
// }

// ------

// ---------
form.addEventListener('submit', async event => {
  event.preventDefault();
  gallery.innerHTML = '';
  currentPage = 1;
  try {
    if (input.value.length === 0) {
      Notiflix.Notify.failure('You must enter a request.');
      loadMore.classList.add('is-hidden');
      total.classList.add('is-hidden');
      return;
    }

    loadMore.classList.remove('is-hidden');

    if (!input.value.trim()) {
      Notiflix.Notify.failure('string is empty or only contains spaces');
      loadMore.classList.add('is-hidden');
      return;
    }
    const result = await fetchImages(input.value, currentPage);

    Notiflix.Notify.success(
      `Hooray! We found total Hits images - ${result.total} pcs`
    );
    createCard(result.images);

    input.focus();
  } catch (error) {
    Notiflix.Notify.failure(
      'An error occurred while fetching images. Please try again.'
    );
  }
});
