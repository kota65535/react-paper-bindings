"use strict";

exports.__esModule = true;
exports.applyItemProps = void 0;

var _base = require("./base");

var ITEM_PROPS = [// ========== Properties ==========
new _base.Prop('style'), new _base.Prop('locked'), new _base.Prop('visible'), new _base.Prop('blendMode'), new _base.Prop('opacity'), new _base.Prop('selected'), new _base.Prop('clipMask'), new _base.Prop('data', {
  comparator: _base.Comparators.SIMPLE
}), // ========== Position and Bonding Boxes ==========
new _base.Prop('pivot', {
  comparator: _base.Comparators.POINT,
  applier: function applier(instance, name, props, prevProps) {
    instance.pivot = props.pivot;
    instance.position = props.position;
  }
}), new _base.Prop('position', {
  comparator: _base.Comparators.POINT
}), new _base.Prop('rotation', {
  applier: function applier(instance, name, props, prevProps) {
    // in case null is set
    var rotation = props.rotation ? props.rotation : 0;
    var prevRotation = prevProps.rotation ? prevProps.rotation : 0;
    instance.rotate(rotation - prevRotation);
  }
}), new _base.Prop('scaling', {
  applier: function applier(instance, name, props, prevProps) {
    instance.scale(props.scaling);
  }
}), // ========== Stroke Style ==========
new _base.Prop('strokeColor'), new _base.Prop('strokeWidth'), new _base.Prop('strokeCap'), new _base.Prop('strokeJoin'), new _base.Prop('dashOffset'), new _base.Prop('strokeScaling'), new _base.Prop('dashArray'), new _base.Prop('miterLimit'), // ========== Fill Style ==========
new _base.Prop('fillColor'), new _base.Prop('fillRule'), // ========== Shadow Style ==========
new _base.Prop('shadowColor'), new _base.Prop('shadowBlur'), new _base.Prop('shadowOffset'), // ========== Selection Style ==========
new _base.Prop('selectedColor')];

var applyItemProps = function applyItemProps(instance, props, prevProps) {
  ITEM_PROPS.forEach(function (p) {
    return p.apply(instance, props, prevProps);
  });
};

exports.applyItemProps = applyItemProps;