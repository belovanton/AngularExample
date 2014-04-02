angular.module('MattinoTheme', [
  'ngRoute', // in AngularJS 1.2.0 in separate module
  'header',
  'catalog',  
  'resources.fastcheckout',    
  'infinite-scroll', 
  'kmplzt.common',
  'templates.app',
  'templates.common'
]);

angular.module('MattinoTheme').constant('CHECKOUT_CONFIG', {
  url: '/fastcheckout',
  formdata: true
});

angular.module('MattinoTheme')
.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});

angular.module('MattinoTheme')
  .controller('FiltersCtrl', function ($scope, $resource, $location) {

    $scope.$on('reload', function(event, item) {
      $scope.reload(item.url);      
    });

    $scope.reload = function(url) {
      //console.log('url: ' + url);
      url = url.replace(/(.*\.ru)(.*)/, '$2');
      //console.log('url: ' + url);
      url = window.decodeURIComponent(url);
      $location.path(url);

      $scope.load(url); 
    };

    $scope.load = function(url) {                                
      $resource(url + '?m-ajax=1&json=true&blocks=mana.catalog.leftnav')
        .get(function(response) {
          $scope.$broadcast('loaded', response);
        });
    };  
    
  });