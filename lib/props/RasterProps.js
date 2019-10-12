"use strict";

exports.__esModule = true;
exports.applyRasterProps = void 0;

var _base = require("./base");

var _ItemProps = require("./ItemProps");

var RASTER_PROPS = [new _base.Prop('source'), new _base.Prop('onLoad', {
  comparator: _base.Comparators.SIMPLE
}), new _base.Prop('onError', {
  comparator: _base.Comparators.SIMPLE
})];

var applyRasterProps = function applyRasterProps(instance, props, prevProps) {
  (0, _ItemProps.applyItemProps)(instance, props, prevProps);
  RASTER_PROPS.forEach(function (p) {
    return p.apply(instance, props, prevProps);
  });
};

exports.applyRasterProps = applyRasterProps;