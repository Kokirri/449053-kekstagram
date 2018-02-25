'use strict';
(function () {
  var MIN_X = 0;
  var MAX_X = 450;
  var currentEffect = 'none';
  var effectValue = 1;
  var effectImagePreviewElement = document.querySelector('.effect-image-preview');
  var resizeValueElement = document.querySelector('.upload-resize-controls-value');
  var resizeElement = document.querySelector('.upload-resize-controls');
  var uploadOverlayElement = document.querySelector('.upload-overlay');
  var uploadFileElement = document.querySelector('#upload-file');
  var uploadFormElement = document.querySelector('.upload-form');

  var uploadFormCancelElement = document.querySelector('.upload-form-cancel');

  var closeUploadOverlay = function () {
    uploadOverlayElement.classList.add('hidden');
    uploadFileElement.value = '';
    effectImagePreviewElement.style.transform = '';
  };

  uploadFormCancelElement.addEventListener('click', closeUploadOverlay);

  var escKeydownHandler = function (evt) {
    if (evt.keyCode === window.consts.ESC_KEYCODE) {
      closeUploadOverlay();
      document.removeEventListener('keydown', escKeydownHandler);
    }
  };

  uploadFileElement.addEventListener('change', function () {
    uploadOverlayElement.classList.remove('hidden');
    document.addEventListener('keydown', escKeydownHandler);
  });

  resizeElement.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('upload-resize-controls-value')) {
      return;
    }
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

  var effectControlsElement = document.querySelector('.upload-effect-controls');
  effectControlsElement.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target.name === 'effect') {
      currentEffect = target.value;
      effectImagePreviewElement.className = 'effect-image-preview';
      effectImagePreviewElement.classList.add('effect-' + currentEffect);
      if (currentEffect === 'none') {
        effectLevelElement.classList.add('hidden');
        effectImagePreviewElement.style.filter = '';
      } else {
        effectLevelElement.classList.remove('hidden');
        effectImagePreviewElement.style.filter = getEffectStyle(currentEffect, effectValue);
      }
    }
  });

  var getEffectStyle = function (effect, value) {
    switch (effect) {
      case 'chrome': return 'grayscale(' + value + ')';
      case 'sepia': return 'sepia(' + value + ')';
      case 'marvin': return 'invert(' + value * 100 + '%)';
      case 'phobos': return 'blur(' + value * 3 + 'px)';
      case 'heat': return 'brightness(' + value * 3 + ')';
      default: return '';
    }
  };

  var effectLevelElement = document.querySelector('.upload-effect-level');
  var levelPinElement = document.querySelector('.upload-effect-level-pin');
  var levelValElement = document.querySelector('.upload-effect-level-val');
  levelPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var currentPosition = levelPinElement.offsetLeft - shift.x;
      effectValue = currentPosition / MAX_X;

      if (currentPosition >= MIN_X && currentPosition <= MAX_X) {
        effectImagePreviewElement.style.filter = getEffectStyle(currentEffect, effectValue);
        levelPinElement.style.left = currentPosition + 'px';
        levelValElement.style.width = effectValue * 100 + '%';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var successHandler = function () {
    closeUploadOverlay();
  };
  var errorHandler = function (msg) {
    window.showError(msg);
  };

  uploadFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(uploadFormElement), successHandler, errorHandler);
  });
})();
