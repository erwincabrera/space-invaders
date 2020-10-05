import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as GraphModule from "mxgraph/javascript/dist/build";

const myGraph = new GraphModule({
  mxImageBasePath: "mxgraph/javascript/src/images",
  mxBasePath: "mxgraph/javascript/src",
});

const mxGraph = myGraph.mxGraph;
const mxClient = myGraph.mxClient;
const mxUtils = myGraph.mxUtils;
const mxEvent = myGraph.mxEvent;

class Graph extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
    this.LoadGraph = this.LoadGraph.bind(this);
  }

  componentDidMount() {
    this.LoadGraph();
  }

  LoadGraph() {
    var container = ReactDOM.findDOMNode(this.refs.divGraph);

    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mxUtils.error("Browser is not supported!", 200, false);
    } else {
      // Disables the built-in context menu
      mxEvent.disableContextMenu(container);

      // Creates the graph inside the given container
      var graph = new mxGraph(container);

      // Gets the default parent for inserting new cells. This is normally the first
      // child of the root (ie. layer 0).
      var parent = graph.getDefaultParent();

      graph.setEnabled(false);

      graph.getModel().beginUpdate();
      try {
        var v1 = graph.insertVertex(parent, null, "Hello,", 20, 20, 80, 30);
        var v2 = graph.insertVertex(parent, null, "World!", 200, 150, 80, 30);
        graph.insertEdge(parent, null, "", v1, v2);
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
