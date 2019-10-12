"use strict";

exports.__esModule = true;
exports.applyLineProps = void 0;

var _base = require("./base");

var _PathProps = require("./PathProps");

var _paperCore = require("paper/dist/paper-core");

var LINE_PROPS = [new _base.Props(['from', 'to'], {
  comparator: _base.Comparators.POINT,
  applier: function applier(instance, names, props, prevProps, fiberNode) {
    // create new instance
    var newInstance = new _paperCore.Path.Line(props);
    newInstance._applyProps = applyLineProps;
    instance.replaceWith(newInstance); // swap instance

    fiberNode.stateNode = newInstance;
    fiberNode.alternate.stateNode = newInstance;
  }
})];

var applyLineProps = function applyLineProps(instance, props, prevProps, fiberNode) {
  // apply first because the instance might be swapped
  LINE_PROPS.forEach(function (p) {
    return p.apply(instance, props, prevProps, fiberNode);
  });
  (0, _PathProps.applyPathProps)(instance, props, prevProps);
};

exports.applyLineProps = applyLineProps;