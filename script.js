(function() { 
  var heroContainer = document.getElementById('heroContainer');
  var inner = document.getElementById('inner');

/*
clientX: Returns the horizontal coordinate of the mouse pointer, relative to the current window, when the mouse event was triggered; 
clientY: Returns the vertical coordinate of the mouse pointer, relative to the current window, when the mouse event was triggered;
offsetX, offsetY: relative to the position of the edge of the target element;
screenX, screenY: relative to the screen;



HTMLElement.offsetLeft: read-only property returns the number of pixels that the upper left corner of the current element is offset to the left within the HTMLElement.offsetParent node.
For block-level elements, offsetTop, offsetLeft, offsetWidth, and offsetHeight describe the border box of an element relative to the offsetParent

HTMLElement.offsetWidth: read-only property returns the layout width of an element as an integer. Typically, offsetWidth is a measurement in pixels of the element's CSS width, including any borders, padding 
and vertical scrollbars (if rendered) (not including margin!!!!!). It does not include the width of pseudo-elements such as ::before or ::after. If the element is hidden (eg, by setting style.display on the element or one of its
ancestors to "none"), then 0 is returned.
 */

  var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(event) {
      var e = event || window.event;
      this.x = e.clientX - this._x;
      this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function(e) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function() {return '(' + this.x + ', ' + this.y + ')';}
  };

  mouse.setOrigin(heroContainer);

  var counter = 0;
  var updateRate = 10;
  var isTimeToUpdate = function () {
    return counter++ % updateRate === 0;
  }

  var onMouseEnterHandler = function(event) {
    update(event);
  };
  var onMouseLeaveHandler = function() {
    inner.style = "";
  };
  var onMouseMoveHandler = function(event) {
    if(isTimeToUpdate()) {
      update(event);
    }
  };

  /*
  NumberObj.toFixed(n)数字对象保留小数点后n位数字（注意会四舍五入）
   */

  var update = function(event) {
    mouse.updatePosition(event);
    updateTransformStyle(
      (mouse.y / inner.offsetHeight/2).toFixed(2),
      (mouse.x / inner.offsetWidth/2).toFixed(2)
    );
  };

  var updateTransformStyle = function(x,y) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    inner.style.transform = style;
    inner.style.webkitTransform = style;
    inner.style.mozTransform = style;
    inner.style.msTransform = style;
    inner.style.Otransfomr = style;
  };

  heroContainer.onmouseenter = onMouseEnterHandler;
  heroContainer.onmouseleave = onMouseLeaveHandler;
  heroContainer.onmousemove = onMouseMoveHandler;

}) (); 