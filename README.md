### Backbone View Buffer

Provides standard interface for swapping out views
in a container.


#### Usage

````javascript
var container = $('div').appendTo(document.body);
var view1 = new BackboneView();
var view2 = new BackboneView();
ViewBuffer.setView(container, view1);
````

On a view instance, transitionIn and transitionOut
methods may be defined to perform animated transitions
between views.  Basic implementations of transitionIn
and transitionOut are provided by default. (shown below)

````javascript
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
````
