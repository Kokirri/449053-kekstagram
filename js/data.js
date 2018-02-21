'use strict';
(function () {
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

  window.photos = getPhotos();
})();

