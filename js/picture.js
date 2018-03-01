'use strict';
(function () {
  window.getPicture = function (picture) {
    var pictureTemplateElement = document.querySelector('#picture-template').content.querySelector('.picture');
    var newPictureElement = pictureTemplateElement.cloneNode(true);
    newPictureElement.querySelector('img').src = picture.url;
    newPictureElement.querySelector('.picture-likes').textContent = picture.likes;
    newPictureElement.querySelector('.picture-comments').textContent = picture.comments.length;

    return newPictureElement;
  };
})();
