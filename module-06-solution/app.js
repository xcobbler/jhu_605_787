(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.message = ""

        $scope.checkMenu = function(){
            if($scope.menu){
                let rawParts = $scope.menu.split(",");
                let parts = [];
                rawParts.forEach(e => {
                    if(e.trim()){
                        parts.push(e);
                    }
                });
    
                if(parts.length > 3){
                    $scope.message = "Too much!";
                } else {
                    $scope.message = "Enjoy!";
                }
            } else {
                $scope.message = "Please enter data first";
            }

        }

    }
    
    })();