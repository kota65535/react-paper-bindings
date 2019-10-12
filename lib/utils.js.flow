// @flow

type Point = {
  x: number,
  y: number,
} | Array<number>

export function arePointsEqual(p1: Point, p2: Point) {
  if (p1 && p2) {
    // both points are array
    if (Array.isArray(p1) && Array.isArray(p2)) {
      return p1[0] === p2[0] && p1[1] === p2[1]
    }
    // both points are object
    if (!Array.isArray(p1) && !Array.isArray(p2)) {
      return p1.x === p2.x && p1.y === p2.y
    }
    // point 1 is object, point 2 is array
    if (!Array.isArray(p1) && Array.isArray(p2)) {
      return p1.x === p2[0] && p1.y === p2[1]
    }
    // point 1 is array, point 2 is object
    if (Array.isArray(p1) && !Array.isArray(p2)) {
      return p1[0] === p2.x && p1[1] === p2.y
    }
  } else if (!p1 && !p2) {
    // both points are null
    return true
  } else {
    // some point is null
    return false
  }
}


export function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};
