'use strict';

(function () {
  window.effectImagePreviewElement = document.querySelector('.effect-image-preview');
  window.uploadFileElement = document.querySelector('#upload-file');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.uploadFileElement.addEventListener('change', function () {
    var file = window.uploadFileElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.effectImagePreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
