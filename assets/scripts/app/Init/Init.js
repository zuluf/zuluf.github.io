(function (window, document) {
	var Init;

	/**
	 * Define app Init class
	 */
	Init = function Init (element) {

		/**
		 * Create function instance
		 */
		var instance = Object.create({

			/**
			 * Application wrapper element
			 *
			 * @var {Object}  this.element
			 */
			element : null,

			/**
			 * Application environment
			 *
			 * @var {Object}  this.environment
			 */
			environment: {
				browser : null,
				device : null
			},

			/**
			 * Starts the app
			 *
			 * @return {Object}
			 */
			init : function init (element) {
				if (!element || !element.length) {
					throw Error('Add app wrapper DOM node you dumb fuck');
				}

				this.element = element[0];

				this.environment = new Environment();

				this.setClass(this.environment);

				this.scroll();

				return this;
			},

			/**
			 * Add's css classes to the instance element
			 *
			 * @param  {Object} environment
			 * @return {Boolean}
			 */
			setClass : function setClass (environment) {
				var className, reg;

				if (environment) {
					reg = new RegExp(/\s/g);
					className = [
						(environment.browser.name),
						(environment.browser.name + ' ' + environment.browser.major),
						(environment.device.type)
					];

					className = className.map(function (item) {
						return item && item.toLowerCase().replace(reg, '-');
					}).filter(function (item) {
						return !!item;
					});

					if (this.element && className.length) {
						this.element.className = className.join(' ').toLowerCase();
					}
				}

				return !!className;
			},

			/**
			 * Bind scroll events for header offset
			 *
			 * @return void
			 */
			scroll : function windowScroll () {
				var gears, header;

				header = document.getElementsByTagName('header')[0] || false;
				gears = new Gears('js-gear');

				/**
				 * Sorry <=IE8 users, you'll just have to satisfy for a default header
				 */
				if (window && typeof window.addEventListener === "function") {
					window.addEventListener('scroll', function () {
						var className, offset;

						offset = this.scrollY || document.documentElement.scrollTop;
						gears && gears.rotate(offset);

						className = offset > 30 ? 'scrolled' : '';

						if (header && className !== header.className) {
							header.className = className;
						}
					});
				}
			}
		}, this.prototype);

		return instance.init(element);
	}

	/**
	 * Add Init object to the global scope
	 */
	if (window) {
		window.Init = Init;
	}

	return Init;
})(window, document);