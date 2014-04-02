
angular.module('catalog')
  .directive('size', function(){
    return {                 
      template: 
      '<div class="sections razmer" data-toggle="collapse" data-target="#{{id}}-collapse">' +
        '<span class="arrowopen"></span>' +
        '<span class="orange">{{title}}</span>' +
      '</div>' +
      '<ul class="razmer collapse in btn-list" id="{{id}}-collapse">' + 
        '<li ng-repeat="item in items">' +
          '<button type="button" ng-click="load(this)" class="btn" ng-class="{active:item.m_selected}" data-toggle="button">{{item.label}}</button>' +
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
          $scope.$parent.reload(url);        

          $rootScope.$broadcast('select', {url: url});         
        };      
      }
    };
  });
