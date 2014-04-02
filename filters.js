
angular.module('catalog')
  .directive('filters', function(){
    return {
      restrict: 'E',            
      template: '',        
      controller: function($scope, $element, $attrs, $compile) {                                

        this.add = function(event, resp) {              
          var el;          
          var filters = $element;
          filters.html('');
          if (angular.isDefined(resp.filters)) {                             
            angular.forEach(resp.filters.left, function(filter, key) {            
              //console.log(filter);
              $scope[key] = filter.options;
              $scope[key+'_opts'] = filter;                      

              if (filter.visible && angular.isDefined(filter.options)) {                
                el = $compile('<'+ filter.type +' id="'+ key +'" class="item" title="'+ filter.name +'" list="' + key + '" opts="' + key + '_opts"></'+ filter.type +'>')($scope);
                filters.append(el);

                if (filter.name === "Разделы") {
                  var selected = $.map(filter.options, function(opt){
                    if (opt.m_selected) { 
                      return opt.label;
                    }
                  });
                  //console.log(selected);
                  if (selected.length > 0) {
                    $('#howmuchCategory').html(selected[0]);
                    $('#breadcrumbCategory').html(selected[0]);
                  }
                }
              }                                             
            });
          }
        };        
        $scope.$on('loaded', this.add);

        // preload
        this.add('', window.filtersResp);
      }           
    };
  });
