"use strict";

exports.__esModule = true;
exports.applyPathProps = void 0;

var _ItemProps = require("./ItemProps");

var _base = require("./base");

var PATH_PROPS = [// ========== PathItem Properties ==========
new _base.Prop('clockwise'), new _base.Prop('pathData'), // ========== Path Properties ==========
new _base.Prop('closed'), new _base.Prop('fullySelected')];

var applyPathProps = function applyPathProps(instance, props, prevProps) {
  (0, _ItemProps.applyItemProps)(instance, props, prevProps);
  PATH_PROPS.forEach(function (p) {
    return p.apply(instance, props, prevProps);
  });
};

exports.applyPathProps = applyPathProps;