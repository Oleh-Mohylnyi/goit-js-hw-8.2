import { galleryItems } from "./galleryitems";
import { refs } from "./refs";
console.log(refs);

let activeIndex = null;

function createGalleryCards(items) {
    return items.map(({preview, original, description}) => {
        return `<li class="gallery__item">
      <a
        class="gallery__link"
      >
        <img
          class="gallery__image"
          src=${preview}
          data-source=${original}
          alt=${description}
        />
      </a>
    </li>`
} )
};

refs.galleryList.innerHTML = createGalleryCards(galleryItems).join('');

refs.galleryList.addEventListener('click', modalOpen);

function modalOpen(e) {
    e.preventDefault()
    if (!e.target.classList.contains('gallery__image')) {
        return;
    }
    refs.lightBox.classList.add('is-open');
    refs.lightboxImage.src = e.target.dataset.source;
    window.addEventListener(`keydown`, closeByEscape);
    window.addEventListener(`keydown`, changeByArrows);
    
    createGalleryCards(galleryItems).forEach((elm, ind) => {
        if (elm.includes(e.target.src)) {
            activeIndex = ind;
        }
    });

    refs.lightBox.addEventListener('click', closeModal);

    function closeModal(e) {
        if (e?.target.nodeName === 'IMG') { return; }
        refs.lightboxImage.src = '';
        refs.lightBox.classList.remove('is-open');
        window.removeEventListener(`keydown`, closeByEscape);

    }


    function closeByEscape(e) {
        if (e.key !== 'Escape') {
            return;
        }
        closeModal();
    }

    function changeByArrows(e) {
        if (e.key === 'ArrowRight' && activeIndex < galleryItems.length - 1) {
            activeIndex += 1;
            refs.lightboxImage.src = galleryItems[activeIndex].original;
            return;
        }
        if (e.key === 'ArrowLeft' && activeIndex > 0) {
            activeIndex -= 1;
            refs.lightboxImage.src = galleryItems[activeIndex].original;
            return;
        }
        if (e.key === 'ArrowRight' && activeIndex === galleryItems.length - 1) {
            activeIndex = 0;
            refs.lightboxImage.src = galleryItems[activeIndex].original;
            return;
        }
        if (e.key === 'ArrowLeft' && activeIndex === 0) {
            activeIndex = galleryItems.length - 1;
            refs.lightboxImage.src = galleryItems[activeIndex].original;
            return;
        }
    }
}

//     function keyboardManipulation({ key }) {
//   switch (key) {
//     case gallery.length - 1 > activeIndex && "ArrowRight":
//       activeIndex += 1;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case activeIndex > 0 && "ArrowLeft":
//       activeIndex -= 1;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case activeIndex === gallery.length - 1 && "ArrowRight":
//       activeIndex = 0;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case activeIndex === 0 && "ArrowLeft":
//       activeIndex = gallery.length - 1;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case "Escape":
//       closeModal();
//       break;
//     default:
//       alert("что-то пошло не так");
//   }
