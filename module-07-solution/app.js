(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('ngcurrency', AngularCurrencyFilter);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        this.items = ShoppingListCheckOffService.getToBuyItems();

        this.buyItem = ShoppingListCheckOffService.buyItem;

    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.items = ShoppingListCheckOffService.getBoughtItems();

        this.getTotalPrice = ShoppingListCheckOffService.getTotalPrice;
    }

    function ShoppingListCheckOffService() {
        var service = this;
      
        var toBuyItems = [
            {name: "Cookies", quantity: 10, pricePerItem: 5},
            {name: "Pepsi", quantity: 2, pricePerItem: 2},
        ];

        var boughtItems = [];
      
        service.buyItem = function (itemIndex) {
            //push the item in the [] returned - not the array of 1 item
            boughtItems.push(toBuyItems.splice(itemIndex, 1)[0]);
        };

        service.getTotalPrice = function(item){
            return item.quantity * item.pricePerItem
        }
      
        service.getToBuyItems = function () {
          return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
          };
      }

      function AngularCurrencyFilter(){
        return function(input){
            return "$$$" + (Math.round(input * 100) / 100).toFixed(2)
        }
      }
    
    })();