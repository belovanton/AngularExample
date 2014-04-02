
angular.module('catalog')
  .directive('price', function () {
    return {                 
      template: 
      '<div class="sections" data-toggle="collapse" data-target="#{{id}}-collapse">' + 
        '<span class="arrowopen"></span><span class="orange">{{title}}</span>' +
      '</div>' +
      '<ul class="collapse in" id="{{id}}-collapse">' +
        '<li class="chosen" ng-repeat="item in items">' +
          '<a href="" ng-click="load(this);" title=""> от {{item.from}} <span class="rub">i</span> - до {{item.to}} <span class="rub">i</span> </a>' +
        '</li>' +        
      '</ul>',      
      restrict: 'E',      
      scope: {
        opts: '=opts',
        //items: '=list',
        id: '@id',
        title: '@title'
      },            
      controller: function($scope, $element, $attrs, $rootScope) {
        
        $scope.items = [];

        var min = $scope.opts.min;
        var max = $scope.opts.max;

        //console.log($scope.opts);
        var step = 2000;
        if (step > max) { step = max; }
        var params;
        for (var i = min; i <= max-step; i = i + step) {
          var to = i + step;
          var sum = max-step;
          //console.log('from: ' + i + ', to: ' + to + ', sum: ' + sum);
          if (i < sum && to > sum) {
            //console.log('max: ' + max);              
            params = {from: i, to: max};
          } else {
            params = {from: i, to: to};
          }
          /*
          if (params.from == $scope.opts.from &&  params.to == $scope.opts.to) { 
            params.class = 'active';  
          }
          */
          $scope.items.push(params);
        }

        $scope.load = function(el) {          
          var url = $scope.opts.url;
          url = url.replace('__0__', el.item.from).replace('__1__', el.item.to);
          //console.log($scope.opts);
                              
          $scope.$parent.reload(url);        
          $rootScope.$broadcast('select', {url: url});                   
        };
      }
    };
  });
