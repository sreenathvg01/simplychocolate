/** Shopify CDN: Minification failed

Line 1284:15 Transforming let to the configured target environment ("es5") is not supported yet
Line 1615:5 Transforming const to the configured target environment ("es5") is not supported yet
Line 1652:5 Transforming const to the configured target environment ("es5") is not supported yet
Line 1760:5 Transforming const to the configured target environment ("es5") is not supported yet
Line 1797:5 Transforming const to the configured target environment ("es5") is not supported yet

**/
window.slate = window.slate || {};
window.theme = window.theme || {};

/*================ Slate ================*/
/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

slate.a11y = {

  /**
   * For use when focus shifts to a container rather than a link
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects if focusing a link, just $link.focus();
   *
   * @param {JQuery} $element - The element to be acted upon
   */
  pageLinkFocus: function($element) {
    var focusClass = 'js-focus-hidden';

    $element.first()
      .attr('tabIndex', '-1')
      .focus()
      .addClass(focusClass)
      .one('blur', callback);

    function callback() {
      $element.first()
        .removeClass(focusClass)
        .removeAttr('tabindex');
    }
  },

  /**
   * If there's a hash in the url, focus the appropriate element
   */
  focusHash: function() {
    var hash = window.location.hash;

    // is there a hash in the url? is it an element on the page?
    if (hash && document.getElementById(hash.slice(1))) {
      this.pageLinkFocus($(hash));
    }
  },

  /**
   * When an in-page (url w/hash) link is clicked, focus the appropriate element
   */
  bindInPageLinks: function() {
    $('a[href*=#]').on('click', function(evt) {
      this.pageLinkFocus($(evt.currentTarget.hash));
    }.bind(this));
  },

  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  trapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
    }

    options.$container.attr('tabindex', '-1');
    options.$elementToFocus.focus();

    $(document).on(eventName, function(evt) {
      if (options.$container[0] !== evt.target && !options.$container.has(evt.target).length) {
        options.$container.focus();
      }
    });
  },

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  removeTrapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }

    $(document).off(eventName);
  }
};

/**
 * Cart Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Cart template.
 *
 * @namespace cart
 */

slate.cart = {
  
  /**
   * Browser cookies are required to use the cart. This function checks if
   * cookies are enabled in the browser.
   */
  cookiesEnabled: function() {
    var cookieEnabled = navigator.cookieEnabled;

    if (!cookieEnabled){
      document.cookie = 'testcookie';
      cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
    }
    return cookieEnabled;
  }
};

/**
 * Utility helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions for dealing with arrays and objects
 *
 * @namespace utils
 */

slate.utils = {

  /**
   * Return an object from an array of objects that matches the provided key and value
   *
   * @param {array} array - Array of objects
   * @param {string} key - Key to match the value against
   * @param {string} value - Value to get match of
   */
  findInstance: function(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
  },

  /**
   * Remove an object from an array of objects by matching the provided key and value
   *
   * @param {array} array - Array of objects
   * @param {string} key - Key to match the value against
   * @param {string} value - Value to get match of
   */
  removeInstance: function(array, key, value) {
    var i = array.length;
    while(i--) {
      if (array[i][key] === value) {
        array.splice(i, 1);
        break;
      }
    }

    return array;
  },

  /**
   * _.compact from lodash
   * Remove empty/false items from array
   * Source: https://github.com/lodash/lodash/blob/master/compact.js
   *
   * @param {array} array
   */
  compact: function(array) {
    var index = -1;
    var length = array == null ? 0 : array.length;
    var resIndex = 0;
    var result = [];

    while (++index < length) {
      var value = array[index];
      if (value) {
        result[resIndex++] = value;
      }
    }
    return result;
  },

  /**
   * _.defaultTo from lodash
   * Checks `value` to determine whether a default value should be returned in
   * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
   * or `undefined`.
   * Source: https://github.com/lodash/lodash/blob/master/defaultTo.js
   *
   * @param {*} value - Value to check
   * @param {*} defaultValue - Default value
   * @returns {*} - Returns the resolved value
   */
  defaultTo: function(value, defaultValue) {
    return (value == null || value !== value) ? defaultValue : value
  }
};

/**
 * Rich Text Editor
 * -----------------------------------------------------------------------------
 * Wrap iframes and tables in div tags to force responsive/scrollable layout.
 *
 * @namespace rte
 */

slate.rte = {
  /**
   * Wrap tables in a container div to make them scrollable when needed
   *
   * @param {object} options - Options to be used
   * @param {jquery} options.$tables - jquery object(s) of the table(s) to wrap
   * @param {string} options.tableWrapperClass - table wrapper class name
   */
  wrapTable: function(options) {
    var tableWrapperClass = typeof options.tableWrapperClass === "undefined" ? '' : options.tableWrapperClass;

    options.$tables.wrap('<div class="' + tableWrapperClass + '"></div>');
  },

  /**
   * Wrap iframes in a container div to make them responsive
   *
   * @param {object} options - Options to be used
   * @param {jquery} options.$iframes - jquery object(s) of the iframe(s) to wrap
   * @param {string} options.iframeWrapperClass - class name used on the wrapping div
   */
  wrapIframe: function(options) {
    var iframeWrapperClass = typeof options.iframeWrapperClass === "undefined" ? '' : options.iframeWrapperClass;

    options.$iframes.each(function() {
      // Add wrapper to make video responsive
      $(this).wrap('<div class="' + iframeWrapperClass + '"></div>');
      
      // Re-set the src attribute on each iframe after page load
      // for Chrome's "incorrect iFrame content on 'back'" bug.
      // https://code.google.com/p/chromium/issues/detail?id=395791
      // Need to specifically target video and admin bar
      this.src = this.src;
    });
  }
};

