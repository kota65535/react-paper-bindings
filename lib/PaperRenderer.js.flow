// @flow

import Reconciler from 'react-reconciler'
import {
  unstable_cancelCallback as cancelDeferredCallback,
  unstable_now as now,
  unstable_scheduleCallback as scheduleDeferredCallback,
} from 'scheduler';
import invariant from 'fbjs/lib/invariant'
import emptyObject from 'fbjs/lib/emptyObject'

import {Group, Item, Layer, Path, PointText, Raster, Tool,} from 'paper/dist/paper-core'

import TYPES from './types'

import {
  applyArcProps,
  applyCircleProps,
  applyEllipseProps,
  applyGroupProps,
  applyLayerProps,
  applyLineProps,
  applyPathProps,
  applyPointTextProps,
  applyRasterProps,
  applyRectangleProps,
  applyToolProps
} from "./props";

function applyStyleProps(instance, props) {
  if (props.fillColor) {
    instance.fillColor = props.fillColor
  }
  if (props.strokeColor) {
    instance.strokeColor = props.strokeColor
  }
  if (props.selected) {
    instance.selected = props.selected
  }
}

const PaperRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    if (typeof child === 'string') {
      // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
      invariant(false, 'Text children should already be flattened.')
    } else if (parentInstance instanceof Group && child instanceof Item) {
      child.addTo(parentInstance)
    }
  },

  createInstance(type, props, paperScope) {
    const {children, ...paperProps} = props
    let instance = {}

    // activate this scope before creating instance
    paperScope.activate()

    switch (type) {
      case TYPES.TOOL:
        instance = new Tool(paperProps)
        instance._applyProps = applyToolProps
        break
      case TYPES.CIRCLE:
        instance = new Path.Circle(paperProps)
        instance._applyProps = applyCircleProps
        break
      case TYPES.ELLIPSE:
        instance = new Path.Ellipse(paperProps)
        instance._applyProps = applyEllipseProps
        break
      case TYPES.GROUP:
        instance = new Group(paperProps)
        instance._applyProps = applyGroupProps
        break
      case TYPES.LAYER:
        instance = new Layer(paperProps)
        instance._applyProps = applyLayerProps
        break
      case TYPES.LINE:
        instance = new Path.Line(paperProps)
        instance._applyProps = applyLineProps
        break
      case TYPES.PATH:
        instance = new Path(paperProps)
        instance._applyProps = applyPathProps
        break
      case TYPES.POINTTEXT:
        instance = new PointText(paperProps)
        instance._applyProps = applyPointTextProps
        break
      case TYPES.RECTANGLE:
        instance = new Path.Rectangle(paperProps)
        instance._applyProps = applyRectangleProps
        break
      case TYPES.ARC:
        instance = new Path.Arc(paperProps)
        instance._applyProps = applyArcProps
        break
      case TYPES.RASTER: {
        const {onLoad, ...rasterProps} = paperProps
        instance = new Raster(rasterProps)
        instance._applyProps = applyRasterProps
        if (typeof onLoad === 'function') {
          instance.onLoad = () => onLoad(instance)
        }
        break
      }
      default:
        invariant(
          instance,
          'PaperRenderer does not support the type "%s"',
          type
        )
        break
    }

    // apply data type
    if (!instance.data) {
      instance.data = {type}
    } else if (!instance.data.type) {
      instance.data.type = type
    }

    invariant(instance, 'PaperRenderer does not support the type "%s"', type)

    return instance
  },

  createTextInstance(text, rootContainerInstance, paperScope) {
    return text
  },

  finalizeInitialChildren(domElement, type, props) {
    // If applyMatrix=true, group props should be applied after all children have benn added.
    // If applyMatrix=false, only style-related props (ex. fillColor, strokeColor) should be applied.
    // TODO: add case for Layer
    switch (type) {
      case TYPES.GROUP:
        if (domElement.applyMatrix) {
          applyGroupProps(domElement, props, {})
        } else {
          applyStyleProps(domElement, props)
        }
        break
      default:
        break;
    }
    return false
  },

  getPublicInstance(instance) {
    return instance
  },

  prepareForCommit() {
    // Noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    return true
  },

  resetAfterCommit() {
    // Noop
  },

  resetTextContent(domElement) {
    // Noop
  },

  shouldDeprioritizeSubtree(type, props) {
    return false
  },

  getRootHostContext() {
    return emptyObject
  },

  getChildHostContext() {
    return emptyObject
  },

  isPrimaryRenderer: false,
  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,
  //useSyncScheduling: true,

  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,

  now,
  scheduleDeferredCallback,
  cancelDeferredCallback,

  shouldSetTextContent(type, props) {
    return (
      typeof props.children === 'string' || typeof props.children === 'number'
    )
  },

  appendChild(parentInstance, child) {
    if (child.parentNode === parentInstance) {
      child.remove()
    }
    if (parentInstance instanceof Group && child instanceof Item) {
      child.addTo(parentInstance)
    }
  },

  appendChildToContainer(parentInstance, child) {
    if (child.parentNode === parentInstance) {
      child.remove()
    }
    if (parentInstance instanceof Group && child instanceof Item) {
      child.addTo(parentInstance)
    }
  },

  insertBefore(parentInstance, child, beforeChild) {
    invariant(
      child !== beforeChild,
      'PaperRenderer: Can not insert node before itself'
    )
    if (
      parentInstance instanceof Group &&
      child instanceof Path &&
      beforeChild instanceof Path
    ) {
      child.insertAbove(beforeChild)
    }
  },

  insertInContainerBefore(parentInstance, child, beforeChild) {
    invariant(
      child !== beforeChild,
      'PaperRenderer: Can not insert node before itself'
    )
    if (
      parentInstance instanceof Group &&
      child instanceof Path &&
      beforeChild instanceof Path
    ) {
      child.insertAbove(beforeChild)
    }
  },

  removeChild(parentInstance, child) {
    child.remove()
  },

  removeChildFromContainer(parentInstance, child) {
    child.remove()
  },

  commitTextUpdate(textInstance, oldText, newText) {
    // Noop
  },

  commitMount(instance, type, newProps) {
    // Noop
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps, fiberNode) {
    instance._applyProps(instance, newProps, oldProps, fiberNode)
  },
})

export default PaperRenderer
