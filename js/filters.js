'use strict';
(function () {
  var filterBlockElement = document.querySelector('.filters');

  window.getSortedPictures = function (sortType) {
    var copyPhotos = window.photos.slice(0);
    switch (sortType) {
      case 'recommend':
        return copyPhotos;
      case 'popular':
        return copyPhotos.sort(function (a, b) {
          return b.likes - a.likes;
        });
      case 'discussed':
        return copyPhotos.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
      case 'random':
        return copyPhotos.sort(function () {
          return Math.sign(Math.random() - 0.5);
        });
      default: return copyPhotos;
    }
  };
  window.showFilters = function () {
    filterBlockElement.classList.remove('filters-inactive');
  };
  filterBlockElement.addEventListener('change', function (evt) {
    window.debounce(updatePictures(evt));
  });

  var updatePictures = function (evt) {
    return function () {
      window.picturesBlockElement.innerHTML = '';
      window.renderPics(window.getSortedPictures(evt.target.value));
    };
  };
})();