slate.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:section:reorder', this._onReorder.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

slate.Sections.prototype = $.extend({}, slate.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (typeof constructor === 'undefined') {
      return;
    }

    var instance = $.extend(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (!instance) {
      return;
    }

    if (typeof instance.onUnload === 'function') {
      instance.onUnload(evt);
    }

    this.instances = slate.utils.removeInstance(this.instances, 'id', evt.detail.sectionId);
  },

  _onSelect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onSelect === 'function') {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onDeselect === 'function') {
      instance.onDeselect(evt);
    }
  },

  _onReorder: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onReorder === 'function') {
      instance.onReorder(evt);
    }
  },

  _onBlockSelect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onBlockSelect === 'function') {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onBlockDeselect === 'function') {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

slate.Currency = (function () {
  var moneyFormat = '${{amount}}';

  /**
   * Format money values based on your shop currency settings
   * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
   * or 3.00 dollars
   * @param  {String} format - shop money_format setting
   * @return {String} value - formatted value
   */
  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = slate.utils.defaultTo(precision, 2);
      thousands = slate.utils.defaultTo(thousands, ',');
      decimal = slate.utils.defaultTo(decimal, '.');

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  };
})();

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

slate.Image = (function() {

  /**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */

  function preload(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  }

  /**
   * Loads and caches an image in the browsers cache.
   * @param {string} path - An image url
   */
  function loadImage(path) {
    new Image().src = path;
  }

  /**
   * Find the Shopify image attribute size
   *
   * @param {string} src
   * @returns {null}
   */
  function imageSize(src) {
    var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);

    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  /**
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */
  function getSizedImageUrl(src, size) {
    if (size === null) {
      return src;
    }

    if (size === 'master') {
      return this.removeProtocol(src);
    }

    var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

    if (match) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    } else {
      return null;
    }
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }

  return {
    preload: preload,
    loadImage: loadImage,
    imageSize: imageSize,
    getSizedImageUrl: getSizedImageUrl,
    removeProtocol: removeProtocol
  };
})();

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist. Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

slate.Variants = (function() {

  /**
   * Variant constructor
   *
   * @param {object} options - Settings from `product.js`
   */
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector, this.$container).on('change', this._onSelectChange.bind(this));
  }

  Variants.prototype = $.extend({}, Variants.prototype, {

    /**
     * Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     *
     * @return {array} options - Values of currently selected variants
     */
    _getCurrentOptions: function() {
      var currentOptions = $.map($(this.singleOptionSelector, this.$container), function(element) {
        var $element = $(element);
        var type = $element.attr('type');
        var currentOption = {};

        if (type === 'radio' || type === 'checkbox') {
          if ($element[0].checked) {
            currentOption.value = $element.val();
            currentOption.index = $element.data('index');

            return currentOption;
          } else {
            return false;
          }
        } else {
          currentOption.value = $element.val();
          currentOption.index = $element.data('index');

          return currentOption;
        }
      });

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = slate.utils.compact(currentOptions);

      return currentOptions;
    },

    /**
     * Find variant based on selected values.
     *
     * @param  {array} selectedValues - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function() {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;
      var found = false;

      variants.forEach(function(variant) {
        var satisfied = true;

        selectedValues.forEach(function(option) {
          if (satisfied) {
            satisfied = (option.value === variant[option.index]);
          }
        });

        if (satisfied) {
          found = variant;
        }
      });

      return found || null;
    },

    /**
     * Event handler for when a variant input changes.
     */
    _onSelectChange: function() {
      var variant = this._getVariantFromOptions();

      this.$container.trigger({
        type: 'variantChange',
        variant: variant
      });

      if (!variant) {
        return;
      }

      this._updateMasterSelect(variant);
      this._updateImages(variant);
      this._updatePrice(variant);
      this.currentVariant = variant;

      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
    },

    /**
     * Trigger event when variant image changes
     *
     * @param  {object} variant - Currently selected variant
     * @return {event}  variantImageChange
     */
    _updateImages: function(variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (!variant.featured_image || variantImage.src === currentVariantImage.src) {
        return;
      }

      this.$container.trigger({
        type: 'variantImageChange',
        variant: variant
      });
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantPriceChange
     */
    _updatePrice: function(variant) {
      if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price) {
        return;
      }

      this.$container.trigger({
        type: 'variantPriceChange',
        variant: variant
      });
    },

    /**
     * Update history state for product deeplinking
     *
     * @param {object} variant - Currently selected variant
     */
    _updateHistoryState: function(variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
      window.history.replaceState({path: newurl}, '', newurl);
    },

    /**
     * Update hidden master select of variant change
     *
     * @param {object} variant - Currently selected variant
     */
    _updateMasterSelect: function(variant) {
      $(this.originalSelectorId, this.$container)[0].value = variant.id;
    }
  });

  return Variants;
})();


/*================ Utilities ================*/
/**
* Responsive Script
* ------------------------------------------------------------------------------
* A file that contains scripts highly couple code to the Responsive utility.
*
* @namespace Responsive
*/

