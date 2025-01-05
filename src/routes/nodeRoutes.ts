import { Router } from "express";
const nodeRouter = Router()

nodeRouter.get("/", (req, res) => {
    res.send("HELLO FROM API");
});

export default nodeRouter