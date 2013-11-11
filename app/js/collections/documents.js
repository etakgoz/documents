/**
 * Defines the documents collection. Collection of document models.
 * It uses data server side document REST api for persistency.
 *
 * @author Tolga Akgoz
 */
define([
	'underscore',
	'backbone',
	'models/document'
], function (_, Backbone, Document) {
	'use strict';

	var DocumentsCollection = Backbone.Collection.extend({

		// Model of the document
		model: Document,

		// URL to the REST api
		url: 'http://localhost:3412/'
	});

	return new DocumentsCollection();
});
