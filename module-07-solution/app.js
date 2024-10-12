(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        this.items = ShoppingListCheckOffService.getToBuyItems();

        this.buyItem = ShoppingListCheckOffService.buyItem

    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;
      
        var toBuyItems = [
            {name: "Cookies", quantity: 10},
            {name: "Pepsi", quantity: 2},
        ];

        var boughtItems = [];
      
        service.buyItem = function (itemIndex) {
            //push the item in the [] returned - not the array of 1 item
            boughtItems.push(toBuyItems.splice(itemIndex, 1)[0]);
        };
      
        service.getToBuyItems = function () {
          return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
          };
      }
    
    })();