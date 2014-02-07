/*
 * Link Model
 */
var Link = Backbone.Model.extend({
});

var LinkCollection = Backbone.Collection.extend({
	
	model: Link
	
});

var LinkView = Backbone.View.extend({

	initialize: function() {
		this.setElement('body', true);
	
		/*
		 * Define the collection
		 */
		this.collection = new LinkCollection();
		
		/*
		 * Create the template function
		 */
		var template_text = $('#row-template').html();
		this.template = _.template(template_text);
	},
	
	render: function() {
		var rows_html = '';
		var N = this.collection.size();
		
		for(var i=0; i<N; i++) {
			var model = this.collection.at(i);
			
			var single_row_html = this.template({
				url: model.get('url'),
				description: model.get('description')
			});
			
			rows_html += single_row_html;
		}
		
		
		this.$('#row-container').html(rows_html);
	},

});
