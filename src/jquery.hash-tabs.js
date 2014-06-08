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
        tabPanelSelector: "section",
        tabNavSelector: "nav",
        tabButtonSelector: "a",
        initialTabToShow: 0,
        tabContainerClass: "hash-tabs",
        debug: false
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
      
      		@param [*jQuery] $tabContainer tab container jQuery object
       */

      HashTabs.prototype.generateTabs = function($tabContainer) {
        var self;
        $tabContainer.addClass(this.options.tabContainerClass);
        this.$tabNav = $tabContainer.find(this.options.tabNavSelector).attr({
          "role": "tablist"
        });
        this.$contentPanes = $tabContainer.find(this.options.tabPanelSelector);
        self = this;
        this.$tabButtons = this.$tabNav.find(this.options.tabButtonSelector).each(function(index) {
          var $associatedTab;
          $(this).attr({
            "id": index,
            "role": "tab",
            "aria-selected": false,
            "aria-expanded": false,
            "aria-controls": $(this)[0].hash,
            "tab-index": -1
          });
          $associatedTab = self.$contentPanes.filter($(this)[0].hash);
          $associatedTab[0].correspondingTabButton = $(this);
          return $(this)[0].correspondingTabContent = $associatedTab;
        });
        this.$tabPanes = $tabContainer.find(this.options.tabPanelSelector).hide().each(function() {
          return $(this).attr({
            "role": "tabpanel",
            "aria-labeledby": $(this)[0].correspondingTabButton[0].id
          });
        });
        this.$activeTab = this.$tabPanes.eq(this.options.initialTabToShow);
        this.$activeTabButton = this.$tabButtons.eq(this.options.initialTabToShow);
        this.listenClick(this.$tabButtons);
        return this.updateHash();
      };

      HashTabs.prototype.listenClick = function($tabButtons) {
        var self;
        self = this;
        return $tabButtons.on("click", function() {
          var _ref;
          self.$previousTab = self.$activeTab.hide();
          self.$previousTabButton = self.$activeTabButton.removeClass("active").attr({
            "tab-index": -1,
            "aria-selected": false,
            "aria-expanded": false
          });
          $(this).addClass("active").attr({
            "tab-index": 0,
            "aria-selected": true,
            "aria-expanded": true
          });
          self.$activeTabButton = $(this);
          return self.$activeTab = (_ref = $(this)[0].correspondingTabContent) != null ? _ref.show() : void 0;
        });
      };

      HashTabs.prototype.updateHash = function() {
        var currentHashURL;
        currentHashURL = document.location.hash;
        if (currentHashURL !== "") {
          return this.triggerTab(currentHashURL);
        } else {
          return this.$tabButtons.first().trigger("click");
        }
      };

      HashTabs.prototype.generateUniqueID = function() {
        var c, m, today;
        c = 1;
        today = new Date();
        m = today.getMilliseconds()("");
        return ++today + m + (++c === 10000 ? c = 1 : c);
      };

      HashTabs.prototype.triggerTab = function(url) {
        return this.$tabButtons.filter("[href*=" + url + "]").trigger("click");
      };

      $.fn.extend({
        hashTabs: function() {
          var args, option;
          option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return this.each(function() {
            var $this, data;
            $this = $(this);
            data = $this.data("hashTabs");
            if (!data) {
              $this.data("hashTabs", (data = new HashTabs(this, option)));
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

//# sourceMappingURL=jquery.hash-tabs.map