theme.Responsive = (function() {
  function Responsive() {

    _classCallCheck(this, Responsive);

    this.currentBreakpoint = Responsive.getCurrentBreakpoint();

    window.addEventListener('resize', function () {
      var newBreakpoint = Responsive.getCurrentBreakpoint();

      if (this.currentBreakpoint === newBreakpoint) {
        return;
      }

      document.dispatchEvent(new CustomEvent('breakpoint:changed', { detail: {
        previousBreakpoint: this.currentBreakpoint,
        currentBreakpoint: newBreakpoint
      } }));

      this.currentBreakpoint = newBreakpoint;
    });
  };

  Responsive.prototype.matchesBreakpoint = function(breakpoint) {
    switch (breakpoint) {
      case 'small':
      return window.matchMedia('screen and (max-width: 640px)').matches;

      case 'medium':
      return window.matchMedia('screen and (min-width: 641px) and (max-width: 1007px)').matches;

      case 'medium-up':
      return window.matchMedia('screen and (min-width: 641px)').matches;

      case 'medium-down':
      return window.matchMedia('screen and (max-width: 1007px)').matches;

      case 'large':
      return window.matchMedia('screen and (min-width: 1008px) and (max-width: 1279px)').matches;

      case 'large-up':
      return window.matchMedia('screen and (min-width: 1008px)').matches;

      case 'desktop':
      return window.matchMedia('screen and (min-width: 1280px)').matches;

      case 'widescreen':
      return window.matchMedia('screen and (min-width: 1600px)').matches;
    }
  };

  Responsive.prototype.getCurrentBreakpoint = function() {
    if (window.matchMedia('screen and (max-width: 640px)').matches) {
      return 'small';
    }

    if (window.matchMedia('screen and (min-width: 641px) and (max-width: 1007px)').matches) {
      return 'medium';
    }

    if (window.matchMedia('screen and (min-width: 1008px) and (max-width: 1279px)').matches) {
      return 'large';
    }

    if (window.matchMedia('screen and (min-width: 1280px)').matches) {
      return 'desktop';
    }
  };

  return Responsive;
})();

/**
* Carousels Script
* ------------------------------------------------------------------------------
* A file that contains scripts highly couple code to the Carousel utility.
*
* @namespace Carousels
*/

theme.Carousels = (function() {
  function Carousels(element) {

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Carousels);

    this.element = element;
    this.initialConfig = $(element).data('flickity-config');
    this.options = options;

    console.log(this.initialConfig);

    this._attachListeners();
    this._build();

  };

  Carousels.prototype.destroy = function() {
    this.flickityInstance.destroy();

    if (this.initialConfig['breakpoints'] !== undefined) {
      document.removeEventListener('breakpoint:changed', this._onBreakpointChangedListener);
    }
  };

  Carousels.prototype.selectCell = function(index) {
    var shouldPause = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var shouldAnimate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (shouldPause) {
      this.flickityInstance.pausePlayer();
    }

    this.flickityInstance.select(index, false, !shouldAnimate);
  };

  Carousels.prototype.pausePlayer = function() {
    this.flickityInstance.pausePlayer();
  };

  Carousels.prototype.unpausePlayer = function() {
    this.flickityInstance.unpausePlayer();
  };

  Carousels.prototype.resize = function() {
    this.flickityInstance.resize();
  };

  Carousels.prototype.getSelectedIndex = function() {
    return this.flickityInstance.selectedIndex;
  };

  Carousels.prototype.getSelectedCell = function() {
    return this.flickityInstance.selectedCell.element;
  };

  Carousels.prototype._attachListeners = function() {
    if (this.initialConfig['breakpoints'] !== undefined) {
      this._onBreakpointChangedListener = this._onBreakpointChanged.bind(this);
      document.addEventListener('breakpoint:changed', this._onBreakpointChangedListener);
    }
  };

  /**
  * Create the carousel instance
  */

  Carousels.prototype._build = function() {
    var _this = this;

    var config = this._processConfig();

    this.flickityInstance = new Flickity(this.element, config);
    this._validateDraggable();

    this.selectedIndex = this.flickityInstance.selectedIndex;

    this.flickityInstance.on('resize', this._validateDraggable.bind(this));

    if (this.options['onSelect']) {
      this.flickityInstance.on('select', function () {
        // Flickity will send the "select" event whenever the window resize (even on mobile...), as a consequence we need to check
        // first if the slide index have changed or not (cf: https://github.com/metafizzy/flickity/issues/529)

        if (_this.selectedIndex !== _this.flickityInstance.selectedIndex) {
          _this.options['onSelect'](_this.flickityInstance.selectedIndex, _this.flickityInstance.selectedCell.element);
          _this.selectedIndex = _this.flickityInstance.selectedIndex;
        }
      });
    }

    if (this.options['onClick']) {
      this.flickityInstance.on('staticClick', function (event, pointer, cell, index) {
        _this.options['onClick'](cell, index);
      });
    }
  };

  /**
  * By default, Flickity does not disable draggable automatically if there is nothing to slide. We therefore manually do the check here by checking
  * if the displayed elements equals to the amount of elements
  */

  Carousels.prototype._validateDraggable = function() {
    var isActive = this.flickityInstance.isActive || false;

    if (!isActive || !this.flickityInstance.options['draggable']) {
      return; // Not draggable, so nothing to do
    }

    if (undefined === this.flickityInstance.selectedElements || this.flickityInstance.selectedElements.length === this.flickityInstance.cells.length) {
      this.flickityInstance.unbindDrag();
    } else {
      this.flickityInstance.bindDrag();
    }
  };

  /**
  * Flickity is a CSS driven library and hence it is hard to setup some stuff in pure JS
  */

  Carousels.prototype._processConfig = function() {
    var config = Object.assign({}, this.initialConfig);

    delete config['breakpoints'];

    if (this.initialConfig['breakpoints'] === undefined) {
      return config; // No change, we simply return the config as it is
    }

    var breakpoints = this.initialConfig['breakpoints'];

    breakpoints.forEach(function (breakpoint) {
      if (theme.Responsive.matchesBreakpoint(breakpoint['matches'])) {
        config = Object.assign(config, breakpoint['settings']);
      }
    });

    return config;
  };

  /**
  * Verify if the breakpoint has changed, and optionally update the carousel
  */

  Carousels.prototype._onBreakpointChanged = function() {
    // The breakpoint may have changed, so we delete the carousel and rebuild it
    this.flickityInstance.destroy();
    this._build();
  };

return Carousels;

})();

