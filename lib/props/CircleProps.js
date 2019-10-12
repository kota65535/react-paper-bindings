"use strict";

exports.__esModule = true;
exports.applyCircleProps = void 0;

var _base = require("./base");

var _PathProps = require("./PathProps");

var CIRCLE_PROPS = [new _base.Prop('radius', {
  applier: function applier(instance, names, props, prevProps) {
    instance.scale(props.radius / prevProps.radius);
  }
})];

var applyCircleProps = function applyCircleProps(instance, props, prevProps) {
  (0, _PathProps.applyPathProps)(instance, props, prevProps);
  CIRCLE_PROPS.forEach(function (p) {
    return p.apply(instance, props, prevProps);
  });
};

exports.applyCircleProps = applyCircleProps;