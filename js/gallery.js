'use strict';
(function () {
  window.picturesBlockElement = document.querySelector('.pictures');

  var keydownHandler = function (evt) {
    if (evt.keyCode === window.consts.ESC_KEYCODE) {
      window.closeGalleryOverlay();
      document.removeEventListener('keydown', keydownHandler);
    }
  };
  var pictureClickHandler = function (i) {
    return function (evt) {
      evt.preventDefault();
      document.addEventListener('keydown', keydownHandler);
      window.fillGallery(window.photos[i]);
    };
  };

  window.renderPics = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var pic = window.getPicture(photos[i]);
      pic.addEventListener('click', pictureClickHandler(i));
      fragment.appendChild(pic);
    }
    window.picturesBlockElement.appendChild(fragment);
  };
  var successHandler = function (photos) {
    window.photos = photos;
    window.renderPics(photos);
    window.showFilters();
  };
  window.load(successHandler, window.showError);
})();
