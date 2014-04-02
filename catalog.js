
angular.module('catalog', ['ngResource', 'chieffancypants.loadingBar'])
.factory('Catalog', function($resource, $http, $location) {						
		var Catalog = function() {						
			this.items = window.productsResp.products.items;
			this.init();
			// overrides
			this.size = window.productsResp.products.size;
			this.page = 2;
		};

		Catalog.prototype.init = function() {			
			this.busy = false;
			this.page = 1;
			this.max = 30;
			this.size = 0;
		};	

		Catalog.prototype.reload = function(url) {			
			this.items = [];
			this.url = url;
			this.init();	
			this.reloadPage();				
		};	

		Catalog.prototype.getUrl = function() {			
			var url = $location.path();
			//console.log(url);
			return url;
		};

		Catalog.prototype.declension = function(num, expressions) {
			var result, count;
			count = num % 100;
			if (count >= 5 && count <= 20) {
				result = expressions['2'];
			} else {
        count = count % 10;
        if (count === 1) {
            result = expressions['0'];
        } else if (count >= 2 && count <= 4) {
            result = expressions['1'];
        } else {
            result = expressions['2'];
				}
			}
			return result;
		};

		Catalog.prototype.updateSize = function(val) {			
			jQuery('#countProducts').html(val);
			var text = this.declension(val, ['артикул', 'артикула', 'артикулов']);
			jQuery('#countProductsTxt').html(text);						
		};	

		Catalog.prototype.sortBy = function(type) {			
			if (type === 'asc') {
				this.items.sort(function(a, b) { return a.price - b.price; });						
			}
			else if (type === 'desc') {
				this.items.sort(function(a, b) { return b.price - a.price; });						
			} 
			else if (type === 'rand') {
				this.items.sort(function() { return 0.5 - Math.random(); } );
			}
		};

		Catalog.prototype.reloadPage = function() {	
			this.isLast = false;								
			if (this.size !== 0 && this.size < this.max) { this.isLast = true; return; }
			if (this.size !== 0 && this.size > this.max) {
				var countPages = Math.ceil(this.size / this.max);				
				if (this.page > countPages) { this.isLast = true; return; }
			}				

			if (this.busy) { return; }
			this.busy = true;

			this.url = this.getUrl();

			var url = this.url + '?m-ajax=1&json=true&blocks=category.products&p=' + this.page;
			$http.get(url).success(function(data) {
				var items = data.products.items;
				this.items = [];

				if (data.products.size > 0) {
					for (var i = 0; i < items.length; i++) {
						this.items.push(items[i]);
					}
				}
				this.busy = false;

				this.size = data.products.size;
				this.updateSize(this.size);

				var countPages = Math.ceil(this.size / this.max);				
				this.isLast = (this.page > countPages) ? true: false;

				this.page += 1;
			}.bind(this));
		};

		Catalog.prototype.nextPage = function() {	
			this.isLast = false;
			if (this.size !== 0 && this.size < this.max) { this.isLast = true; return; }
			if (this.size !== 0 && this.size > this.max) {
				var countPages = Math.ceil(this.size / this.max);				
				if (this.page > countPages) { this.isLast = true; return; }
			}

			if (this.busy) { return; }
			this.busy = true;

			this.url = this.getUrl();
					
			var url = this.url + '?m-ajax=1&json=true&blocks=category.products&p=' + this.page;
			$http.get(url).success(function(data) {
				var items = data.products.items;

				if (data.products.size > 0) {
					for (var i = 0; i < items.length; i++) {
						this.items.push(items[i]);
					}
				}
				this.busy = false;

				this.size = data.products.size;
				this.updateSize(this.size);

				this.page += 1;
			}.bind(this));
		};

		return Catalog;
	});