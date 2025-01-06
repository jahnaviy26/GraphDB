import { Router } from "express";
import { createEdge, deleteEdge, getEdge } from "../controllers/edgeContollers";

const edgeRouter = Router();

edgeRouter.route("/:edgeId").get(getEdge);
edgeRouter.route("/").post(createEdge);
edgeRouter.route("/:edgeId").delete(deleteEdge);

export default edgeRouter;