(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('categories', {
      templateUrl: 'categories/categories.component.html',
      bindings: {
        categories: '<'
      }
    });
    
})();
    