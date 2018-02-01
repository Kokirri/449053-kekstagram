var photos = [];
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomComments = function () {
  var commentsCopy = comments.concat([]);
  var index = getRandomNumber(0, commentsCopy.length);
  var firstComment = commentsCopy.splice(index, 1);
  var secondIndex = getRandomNumber(0, commentsCopy.length);
  var secondComment = commentsCopy.splice(secondIndex, 1);
  return [firstComment, secondComment];
};

var getPhotos = function () {
  for (var i = 1; i < 26; i++) {
    var pic =
      {
        url: 'photos/' + [i] + '.jpg',
        likes: getRandomNumber(25, 201),
        comments: getRandomComments()
      };
    photos.push(pic);
  }
};
getPhotos();
console.log(photos);
