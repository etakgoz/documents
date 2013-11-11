/**
 * Defines the documents collection. Collection of document models.
 * It uses data server side document REST api for persistency.
 *
 * @author Tolga Akgoz
 */
define([
	'underscore',
	'backbone',
	'models/document',
	'config'
], function (_, Backbone, Document, Config) {
	'use strict';

	var DocumentsCollection = Backbone.Collection.extend({

		// Model of the document
		model: Document,

		// URL to the REST api
		url: Config.documentServerBaseURL
	});

	return new DocumentsCollection();
});
