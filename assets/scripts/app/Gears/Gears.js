(function (window) {
	var Gears;

	/**
	 * Define Gears class
	 */
	Gears = function Gears (className) {

		/**
		 * Create function instance and set the new object prototype properties
		 */
		var instance = Object.create({

			/**
			 * Dom elements to rotate
			 *
			 * @var {Object}  this.elements
			 */
			elements: [],

			/**
			 * Sets the class elemenets
			 *
			 * @return {Object}
			 */
			init : function init (className) {

				if (className) {
					this.elements = document.getElementsByClassName(className);
					this.rotate(10);
				}

				return this;
			},

			/**
			 * Rotates elements depending on the window top offset
			 *
			 * @return void
			 */
			rotate : function rotate (offset) {
				var i, length, direction, element, webkit, moz, ie;

				offset = parseFloat(offset) || 4;
				length = this.elements.length;

				if (offset && length) {
					webkit = (offset / 3.42 % Math.PI);
					moz = (offset / 3.7 % Math.PI);
					ie = (offset / 3.43 % Math.PI);

					webkit = (offset / 5);
					moz = (offset / 3.6);
					ie = (offset / 3.6);

					for(i = 0; i < length; i++) {
						if (i in this.elements) {
							element = this.elements[i];
							if (element) {
								direction = i % 2 === 0 ? '-' : '';
								element.style.webkitTransform = 'rotate('+direction+webkit+'deg)';
								element.style.MozTransform = 'rotate('+direction+moz+'deg)';
								element.style.msTransform = 'rotate('+direction+ie+'deg)';
							}
						}
					}
				}
			}
		}, this.prototype);

		return instance.init(className);
	}

	/**
	 * Add Gears function to the global scope
	 */
	if (window) {
		window.Gears = Gears;
	}

	return Gears;
})(window);