'use strict';

(function () {
  window.effectImagePreviewElement = document.querySelector('.effect-image-preview');
  var resizeValueElement = document.querySelector('.upload-resize-controls-value');
  var resizeElement = document.querySelector('.upload-resize-controls');
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
      window.effectImagePreviewElement.style.transform = 'scale(' + (value / 100) + ')';
      resizeValueElement.value = value + '%';
    }
  });
  /* var levelPinElement = document.querySelector('.upload-effect-level-pin');
  levelPinElement.addEventListener('mouseup', function () {
}); */

  var effectControlsElement = document.querySelector('.upload-effect-controls');
  effectControlsElement.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target.name === 'effect') {
      window.effectImagePreviewElement.className = 'effect-image-preview';
      window.effectImagePreviewElement.classList.add('effect-' + target.value);
    }
  });
})();
