(function (Modules) {
  "use strict";

  const registerKeyDownEscape = window.utils.registerKeyDownEscape;

  function toggleMenu($menuButton, $content) {
    // We need to revert the hidden and opacity operations when showing and
    // hiding the menu.

    // Show the menu..
    const show = $content.hasClass("hidden");
    $menuButton.attr("aria-expanded", show);
    if (show) {
      $content.toggleClass("hidden", false);
      // a11y: focus on the first anchor tag when the menu opens
      if ($content.find("a").length > 0) {
        $content.find("a")[0].focus();
      }
    }
    // Hide the menu..
    else {
      $content.removeClass("opacity-100");
      $content.addClass("opacity-0");
    }

    // In order to have the opacity transition effect working properly,
    // we need to separate the hidden and opacity toggling in two separate
    // actions in the HTML rendering, hence the delay of opacity by 1 ms.
    window.setTimeout(function () {
      if (show) {
        // show menu
        $content.removeClass("opacity-0");
        $content.addClass("opacity-100");
      } else {
        // hide menu
        $content.toggleClass("hidden", true);
      }
    }, 1);
  }

  function init($menuButton) {
    const contentId = "#" + $menuButton.attr("data-menu-overlay-content");
    const $content = $(contentId);

    const closeId = "#" + $menuButton.attr("data-menu-overlay-close");
    const $closeButton = $content.find(closeId);

    const fn = () => toggleMenu($menuButton, $content);
    $menuButton.click(fn);
    $closeButton.click(fn);
    registerKeyDownEscape($content, fn);
  }

  Modules.MenuOverlay = function () {
    this.start = function (component) {
      let $component = $(component);
      init($component);
    };
  };
})(window.GOVUK.Modules);
