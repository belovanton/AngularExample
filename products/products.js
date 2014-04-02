
angular.module('catalog')
  .directive('products', function (Catalog, $compile) {
    return { 
      templateUrl: 'catalog/products/products.tpl.html',
      restrict: 'E',            
      link: function(scope, element, attrs) {         
        scope.catalog = new Catalog();

        scope.showFastView = function(el) {                    
          // clear open fastview
          $.each(element.find('.qv-lg'), function(index, value) {            
            $(value).html('');
          });
          
          var selEl = $('#pr-' + el.item.productId);
          var div = selEl.nextAll('.qv-lg:first');                    

          //console.log(el);
          scope.selectedSize = el.size;
          scope.item = el.item;
          scope.gallery = el.item.media_gallery;          
          if (el.item.options.length > 0) {
            scope.sizes = el.item.options[0].values;
          }

          //scope.load = false;
          //console.log(element);
          var fastView = $compile('<fastview></fastview>')(scope);
          div.prepend(fastView);           
          
           
          setTimeout(function(){            
            $('.quickview').slideDown({duration: 500, easing: 'linear'});                        
            $('html, body').animate({scrollTop: $('.quickview').offset().top - 80}, 2000);            
          }, 100);          

        };        

        scope.$on('select', function(event, filter) {
          //console.log(filter);           
          scope.catalog.reload(filter.url);          
        });                

        scope.$on('sort', function(event, type) {                     
          scope.catalog.sortBy(type);          
        });                
      }
    };
  });