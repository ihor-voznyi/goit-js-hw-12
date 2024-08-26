import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';

const imageGallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    overlayOpacity: 0.8,
});

export const createGalleryCard = (pictureInfo) => {
    return `<li class="gallery-item">
            <a class="gallery-link" href="${pictureInfo.largeImageURL}">
                <img
                class="gallery-image"
                src="${pictureInfo.webformatURL}"
                data-source="${pictureInfo.largeImageURL}"
                alt="${pictureInfo.tags}"
                />
            </a>
            <div class="info">
                <p class="text-info">Likes: <span class="number-info">${pictureInfo.likes}</span></p>
                <p class="text-info">Views: <span class="number-info">${pictureInfo.views}</span></p>
                <p class="text-info">Comments: <span class="number-info">${pictureInfo.comments}</span></p>
                <p class="text-info">Downloads: <span class="number-info">${pictureInfo.downloads}</span></p>
            </div>
        </li>`;
};

export const renderGallery = async (images, reset = false) => {
    if (reset) {
        imageGallery.innerHTML = "";
    }

    if (images.length === 0) {
        iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight',
        });
        return;
    }

    const galleryCardsTemplate = images.map(createGalleryCard).join('');
    imageGallery.insertAdjacentHTML('beforeend', galleryCardsTemplate);

    lightbox.refresh();
};