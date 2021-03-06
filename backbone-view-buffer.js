/*globals define:false */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.ViewBuffer = factory();
  }
}(this, function () {
  var ViewBuffer = {
    setView: function ($el, viewInstance) {
      var self = this, selector;
      if (!$el.data('viewId')) {
        $el.data('viewId', (Math.random() * 10000) + (new Date().getTime()));
      }
      selector = $el.data('viewId');
      this._buffers = this._buffers || {};
      viewInstance.transitionIn = viewInstance.transitionIn || ViewBuffer.transitionIn;
      viewInstance.transitionOut = viewInstance.transitionOut || ViewBuffer.transitionOut;
      function into() {
        self._buffers[selector] = viewInstance;
        viewInstance.transitionIn.call(viewInstance, $el);
      }
      if ($el.length) {
        if (this._buffers[selector]) {
          this._buffers[selector].transitionOut.call(this._buffers[selector], into);
        } else {
          into(viewInstance);
        }
      }
    },
    transitionIn: function ($el, callback) {
      $el.empty().append(this.$el);
      if (callback) {
        callback();
      }
      this.trigger('dom:init');
    },
    transitionOut: function (callback) {
      this.remove();
      if (callback) {
        callback();
      }
    }
  };
  return ViewBuffer;
}));
