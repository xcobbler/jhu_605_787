(function () {
'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
    
      // Set up UI states
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'home.html'
        })
        .state('categories', {
          url: '/categories',
          templateUrl: 'categories/categories.component.html',
          controller: 'CategoriesController as categoriesCtrl',
          resolve: {
            categories: ['MenuDataService', function (MenuDataService) {
              console.log("about to call MenuDataService.getAllCategories");
              return MenuDataService.getAllCategories();
            }]
          }
        })
        .state('items', {
          url: '/items/{catShortName}',
          templateUrl: 'items/items.component.html',
          controller: 'ItemsController as itemsCtrl',
          resolve: {
            items: ['$stateParams', 'MenuDataService',
                  function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.catShortName);
                  }]
          }
        });
    }
})();
    