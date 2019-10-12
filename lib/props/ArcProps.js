"use strict";

exports.__esModule = true;
exports.applyArcProps = void 0;

var _PathProps = require("./PathProps");

var _base = require("./base");

var _paperCore = require("paper/dist/paper-core");

var ARC_PROPS = [new _base.Props(['from', 'through', 'to'], {
  comparator: _base.Comparators.POINT,
  applier: function applier(instance, names, props, prevProps, fiberNode) {
    // create new instance
    var newInstance = new _paperCore.Path.Rectangle(props);
    newInstance._applyProps = applyArcProps;
    instance.replaceWith(newInstance); // swap instance

    fiberNode.stateNode = newInstance;
    fiberNode.alternate.stateNode = newInstance;
  }
})];

var applyArcProps = function applyArcProps(instance, props, prevProps, fiberNode) {
  (0, _PathProps.applyPathProps)(instance, props, prevProps);
  ARC_PROPS.forEach(function (p) {
    return p.apply(instance, props, prevProps, fiberNode);
  });
};

exports.applyArcProps = applyArcProps;