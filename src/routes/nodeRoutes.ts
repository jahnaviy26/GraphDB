import { Router } from "express";
import Graph from "../graph";
import { createNode, deleteNode, findNodes, getNeighbors, getNode, updateNode } from "../controllers/nodeControllers";

let GRAPH = new Graph();

const nodeRouter = Router();

nodeRouter.route("/").post(createNode);
nodeRouter.route("/find").get(findNodes);
nodeRouter.route("/:nodeId").get(getNode);
nodeRouter.route("/:nodeId").delete(deleteNode);
nodeRouter.route("/:nodeId").put(updateNode);
nodeRouter.route("/:nodeId/neighbors").get(getNeighbors);

export default nodeRouter;