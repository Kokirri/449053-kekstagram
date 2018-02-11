'use strict';
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getPhotos = function () {
  var photos = [];
  for (var i = 0; i < 25; i++) {
    photos.push({
      url: 'photos/' + [i + 1] + '.jpg',
      likes: getRandomNumber(25, 201),
      comments: getRandomComments()
    });
  }
  return photos;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomComments = function () {
  var result = [];
  var commentsCopy = comments.concat([]);
  var index = getRandomNumber(0, commentsCopy.length);
  result.push(commentsCopy.splice(index, 1));
  index = getRandomNumber(0, commentsCopy.length);
  result.push(commentsCopy.splice(index, 1));
  return result;
};

var photos = getPhotos();


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
  for (var i = 0; i < photos.length; i++) {
    var pic = getPicture(photos[i]);
    pic.addEventListener('click', onPictureClick(i));
    fragment.appendChild(pic);
  }
  picturesBlock.appendChild(fragment);
};

var onPictureClick = function (i) {
  return function (evt) {
    evt.preventDefault();
    fillGallery(photos[i]);
  };
};

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryClose = document.querySelector('.gallery-overlay-close');
galleryClose.addEventListener('click', function () {
  galleryOverlay.classList.add('hidden');
});


var fillGallery = function (picture) {
  galleryOverlay.classList.remove('hidden');
  galleryOverlay.querySelector('img.gallery-overlay-image').src = picture.url;
  galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
  galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;
};

renderPics();

var uploadOverlayElement = document.querySelector('.upload-overlay');
var uploadFileElement = document.querySelector('#upload-file');
uploadFileElement.addEventListener('change', function () {
  uploadOverlayElement.classList.remove('hidden');
});
var uploadFormCancelElement = document.querySelector('.upload-form-cancel');
uploadFormCancelElement.addEventListener('click', function () {
  uploadOverlayElement.classList.add('hidden');
  uploadFileElement.value = '';
});
var effectImagePreviewElement = document.querySelector('.effect-image-preview');
var resizeValueElement = document.querySelector('.upload-resize-controls-value');
var resizeElement = document.querySelector('.upload-resize-controls');
resizeElement.addEventListener('click', function (evt) {
  var vector = 1;
  var step = 25;
  var inputSize = parseInt(resizeValueElement.value, 10);
  if (evt.target.classList.contains('upload-resize-controls-button-dec')) {
    vector = -1;
  }
  var value = inputSize + vector * step;
  if (value >= 25 && value <= 100) {
    effectImagePreviewElement.style.transform = 'scale(' + (value / 100) + ')';
    resizeValueElement.value = value + '%';
  }
});

/*var levelPinElement = document.querySelector('.upload-effect-level-pin');
levelPinElement.addEventListener('mouseup', function () {

});*/

var effectControlsElement = document.querySelector('.upload-effect-controls');
effectControlsElement.addEventListener('change', function (evt) {
  var target = evt.target;
  if (target.name === 'effect') {
    effectImagePreviewElement.className = 'effect-image-preview';
    effectImagePreviewElement.classList.add('effect-' + target.value);
  }
});


