import { Router } from "express";
import Graph from "../graph";
let GRAPH = new Graph();
// import { createNode, deleteNode, getNode } from "../controllers/nodeController";

const nodeRouter = Router();

nodeRouter.get("/:nodeId", (req, res) => {
  const nodeId = req.params.nodeId;
  const node = GRAPH.getNode(nodeId);
  if (!node) {
    res.status(404).json({ error: "Node not found" });
  }
  res.json(node);
});

nodeRouter.post("/", (req, res) => {
  const properties = req.body;
  if (!properties) {
    res
      .status(400)
      .json({ message: "node creation failed please give properties to node" });
  }
  let nodeid = GRAPH.addNodes(properties);
  res.status(201).json({ message: `node created at ${nodeid}` });
});

export default nodeRouter;