import { Router } from "express";
import GRAPH from "../utils/constants";
import { createEdge, deleteEdge, getEdge } from "../controllers/edgeContollers";

const edgeRouter = Router();

edgeRouter.get("/:edgeId", (req, res) => {
    const edgeId = req.params.edgeId;
    const edge = GRAPH.getEdge(edgeId);
    if (!edge) {
      res.status(404).json({ error: "Node not found" });
    }
    res.status(200).json(edge);
  });
  edgeRouter.post("/", (req, res) => {
    try {
      const { fromNodeId, toNodeId, properties } = req.body;
      if (fromNodeId === "" || toNodeId == "") {
        res.status(400).json({ message: "from or to id is not passed" });
      }
      let edgeId = GRAPH.addEdge(fromNodeId, toNodeId, properties);
      res.status(201).json({
        message: `edge created at ${edgeId}`,
      });
    } catch (error) {
      res.status(400).json(error);
    }
});

export default edgeRouter;