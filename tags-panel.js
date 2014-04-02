
angular.module('catalog')
  .directive('tagsPanel', function(){
    return {                 
      template:
      '<div class="new-filter panel panel-default">' +
        '<div class="yourchoice">Ваш выбор:</div>' +
        '<div class="yourchoicefilter">' +
          '<ul>' +
            '<li class="sections" ng-repeat="item in items">' +
              '{{item.title}}<a class="icon-close" ng-show="item.closeable" rel="delete" href="" ng-click="remove(this)"></a>' +
            '</li>' +
          '</ul>' +
        '</div>' +
        '<div class="clear"></div>' +
      '</div>',      
      restrict: 'E',                       
      controller: function($scope, $element, $attrs, $rootScope) {  

        /*
        $scope.$on('select', function(event, o) {          
          //console.log($scope.items);
          //$scope.items.push({title: o.item.label, url: o.item.url, closeable: true});
        });
        */

        $scope.remove = function(el) {                    
          $scope.items = jQuery.grep($scope.items, function(item) {                        
            return item.url !== el.item.url || !item.closeable;               
          });

          var url = el.item.url;
          $rootScope.$broadcast('reload', {url: url});
          $rootScope.$broadcast('select', {url: url, item: el.item});          
        };

        $scope.add = function(event, resp) {
          //console.log(resp);
          $scope.items = [];              
          angular.forEach(resp.filters.left, function(filter, key) {                        
            //console.log(filter);             
            angular.forEach(filter.options, function(item, key) {
              if (item.m_selected) {
                //console.log(item);
                $scope.items.push({
                  title: item.label, 
                  url: item.url, 
                  closeable: filter.closeable
                });
              }
            });
          });

          if ($scope.items.length > 1) {
            // resp.filters.left.categories
            var catList = jQuery.grep(resp.filters.left.categories.options, function(cat){
              return cat.m_selected === true;    
            });
            var category = catList[0];
            //console.log(category);
            $scope.items.push({title: 'удалить все', url: category.url,  closeable: true});  
          }
        };                 
        $scope.$on('loaded', $scope.add);

        // preload
        $scope.add('', window.filtersResp);                
      }
    };
  });