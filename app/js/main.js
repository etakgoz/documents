'use strict';

// Require.js configuration
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		less: {
			deps: [
				'css'
			],
			exports: 'less'
		}
	},
	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		text: '../bower_components/requirejs-text/text'
	}
});

require([
	'backbone',
	'views/app'
], function (Backbone, AppView) {
	// Initialize the application view
	new AppView();
});
