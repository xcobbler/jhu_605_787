(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['allMenuItems', 'UserService'];
    function SignUpController(allMenuItems, UserService) {
      var ctrl = this;
      var itemsMap = {};
      /*
      "A": {
        "menu_items": [
        {
          "short_name": "A1",
        },
        */
      for(const cat in allMenuItems) {
        for(let i = 0; i < allMenuItems[cat].menu_items.length;i++){
          itemsMap[allMenuItems[cat].menu_items[i].short_name.toUpperCase()] = allMenuItems[cat].menu_items[i];
          itemsMap[allMenuItems[cat].menu_items[i].short_name.toUpperCase()].categoryShortName = cat;
        }
      }
      
      ctrl.user = {};
      ctrl.isSignedUp = false;
      ctrl.signedUpMessage = "Your information has been saved"
      ctrl.menuItemError = "Favorite Menu Item is required"

      ctrl.submit = function(){
        ctrl.isSignedUp = true;

        UserService.setUser(ctrl.user);
      }

      ctrl.processMenuItem = function(){
        delete ctrl.user.favMenuItemDetails
        if(!ctrl.user.favMenuItem){
          ctrl.menuItemError = "Favorite Menu Item is required"
        } else {
          if(!itemsMap[ctrl.user.favMenuItem.toUpperCase()]){
            ctrl.menuItemError = "No such menu number exists"
          } else {
            ctrl.menuItemError = ""
            ctrl.user.favMenuItemDetails = itemsMap[ctrl.user.favMenuItem.toUpperCase()];
          }
        }
      }

    }
    
    })();
    