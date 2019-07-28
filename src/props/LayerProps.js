import {applyItemProps} from "./ItemProps";
import {Prop} from "./base";

const LAYER_PROPS = [
  new Prop('active', {
    applier: (instance, name, props, prevProps) => {
      if (props.active === true)
      instance.activate()
    }
  })
]

export const applyLayerProps = (instance, props, prevProps) => {
  applyItemProps(instance, props, prevProps)
  LAYER_PROPS.forEach(p => p.apply(instance, props, prevProps))
}
