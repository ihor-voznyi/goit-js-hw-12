import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import iziToast from 'izitoast';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const imageGallery = document.querySelector('.gallery');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

const showLoader = () => {
    loader.classList.remove('hidden');
};

const hideLoader = () => {
    loader.classList.add('hidden');
};

const onSearchForm = (event) => {
    event.preventDefault();
    currentQuery = searchForm.elements.user_query.value.trim();
    if (!currentQuery) {
        return;
    }
    currentPage = 1;
    searchImages(currentQuery, currentPage);
};

const searchImages = async (query, page) => {
    showLoader();
    try {
        const data = await fetchImages(query, page);
        totalHits = data.totalHits;

        if (totalHits === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight',
            });
            loadMoreBtn.classList.add('hidden');
            imageGallery.innerHTML = "";
            return;
        }

        if (page === 1) {
            renderGallery(data.hits, true);
        } else {
            renderGallery(data.hits, false);
            smoothScroll();
        }
        searchForm.reset();
        updateLoadMoreButton();
    } catch (error) {
        console.error('Error fetching images:', error);
        iziToast.error({
            message: "Something went wrong. Please try again later.",
            position: 'topRight'
        });
    } finally {
        hideLoader();
    }
};

const updateLoadMoreButton = () => {
    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage >= totalPages) {
        loadMoreBtn.classList.add('hidden');
        iziToast.info({
            message: "We’re sorry, but you’ve reached the end of search results.",
            position: 'topRight'
        });
    } else {
        loadMoreBtn.classList.remove('hidden');
    }
};

const loadMoreImages = () => {
    currentPage++;
    searchImages(currentQuery, currentPage);
};

const smoothScroll = () => {
    const { height: cardHeight } = imageGallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
};

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', loadMoreImages);
loadMoreBtn.classList.add('hidden');