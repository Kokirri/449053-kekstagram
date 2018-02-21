'use strict';
(function () {
  var getPicture = function (picture) {
    var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
    var newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src = picture.url;
    newPicture.querySelector('.picture-likes').textContent = picture.likes;
    newPicture.querySelector('.picture-comments').textContent = picture.comments.length;

    return newPicture;
  };

  var picturesBlock = document.querySelector('.pictures');

  var renderPics = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.photos.length; i++) {
      var pic = getPicture(window.photos[i]);
      pic.addEventListener('click', onPictureClick(i));
      fragment.appendChild(pic);
    }
    picturesBlock.appendChild(fragment);
  };

  var onPictureClick = function (i) {
    return function (evt) {
      evt.preventDefault();
      fillGallery(window.photos[i]);
    };
  };
  window.galleryOverlay = document.querySelector('.gallery-overlay');
  var fillGallery = function (picture) {
    window.galleryOverlay.classList.remove('hidden');
    window.galleryOverlay.querySelector('img.gallery-overlay-image').src = picture.url;
    window.galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
    window.galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;
  };
  renderPics();
})();
