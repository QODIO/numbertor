Numbertor
=======
Numbertor is a jQuery-based addon for input boxes, giving them a number sanitizer.
[You can see a demo here](http://opensource.qodio.com/numbertor).


Usage
-----
###### include in head:
```html
<script src="jquery-1.11.0.min.js"></script>
<script src="fm.numbertor.jquery.js"></script>
```

###### to activate replacement:
```javascript
$('#inputBox').numbertor();
```
If you don't wan't to meddle with scripting, there is an alternative to activate replacement, by using inline markup. 
```html
<input type="text" class="numbertor" data-numbertor-allow-empty="true">
```

###### if you want to change settings:
```javascript
$('#inputBox').numbertor({
    decimals: 'auto',        // number of decimals to use
    decimalSeperator: ',',   // the decimal seperator to be used
    thousandSeperator: '.',  // the thousand seperator to be used
    allowEmpty: false        // if false, then value will be set to 0 when empty
});
```


jQuery methods
--------------
Method             | Description
------------------ | -----------
destroy            | This method is used to remove the instance of the plugin from the input box.


###### Method usage
```javascript
$('#inputBox').numbertor('destroy');
```


Browser compatibility
---------------------
* IE 8+
* Chrome 3+
* Firefox 3.6+
* Safari 5+
* Opera 10.5+



Copyright and license
---------------------
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
