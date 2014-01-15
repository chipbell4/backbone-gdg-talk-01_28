
/*
 * Link model
 */
var Link = Backbone.Model.extend({
	
	/**
	 * Helper function to allow a model to determine
	 * if it should be displayed, given some search text
	 */
	matches: function(text) {
		var description = this.get('description').toLowerCase();
		text = text.toLowerCase();
		return description.indexOf( text ) >= 0;
	}

});

/*
 * Link Collection
 */
var LinkCollection = Backbone.Collection.extend({
	
	/**
	 * Let's the collection know that the 
	 * the model it should use is a Link, which allows
	 * us to use the matches function we wrote
	 */
	model: Link,

});

/*
 * The View
 */
var LinkView = Backbone.View.extend({

	/**
	 * Our events. The format is:
	 * <event> <selector> <function>
	 */
	events: {
		'click .js-add-link' : 'addLink',
		'click .js-delete-link' : 'deleteLink',
		'keyup .js-search' : 'renderCollection',
	},

	/**
	 * Essentially the constructor of the view.
	 */
	initialize: function() {
		
		this.collection = new LinkCollection();
		this.listenTo(this.collection, 'add remove', this.renderCollection);

	},

	/**
	 * Does a full page render, which essentially moves
	 * the template onto the page, and sets up eventing
	 */
	render: function() {
		//  render it to the page
		this.$el.html( $('#full-page-template').html() );
		$('div.container').html(this.$el);
		this.delegateEvents();

	},

	/**
	 * Re-renders only the collection, so that we can
	 * preserve events created on the static elements 
	 * (like the search, or the add buttons)
	 */
	renderCollection: function() {
		// filter the colleciton
		var search_text = $('.js-search').val();
		var filtered_collection = this.collection.filter(function(model) {
			return model.matches(search_text);
		});
		filtered_collection = new Backbone.Collection(filtered_collection);

		// munge together template code
		var row_template_func = _.template( $('#single-row-template').html() );
		var rows_html = '';
		var N = filtered_collection.size();

		for(var i=0; i<N; i++) {
			var model = filtered_collection.at(i);
			
			rows_html += row_template_func( model.toJSON() );
		}

		// add that html to existing html on the page
		this.$('#row-container').html(rows_html);
	},

	/**
	 * Adds a new link to the collection
	 */
	addLink: function() {
		
		// add the current text to the colleciton
		this.collection.add({
			
			id: _.uniqueId(),
			description: $('.js-description').val(),
			link: $('.js-link').val(),

		});

	},

	/**
	 * Deletes a link from the collection
	 */
	deleteLink: function(e) {
		var id = $(e.target).attr('id');
		this.collection.remove(id);
	}

});


/**
 * When the document is ready, set up the view and run it!
 */
$(document).ready(function() {
	
	var view = new LinkView();
	view.render();

});
