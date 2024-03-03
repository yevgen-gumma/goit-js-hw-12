import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function render(data) {
  const container = document.querySelector('.gallery');

  function imageTemplate(image) {
    const webformatURL = image.webformatURL;
    const largeImageURL = image.largeImageURL;
    const tags = image.tags;
    const likes = image.likes;
    const views = image.views;
    const comments = image.comments;
    const downloads = image.downloads;

    return `<div class="card">
            <a href='${largeImageURL}' class="large-image-link">
              <img class="image" src='${webformatURL}' alt="${tags}">
              <div class="info">
                <p class="info-item"><span class="info-header">Likes</span><br>${likes}</p>
                <p class="info-item"><span class="info-header">Views</span><br>${views}</p>
                <p class="info-item"><span class="info-header">Comments</span><br>${comments}</p>
                <p class="info-item"><span class="info-header">Downloads</span><br>${downloads}</p>
              </div>
            </a>
          </div>`;
  }

  data.forEach(image => {
    const markup = imageTemplate(image);
    container.insertAdjacentHTML('beforeend', markup);
  });

  const gallery = new SimpleLightbox('.large-image-link');
  gallery.refresh();
}
