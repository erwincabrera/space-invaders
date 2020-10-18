import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as GraphModule from "mxgraph/javascript/dist/build";
import { State } from "./types";

const myGraph = new GraphModule({
  mxImageBasePath: "mxgraph/javascript/src/images",
  mxBasePath: "mxgraph/javascript/src",
});

const mxGraph = myGraph.mxGraph;
const mxClient = myGraph.mxClient;
const mxUtils = myGraph.mxUtils;
const mxEvent = myGraph.mxEvent;


class Graph extends Component<State> {
  constructor(props: any) {
    super(props);
    this.state = {};
    this.LoadGraph = this.LoadGraph.bind(this);
  }

  componentDidMount() {
    this.LoadGraph();
  }

  componentDidUpdate() {
    this.LoadGraph();
  }

  LoadGraph() {
    const container = ReactDOM.findDOMNode(this.refs.divGraph) as HTMLElement;

    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mxUtils.error("Browser is not supported!", 200, false);
    } else {
      container.innerHTML = '';

      // Disables the built-in context menu
      mxEvent.disableContextMenu(container);

      // Creates the graph inside the given container
      const graph = new mxGraph(container);

      // Gets the default parent for inserting new cells. This is normally the first
      // child of the root (ie. layer 0).
      var parent = graph.getDefaultParent();

      graph.setEnabled(false);

      graph.getModel().beginUpdate();
      try {
        const { x, y } = this.props.pos;
        graph.insertVertex(parent, null, "USS\nEnterprise", x, y, 75, 75);

        this.props.shots.forEach(eachShot => {
          graph.insertVertex(parent, null, "", eachShot.x, eachShot.y, 10, 10);
        })

        this.props.invaders.forEach(eachInvader => {
          graph.insertVertex(parent, null, "", eachInvader.pos.x, eachInvader.pos.y, 20, 20);
        })

      } finally {
        // Updates the display
        graph.getModel().endUpdate();
      }
    }
  }

  render() {
    return <div className="graph-container" ref="divGraph" id="divGraph" />;
  }
}

export default Graph;
