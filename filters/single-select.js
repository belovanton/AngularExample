
angular.module('catalog')
  .directive('singleSelect', function(){
    return {                 
      template:
      '<div class="sections" data-toggle="collapse" data-target="#{{id}}-collapse">' + 
        '<span class="arrowopen"></span><span class="orange">{{title}}</span>' +
      '</div>' +
      '<ul class="sections collapse in" id="{{id}}-collapse">' +
        '<li ng-class="{selected:item.m_selected}" ng-repeat="item in items" ng-click="load(this)">' +
          '<a href="" title="{{item.label}}"> {{item.label}} </a> <span>({{item.count}})</span>' +
        '</li>' +        
      '</ul>',      
      restrict: 'E',      
      scope: {        
        items: '=list',
        id: '@id',
        title: '@title'
      },            
      controller: function($scope, $element, $attrs, $rootScope) {           
        
        $scope.load = function(el) {          
          var url = el.item.url;
          // Reload All Filters
          $scope.$parent.reload(url);                              

          $rootScope.$broadcast('select', {url: url, item: el.item});                           
        };
      }
    };
  });
