'use strict';
(function () {
  window.getPicture = function (picture) {
    var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
    var newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src = picture.url;
    newPicture.querySelector('.picture-likes').textContent = picture.likes;
    newPicture.querySelector('.picture-comments').textContent = picture.comments.length;

    return newPicture;
  };
})();
