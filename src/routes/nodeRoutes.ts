import { Router } from "express";
import { createNode, deleteNode, findNodes, getNeighbors, getNode, updateNode } from "../controllers/nodeControllers";

const nodeRouter = Router();

nodeRouter.get("/", (req, res) => {
    res.send("Hello from node routes");
});

nodeRouter.route("/").post(createNode);
nodeRouter.route("/find").get(findNodes);
nodeRouter.route("/:nodeId").get(getNode);
nodeRouter.route("/:nodeId").delete(deleteNode);
nodeRouter.route("/:nodeId").put(updateNode);
nodeRouter.route("/:nodeId/neighbors").get(getNeighbors);

export default nodeRouter;