import { Router } from "express";
import { createEdge, deleteEdge, getEdge } from "../controllers/edgeContollers";

const edgeRouter = Router();

edgeRouter.get("/", (req, res) => {
    res.send("Hello from edges routes");
});

edgeRouter.route("/:edgeId").get(getEdge);
edgeRouter.route("/").post(createEdge);
edgeRouter.route("/:edgeId").delete(deleteEdge);

export default edgeRouter;