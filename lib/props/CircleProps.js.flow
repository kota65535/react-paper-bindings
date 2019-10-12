import {Prop} from "./base";
import {applyPathProps} from "./PathProps";

const CIRCLE_PROPS = [
  new Prop('radius', {
    applier: (instance, names, props, prevProps) => {
      instance.scale(props.radius / prevProps.radius)
    }
  }),
]

export const applyCircleProps = (instance, props, prevProps) => {
  applyPathProps(instance, props, prevProps)
  CIRCLE_PROPS.forEach(p => p.apply(instance, props, prevProps))
}