/**
 * Modals Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Modals utility.
 *
   * @namespace Modals
 */

 theme.Modals = (function() {
   function Modal(id, name, options) {
     var defaults = {
       close: '.js-modal-close',
       open: '.js-modal-open-' + name,
       openClass: 'modal--is-active',
       closingClass: 'modal--is-closing',
       bodyOpenClass: 'modal-is-open',
       bodyOpenSolidClass: 'modal-open--solid',
       bodyClosingClass: 'modal-closing',
       closeOffContentClick: true
     };

     this.id = id;
     this.$modal = $('#' + id);

     if (!this.$modal.length) {
       return false;
     }

     this.nodes = {
       $parent: $('html').add('body'),
       $modalContent: this.$modal.find('.modal__inner')
     };

     this.config = $.extend(defaults, options);
     this.modalIsOpen = false;
     this.$focusOnOpen = this.config.focusOnOpen ? $(this.config.focusOnOpen) : this.$modal;
     this.isSolid = this.config.solid;

     this.init();
   }

   Modal.prototype.init = function() {
     var $openBtn = $(this.config.open);

     // Add aria controls
     $openBtn.attr('aria-expanded', 'false');

     $(this.config.open).on('click', this.open.bind(this));
     this.$modal.find(this.config.close).on('click', this.close.bind(this));

     // Close modal if a drawer is opened
     $('body').on('drawerOpen', function() {
       this.close();
     }.bind(this));
   };

   Modal.prototype.open = function(evt) {
     // Keep track if modal was opened from a click, or called by another function
     var externalCall = false;

     // don't open an opened modal
     if (this.modalIsOpen) {
       return;
     }

     // Prevent following href if link is clicked
     if (evt) {
       evt.preventDefault();
     } else {
       externalCall = true;
     }

     // Without this, the modal opens, the click event bubbles up to $nodes.page
     // which closes the modal.
     if (evt && evt.stopPropagation) {
       evt.stopPropagation();
       // save the source of the click, we'll focus to this on close
       this.$activeSource = $(evt.currentTarget);
     }

     if (this.modalIsOpen && !externalCall) {
       this.close();
     }

     this.$modal
       .prepareTransition()
       .addClass(this.config.openClass);
     this.nodes.$parent.addClass(this.config.bodyOpenClass);

     if (this.isSolid) {
       this.nodes.$parent.addClass(this.config.bodyOpenSolidClass);
     }

     this.modalIsOpen = true;


     if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
       this.$activeSource.attr('aria-expanded', 'true');
     }

     $('body').trigger('modalOpen.' + this.id);

     this.bindEvents();
   };

   Modal.prototype.close = function() {
     // don't close a closed modal
     if (!this.modalIsOpen) {
       return;
     }

     // deselect any focused form elements
     $(document.activeElement).trigger('blur');

     this.$modal
       .prepareTransition()
       .removeClass(this.config.openClass)
       .addClass(this.config.closingClass);
     this.nodes.$parent.removeClass(this.config.bodyOpenClass);
     this.nodes.$parent.addClass(this.config.bodyClosingClass);
     var o = this;
     window.setTimeout(function() {
       o.nodes.$parent.removeClass(o.config.bodyClosingClass);
       o.$modal.removeClass(o.config.closingClass);
     }, 500); // modal close css transition

     if (this.isSolid) {
       this.nodes.$parent.removeClass(this.config.bodyOpenSolidClass);
     }

     this.modalIsOpen = false;


     if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
       this.$activeSource.attr('aria-expanded', 'false').focus();
     }

     $('body').trigger('modalClose.' + this.id);

     this.unbindEvents();
   };

   Modal.prototype.bindEvents = function() {
     // Pressing escape closes modal
     this.nodes.$parent.on('keyup.modal', function(evt) {
       if (evt.keyCode === 27) {
         this.close();
       }
     }.bind(this));

     if (this.config.closeOffContentClick) {
       // Clicking outside of the modal content also closes it
       this.$modal.on('click.modal', this.close.bind(this));

       // Exception to above: clicking anywhere on the modal content will NOT close it
       this.nodes.$modalContent.on('click.modal', function(evt) {
         evt.stopImmediatePropagation();
       });
     }
   };

   Modal.prototype.unbindEvents = function() {
     this.nodes.$parent.off('.modal');

     if (this.config.closeOffContentClick) {
       this.$modal.off('.modal');
       this.nodes.$modalContent.off('.modal');
     }
   };

   return Modal;
 })();


