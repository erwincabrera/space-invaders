import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as GraphModule from "mxgraph/javascript/dist/build";
import { State } from "./types";
import * as Constants from "./Constants";
import { dx, dy } from "./helpers";

const myGraph = new GraphModule({
  mxImageBasePath: "mxgraph/javascript/src/images",
  mxBasePath: "mxgraph/javascript/src",
});

const mxGraph = myGraph.mxGraph;
const mxClient = myGraph.mxClient;
const mxUtils = myGraph.mxUtils;
const mxEvent = myGraph.mxEvent;

const style = {
  margin: "0 auto",
  width: Constants.WIDTH, 
  height: Constants.HEIGHT
}

type Props = State;

class GameCanvas extends Component<Props> {
  private graph;
  private player;
  private shots;
  private invaders;

  constructor(props: any) {
    super(props);
    this.LoadGraph = this.LoadGraph.bind(this);
  }

  componentDidMount() {
    this.LoadGraph();
  }

  componentDidUpdate(prevProps: Props) {
    const graph = this.getGraph();
    const parent = graph.getDefaultParent();

    graph.moveCells(
      [this.getPlayer()], 
      dx(prevProps.player.geo.pos, this.props.player.geo.pos), 
      dy(prevProps.player.geo.pos, this.props.player.geo.pos)
    );

    // TODO: move the cells
    graph.removeCells(this.getShots());
    this.shots = [];
    this.props.shots.forEach(eachShot => {
      this.shots.push(graph.insertVertex(parent, null, "", eachShot.geo.pos.x, eachShot.geo.pos.y, 
        Constants.SHOT_WIDTH, Constants.SHOT_HEIGHT));
    })

    // TODO: move the cells
    graph.removeCells(this.getInvaders())
    this.invaders = [];
    this.props.invaders.forEach(eachInvader => {
      this.invaders.push(graph.insertVertex(parent, null, "", eachInvader.geo.pos.x, eachInvader.geo.pos.y, 
        eachInvader.geo.width, eachInvader.geo.height))
    })
  }

  LoadGraph() {
    const container = ReactDOM.findDOMNode(this.refs.divGraph) as HTMLElement;

    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mxUtils.error("Browser is not supported!", 200, false);
    } else {

      // Disables the built-in context menu
      mxEvent.disableContextMenu(container);

      // Creates the graph inside the given container
      const graph = new mxGraph(container);
      this.graph = graph;

      // Gets the default parent for inserting new cells. This is normally the first
      // child of the root (ie. layer 0).
      var parent = graph.getDefaultParent();

      graph.setEnabled(false);

      graph.getModel().beginUpdate();
      try {
        const { pos, width, height } = this.props.player.geo;
        this.player = graph.insertVertex(parent, null, "USS\nEnterprise", pos.x, pos.y, width, height);

        this.shots = [];
        this.props.shots.forEach(eachShot => {
          this.shots.push(graph.insertVertex(parent, null, "", eachShot.geo.pos.x, eachShot.geo.pos.y, 
            Constants.SHOT_WIDTH, Constants.SHOT_HEIGHT));
        })

        this.invaders = [];
        this.props.invaders.forEach(eachInvader => {
          this.invaders.push(graph.insertVertex(parent, null, "", eachInvader.geo.pos.x, eachInvader.geo.pos.y, 
            eachInvader.geo.width, eachInvader.geo.height))
        })

      } finally {
        // Updates the display
        graph.getModel().endUpdate();
      }
    }
  }

  private getPlayer() {
    if (!this.player) throw new Error("Uninitialized player");
    return this.player;
  }

  private getGraph() {
    if (!this.graph) throw new Error("Uninitialized graph");
    return this.graph;
  }

  private getShots() {
    if (!this.shots) throw new Error("Uninitialzed shots");
    return this.shots;
  }

  private getInvaders() {
    if (!this.invaders) throw new Error("Uninitialized invaders");
    return this.invaders;
  }

  render() {
    return <div className="graph-container" ref="divGraph" id="divGraph" style={style}/>;
  }
}

export default GameCanvas;
