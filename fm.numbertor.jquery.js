/*
 Numbertor jQuery Plugin
 Numbertor is a jQuery-based addon for input boxes, giving them a time sanitizer.
 version 1.0, Jan 13th, 2014
 by Ingi P. Jacobsen

 The MIT License (MIT)

 Copyright (c) 2014 Faroe Media

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($) {
	$.numbertor = function (element, options) {
		var defaults = {
			decimals:           'auto',
			decimal_seperator:  ',',
			thousand_seperator: '.',
			allow_empty:        false
		};

		var plugin = this;
		var $element = $(element);
		plugin.settings = {};


		// INITIALIZE PLUGIN
		plugin.init = function () {
			plugin.settings = $.extend({}, defaults, options);
			$element.addClass('numbertor');
			$element.bind('blur', sanitize);
			$element.bind('mouseup', unsanitize);
			$element.bind('mouseup', select);
			sanitize();
		};

		plugin.refresh = function () {
			sanitize();
		};

		var sanitize = function () {
			$element.val(sanitizeNumber($element.val(), plugin.settings.decimals, plugin.settings.decimal_seperator, plugin.settings.thousand_seperator));
		};

		var unsanitize = function () {
			$element.val(unsanitizeNumber($element.val(), plugin.settings.decimals, plugin.settings.decimal_seperator, plugin.settings.thousand_seperator));
		};
		
		var select = function () {
			$element.select();
		};
		
		var sanitizeNumber = function (number, decimals, decimal_seperator, thousand_seperator) {
			decimals = decimals === undefined ? 'auto' : decimals;
			decimal_seperator = decimal_seperator === undefined ? ',' : decimal_seperator;
			thousand_seperator = thousand_seperator === undefined ? '.' : thousand_seperator;
			if (number !== '') {
				number = number.toString();
				number = number.replace(/[^0-9,\.]/g,'').replace(thousand_seperator, '').replace(decimal_seperator, '.');
				number = number_format(number, decimals, decimal_seperator, thousand_seperator);
			} else if (!plugin.settings.allow_empty) {
				number = 0;
				number = number_format(number, decimals, decimal_seperator, thousand_seperator);
			}
			return number;
		};

		var unsanitizeNumber = function (number, decimals, decimal_seperator, thousand_seperator) {
			decimals = decimals === undefined ? 'auto' : decimals;
			decimal_seperator = decimal_seperator === undefined ? ',' : decimal_seperator;
			thousand_seperator = thousand_seperator === undefined ? '.' : thousand_seperator;
			if (number !== '') {
				number = parseFloat(number.toString().replace(thousand_seperator, '').replace(decimal_seperator, '.')).toString().replace('.', decimal_seperator);
			}
			return number;
		};

		var number_format = function (number, decimals, dec_point, thousands_sep) {
			number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
			var n = !isFinite(+number) ? 0 : +number,
				prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
				sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
				dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
				s = '',
				toFixedFix = function (n, prec) {
					var k = Math.pow(10, prec);
					return '' + Math.round(n * k) / k;
				};
			// Fix for IE parseFloat(0.55).toFixed(0) = 0;
			s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
			if (s[0].length > 3) {
				s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
			}
			if ((s[1] || '').length < prec) {
				s[1] = s[1] || '';
				s[1] += new Array(prec - s[1].length + 1).join('0');
			}
			return s.join(dec);
		};



		// REMOVE PLUGIN AND REVERT INPUT ELEMENT TO ORIGINAL STATE
		plugin.destroy = function () {
			$element.removeClass('numbertor');
			$.removeData(element, 'numbertor');
			$element.unbind('blur', sanitize);
			$element.unbind('mouseup', select);
			$element.unbind('mouseup', unsanitize);
			$element.show();
		};
		
		// Initialize plugin
		plugin.init();
	};

	$.fn.numbertor = function(options) {
		options = options !== undefined ? options : {};
		return this.each(function () {
			if (typeof(options) === 'object') {
				if (undefined === $(this).data('numbertor')) {
					var plugin = new $.numbertor(this, options);
					$(this).data('numbertor', plugin);
				}
			} else if ($(this).data('numbertor')[options]) {
				$(this).data('numbertor')[options].apply(this, Array.prototype.slice.call(arguments, 1));
			} else {
				$.error('Method ' + options + ' does not exist in $.numbertor');
			}
		});
	};

}(jQuery));