/*================ Sections ================*/
/**
 * Shop Switch Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Shop Switch module.
 *
   * @namespace ShopSwitch
 */

 theme.ShopSwitch = (function() {

   function ShopSwitch(container) {
     var $container = this.$container = $(container);
     var sectionId = $container.attr('data-section-id');
     this.cookieName = $container.data('cookie-name');

     if (!$container.length) {
       return;
     }

     this.data = {
       secondsBeforeShow: $container.data('delay-seconds'),
       daysBeforeReappear: $container.data('delay-days'),
       cookie: $.cookie(this.cookieName),
       testMode: $container.data('test-mode'),
       sortCountries: $container.data('sort-countries'),
       mode: $container.data('mode'),
       blockType: $container.data('block-type'),
       switcherEnable: $container.data('switcher-enable'),
       switcherTemplate: $container.data('switcher-template'),
       countryTemplate: $container.data('country-template'),
       socialReferrer: (document.referrer.includes('facebook.com/') || document.referrer.includes('instagram.com/') || document.referrer.includes('snapppt.com/')),
       isBot: /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(navigator.userAgent),
       apiUrl: $container.data('api-url')
     };

     if($container.data('countries').length) {
       try {
         this.data.countries = JSON.parse($container.data('countries'));
       } catch(e) {
         this.data.countries = [];
         console.error('[Shop Switch] There was an error reading the countries.');
       }
     }

     this.data.currentCountry = _.find(this.data.countries, function(o) { return o.current }) || {};

     this.modal = new theme.Modals('ShopSwitch-' + sectionId, 'storeswitcher-popup-modal');

     // Make openPopup available on window
     window.openshopswitch = (function() {
       this.openPopup();
     }).bind(this);

     if (window.top.location.search.indexOf('switch') !== -1) {
       this.setCookie();
       this.data.cookie = this.data.currentCountry.domain;
     }

     console.info('%c[Shop Switch] ' + '%cCookie: ' + this.data.cookie, 'color: blue;', 'color: black;');

     if (!this.data.isBot) {

        if (this.data.cookie != this.data.currentCountry.domain || this.data.socialReferrer || this.data.testMode) {

          $.getJSON( this.data.apiUrl, (function( json ) {
            this.handleLocation( json.country_code );
          }).bind(this))
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('ipstack request failed: ' + textStatus);
          });

        }
     }

     $('body').on('modalClose.' + $container.attr('id'), this.closePopup.bind(this));

     // Check if the switcher is enabled
     if (this.data.switcherEnable) {
       // Build dropdown
       var context = {
         currentTitle: this.data.currentCountry.title,
         currentImg: this.data.currentCountry.img,
         currentCurrency: this.data.currentCountry.currency,
         countries: _.sortBy(this.data.countries, [function(o) { return !o.current; }])
       };

       var template = Mustache.render(this.data.switcherTemplate, context);

       // Add final dropdown html to wrappers
       $('.shop-switch__switcher').each(function() {
         $(this).html(template);
       })

     }

     if (this.data.blockType == 'regions') {

       _.each(this.data.countries, (function(country) {

         // Build country
         var context = {
           country: country
         };

         var template = Mustache.render(this.data.countryTemplate, context);

         // Add final dropdown html to wrappers
         $('.shop-switch__continent[data-continent=' + country.continent_code + '] .continent__countries').append(template);

         $('.shop-switch__continent[data-continent=' + country.continent_code + ']').removeClass('continent--empty');

       }).bind(this));

       if (this.data.sortCountries) {
         $('.shop-switch__continent .continent__countries').each(function() {
           var continent = $(this).data('continent');
           var ordered = $(this).find('.shop-switch__country').sort(function(a, b) {
             return String.prototype.localeCompare.call($(a).data('country').toLowerCase(), $(b).data('country').toLowerCase());
           });
           $(this).empty();
           ordered.appendTo(this);
         })
       }

     }

     window.ShopSwitch = this;

   }

   ShopSwitch.prototype = $.extend({}, ShopSwitch.prototype, {

     handleLocation : function(locationData) {

       if (_.isUndefined(locationData)) {
         if(this.data.testMode) console.error('Could not get location based on IP.');
         return;
       }

       var ipCountryCode = locationData;
       if(this.data.testMode) console.log('[Shop Switch] Your location: ' + ipCountryCode);

       // Check if the desired country is available by index
       var ip_index = _.findIndex(this.data.countries, (o) => {
             if (o.country_code.includes(',')) {
               let countryCodes = o.country_code.split(',');
               for (var i = 0; i < countryCodes.length; i++) {
                 if (countryCodes[i] == ipCountryCode) {
                   return true;
                 }
               }
             } else {
               return o.country_code == ipCountryCode;
             }
           }),
           default_index = _.findIndex(this.data.countries, function(o) { return o.default; }),
           current_index = _.findIndex(this.data.countries, function(o) { return o.current; });

       // Only get domain for IP if a dedicated store exists
       if (ip_index >= 0) var ip_domain = this.data.countries[ip_index].domain;
       var default_domain = this.data.countries[default_index].domain,
           current_domain = this.data.countries[current_index].domain;

       // Is country from IP in our list AND is that the current shop?
       if (!_.isUndefined(ip_domain) && current_domain == ip_domain) {
         // Do nothing
       }
       // Is country from IP NOT in our list AND are we on the default shop?
       else if (_.isUndefined(ip_domain) && current_domain == default_domain) {
         // Do nothing
       } else {
         // Is country from IP in our list?
         if (!_.isUndefined(ip_domain)) {
           var new_domain = ip_domain;
         }
         // Go to default
         else {
           var new_domain = default_domain;
         }

         if(this.data.testMode) console.info('[Shop Switch] Designated shop: ' + new_domain);

         // Show the modal content for the designated country
         if (this.data.blockType == 'stores') {
           $('#' + this.data.countries[_.findIndex(this.data.countries, function(o) { return o.domain == new_domain})].id).show();
         }

         // Open the modal
         if (this.data.mode == 'enabled' || this.data.testMode) {
           this.initPopupDelay();
         } else if(this.data.mode == 'redirect') {
           if(this.data.testMode) console.log('[Shop Switch] Redirecting...');
           if (window.location.search.indexOf('design_theme_id') !== -1) {
             // Warn if redirect inside theme editor
             if(this.data.testMode) console.warn('[Shop Switch] Cannot redirect from Theme Editor.\nWould have redirected to: ' + this.data.countries[new_index].url);
           } else {
             var new_index = _.findIndex(this.data.countries, function(o) {
               return o.domain == new_domain;
             });

             this.redirect(this.data.countries[new_index].url);
           }
         }
       }

     },

     initPopupDelay: function() {

       setTimeout(function() {
         this.modal.open();
       }.bind(this), this.data.secondsBeforeShow * 1000);

     },

     redirect: function(url) {
       window.top.location.replace(url);
     },

     openPopup: function() {
       this.modal.open();
     },

     closePopup: function() {
       // Remove a cookie in case it was set in test mode

       if (this.data.testMode) {
         $.removeCookie(this.cookieName, { path: '/' });
         return;
       }

       this.setCookie();
     },

     setCookie: function() {
       $.cookie(this.cookieName, this.data.currentCountry.domain, { path: '/', expires: this.data.daysBeforeReappear });
     },

     onLoad: function() {
       this.modal.open();
       console.log('load');
     },

     onSelect: function() {
       this.modal.open();
       console.log('select');
     },

     onDeselect: function() {
       this.modal.close();
     },

     onBlockSelect: function(event) {
       if (!this.modal.modalIsOpen) {
         this.modal.open();
       }
       $(event.target).show();
     },

     onBlockDeselect: function(event) {
       $(event.target).hide();
     },

     onUnload: function() {}
   });

   return ShopSwitch;
 })();

