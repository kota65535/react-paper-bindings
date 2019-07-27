import {Comparators, Prop} from "./base";
import {applyItemProps} from "./ItemProps";

const RASTER_PROPS = [
  new Prop('source'),
  new Prop('onLoad', {comparator: Comparators.SIMPLE}),
  new Prop('onError', {comparator: Comparators.SIMPLE})
]

export const applyRasterProps = (instance, props, prevProps = {}) => {
  applyItemProps(instance, props, prevProps)
  RASTER_PROPS.forEach(p => p.apply(instance, props, prevProps))
}
