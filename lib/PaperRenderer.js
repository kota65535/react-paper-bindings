"use strict";

exports.__esModule = true;
exports.default = void 0;

var _reactReconciler = _interopRequireDefault(require("react-reconciler"));

var _scheduler = require("scheduler");

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _emptyObject = _interopRequireDefault(require("fbjs/lib/emptyObject"));

var _paperCore = require("paper/dist/paper-core");

var _types = _interopRequireDefault(require("./types"));

var _props = require("./props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function applyStyleProps(instance, props) {
  if (props.fillColor) {
    instance.fillColor = props.fillColor;
  }

  if (props.strokeColor) {
    instance.strokeColor = props.strokeColor;
  }

  if (props.selected) {
    instance.selected = props.selected;
  }
}

var PaperRenderer = (0, _reactReconciler.default)({
  appendInitialChild: function appendInitialChild(parentInstance, child) {
    if (typeof child === 'string') {
      // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
      (0, _invariant.default)(false, 'Text children should already be flattened.');
    } else if (parentInstance instanceof _paperCore.Group && child instanceof _paperCore.Item) {
      child.addTo(parentInstance);
    }
  },
  createInstance: function createInstance(type, props, paperScope) {
    var children = props.children,
        paperProps = _objectWithoutPropertiesLoose(props, ["children"]);

    var instance = {}; // activate this scope before creating instance

    paperScope.activate();

    switch (type) {
      case _types.default.TOOL:
        instance = new _paperCore.Tool(paperProps);
        instance._applyProps = _props.applyToolProps;
        break;

      case _types.default.CIRCLE:
        instance = new _paperCore.Path.Circle(paperProps);
        instance._applyProps = _props.applyCircleProps;
        break;

      case _types.default.ELLIPSE:
        instance = new _paperCore.Path.Ellipse(paperProps);
        instance._applyProps = _props.applyEllipseProps;
        break;

      case _types.default.GROUP:
        instance = new _paperCore.Group(paperProps);
        instance._applyProps = _props.applyGroupProps;
        break;

      case _types.default.LAYER:
        instance = new _paperCore.Layer(paperProps);
        instance._applyProps = _props.applyLayerProps;
        break;

      case _types.default.LINE:
        instance = new _paperCore.Path.Line(paperProps);
        instance._applyProps = _props.applyLineProps;
        break;

      case _types.default.PATH:
        instance = new _paperCore.Path(paperProps);
        instance._applyProps = _props.applyPathProps;
        break;

      case _types.default.POINTTEXT:
        instance = new _paperCore.PointText(paperProps);
        instance._applyProps = _props.applyPointTextProps;
        break;

      case _types.default.RECTANGLE:
        instance = new _paperCore.Path.Rectangle(paperProps);
        instance._applyProps = _props.applyRectangleProps;
        break;

      case _types.default.ARC:
        instance = new _paperCore.Path.Arc(paperProps);
        instance._applyProps = _props.applyArcProps;
        break;

      case _types.default.RASTER:
        {
          var onLoad = paperProps.onLoad,
              rasterProps = _objectWithoutPropertiesLoose(paperProps, ["onLoad"]);

          instance = new _paperCore.Raster(rasterProps);
          instance._applyProps = _props.applyRasterProps;

          if (typeof onLoad === 'function') {
            instance.onLoad = function () {
              return onLoad(instance);
            };
          }

          break;
        }

      default:
        (0, _invariant.default)(instance, 'PaperRenderer does not support the type "%s"', type);
        break;
    } // apply data type


    if (!instance.data) {
      instance.data = {
        type: type
      };
    } else if (!instance.data.type) {
      instance.data.type = type;
    }

    (0, _invariant.default)(instance, 'PaperRenderer does not support the type "%s"', type);
    return instance;
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance, paperScope) {
    return text;
  },
  finalizeInitialChildren: function finalizeInitialChildren(domElement, type, props) {
    // If applyMatrix=true, group props should be applied after all children have benn added.
    // If applyMatrix=false, only style-related props (ex. fillColor, strokeColor) should be applied.
    // TODO: add case for Layer
    switch (type) {
      case _types.default.GROUP:
        if (domElement.applyMatrix) {
          (0, _props.applyGroupProps)(domElement, props, {});
        } else {
          applyStyleProps(domElement, props);
        }

        break;

      default:
        break;
    }

    return false;
  },
  getPublicInstance: function getPublicInstance(instance) {
    return instance;
  },
  prepareForCommit: function prepareForCommit() {// Noop
  },
  prepareUpdate: function prepareUpdate(domElement, type, oldProps, newProps) {
    return true;
  },
  resetAfterCommit: function resetAfterCommit() {// Noop
  },
  resetTextContent: function resetTextContent(domElement) {// Noop
  },
  shouldDeprioritizeSubtree: function shouldDeprioritizeSubtree(type, props) {
    return false;
  },
  getRootHostContext: function getRootHostContext() {
    return _emptyObject.default;
  },
  getChildHostContext: function getChildHostContext() {
    return _emptyObject.default;
  },
  isPrimaryRenderer: false,
  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,
  //useSyncScheduling: true,
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  now: _scheduler.unstable_now,
  scheduleDeferredCallback: _scheduler.unstable_scheduleCallback,
  cancelDeferredCallback: _scheduler.unstable_cancelCallback,
  shouldSetTextContent: function shouldSetTextContent(type, props) {
    return typeof props.children === 'string' || typeof props.children === 'number';
  },
  appendChild: function appendChild(parentInstance, child) {
    if (child.parentNode === parentInstance) {
      child.remove();
    }

    if (parentInstance instanceof _paperCore.Group && child instanceof _paperCore.Item) {
      child.addTo(parentInstance);
    }
  },
  appendChildToContainer: function appendChildToContainer(parentInstance, child) {
    if (child.parentNode === parentInstance) {
      child.remove();
    }

    if (parentInstance instanceof _paperCore.Group && child instanceof _paperCore.Item) {
      child.addTo(parentInstance);
    }
  },
  insertBefore: function insertBefore(parentInstance, child, beforeChild) {
    (0, _invariant.default)(child !== beforeChild, 'PaperRenderer: Can not insert node before itself');

    if (parentInstance instanceof _paperCore.Group && child instanceof _paperCore.Path && beforeChild instanceof _paperCore.Path) {
      child.insertAbove(beforeChild);
    }
  },
  insertInContainerBefore: function insertInContainerBefore(parentInstance, child, beforeChild) {
    (0, _invariant.default)(child !== beforeChild, 'PaperRenderer: Can not insert node before itself');

    if (parentInstance instanceof _paperCore.Group && child instanceof _paperCore.Path && beforeChild instanceof _paperCore.Path) {
      child.insertAbove(beforeChild);
    }
  },
  removeChild: function removeChild(parentInstance, child) {
    child.remove();
  },
  removeChildFromContainer: function removeChildFromContainer(parentInstance, child) {
    child.remove();
  },
  commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {// Noop
  },
  commitMount: function commitMount(instance, type, newProps) {// Noop
  },
  commitUpdate: function commitUpdate(instance, updatePayload, type, oldProps, newProps, fiberNode) {
    instance._applyProps(instance, newProps, oldProps, fiberNode);
  }
});
var _default = PaperRenderer;
exports.default = _default;