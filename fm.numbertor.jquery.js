/*
 Numbertor jQuery Plugin
 Numbertor is a jQuery-based addon for input boxes, giving them a number sanitizer.
 version 1.1, Dec 11th, 2015
 by Ingi P. Jacobsen

 The MIT License (MIT)

 Copyright (c) 2014 Qodio

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
			decimals:          'auto',
			decimalSeperator:  ',',
			thousandSeperator: '.',
			allowEmpty:        false
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
			$element.val(sanitizeNumber($element.val(), plugin.settings.decimals, plugin.settings.decimalSeperator, plugin.settings.thousandSeperator));
		};

		var unsanitize = function () {
			$element.val(unsanitizeNumber($element.val(), plugin.settings.decimals, plugin.settings.decimalSeperator, plugin.settings.thousandSeperator));
		};
		
		var select = function () {
			$element.select();
		};
		
		var sanitizeNumber = function (number, decimals, decimalSeperator, thousandSeperator) {
			decimals = decimals === undefined ? 'auto' : decimals;
			decimalSeperator = decimalSeperator === undefined ? ',' : decimalSeperator;
			thousandSeperator = thousandSeperator === undefined ? '.' : thousandSeperator;
			if (number !== '') {
				number = number.toString();
				number = number.replace(/[^0-9,\.]/g,'').replace(thousandSeperator, '').replace(decimalSeperator, '.');
				number = number_format(number, decimals, decimalSeperator, thousandSeperator);
			} else if (!plugin.settings.allowEmpty) {
				number = 0;
				number = number_format(number, decimals, decimalSeperator, thousandSeperator);
			}
			return number;
		};

		var unsanitizeNumber = function (number, decimals, decimalSeperator, thousandSeperator) {
			decimals = decimals === undefined ? 'auto' : decimals;
			decimalSeperator = decimalSeperator === undefined ? ',' : decimalSeperator;
			thousandSeperator = thousandSeperator === undefined ? '.' : thousandSeperator;
			if (number !== '') {
				number = parseFloat(number.toString().replace(thousandSeperator, '').replace(decimalSeperator, '.')).toString().replace('.', decimalSeperator);
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

$(function () {
	$('.numbertor').each(function () {
		var $this = $(this);
		var options = {};
		$.each($this.data(), function (key, value) {
			if (key.substring(0, 9) == 'numbertor') {
				var value_temp = value.toString().replace(/'/g, '"');
				value_temp = $.parseJSON(value_temp);
				if (typeof value_temp == 'object') {
					value = value_temp;
				}
				options[key.substring(9, 10).toLowerCase() + key.substring(10)] = value;
			}
		});
		$this.numbertor(options);
	});
});