
angular.module('catalog')
  .directive('sortPanel', function(){
    return { 
      template:      
      '<div id="price_sort" class="sort-items">' +
        '<div class="sort-name">Сортировать по цене:' +
          '<span class="asc">&nbsp;<a href="" ng-click="sortBy(\'asc\')">по возрастанию</a></span>' +
          '<span class="desc">&nbsp;·&nbsp;<a href="" ng-click="sortBy(\'desc\')">по убыванию</a></span>' +
          '<span class="cancel" style="display: inline-block;">&nbsp;·&nbsp;<a href="" ng-click="sortBy(\'rand\')">отменить</a></span>' +
        '</div>' +
      '</div>',
      restrict: 'E',            
      controller: function($scope, $element, $attrs) { 
        $scope.sortBy = function(type) {          
          $scope.$broadcast('sort', type);
        };                  
      }
    };
  });
