import {Comparators, Props} from "./base";
import {applyPathProps} from "./PathProps";
import {Path} from 'paper/dist/paper-core'

const LINE_PROPS = [
  new Props(['from', 'to'], {
    comparator: Comparators.POINT,
    applier: (instance, names, props, prevProps, fiberNode) => {
      // create new instance
      const newInstance = new Path.Line(props)
      newInstance._applyProps = applyLineProps
      instance.replaceWith(newInstance)
      // swap instance
      fiberNode.stateNode = newInstance
      fiberNode.alternate.stateNode = newInstance;
    }
  }),
]

export const applyLineProps = (instance, props, prevProps, fiberNode) => {
  // apply first because the instance might be swapped
  LINE_PROPS.forEach(p => p.apply(instance, props, prevProps, fiberNode))
  applyPathProps(instance, props, prevProps)
}
