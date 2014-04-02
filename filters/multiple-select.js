
angular.module('catalog')
  .directive('multipleSelect', function(){
    return {                 
      template: 
      '<div class="sections" data-toggle="collapse" data-target="#{{id}}-collapse">' +
        '<span class="arrowopen"></span>' +
        '<span class="orange">{{title}}</span>' +
      '</div>' +
      '<ul class="checkbox-list collapse in" id="{{id}}-collapse">' +
        '<li ng-repeat="item in items">' +
          '<div class="checkbox">' +
            '<label>' +
              '<input type="checkbox" ng-click="load(this);" ng-checked="item.m_selected">' +
              '{{item.label}} <span>({{item.count}})</span>' +
              '</input>' +
            '</label>' + 
          '</div>' +
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
