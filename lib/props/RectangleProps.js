"use strict";

exports.__esModule = true;
exports.applyRectangleProps = void 0;

var _base = require("./base");

var _PathProps = require("./PathProps");

var _paperCore = require("paper/dist/paper-core");

var RECTANGLE_PROPS = [new _base.Props(['from', 'to'], {
  comparator: _base.Comparators.POINT,
  applier: function applier(instance, names, props, prevProps, fiberNode) {
    // create new instance
    var newInstance = new _paperCore.Path.Rectangle(props);
    newInstance._applyProps = applyRectangleProps;
    instance.replaceWith(newInstance); // swap instance

    fiberNode.stateNode = newInstance;
    fiberNode.alternate.stateNode = newInstance;
  }
})];

var applyRectangleProps = function applyRectangleProps(instance, props, prevProps, fiberNode) {
  // apply first because the instance might be swapped
  RECTANGLE_PROPS.forEach(function (p) {
    return p.apply(instance, props, prevProps, fiberNode);
  });
  (0, _PathProps.applyPathProps)(instance, props, prevProps);
};

exports.applyRectangleProps = applyRectangleProps;