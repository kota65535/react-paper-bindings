import React from "react";
import paper, {Group, Path} from "paper";
import {drawGridLinesByPaper} from "../common";

/**
 * Test case 01 drawn by pure paper.js.
 */
export default class Case01_Paper extends React.Component {

  componentDidMount() {
    paper.install(window);
    paper.setup('myCanvas')
    drawGridLinesByPaper(800, 600, 100)

    // Drawing sequence should be the same as PaperRenderer.

    // 1. Child components are firstly rendered.
    const x = 100, y = 100
    let paths = [
      Path.Ellipse({
        center: [x, y],
        size: [70, 25],
        strokeWidth: 2.5,
        strokeColor: '#61DAFB'
      }),
      Path.Ellipse({
        center: [x, y],
        rotation: 120,
        size: [70, 25],
        strokeWidth: 2.5,
        strokeColor: '#61DAFB'
      }),
      Path.Ellipse({
        center: [x, y],
        rotation: 240,
        size: [70, 25],
        strokeWidth: 2.5,
        strokeColor: '#61DAFB'
      }),
      Path.Circle({
        center: [x, y],
        fillColor: '#61DAFB',
        radius: 7
      })
    ]

    // 2. Next, group component is rendered without children
    let group = new Group()

    // 3. Initial child components are added to group
    group.addChildren(paths)
  }


  render() {
    return (
      <canvas id="myCanvas"></canvas>
    )
  }
}

