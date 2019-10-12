"use strict";

exports.__esModule = true;
exports.applyPointTextProps = void 0;

var _base = require("./base");

var _ItemProps = require("./ItemProps");

var POINT_TEXT_PROPS = [new _base.Prop('content'), new _base.Prop('fontFamily'), new _base.Prop('fontSize'), new _base.Prop('fontWeight')];

var applyPointTextProps = function applyPointTextProps(instance, props, prevProps) {
  (0, _ItemProps.applyItemProps)(instance, props, prevProps);
  POINT_TEXT_PROPS.forEach(function (p) {
    return p.apply(instance, props, prevProps);
  });
};

exports.applyPointTextProps = applyPointTextProps;