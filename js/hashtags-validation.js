'use strict';

(function () {
  var hashtagsInput = document.querySelector('.upload-form-hashtags');
  hashtagsInput.addEventListener('input', function (evt) {
    evt.target.setCustomValidity(window.getValidity(evt.target.value));
  });
})();
