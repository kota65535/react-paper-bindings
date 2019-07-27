import {applyPathProps} from "./PathProps";
import {Comparators, Props} from "./base";
import {Path} from 'paper/dist/paper-core'

const ARC_PROPS = [
  new Props(['from', 'through', 'to'], {
    comparator: Comparators.POINT,
    applier: (instance, names, props, prevProps, fiberNode) => {
      // create new instance
      const newInstance = new Path.Rectangle(props)
      newInstance._applyProps = applyArcProps
      instance.replaceWith(newInstance)
      // swap instance
      fiberNode.stateNode = newInstance
      fiberNode.alternate.stateNode = newInstance;
    }
  }),
]

export const applyArcProps = (instance, props, prevProps = {}, fiberNode) => {
  applyPathProps(instance, props, prevProps)
  ARC_PROPS.forEach(p => p.apply(instance, props, prevProps, fiberNode))
}
