(function(b,a){var c=Backbone.View.extend({initialize:function(d){this.options=d||{};this.slides=this.options.slideshow_items||[];this.root=b(this.options.slideshow_container)||b("#rad_slideshow"),this.interval=this.options.interval||3000,this.display_badge=this.options.display_badge||false,this.display_like_and_reblog=this.options.display_like_and_reblog||false,this.current_slide=false;this.next_slide=false;this.count=false;if(!this.slides.length){return}this.start_slideshow()},create_slide:function(){var d,e,h,g,f;d=b('<div class="slide" />');h=b('<a class="source" />');if(this.display_badge){e=b('<div class="radar_badge" />');d.append(e)}if(this.display_like_and_reblog){g=b('<a class="reblog reblog_button" />');f=b('<a class="like" />');d.append(g);d.append(f)}d.append(h);return d},update_slide:function(f,d){if(!d){return false}var i=f.find(".source"),g=f.find(".like"),h=f.find(".reblog"),e=f.find(".radar_badge");if(typeof(d.photo_url)!=="undefined"){f.css({"background-image":"url("+d.photo_url+")"})}if(d.source_url!==undefined){i.attr("href",d.source_url);i.attr("target","_new");if(d.trackable_url!==undefined){i.attr("onclick",d.trackable_url)}if(d.source_label!==undefined){i.html(d.source_label||"Source")}}if(this.display_badge){e.addClass(d.radar_badge_class||"radar_badge")}if(this.display_like_and_reblog){if(d.like_url!==undefined){g.attr("href",d.like_url)}if(d.like_url==="#like"){g.off("click.NerdSlideshow").on("click.NerdSlideshow",function(j){j.preventDefault();var k=(!d.like_state)?"like":"unlike";Tumblr[k]({id:d.post_id,key:d.reblog_key},{complete:function(){b("#rad_slideshow_like_"+d.post_id).toggleClass("red");d.like_state=!d.like_state}})})}g.attr({id:"rad_slideshow_like_"+d.post_id,"class":(d.like_state===true)?"like red like_button":"like like_button"}).html(d.like_label||"Like");if(d.reblog_url!==undefined){h.html(d.reblog_label||"Reblog");h.attr("href",d.reblog_url)}}},transition:function(){b(this.current_slide).fadeOut(function(f){if(this.next_slide){this.next_slide.css({zIndex:1})}if(this.current_slide){this.current_slide.css({zIndex:0}).show()}var d=this.next_slide;this.next_slide=this.current_slide;this.current_slide=d;var e=this.slides[count%this.slides.length];this.update_slide(this.next_slide,e);count++;setTimeout(_.bind(this.transition,this),this.interval)}.bind(this))},start_slideshow:function(){this.current_slide=this.create_slide();this.root.append(this.current_slide);this.update_slide(this.current_slide,this.slides[0]);if(this.slides.length>1){this.next_slide=this.create_slide();this.root.append(this.next_slide);this.update_slide(this.next_slide,this.slides[1]);count=2;this.transition()}}});a.NerdSlideshow=c})(jQuery,Tumblr);