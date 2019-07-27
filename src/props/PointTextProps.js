import {Prop} from "./base";
import {applyItemProps} from "./ItemProps";

const POINT_TEXT_PROPS = [
  new Prop('content'),
  new Prop('fontFamily'),
  new Prop('fontSize'),
  new Prop('fontWeight'),
]

export const applyPointTextProps = (instance, props, prevProps = {}) => {
  applyItemProps(instance, props, prevProps)
  POINT_TEXT_PROPS.forEach(p => p.apply(instance, props, prevProps))
}
