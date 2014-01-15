
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

	initialize: function() {
		
		this.collection = new LinkCollection();

	},

	render: function() {
		// munge together template code
		var template_func = _.template( $('#single-row-template').html() );
		var new_html = '';
		var N = this.collection.size();

		for(var i=0; i<N; i++) {
			var model = this.collection.at(i);
			
			new_html += template_func( model.toJSON() );
		}

		// render it to the container
		$('#row-container').html( new_html );

	}

});


$(document).ready(function() {
	
	var view = new LinkView();
	view.render();

});
