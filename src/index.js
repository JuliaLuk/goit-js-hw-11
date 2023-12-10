import Notiflix from 'notiflix';
import { fetchImages } from '/src/js/pixabay';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

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
      image => `<div class="photo-card">
  <a href="${image.largeImageURL}" class="lightbox">

  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width = "350px"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${image.downloads}
    </p>
  </div></div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();

  if (images.length > 40 || images.length < 40) {
    loadMore.style.display = 'none';
  } else {
    loadMore.style.display = 'block';
  }
}

loadMore.addEventListener('click', onLoad);

function onLoad() {
  return (currentPage += 1);
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  gallery.innerHTML = '';

  try {
    if (input.value.length === 0) {
      Notiflix.Notify.failure('You must enter a request.');
      return;
    }
    const result = await fetchImages(input.value, currentPage);

    total.textContent = `Hooray! We found totalHits images - ${result.total} pcs`;
    createCard(result.images);

    input.focus();
  } catch (error) {
    Notiflix.Notify.failure(
      'An error occurred while fetching images. Please try again.'
    );
  }
});
