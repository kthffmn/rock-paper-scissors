(function(d,a){var c=Backbone.View.extend({tagName:"ul",events:{"click .show_more":"show_more"},initialize:function(e){this.template||(this.template=e.template);var i=this.collection=new Backbone.Collection();var h=this.data=this.$el.data("json")||{};var g=(h.tumblelogs)||[];var f=this.subviews=[];_.forEach(g,function(k){var j=new Tumblr.Models.Tumblelog(k);i.add(j)},this);this.$el.attr("data-json",null)},render:function(){this.$el.html(_.template(this.template,{heading:this.data.heading||"",context:this.data.context||""}));this.add_items();this.add_footer();return this},add_items:function(){this.collection.each(this.add_item,this)},add_item:function(e){var f=new b({model:e,follow_source:this.data.follow_source,}).render();this.subviews.push(f);if(this.subviews.length>this.data.list_limit){d(f.el).addClass("hidden")}this.$el.append(f.el);e.bind("remove",f.remove)},add_footer:function(){var e=_.template(d("#follow_list_"+this.data.context+"_small_links_template").html(),{user_is_editor:this.data.user_is_editor||false});this.$el.append(e)},show_more:function(f){this.$(".item.last").removeClass("last");this.$(".item").last().addClass("after_showing");this.$(".item.hidden").removeClass("hidden");d(f.currentTarget).hide();return false}});var b=Backbone.View.extend({tagName:"li",className:"item",events:{"click .follow":"follow"},initialize:function(e){this.follow_source=e.follow_source||"";this.$button=this.$(".follow");this.listenTo(this.model,"change:following",this.render)},render:function(){var e=_.extend(this.model.toJSON(),{follow_source:this.follow_source});var f=_.template(d("#follow_list_item_template").html(),e);this.$el.html(f);this.$button.toggle(!this.model.get("following"));return this},follow:function(){this.model.save_following({following:true},{source:this.follow_source}).fail(function(){alert(l10n_str.ajax_error)});return false}});a.FollowList=c;a.FollowListItem=b})(jQuery,Tumblr);jQuery(document).ready(function(b){var a=b.trim(b("#follow_list_template").html());b(".follow_list").each(function(d,c){new Tumblr.FollowList({el:c,template:a}).render()})});
(function(k,f,j,d){function c(){var m=arguments;return function(){for(var o=0,n=m.length;o<n;o++){if(m[o].apply(this,arguments)===false){break}}}}function b(){return this.isRenderable()}function g(m){return function(n){return !(n._previousAttributes[m]==null||n._previousAttributes[m]===n.attributes[m])}}var a=(function(){try{var m=0;m.toLocaleString("i");return function(o,p){return p.toLocaleString()}}catch(n){return function(o,p){return p.toLocaleString(o)}}})();function e(n){var m=/\d[\d\s\.,]*/;return function(o,s){var p=this[n];var r=parseInt(p.data("count"),10)+(s?1:-1);p.data("count",r);var t=p.text();var q=f.trim(t.match(m));if(q){p.text(t.replace(q,a(this.locale,r)))}}}var l=j.View.extend({initialize:function(m){this._renderable=false;this.locale=m.locale;this.allPosts=m.allPosts;this.allTumblelogs=m.allTumblelogs;this.listenTo(this.allTumblelogs,"change:following",this.changeFollowingLabel);this.listenTo(this.allPosts,"change:liked",this.changeLikesLabel)},changeFollowingLabel:c(b,g("following"),e("$followingLabel")),changeLikesLabel:c(b,g("liked"),e("$likesLabel")),isRenderable:function(){return !!this._renderable},render:function(){this.$likesLabel=this.$(".likes [data-count]");this.$followingLabel=this.$(".following [data-count]");this._renderable=(this.$likesLabel.length!==0)&&(this.$followingLabel!==0);return this}});var h=(typeof language_for_tinymce==="string")?language_for_tinymce:"en";var i=new l({el:"#right_column",allPosts:Tumblr.Posts,allTumblelogs:Tumblr.Models.Tumblelog.collection,locale:h}).render();d.DashboardControls=l;d.dashboardControls=i})(_,jQuery,Backbone,Tumblr);