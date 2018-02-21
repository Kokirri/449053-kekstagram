'use strict';
(function () {
  var galleryClose = document.querySelector('.gallery-overlay-close');
  galleryClose.addEventListener('click', function () {
    window.galleryOverlay.classList.add('hidden');
  });
  var uploadOverlayElement = document.querySelector('.upload-overlay');
  var uploadFileElement = document.querySelector('#upload-file');
  uploadFileElement.addEventListener('change', function () {
    uploadOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', window.escKeydownHandler);
  });
  window.resetUploadOverlay = function () {
    uploadOverlayElement.classList.add('hidden');
    uploadFileElement.value = '';
    window.effectImagePreviewElement.style.transform = '';
  };

  window.escKeydownHandler = function (evt) {
    if (evt.keyCode === 27) {
      window.resetUploadOverlay();
      document.removeEventListener('keydown', window.escKeydownHandler);
    }
  };
  var uploadFormCancelElement = document.querySelector('.upload-form-cancel');
  uploadFormCancelElement.addEventListener('click', window.resetUploadOverlay);
})();
