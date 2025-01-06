import { Router } from "express";
import Graph from "../graph";
import { createNode, deleteNode, getNode } from "../controllers/nodeControllers";

let GRAPH = new Graph();

const nodeRouter = Router();

nodeRouter.route("/").post(createNode);
nodeRouter.route("/:nodeId").get(getNode);
nodeRouter.route("/:nodeId").delete(deleteNode);

export default nodeRouter;