/**
 * Defines the AppView module. The main view of the application.
 *
 * @author Tolga Akgoz
 *
 */

define([
	'jquery',
	'underscore',
	'backbone',
	'collections/documents',
	'views/document'
], function ($, _, Backbone, Documents, DocumentView) {
	'use strict';

	var AppView = Backbone.View.extend({

		// Selector to the HTML element that is going to contain this view
		el: '#documents',

		// Empty since we do not have special events associated with this view
		events: {},

		/**
		 * Initiliazes the view. Run when the view is created for the first time.
		 * @return {void}
		 */
		initialize: function () {
			// Listen relevant changes on the Documents collection
			this.listenTo(Documents, 'add', this.addOne);
			this.listenTo(Documents, 'reset', this.addAll);
			this.listenTo(Documents, 'all', this.render);

			// Fetch the documents to start the application
			Documents.fetch();
		},

		/**
		 * Adds a document to the app view.
		 * It is run when a newDocument is added to the Documents collection.
		 *
		 * @param {document} newDocument a document model
		 */
		addOne: function (newDocument) {
			var documentView = new DocumentView({ model: newDocument }),
				docIndex = Documents.indexOf(newDocument),
				rowClass = Math.floor(docIndex / 2) % 2 ? "odd-row" : "even-row",
				$html = $(documentView.render({ displayIndex: docIndex + 1}).el);

			// Check whether it is needed to create a new row
			if (docIndex % 2 === 0) {
				$html.addClass("first-column");

				$("<div>")
					.addClass("document-row")
					.addClass(rowClass)
					.append($html)
					.appendTo($('#document-list'));
			} else {

				$html.addClass("second-column");

				$('#document-list .document-row:last-child')
					.append($html);

			}
		},

		/**
		 * Adds all document models to the app view
		 */
		addAll: function () {
			this.$('#document-list').html('');
			Documents.each(this.addOne, this);
		},

		/**
		 * Renders the app view by showing the wrap around the application.
		 * Run after all the application is loaded to reveal the contents.
		 *
		 * @return {void}
		 */
		render: function () {
			$("#wrap").show();
		}

	});

	return AppView;
});
