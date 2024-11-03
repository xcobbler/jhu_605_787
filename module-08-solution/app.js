(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
            items: '<',
            title: '@',
            onRemove: '&'
            },
            controller: ShoppingListDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }
    
    function ShoppingListDirectiveController() {
      
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;
        controller.searchTerm = '';
        controller.found = [];
        controller.title = '';

        controller.narrowDown = function(){
            controller.title = '';
            controller.found = [];
            if(controller.searchTerm){
                MenuSearchService.getMatchedMenuItems(controller.searchTerm).then(function(result){
                    controller.found = result;
                    if(controller.found && controller.found.length == 0){
                        controller.title = 'Nothing found';
                    }
                });
            } else {
                controller.title = 'Nothing found';
            }
        }

        controller.removeItem = function (itemIndex) {
            controller.found.splice(itemIndex, 1);
          };

    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;
      
        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
              }).then(function(result){
                //format is {"cat" => {category: {}, menu_items: [{description: 'abc'}]}}
                let response = [];
                if(result && result.data){
                    for(const key in result.data){
                        if(result.data[key] && result.data[key].menu_items){
                            for(const item of result.data[key].menu_items){
                                if(item.description && item.description.includes(searchTerm)){
                                    response.push(item)
                                }
                            }
                        }
                    }
                }
                return response;
              });
        };
      }
})();