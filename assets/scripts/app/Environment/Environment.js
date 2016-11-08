(function (window) {
	var Environment;

	/**
	 * Define Environment class
	 */
	Environment = function Environment () {

		/**
		 * Create function instance and set the new object prototype properties
		 */
		var instance = Object.create({

			/**
			 * User browser parsed from the user-agent string
			 *
			 * @var {Object}  this.browser
			 */
			browser : null,

			/**
			 * Environment device parsed from the user-agent string
			 *
			 * @var {Object}  this.device
			 */
			device : null,

			/**
			 * Parses the environment browser/device from the user-agent string
			 *
			 * @return {Object}
			 */
			init : function init () {
				var parser;

				parser = new UAParser();

				if (parser) {
					this.browser = parser.getBrowser();
					this.device = parser.getDevice();
				}

				return this;
			}
		}, this.prototype);

		return instance.init();
	}

	/**
	 * Add Environment function to the global scope
	 */
	if (window) {
		window.Environment = Environment;
	}

	return Environment;
})(window);