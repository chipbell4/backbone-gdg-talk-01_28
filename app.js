
/*
 * Link model
 */
var Link = Backbone.Model.extend();

/*
 * Link Collection
 */
var LinkCollection = Backbone.Collection.extend({
	
	model: Link,

});

/*
 * The View
 */
var LinkView = Backbone.View.extend({

	events: {
		'click .js-add-link' : 'addLink',
		'click .js-delete-link' : 'deleteLink',
	},

	initialize: function() {
		
		this.collection = new LinkCollection();
		this.listenTo(this.collection, 'add remove', this.render);

	},

	render: function() {
		// munge together template code
		var row_template_func = _.template( $('#single-row-template').html() );
		var rows_html = '';
		var N = this.collection.size();

		for(var i=0; i<N; i++) {
			var model = this.collection.at(i);
			
			rows_html += row_template_func( model.toJSON() );
		}

		var page_template_func = _.template( $('#full-page-template').html() );


		//  render it to the page
		this.$el.html( page_template_func({ rows: rows_html }));
		$('div.container').html(this.$el);
		this.delegateEvents();

	},

	addLink: function() {
		
		// add the current text to the colleciton
		this.collection.add({
			
			id: _.uniqueId(),
			description: $('.js-description').val(),
			link: $('.js-link').val(),

		});

	},

	deleteLink: function(e) {
		var id = $(e.target).attr('id');
		this.collection.remove(id);
	}

});


$(document).ready(function() {
	
	var view = new LinkView();
	view.render();

});