/**
 * Variant Collection
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly coupled code to the Wear-it-with module.
 *
 * @namespace WearItWith
 */

theme.WearItWith = (function() {

  function WearItWith(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');

    if (!$container.length) {
      return;
    }

    this.data = {
      carouselElement: $($container).find('.wear-it-with__carousel')[0]
    };

    if (this.data.carouselElement != undefined) {
      this.carousel = new theme.Carousels(this.data.carouselElement);
    }

  }

  WearItWith.prototype = $.extend({}, WearItWith.prototype, {
    onUnload: function() {
      this.$container.off(this.settings.eventNamespace);
    }
  });

  return WearItWith;

})();

/**
 * Shop Switch Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Shop Switch module.
 *
   * @namespace CookieBanner
 */

 theme.CookieBanner = (function() {

   function CookieBanner(container) {
     var $container = this.$container = $(container);
     var sectionId = $container.attr('data-section-id');
     this.cookieName = $container.data('cookie-name');

     if (!$container.length) {
       return;
     }

     this.elements = {
       declineButton: $container.find('#cookieDecline'),
       cookieFunctions: $container.find('#cookieFunctions'),
       cookieBannerInner: $container.find('#cookieBannerInner'),
       readMoreButton: $container.find('#cookieReadMore')
     }

     this.data = {
       secondsBeforeShow: $container.data('delay-seconds'),
       daysBeforeReappear: $container.data('delay-days'),
       cookie: $.cookie(this.cookieName),
       testMode: $container.data('test-mode'),
       mode: $container.data('mode')
     };

     this.modal = new theme.Modals('CookieBanner-' + sectionId, 'cookiebanner-popup-modal', {
       bodyOpenClass: 'modal-open--scrollable'
     });

     this.elements.declineButton.on('click', (event) => {
       this.handleCookieDecline();
     });

     this.elements.readMoreButton.on('click', (event) => {
       this.elements.cookieBannerInner.toggleClass('expanded');
       this.elements.cookieFunctions.toggleClass('open');
     });

     console.info('%c[Cookie Banner] ' + '%cCookie: ' + this.data.cookie, 'color: blue;', 'color: black;');

     $('body').on('modalClose.' + $container.attr('id'), this.closePopup.bind(this));

     // Open the modal
     if (this.data.mode == 'enabled' || this.data.testMode) {
       if (_.isUndefined(this.data.cookie) || this.data.testMode) {
         this.initPopupDelay();
       }
     }

     window.CookieBanner = this;

   }

   CookieBanner.prototype = $.extend({}, CookieBanner.prototype, {

     initPopupDelay: function() {

       setTimeout(function() {
         this.openPopup();
       }.bind(this), this.data.secondsBeforeShow * 1000);

     },

     openPopup: function() {
       this.modal.nodes.$modalContent = this.$container.find('.cookie-banner-bar');
       this.modal.open();
     },

     openPopup: function() {
       this.modal.nodes.$modalContent = this.$container.find('.cookie-banner-bar');
       this.modal.open();
     },

     handleCookieDecline: function() {
       this.closePopup();
       if (confirm("Du kan ikke bruge vores website uden cookies. Er du sikker?")) {
         this.elements.cookieBannerInner.addClass('expanded');
         this.elements.cookieFunctions.addClass('open');
         this.elements.declineButton.prop('disabled', true);
       } else {
         this.openPopup();
       }
     },

     closePopup: function() {
       // Remove a cookie in case it was set in test mode

       this.elements.cookieBannerInner.removeClass('expanded');
       this.elements.cookieFunctions.removeClass('open');
       this.elements.declineButton.prop('disabled', false);

       if (this.data.testMode) {
         $.removeCookie(this.cookieName, { path: '/' });
         return;
       }

       this.setCookie();
     },

     setCookie: function() {
       $.cookie(this.cookieName, true, { path: '/', expires: this.data.daysBeforeReappear });
     },

     onLoad: function() {
       this.openPopup();
       console.log('load');
     },

     onSelect: function() {
       this.openPopup();
       console.log('select');
     },

     onDeselect: function() {
       this.modal.close();
     },

     onBlockSelect: function(event) {
       if (!this.modal.modalIsOpen) {
         this.openPopup();
       }
       $(event.target).show();
     },

     onBlockDeselect: function(event) {
       $(event.target).hide();
     },

     onUnload: function() {}
   });

   return CookieBanner;
 })();

