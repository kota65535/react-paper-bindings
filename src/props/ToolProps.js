import {Comparators, Prop} from "./base";
import {applyItemProps} from "./ItemProps";

const TOOL_PROPS = [
  new Prop('active', {
    applier: (instance, name, props, prevProps) => {
      if (props.active === true)
        instance.activate()
    }
  }),
  new Prop('onMouseDown', {comparator: Comparators.SIMPLE}),
  new Prop('onMouseDrag', {comparator: Comparators.SIMPLE}),
  new Prop('onMouseMove', {comparator: Comparators.SIMPLE}),
  new Prop('onMouseUp', {comparator: Comparators.SIMPLE}),
  new Prop('onKeyUp', {comparator: Comparators.SIMPLE}),
  new Prop('onKeyDown', {comparator: Comparators.SIMPLE}),
]

export const applyToolProps = (instance, props, prevProps = {}) => {
  applyItemProps(instance, props, prevProps)
  TOOL_PROPS.forEach(p => p.apply(instance, props, prevProps))
}
