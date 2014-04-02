
angular.module('catalog')
  .directive('fastview', ['$resource', 'Fastcheckout', 'Loading', 'Cart', function($resource, Fastcheckout, Loading, Cart) {
    return {      
      templateUrl: 'catalog/fastview/fastview.tpl.html',
      restrict: 'E',      
      link: function(scope, element, attrs) {
        //console.log(scope.item); 

        scope.close = function() {          
          element.html('');
        };
        
        scope.popWin = function(o) {              
          var params = 'top:0,left:0,width:970px,height:700px,resizable=yes,scrollbars=yes;location=no';
          var image = angular.isDefined(scope.image_src_selected) ? '/image/' + scope.image_src_selected : '';
          var win = window.open('/catalog/product/gallery'+ image +'/id/' + o.item.productId, null, params);          
          win.focus();
        };        

        scope.setImage = function(url) {
          //console.log(url);
          scope.fastview_image = url;
        };

        //console.log(scope.item.media_gallery);
        var firstImage = scope.item.media_gallery[0];
        scope.setImage(firstImage.image);   
        //console.log(firstImage);
        scope.image_src_selected = firstImage.id;

        setTimeout(function(){                      
          self.cloudZoom = new CloudZoom(jQuery('#centerImg'), {zoomPosition:'inside', zoomOffsetX:0});                   
        }, 500);               

        $resource(scope.item.product_url + '?json=true').get(function(resp){                         
            scope.item = resp;
            scope.gallery = resp.media_gallery;
            //console.log(scope.gallery);
            if (resp.options.length > 0) {
              scope.sizes = resp.options[0].values;
              scope.optionsId = resp.options[0].id;   
            }

            // Set selected size
            if (angular.isDefined(scope.selectedSize)) {                            
              scope.sizeId = scope.selectedSize.id;
              setTimeout(function(){
                element.find(".size-select button:contains('" + scope.selectedSize.title + "')").addClass('active');
              }, 500);                
            }
        }); 

        scope.setNewImage = function(el) {
          //console.log(el);          
          scope.image_src_selected = el.image.id;
          scope.setImage(el.image.image);          
          self.cloudZoom.loadImage(el.image.image, el.image.full_image);
        };

        scope.selectSize = function(el) {          
          //console.log(el);
          scope.sizeId = el.size.id;
          // clear sizes
          element.find('.size-select .active').removeClass('active');                    
          //debugger;
          element.find('#'+el.size.id).addClass('active');          

          //console.log(scope.valid);
          if (!scope.valid) {
            element.find('.sizes p').html('Выберите нужные размеры:');
            element.find('.sizes').removeClass('alert alert-danger');            
            scope.add();  
          }
        };

        scope.valid = true;

        scope.validate = function() {          
          var actives = element.find('.size-select .active');                    

          if (actives.length !== 1) {
            scope.valid = false;
            element.find('.sizes p').html('Выберите размер!');
            element.find('.sizes').addClass('alert alert-danger');
            return false;
          } else {
            element.find('.sizes p').html('Выберите нужные размеры:');            
            element.find('.sizes').removeClass('alert alert-danger');
            scope.valid = true;
            return true;
          }          
        };                

        scope.addToCart = function() {
          if (angular.isObject(scope.item.options[0])) {
            if (!scope.validate()) { return; }            
          } 
          scope.add();                    
        };

        var fastcheckout = new Fastcheckout();

        scope.add = function() {                    
          var data = {'product': scope.item.productId};
          if (angular.isDefined(scope.optionsId)) {
            data['options['+ scope.optionsId +']'] = scope.sizeId;
          }

          element.find('.btn-basket').attr("disabled", "disabled");          
          element.find('#to-cart-link').addClass("hide");
          //Loading.show();
          scope.errorMessages = [];
          element.find('#errorMessages').addClass('hidden');
          fastcheckout.update(data, function(result) {
            if (result.success) {
              // Update count of items in cart              
              Cart.updateCount();
              element.find('#to-cart-link').removeClass("hide");
            } else {
              scope.errorMessages = result.message;
              element.find('#errorMessages').removeClass('hidden');
            }    
            element.find('.btn-basket').removeAttr("disabled");      
            //Loading.hide();
          });          
        };        
               
      }
    };
}]);