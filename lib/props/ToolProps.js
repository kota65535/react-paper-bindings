"use strict";

exports.__esModule = true;
exports.applyToolProps = void 0;

var _base = require("./base");

var _ItemProps = require("./ItemProps");

var TOOL_PROPS = [new _base.Prop('active', {
  applier: function applier(instance, name, props, prevProps) {
    if (props.active === true) instance.activate();
  }
}), new _base.Prop('onMouseDown', {
  comparator: _base.Comparators.SIMPLE
}), new _base.Prop('onMouseDrag', {
  comparator: _base.Comparators.SIMPLE
}), new _base.Prop('onMouseMove', {
  comparator: _base.Comparators.SIMPLE
}), new _base.Prop('onMouseUp', {
  comparator: _base.Comparators.SIMPLE
}), new _base.Prop('onKeyUp', {
  comparator: _base.Comparators.SIMPLE
}), new _base.Prop('onKeyDown', {
  comparator: _base.Comparators.SIMPLE
})];

var applyToolProps = function applyToolProps(instance, props, prevProps) {
  (0, _ItemProps.applyItemProps)(instance, props, prevProps);
  TOOL_PROPS.forEach(function (p) {
    return p.apply(instance, props, prevProps);
  });
};

exports.applyToolProps = applyToolProps;