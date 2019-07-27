import {Comparators, Prop} from "./base";

const ITEM_PROPS = [
  // ========== Properties ==========
  new Prop('style'),
  new Prop('locked'),
  new Prop('visible'),
  new Prop('blendMode'),
  new Prop('opacity'),
  new Prop('selected'),
  new Prop('clipMask'),
  new Prop('data', {comparator: Comparators.SIMPLE}),

  // ========== Position and Bonding Boxes ==========
  new Prop('pivot', {
    comparator: Comparators.POINT,
    applier: (instance, name, props, prevProps) => {
      instance.pivot = props.pivot
      instance.position = props.position
    }
  }),
  new Prop('position', {
    comparator: Comparators.POINT
  }),
  new Prop('rotation', {
    applier: (instance, name, props, prevProps) => {
      // in case null is set
      const rotation = props.rotation ? props.rotation : 0
      const prevRotation = prevProps.rotation ? prevProps.rotation : 0
      instance.rotate(rotation - prevRotation)
    }
  }),
  new Prop('scaling', {
    applier: (instance, name, props, prevProps) => {
      instance.scale(props.scaling)
    }
  }),

  // ========== Stroke Style ==========
  new Prop('strokeColor'),
  new Prop('strokeWidth'),
  new Prop('strokeCap'),
  new Prop('strokeJoin'),
  new Prop('dashOffset'),
  new Prop('strokeScaling'),
  new Prop('dashArray'),
  new Prop('miterLimit'),

  // ========== Fill Style ==========
  new Prop('fillColor'),
  new Prop('fillRule'),

  // ========== Shadow Style ==========
  new Prop('shadowColor'),
  new Prop('shadowBlur'),
  new Prop('shadowOffset'),

  // ========== Selection Style ==========
  new Prop('selectedColor')
]

export const applyItemProps = (instance, props, prevProps = {}) => {
  ITEM_PROPS.forEach(p => p.apply(instance, props, prevProps))
}
