import { Request, Response } from "express";
import GRAPH from "../utils/constants";

function createNode(req: Request, res: Response) {
  const properties = req.body;
  if (!properties) {
    res
      .status(400)
      .json({ message: "node creation failed please give properties to node" });
  }
  let nodeid = GRAPH.addNodes(properties);
  res.status(201).json({ message: `node created at ${nodeid}` });
}

function getNode(req: Request, res: Response) {
  const nodeId = req.params.nodeId;
  const node = GRAPH.getNode(nodeId);
  if (!node) {
    res.status(404).json({ error: "Node not found" });
  }
  res.json(node);
}

function deleteNode(req: Request, res: Response) {
  const nodeId = req.params.nodeId;
  if (nodeId === "") {
    res.status(400).json({ message: "nodeId is not passed in params" });
  }
  const result = GRAPH.deleteNode(nodeId);
  if (result) {
    res.status(200).json({ message: `nodeId is deleted ${nodeId}` });
  } else {
    res.status(200).json({ message: `node is not found` });
  }
}

function updateNode(req: Request, res: Response) {
   const nodeId = req.params.nodeId;
   const properties = req.body;
   if (nodeId === "") {
    res.status(400).json({ message: "nodeId is not passed in params" });
   }
   if (!properties) {
    res.status(400).json({ message: "properties is not passed in body" });
   }
   try {
    GRAPH.updateNode(nodeId, properties);
    res.status(200).json({ message: `nodeId is updated ${nodeId}` });
   } catch (error) {
     res.status(400).json({ message: error });
   }
}

function getNeighbors(req: Request, res: Response) {
    const nodeId = req.params.nodeId;
    if (nodeId === "") {
      res.status(400).json({ message: "nodeId is not passed in params" });
    }
    let result = GRAPH.getNeighbors(nodeId);
    if (!result) {
      res.status(404).json({ message: "node not found" });
    }
    res.status(200).json(result);
}

function findNodes(req: Request, res: Response) {
    console.log(req.query, "dao;lkmd aslk;m askldm askl md aslkmd asl,m ");
    const { key, value } = req.query;
    if (!key || !value) {
      res.status(400).json({ message: "key or value is not passed in query" });
    }
    console.log(key, value);
    if (typeof key === "string" && typeof value === "string") {
      let result = GRAPH.findNodes(key, value);
      console.log(result);
      res.status(200).json(result);
    }
}

export { createNode, getNode, deleteNode, updateNode, getNeighbors, findNodes};