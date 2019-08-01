import {arePointsEqual, shallowEqual} from "../utils";

export class Prop {
  constructor(name, {comparator = Comparators.SHALLOW, applier = Appliers.SIMPLE} = {}) {
    this.name = name
    this.comparator = comparator
    this.applier = applier
  }

  apply(instance, props, prevProps, fiberNode) {
    if (!this.comparator.call(this, props[this.name], prevProps[this.name])) {
      // console.log(`apply to ${instance}, prop: ${this.name}`)
      this.applier.call(this, instance, this.name, props, prevProps, fiberNode)
    }
  }
}

export class Props {
  constructor(names, {comparator = Comparators.SHALLOW, applier = Appliers.SIMPLE} = {}) {
    this.names = names
    this.comparator = comparator
    this.applier = applier
  }

  apply(instance, props, prevProps, fiberNode) {
    if (this.names.map(name => !this.comparator.call(this, props[name], prevProps[name]))
      .some(b => b)) {
      this.applier.call(this, instance, this.names, props, prevProps, fiberNode)
    }
  }
}


export class Comparators {
  static SIMPLE = (a, b) => a === b
  static SHALLOW = (a, b) => shallowEqual(a, b)
  static POINT = (a, b) => arePointsEqual(a, b)
}

export class Appliers {
  static SIMPLE = (instance, name, props, prevProps) => {
    instance[name] = props[name]
  }
}

