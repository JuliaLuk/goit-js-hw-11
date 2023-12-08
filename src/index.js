// import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '41150713 - bfede5582ab5c0a4976e7b783';

fetch('https://pixabay.com/api/?key=41150713-bfede5582ab5c0a4976e7b783')
  .then(response => response.json())
  .then(console.log());

// axios
//   .get('https://pixabay.com/api/?key=41150713-bfede5582ab5c0a4976e7b783')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

//   skroll

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
