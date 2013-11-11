/**
 * Defines DocumentView module representing a document.
 *
 * @author Tolga Akgoz
 */


define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/document.html'
], function ($, _, Backbone, documentTemplate) {
	'use strict';

	var DocumentView = Backbone.View.extend({

		// Selector to the HTML element that is going to contain this view
		tagName:  'article',

		// Template associated with this view
		template: _.template(documentTemplate),

		// Empty since we do not have special events associated with this view
		events: {},

		/**
		 * Initiliazes the view. Run when the view is created for the first time.
		 * @return {void}
		 */
		initialize: function () {
			// this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);

		},

		/**
		 * Renders the document view
		 * @param  {object} settings Settings for rendering.
		 * Contains displayIndex parameter representing the sort order of the document view.
		 *
		 * @return {object}          returns the document view
		 */
		render: function (settings) {
			this.model.setDisplayIndex(settings.displayIndex);
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

	});

	return DocumentView;
});
