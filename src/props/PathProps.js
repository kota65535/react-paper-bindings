import {applyItemProps} from "./ItemProps";
import {Prop} from "./base";

const PATH_PROPS = [
  // ========== PathItem Properties ==========
  new Prop('clockwise'),
  new Prop('pathData'),
  // ========== Path Properties ==========
  new Prop('closed'),
  new Prop('fullySelected'),

]

export const applyPathProps = (instance, props, prevProps= {}) => {
  applyItemProps(instance, props, prevProps)
  PATH_PROPS.forEach(p => p.apply(instance, props, prevProps))
}
