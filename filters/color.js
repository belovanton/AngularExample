angular.module('catalog')
  .directive('color', function () {
    return {                 
      templateUrl: 'catalog/filters/color.tpl.html',
      restrict: 'E',
      scope: {
        items: '=list',
        id: '@id',
        title: '@title'
      },            
      controller: function($scope, $element, $attrs, $rootScope, $location) {
        $scope.load = function(el) {          
          var url = el.item.url;
          $scope.$parent.reload(url);        
          $rootScope.$broadcast('select', {url: url});         
        };
        var colors = {
          '000000': 'black',
          '0000FF': 'blue',
          '008000': 'green',
          'DD0000': 'red',
          'EEEEEE': 'gray',
          '666666': 'gray40',
          '993300': 'oregon',
          'FF1CAE': 'pink',
          'FFD700': 'yellow',
          'FFFFFF': 'white'          
        };
        angular.forEach($scope.items, function(item, key) {          
          item.class = (item.m_selected) ? 'active' : '';
          //console.log(colors[item.label]);
          item.color = colors[item.label];
          //console.log(item.label);                                
        });                                                 
      }
    };
  });