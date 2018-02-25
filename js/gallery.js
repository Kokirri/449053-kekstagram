'use strict';
(function () {
  var picturesBlock = document.querySelector('.pictures');

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

  var renderPics = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var pic = window.getPicture(photos[i]);
      pic.addEventListener('click', pictureClickHandler(i));
      fragment.appendChild(pic);
    }
    picturesBlock.appendChild(fragment);
  };
  window.load(renderPics, window.showError);
})();
