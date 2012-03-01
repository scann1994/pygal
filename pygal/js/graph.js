// Generated by CoffeeScript 1.2.1-pre
(function() {
  var activate, add_class, deactivate, has_class, hover, padding, rm_class, svg, tooltip, tooltip_font_size, tooltip_timeout, untooltip, _, __,
    __slice = [].slice;

  _ = function(x) {
    return document.querySelectorAll(x);
  };

  __ = function(x) {
    return document.getElementById(x);
  };

  padding = 5;

  tooltip_timeout = 0;

  tooltip_font_size = parseInt("{{ font_sizes.tooltip }}");

  has_class = function(e, class_name) {
    var cls, cn, i, _i, _len;
    if (!e) return;
    cn = e.getAttribute('class').split(' ');
    for (i = _i = 0, _len = cn.length; _i < _len; i = ++_i) {
      cls = cn[i];
      if (cls === class_name) return true;
    }
    return false;
  };

  add_class = function(e, class_name) {
    var cn;
    if (!e) return;
    cn = e.getAttribute('class').split(' ');
    if (!has_class(e, class_name)) cn.push(class_name);
    return e.setAttribute('class', cn.join(' '));
  };

  rm_class = function(e, class_name) {
    var cls, cn, i, _i, _len;
    if (!e) return;
    cn = e.getAttribute('class').split(' ');
    for (i = _i = 0, _len = cn.length; _i < _len; i = ++_i) {
      cls = cn[i];
      if (cls === class_name) cn.splice(i, 1);
    }
    return e.setAttribute('class', cn.join(' '));
  };

  svg = function(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
  };

  activate = function() {
    var element, elements, _i, _len, _results;
    elements = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      _results.push(add_class(element, 'active'));
    }
    return _results;
  };

  deactivate = function() {
    var element, elements, _i, _len, _results;
    elements = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      element = elements[_i];
      _results.push(rm_class(element, 'active'));
    }
    return _results;
  };

  Function.prototype.bind = function(scope) {
    var _fun;
    _fun = this;
    return function() {
      return _fun.apply(scope, arguments);
    };
  };

  hover = function(elts, over, out) {
    var elt, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = elts.length; _i < _len; _i++) {
      elt = elts[_i];
      elt.addEventListener('mouseover', over.bind(elt), false);
      _results.push(elt.addEventListener('mouseout', out.bind(elt), false));
    }
    return _results;
  };

  tooltip = function(elt) {
    var h, value, w, x, x_elt, y, y_elt, _rect, _text, _tooltip;
    clearTimeout(tooltip_timeout);
    _tooltip = __('tooltip');
    _text = _tooltip.getElementsByTagName('text')[0];
    _rect = _tooltip.getElementsByTagName('rect')[0];
    value = elt.nextElementSibling;
    _text.textContent = value.textContent;
    w = _text.offsetWidth + 2 * padding;
    h = _text.offsetHeight + 2 * padding;
    _rect.setAttribute('width', w);
    _rect.setAttribute('height', h);
    _text.setAttribute('x', padding);
    _text.setAttribute('y', padding + tooltip_font_size);
    x_elt = value.nextElementSibling;
    y_elt = x_elt.nextElementSibling;
    x = x_elt.textContent;
    if (has_class(x_elt, 'centered')) x -= w / 2;
    y = y_elt.textContent;
    if (has_class(y_elt, 'centered')) y -= h / 2;
    return _tooltip.setAttribute('transform', "translate(" + x + " " + y + ")");
  };

  untooltip = function() {
    return tooltip_timeout = setTimeout((function() {
      return __('tooltip').setAttribute('transform', 'translate(-100000, -100000)');
    }), 1000);
  };

  this.svg_load = function() {
    var text, _i, _len, _ref;
    _ref = _('.text-overlay .series');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      text = _ref[_i];
      text.setAttribute('display', 'none');
    }
    hover(_('.reactive'), (function() {
      return activate(this);
    }), (function() {
      return deactivate(this);
    }));
    hover(_('.activate-serie'), (function() {
      var element, num, _j, _k, _len2, _len3, _ref2, _ref3, _results;
      num = this.id.replace('activate-serie-', '');
      _ref2 = _('.text-overlay .serie-' + num);
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        element = _ref2[_j];
        element.setAttribute('display', 'inline');
      }
      _ref3 = _('.serie-' + num + ' .reactive');
      _results = [];
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        element = _ref3[_k];
        _results.push(activate(element));
      }
      return _results;
    }), (function() {
      var element, num, _j, _k, _len2, _len3, _ref2, _ref3, _results;
      num = this.id.replace('activate-serie-', '');
      _ref2 = _('.text-overlay .serie-' + num);
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        element = _ref2[_j];
        element.setAttribute('display', 'none');
      }
      _ref3 = _('.serie-' + num + ' .reactive');
      _results = [];
      for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
        element = _ref3[_k];
        _results.push(deactivate(element));
      }
      return _results;
    }));
    return hover(_('.tooltip-trigger'), (function() {
      return tooltip(this);
    }), (function() {
      return untooltip();
    }));
  };

}).call(this);
