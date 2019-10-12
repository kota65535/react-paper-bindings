"use strict";

exports.__esModule = true;
exports.Appliers = exports.Comparators = exports.Props = exports.Prop = void 0;

var _utils = require("../utils");

var _logging = require("../logging");

var Prop =
/*#__PURE__*/
function () {
  function Prop(name, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$comparator = _ref.comparator,
        comparator = _ref$comparator === void 0 ? Comparators.SHALLOW : _ref$comparator,
        _ref$applier = _ref.applier,
        applier = _ref$applier === void 0 ? Appliers.SIMPLE : _ref$applier;

    this.name = name;
    this.comparator = comparator;
    this.applier = applier;
  }

  var _proto = Prop.prototype;

  _proto.apply = function apply(instance, props, prevProps, fiberNode) {
    if (!this.comparator.call(this, props[this.name], prevProps[this.name])) {
      (0, _logging.log)("[react-paper-bindings] apply to " + instance + ", prop: " + this.name, props[this.name], '->', prevProps[this.name]);
      this.applier.call(this, instance, this.name, props, prevProps, fiberNode);
    }
  };

  return Prop;
}();

exports.Prop = Prop;

var Props =
/*#__PURE__*/
function () {
  function Props(names, _temp2) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$comparator = _ref2.comparator,
        comparator = _ref2$comparator === void 0 ? Comparators.SHALLOW : _ref2$comparator,
        _ref2$applier = _ref2.applier,
        applier = _ref2$applier === void 0 ? Appliers.SIMPLE : _ref2$applier;

    this.names = names;
    this.comparator = comparator;
    this.applier = applier;
  }

  var _proto2 = Props.prototype;

  _proto2.apply = function apply(instance, props, prevProps, fiberNode) {
    var _this = this;

    if (this.names.map(function (name) {
      return !_this.comparator.call(_this, props[name], prevProps[name]);
    }).some(function (b) {
      return b;
    })) {
      this.applier.call(this, instance, this.names, props, prevProps, fiberNode);
    }
  };

  return Props;
}();

exports.Props = Props;

var Comparators = function Comparators() {};

exports.Comparators = Comparators;

Comparators.SIMPLE = function (a, b) {
  return a === b;
};

Comparators.SHALLOW = function (a, b) {
  return (0, _utils.shallowEqual)(a, b);
};

Comparators.POINT = function (a, b) {
  return (0, _utils.arePointsEqual)(a, b);
};

var Appliers = function Appliers() {};

exports.Appliers = Appliers;

Appliers.SIMPLE = function (instance, name, props, prevProps) {
  instance[name] = props[name];
};