// =require sections/module-cart-giftbox.js
/**
 * Shop Switch Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Shop Switch module.
 *
   * @namespace CartUpsaleItem
 */

 theme.CartUpsaleItem = (function() {
   function CartUpsaleItem(container) {
     var $container = this.$container = $(container);
     var sectionId = $container.attr('data-section-id');

     if (_.isUndefined($container.data('upsale-products'))) {
       return;
     };

     this.data = {
       products: JSON.parse($container.data('upsale-products')),
       inCart: $container.data('variants-cart').split(',')
     };
     var self = this;
     var select = document.getElementById('upsaleCheckBox');


     const inCart = this.data.inCart.map(x => x * 1);

     var itemsToRemove = false;
      if($(select).is(':checked')){
           itemsToRemove = true;
      }


    /* Gets a reference to the form element */
    var form = document.getElementById('upsaleTextarea');

    // Adds a listener for the "submit" event.
    /*form.addEventListener('submit', function(e) {
      // Prevents the default input from being submitted
      e.preventDefault();

    }); */ 
      /*
    // Append & Prepend the input before submitting
    $('.Cart__Checkout').click(function () {
        $('.Cart__Note').map(function () {
            $(this).val($(this).prepend('#cb#').append('#ce#');
            alert($(this).val());
        });
    });
    */

    $(select).click(function() {

     if (itemsToRemove) {
        //this.removeFromCart(this.data.products[0].product);
        Shopify.changeItem(self.data.products[0].product, 0, function(data) {
          window.location.reload();

        });
      }
    });
     const handleChange = (ev) => {

       if (!itemsToRemove) {
         if($(select).is(':checked')){

             Shopify.addItem(this.data.products[0].product, 1, function(data) {
               window.location.reload();

             });
             var itemsToRemove = true;
         }
       }
     }



     select.addEventListener( 'change', (ev) => {
       handleChange(ev);
     });

     $(document).on('cart:loaded', (detail) => {
        select = document.getElementById('upsaleCheckBox');
        select.addEventListener( 'change', (ev) => {
          handleChange(ev);
        });
     });

     window.CartUpsaleItem = this;

   }

   CartUpsaleItem.prototype = $.extend({}, CartUpsaleItem.prototype, {

     addToCart: function(variable) {
       // TODO: Disable checkbox when adding
       $(document).ready(function() {

         console.log(CartUpsaleItem);
         Shopify.addItem(variable, 1, function(data) {
           // window.location.reload();
           console.log(data);
         });
       });
       console.log('Adding product to cart: ' + variable);
       Shopify.addItem(variable, 1, function(data) {
         // window.location.reload();
         console.log(data);
       });
     },

     removeFromCart: function(variable) {
       // TODO: Disable checkbox when adding
       console.log('Removing product from cart: ' + variable);
       Shopify.changeItem(variable, 0, function(data) {
         console.log(data);
       });
     },

     onLoad: function() {
       console.log('load');
     },

     onSelect: function() {
       console.log('select');
     },

     onDeselect: function() {
     },

     onBlockSelect: function(event) {
     },

     onBlockDeselect: function(event) {
     },

     onUnload: function() {

     }
   });

   return CartUpsaleItem;
 })();

/**
 * Shop Switch Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Shop Switch module.
 *
   * @namespace CartUpsaleItemREZIP
 */

 theme.CartUpsaleItemREZIP = (function() {
   function CartUpsaleItemREZIP(container) {
     var $container = this.$container = $(container);
     var sectionId = $container.attr('data-section-id');

     if (_.isUndefined($container.data('upsale-products-rezip'))) {
       return;
     };

     this.data = {
       products: JSON.parse($container.data('upsale-products-rezip')),
       inCart: $container.data('variants-cart-rezip').split(',')
     };
     var self = this;
     var select = document.getElementById('upsaleCheckBoxREZIP');


     const inCart = this.data.inCart.map(x => x * 1);

     var itemsToRemove = false;
      if($(select).is(':checked')){
           itemsToRemove = true;
      }


    /* Gets a reference to the form element */
    var form = document.getElementById('upsaleTextarea');

    // Adds a listener for the "submit" event.
    /*form.addEventListener('submit', function(e) {
      // Prevents the default input from being submitted
      e.preventDefault();

    }); */
      /*
    // Append & Prepend the input before submitting
    $('.Cart__Checkout').click(function () {
        $('.Cart__Note').map(function () {
            $(this).val($(this).prepend('#cb#').append('#ce#');
            alert($(this).val());
        });
    });
    */

    $(select).click(function() {

     if (itemsToRemove) {
        //this.removeFromCart(this.data.products[0].product);
        Shopify.changeItem(self.data.products[0].product, 0, function(data) {
          window.location.reload();

        });
      }
    });
     const handleChange = (ev) => {

       if (!itemsToRemove) {
         if($(select).is(':checked')){

             Shopify.addItem(this.data.products[0].product, 1, function(data) {
               window.location.reload();

             });
             var itemsToRemove = true;
         }
       }
     }



     select.addEventListener( 'change', (ev) => {
       handleChange(ev);
     });

     $(document).on('cart:loaded', (detail) => {
        select = document.getElementById('upsaleCheckBoxREZIP');
        select.addEventListener( 'change', (ev) => {
          handleChange(ev);
        });
     });

     window.CartUpsaleItemREZIP = this;

   }

   CartUpsaleItemREZIP.prototype = $.extend({}, CartUpsaleItemREZIP.prototype, {

     addToCart: function(variable) {
       // TODO: Disable checkbox when adding
       $(document).ready(function() {

         console.log(CartUpsaleItemREZIP);
         Shopify.addItem(variable, 1, function(data) {
           // window.location.reload();
           console.log(data);
         });
       });
       console.log('Adding product to cart: ' + variable);
       Shopify.addItem(variable, 1, function(data) {
         // window.location.reload();
         console.log(data);
       });
     },

     removeFromCart: function(variable) {
       // TODO: Disable checkbox when adding
       console.log('Removing product from cart: ' + variable);
       Shopify.changeItem(variable, 0, function(data) {
         console.log(data);
       });
     },

     onLoad: function() {
       console.log('load');
     },

     onSelect: function() {
       console.log('select');
     },

     onDeselect: function() {
     },

     onBlockSelect: function(event) {
     },

     onBlockDeselect: function(event) {
     },

     onUnload: function() {

     }
   });

   return CartUpsaleItemREZIP;
 })();

