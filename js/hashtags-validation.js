'use strict';
(function () {
  window.getValidity = function (tagsValue) {
    if (tagsValue === '') {
      return '';
    }
    var tags = tagsValue.toLowerCase().trim().split(' ');
    if (tags.length > 5) {
      return 'Нельзя указывать более пяти хэш-тегов';
    }
    var buf = [];
    for (var i = 0; i < tags.length; i++) {
      if (tags[i][0] !== '#') {
        return 'Хэштеги начинаются с символа #';
      } else if (tags[i].length > 20) {
        return 'Максимальная длина одного хэш-тега 20 символов';
      } else if (buf.indexOf(tags[i]) > -1) {
        return 'Один и тот же хэш-тег не может быть использован дважды';
      }
      buf.push(tags[i]);
    }
    return '';
  };

  var hashtagsInput = document.querySelector('.upload-form-hashtags');
  hashtagsInput.addEventListener('input', function (evt) {
    evt.target.setCustomValidity(window.getValidity(evt.target.value));
  });
})();
