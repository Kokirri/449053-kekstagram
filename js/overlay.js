'use strict';
(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  window.fillGallery = function (picture) {
    galleryOverlay.classList.remove('hidden');
    galleryOverlay.querySelector('img.gallery-overlay-image').src = picture.url;
    galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
    galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;
  };

  var galleryClose = document.querySelector('.gallery-overlay-close');

  window.closeGalleryOverlay = function () {
    galleryOverlay.classList.add('hidden');
  };

  galleryClose.addEventListener('click', window.closeGalleryOverlay);
  galleryClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.consts.ENTER_KEYCODE) {
      window.closeGalleryOverlay();
    }
  });
})();
