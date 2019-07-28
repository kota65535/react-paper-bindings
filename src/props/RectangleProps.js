import {Comparators, Props} from "./base";
import {applyPathProps} from "./PathProps";
import {Path} from 'paper/dist/paper-core'

const RECTANGLE_PROPS = [
  new Props(['from', 'to'], {
    comparator: Comparators.POINT,
    applier: (instance, names, props, prevProps, fiberNode) => {
      // create new instance
      const newInstance = new Path.Rectangle(props)
      newInstance._applyProps = applyRectangleProps
      instance.replaceWith(newInstance)
      // swap instance
      fiberNode.stateNode = newInstance
      fiberNode.alternate.stateNode = newInstance;
    }
  }),
]

export const applyRectangleProps = (instance, props, prevProps, fiberNode) => {
  // apply first because the instance might be swapped
  RECTANGLE_PROPS.forEach(p => p.apply(instance, props, prevProps, fiberNode))
  applyPathProps(instance, props, prevProps)
}
