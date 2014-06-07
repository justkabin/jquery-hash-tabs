// Generated by CoffeeScript 1.7.1

/*
	hash-tabs

	hash-tabs.coffee

	@author Sean
	
	@note Created on 2014-06-07 by PhpStorm
	@note uses Codoc
	@see https://github.com/coffeedoc/codo
 */

(function() {
  var __slice = [].slice;

  (function($, window) {

    /*
    	Class for creating accessible tabs with jQuery
    	@example create tabs from nav and container element
    		$(".myTabContainer").hash-tabs();
     */
    var HashTabs;
    return HashTabs = (function() {
      HashTabs.prototype.defaults = {
        tabPanelSelector: ".contentsection",
        tabNavSelector: ".tab-nav",
        tabButtonSelector: "a",
        initialTabToShow: 0,
        $tabPanel: [],
        $tabNav: [],
        $tabButtons: []
      };


      /*
      		Construct a new instance of HashTabs
      
      		@param [*jQuery] el tab container selector
      		@param [Array] options array for constructing new tabs
       */

      function HashTabs(el, options) {
        this.options = $.extend({}, this.defaults, options);
        this.$selector = $(el);
        if (this.$selector.length < 1) {
          throw new ReferenceError("The selector passed in does not contain any items");
        }
        this.generateTabs(this.$selector);
      }


      /*
      		Generate tabs based off of a selector
      
      		@param [*jQuery] $tabSelector tab container selector
       */

      HashTabs.prototype.generateTabs = function($tabSelector) {
        this.$tabNav = $tabSelector.find(this.tabNavSelector).attr({
          "role": "tablist"
        });
        return this.$tabButtons = this.$tabNav.find(this.tabButtonSelector).each(function(index) {
          var selected;
          selected = "false";
          if (index === this.initialTabToShow) {
            selected = "true";
          }
          return $(this).attr({
            "selected": selected,
            "aria-controls": $(this)[0].id,
            "tab-index": index
          });
        });
      };

      $.fn.extend({
        HashTabs: function() {
          var args, option;
          option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return this.each(function() {
            var $this, data;
            $this = $(this);
            data = $this.data("HashTabs");
            if (!data) {
              $this.data("HashTabs", (data = new HashTabs(this, option)));
            }
            if (typeof option === "string") {
              return data[option].apply(data, args);
            }
          });
        }
      });

      return HashTabs;

    })();
  })(window.jQuery, window);

}).call(this);

//# sourceMappingURL=hash-tabs.map