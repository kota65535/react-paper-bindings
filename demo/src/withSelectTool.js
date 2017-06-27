import React, { Component } from 'react'

const HIT_TEST_OPTIONS = {
  segments: true,
  stroke: true,
  fill: true,
  tolerance: 12,
}

export default function withSelectTool(WrappedComponent) {

  return class extends Component {

    constructor(props) {
      super(props)
      this._changed = false
      this._item = null
      this._point = null
    }

    keyDown = (e) => {
      if (this._item) {
        const { key, modifiers: { shift } } = e
        switch (key) {
          case 'delete':
            const { reactId, reactType } = this._item
            this.props.removeItem(reactType, reactId, () => {
              this._changed = false
              this._item = null
              this._point = null
            })
            break
          case 'up':
            this._item.translate(0, shift ? -10 : -1)
            break
          case 'down':
            this._item.translate(0, shift ? 10 : 1)
            break
          case 'left':
            this._item.translate(shift ? -10 : -1, 0)
            break
          case 'right':
            this._item.translate(shift ? 10 : 1, 0)
            break
          // no default
        }
      }
    }

    mouseDown = (e) => {
      e.tool.view._project.deselectAll()
      const hit = e.tool.view._project.hitTest(e.point, HIT_TEST_OPTIONS)
      if (
        hit && hit.item &&
        hit.item.reactType !== 'Raster' &&
        hit.item.layer.name !== 'ReactLogo'
      ) {
        hit.item.selected = true
        hit.item.bringToFront()
        this._item = hit.item
        this._point = e.point
      } else {
        this._item = null
        this._point = null
      }
    }

    mouseDrag = (e) => {
      if (this._item && this._point) {
        this._item.translate(e.point.subtract(this._point))
        this._changed = true
        this._point = e.point
      }
    }

    mouseUp = (e) => {
      if (this._item && this._changed) {
        const { reactId, reactType } = this._item
        this.props.updateItem(reactType, reactId, {
          data: this._item.getPathData(),
          selected: true,
        })
      }
      this._changed = false
      this._point = null
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          selectToolKeyDown={this.keyDown}
          selectToolMouseDown={this.mouseDown}
          selectToolMouseDrag={this.mouseDrag}
          selectToolMouseUp={this.mouseUp}
        />
      )
    }

  }

}