/**
 * Variant Collection
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly coupled code to the Variants Collection module.
 *
 * @namespace HeaderCarousel
 */

theme.HeaderCarousel = (function() {

  function HeaderCarousel(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');

    if (!$container.length) {
      return;
    }

    this.data = {
      carouselElement: $($container).find('.Header__Carousel')[0]
    };

    if (this.data.carouselElement != undefined) {
      this.carousel = new theme.Carousels(this.data.carouselElement);
    }

  }

  HeaderCarousel.prototype = $.extend({}, HeaderCarousel.prototype, {
    onUnload: function() {
      this.$container.off(this.settings.eventNamespace);
    }
  });

  return HeaderCarousel;

})();

/**
 * QuickBuy Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Shop Switch module.
 *
   * @namespace QuickBuy
 */
 var function_count = 0;
 theme.QuickBuy = (function() {
   function QuickBuy(container) {

     var $container = this.$container = $(container);
     var sectionId = $container.attr('data-section-id');

     if (!$container.length) {
       return;
     }

     this.elements = {
       modal: $container.find('.modal__inner'),
       modalInner: $container.find('.modal__content')
     };

     this.modal = new theme.Modals(sectionId, 'quickbuy-popup');

     this.arrayOfProducts = $('[data-action="add-to-cart"]');

     // Public function for easy "onclick" HTML implementation
     window.openQuickBuy = this.loadProduct.bind(this);

     $('body').on('modalClose.' + $container.attr('id'),() => this.closePopup());

     document.addEventListener('cart:adding', this.closePopup.bind(this));

     window.QuickBuy = this;
   }

   QuickBuy.prototype = $.extend({}, QuickBuy.prototype, {

     loadProduct: function(url) {
       if (url.includes('?drawer')) {
         function_count = 0;
           $('body').on('modalClose.' + this.$container.attr('id'),() => this.reopenDrawer());
       }
       // Some links already has params on them. We clean the URL before using it
       if (url.includes('?')) {
         url = url.split('?')[0];
       }

       // Note: appending a timestamp is necessary as the polyfill on IE11 and lower does not support the "cache" property
        return fetch(url + '?view=ajax&timestamp=' + Date.now(), {
          credentials: 'same-origin',
          method: 'GET'
        }).then(content => {
          content.text().then(html => {
            var sections = new slate.Sections();
            this.elements.modalInner.html(html);
            sections.register('product-quickbuy', window.ProductSectionConstructor);
            this.openPopup();
            window.dispatchEvent(new Event('resize'));
          });
        });
     },

     openPopup: function() {
       this.modal.open();
     },

     closePopup: function() {
       // Remove a cookie in case it was set in test mode
       this.modal.close();
     },

    reopenDrawer: function() {

        if(function_count === 0){
            $('[data-action="open-drawer"][data-drawer-id="sidebar-cart"]')[0].click();
            function_count = 1;
        }

    },

     onLoad: function() {
       this.openPopup();
     },

     onSelect: function() {
       this.openPopup();
     },

     onDeselect: function() {
       this.modal.close();
     },

     onBlockSelect: function(event) {
       if (!this.modal.modalIsOpen) {
         this.openPopup();
       }
       $(event.target).show();
     },

     onBlockDeselect: function(event) {
       $(event.target).hide();
     },

     onUnload: function() {}
   });

   return QuickBuy;
 })();



/*================ Templates ================*/
/**
 * CART
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Cart.
 *
 * @namespace cart
 */

theme.cart = function() {

  /*************** Variables ***************/

  var config = {
    'agreementCheckbox': '#cartAgreementCheckbox'
  };

  console.log(config.agreementCheckbox);

  // Check that the agreement checkbox is clicked
  $('body').on('click', '[name=checkout]', function(ev) {

    if ($(config.agreementCheckbox).is(':checked')) {
      $(this).submit();
    }
    else {
      alert(window.languages.cartAgreeAlert);
      return false;
    }
  });

  //Cart note
      /*
      var text_max = $('.Cart__Note').attr('maxlength');
      $('#Cart__NoteCharacters').html(text_max + ' antal tegn tilbage');

      $('.Cart__Note').keyup(function() {
        var text_length = $('.Cart__Note').val().length;
        var text_remaining = text_max - text_length;
        $('#Cart__NoteCharacters').html(text_remaining + ' antal tegn tilbage');
      });
      */
};


$(document).ready(function() {

  // General scripts
    var sections = new slate.Sections();
    sections.register('shop-switch', theme.ShopSwitch);
    sections.register('cookie-banner', theme.CookieBanner);
    sections.register('cart', theme.CartUpsaleItem);
    sections.register('cart', theme.CartUpsaleItemREZIP);
    sections.register('header-carousel', theme.HeaderCarousel);
    sections.register('quickbuy', theme.QuickBuy);

});

var el = document.querySelector('.SectionHeader__Description--collection');
    $(el).click(function(ev) {
      var elHeight = el.scrollHeight;
      $(this).toggleClass('read-more');
      $(this).css({'height': $(this).hasClass('read-more') ? elHeight : ''})
    })
