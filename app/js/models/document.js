/**
 * Defines the document model. Document has the attachmentId, fileName, fileSize and dateAdded attributes.
 * downloadUrl attribute is defined during initialization and displayIndex  is defined just before rendering.
 *
 * @author Tolga Akgoz
 */


define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var DocumentModel = Backbone.Model.extend({

		/**
		 * Default attributes
		 * @type {Object}
		 */
		defaults: {
			attachmentId: '',
			fileName: '',
			fileSize: '0 Kb',
			dateAdded: ''
		},

		/**
		 * Initiliazes the model. Sets the downloadUrl attribute.
		 * @return {void}
		 */
		initialize: function () {
			var downloadUrl = "../download.html?id=" + encodeURIComponent(this.get("attachmentId")) + "&file_name=" + encodeURIComponent(this.get("fileName"));

			this.set("downloadUrl", downloadUrl);
		},


		/**
		 * Sets display index attribute
		 * @param {number} index display index during the rendering of app view (documents)
		 */
		setDisplayIndex: function (index) {

			if (typeof index !== "undefined") {
				this.set("displayIndex", index);
			}

		}
	});

	return DocumentModel;
});
