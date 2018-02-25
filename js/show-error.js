'use strict';
(function () {
  var errorElement = document.querySelector('#error-template').content.querySelector('.error').cloneNode(true);
  var errorCloseElement = errorElement.querySelector('.error-close');
  errorCloseElement.addEventListener('click', function () {
    document.body.removeChild(errorElement);
  });

  window.showError = function (msg) {
    errorElement.querySelector('.error-msg').textContent = msg;
    document.body.appendChild(errorElement);
  };
})();
