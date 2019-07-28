import {applyPathProps} from "./PathProps";
import {Props, Comparators} from "./base";

const ELLIPSE_PROPS = [
  new Props(['from', 'to'], {
    comparator: Comparators.POINT,
    applier: (instance, names, props, prevProps, fiberNode) => {
      // create new instance
      const newInstance = new Path.Ellipse(props)
      newInstance._applyProps = applyEllipseProps
      instance.replaceWith(newInstance)
      // swap instance
      fiberNode.stateNode = newInstance
      fiberNode.alternate.stateNode = newInstance;
    }
  }),
]

export const applyEllipseProps = (instance, props, prevProps, fiberNode) => {
  // apply first because the instance might be swapped
  ELLIPSE_PROPS.forEach(p => p.apply(instance, props, prevProps, fiberNode))
  applyPathProps(instance, props, prevProps)
}
