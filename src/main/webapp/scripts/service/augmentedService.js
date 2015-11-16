/**
 * AugmentedService.js - The Service Core Component and package
 *
 * @author Bob Warren
 *
 * @requires augmented.js
 */
(function(moduleFactory) {
    if (typeof exports === 'object') {
	module.exports = moduleFactory(require('augmented'));
    } else if (typeof define === 'function' && define.amd) {
	define([ 'augmented' ], moduleFactory);
    } else {
	window.Augmented.Presentation = moduleFactory(window.Augmented);
    }
}(function(Augmented) {
    Augmented.Service = {};

    Augmented.Service.VERSION = '0.1.0';

    /** MockService
	 *
	 *  Sets up mocked REST calls that will intercept AJAX calls
	 *  and responds with a mocked response of our own choosing.
	 *
	 *  This will also support CORS and persistence via local storage
	 *  in the future, played as a separate story.
	 *
	 *  In essence, a syntactic sugar coating around a subset of
	 *  mockjax, using DSL notation.
	 *
	 *  Usage: Augmented.Service.MockService.at("rest/product/123")
	 *                              .on("GET")
	 *                              .respondWithText("Hello World")
	 *                              .respondWithStatus(200)
	 *                              .respondWithHeaders({Content-Type: "text/plain", User: "Simba"})
	 *                              .register();
	 */
	var mock = function() {
		var options = {}, services = [];

		/**
		 *  This url can be a string, or a regular expression. The
		 *  string supports the wildcard '*'.
		 */
		this.at = function(url) {
			options.url = url;
			return this;
		};

		/**
		 *  HTTP methods 'GET', 'POST', 'PATCH', 'DELETE', and so on.
		 */
		this.on = function(method) {
			options.type = method;
			return this;
		};

		/**
		 *	Accepts a string or accepts a JSON object if a
		 *  JSON.stringify() method is available.
		 */
		this.respondWithText = function(responseText) {
			options.responseText = responseText;
			return this;
		};

		this.respondWithStatus = function(responseStatus) {
			options.status = responseStatus;
			return this;
		};

		/**
		 *  The function parameter is an object that contains
		 *  {header field name: header field value} pairs.
		 */
		this.respondWithHeaders = function(responseHeaders) {
			options.headers = responseHeaders;
			return this;
		};

		/**
		 *  Registers the mock and activates it for mocking.
		 *  Returns the id number of the registered mock.
		 *  The id number will mostly be used to clear the
		 *  handler if it is not needed later on down the code.
		 */
		this.register = function() {
			//return mockjax(options);
		};

		/**
		 *  Clears the mock handler attached to the id number. If
		 *  no id is provided, it clears all the handlers.
		 */
		this.clear = function(id) {
			services[id] = null;
		};

        /**
		 *  Return all Registered Services
		 */
        this.getRegisteredMocks = function() {
            return services;
        };
	};

	var mockService = Augmented.Service.MockService = new mock();

    return Augmented.Service;
}));
