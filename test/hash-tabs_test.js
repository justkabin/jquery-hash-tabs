// Generated by CoffeeScript 1.7.1

/*
	hash-tabs

	hash-tabs_test.coffee

	@author Sean
	
	@note Created on 2014-06-07 by PhpStorm
	@note uses Codoc
	@see https://github.com/coffeedoc/codo
 */

(function() {
  (function($) {

    /*
    	======== A Handy Little QUnit Reference ========
    	http://api.qunitjs.com/
    
    	Test methods:
    	module(name, {[setup][ ,teardown]})
    	test(name, callback)
    	expect(numberOfAssertions)
    	stop(increment)
    	start(decrement)
    	Test assertions:
    	ok(value, [message])
    	equal(actual, expected, [message])
    	notEqual(actual, expected, [message])
    	deepEqual(actual, expected, [message])
    	notDeepEqual(actual, expected, [message])
    	strictEqual(actual, expected, [message])
    	notStrictEqual(actual, expected, [message])
    	throws(block, [expected], [message])
     */
    "use strict";
    module("hashtabs", {
      setup: function() {
        this.elems = $("#qunit-fixture").children();
        return this.$tabContainer = $(".tab-container");
      }
    });
    test("is chainable", function() {
      expect(1);
      return strictEqual(this.elems.hashTabs(), this.elems, "should be chainable");
    });
    test("hides non-active tab panes", function() {
      var $tabs;
      expect(2);
      $tabs = this.$tabContainer.first().hashTabs();
      console.dir($tabs);
      strictEqual($tabs.find("section:first").is(":visible"), true);
      return strictEqual($tabs.find("section").not(":first").is("visible"), false);
    });
    test("has correct hash tabs class", function() {
      expect(1);
      return equal(this.$tabContainer.first().hashTabs().hasClass("hash-tabs"), true);
    });
    test("throws correct error when no navigation exists", function() {
      return throws(function() {
        return this.$tabContainer.eq(2).hashTabs();
      }, ReferenceError);
    });
    test("Updates href on click", function() {
      this.$tabContainer.find("a[href*='#tab2']").trigger("click");
      return strictEqual(window.location.hash, "#tab2");
    });
    test("displays correct tab, corresponding to current browser URL", function() {
      var $tab2, $tabSections, $tabs;
      expect(2);
      window.location.hash = "tab2";
      $tabs = this.$tabContainer.first().hashTabs();
      $tabSections = $tabs.find("section");
      $tab2 = $tabSections.eq(2);
      equal($tab2.is(":visible"), true);
      return equal($tabSections.filter($tab2).is(":visible"), false);
    });
    test("Shows correct tab when overridden in options", function() {
      var $tab2, $tabSections, $tabs;
      expect(3);
      $tabs = this.$tabContainer.first().hashTabs({
        initialTabToShow: 2
      });
      $tabSections = $tabs.find("section");
      $tab2 = $tabSections.eq(2);
      equal($tab2.is(":visible"), true);
      equal($tabSections.filter($tab2).is(":visible"), false);
      return equal(window.location.hash, "#tab2");
    });
    test("Adds active class to clicked tab", function() {
      var $firstTab, $tabs;
      $tabs = this.$tabContainer.first().hashTabs();
      $firstTab = $tabs.find("nav a:first").trigger("click");
      return equal($firstTab.hasClass("active"), true);
    });
    test("Removes active class to previously-clicked tab", function() {
      var $firstTab, $secondTab, $tabs;
      $tabs = this.$tabContainer.first().hashTabs();
      $firstTab = $tabs.find("nav a:first").trigger("click");
      $secondTab = $tabs.find("nav a").eq(2).trigger("click");
      return equal($firstTab.hasClass("active"), false);
    });
    test("Contains wai-aria accessibility tags", function() {
      var $nav, $navButtons, $tabPanels, $tabs;
      expect(7);
      $tabs = this.$tabContainer.first().hashTabs();
      $nav = $tabs.find("nav:first");
      $navButtons = $nav.find("a");
      $tabPanels = $tabs.find("section");
      equal($nav.is("[role*='tablist']"), true);
      equal($navButtons.is("[tabindex]"), true);
      equal($navButtons.is("[aria-controls]"), true);
      equal($navButtons.is("[aria-expanded]"), true);
      equal($navButtons.is("[aria-selected]"), true);
      equal($navButtons.is("[role*='tab']"), true);
      equal($tabPanels.is("[role*='tabpanel']"), true);
      return equal($tabPanels.is("[aria-labeledby]"), true);
    });
    return test("Navigates to previous and next tabs using arrow keys on keyboard", function() {
      var $firstTab, $secondTab, $tabSections, $tabs, leftArrowKeyPress, rightArrowKeyPress;
      expect(3);
      $tabs = this.$tabContainer.first().hashTabs();
      $secondTab = $tabs.find("nav a").eq(2).trigger("click");
      $firstTab = $tabs.find("nav a").first();
      $tabSections = $tabs.find("section");
      equal($firstTab.hasClass("active"), true);
      leftArrowKeyPress = $.Event("keydown");
      leftArrowKeyPress.keyCode = 9;
      $(document).trigger(leftArrowKeyPress);
      equal($tabSections.filter($firstTab[0].href).is(":visible"), true);
      rightArrowKeyPress = leftArrowKeyPress;
      rightArrowKeyPress.keyCode = 10;
      return equal($tabSections.filter($secondTab[0].href).is(":visible"), true);
    });
  })(jQuery);

}).call(this);

//# sourceMappingURL=hash-tabs_test.map
