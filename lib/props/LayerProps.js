"use strict";

exports.__esModule = true;
exports.applyLayerProps = void 0;

var _ItemProps = require("./ItemProps");

var _base = require("./base");

var LAYER_PROPS = [new _base.Prop('active', {
  applier: function applier(instance, name, props, prevProps) {
    if (props.active === true) instance.activate();
  }
})];

var applyLayerProps = function applyLayerProps(instance, props, prevProps) {
  (0, _ItemProps.applyItemProps)(instance, props, prevProps);
  LAYER_PROPS.forEach(function (p) {
    return p.apply(instance, props, prevProps);
  });
};

exports.applyLayerProps = applyLayerProps;