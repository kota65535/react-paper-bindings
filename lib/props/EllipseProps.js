"use strict";

exports.__esModule = true;
exports.applyEllipseProps = void 0;

var _PathProps = require("./PathProps");

var _base = require("./base");

var ELLIPSE_PROPS = [new _base.Props(['from', 'to'], {
  comparator: _base.Comparators.POINT,
  applier: function applier(instance, names, props, prevProps, fiberNode) {
    // create new instance
    var newInstance = new Path.Ellipse(props);
    newInstance._applyProps = applyEllipseProps;
    instance.replaceWith(newInstance); // swap instance

    fiberNode.stateNode = newInstance;
    fiberNode.alternate.stateNode = newInstance;
  }
})];

var applyEllipseProps = function applyEllipseProps(instance, props, prevProps, fiberNode) {
  // apply first because the instance might be swapped
  ELLIPSE_PROPS.forEach(function (p) {
    return p.apply(instance, props, prevProps, fiberNode);
  });
  (0, _PathProps.applyPathProps)(instance, props, prevProps);
};

exports.applyEllipseProps = applyEllipseProps;