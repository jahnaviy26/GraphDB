"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNode = createNode;
exports.getNode = getNode;
exports.deleteNode = deleteNode;
exports.updateNode = updateNode;
exports.getNeighbors = getNeighbors;
exports.findNodes = findNodes;
var constants_1 = require("../utils/constants");
function createNode(req, res) {
    var properties = req.body;
    if (!properties) {
        res
            .status(400)
            .json({ message: "node creation failed please give properties to node" });
    }
    var nodeid = constants_1.default.addNodes(properties);
    res.status(201).json({ message: "node created at ".concat(nodeid) });
}
function getNode(req, res) {
    var nodeId = req.params.nodeId;
    var node = constants_1.default.getNode(nodeId);
    if (!node) {
        res.status(404).json({ error: "Node not found" });
    }
    res.json(node);
}
function deleteNode(req, res) {
    var nodeId = req.params.nodeId;
    if (nodeId === "") {
        res.status(400).json({ message: "nodeId is not passed in params" });
    }
    var result = constants_1.default.deleteNode(nodeId);
    if (result) {
        res.status(200).json({ message: "nodeId is deleted ".concat(nodeId) });
    }
    else {
        res.status(200).json({ message: "node is not found" });
    }
}
function updateNode(req, res) {
    var nodeId = req.params.nodeId;
    var properties = req.body;
    if (nodeId === "") {
        res.status(400).json({ message: "nodeId is not passed in params" });
    }
    if (!properties) {
        res.status(400).json({ message: "properties is not passed in body" });
    }
    try {
        constants_1.default.updateNode(nodeId, properties);
        res.status(200).json({ message: "nodeId is updated ".concat(nodeId) });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
}
function getNeighbors(req, res) {
    var nodeId = req.params.nodeId;
    if (nodeId === "") {
        res.status(400).json({ message: "nodeId is not passed in params" });
    }
    var result = constants_1.default.getNeighbors(nodeId);
    if (!result) {
        res.status(404).json({ message: "node not found" });
    }
    res.status(200).json(result);
}
function findNodes(req, res) {
    console.log(req.query, "dao;lkmd aslk;m askldm askl md aslkmd asl,m ");
    var _a = req.query, key = _a.key, value = _a.value;
    if (!key || !value) {
        res.status(400).json({ message: "key or value is not passed in query" });
    }
    console.log(key, value);
    if (typeof key === "string" && typeof value === "string") {
        var result = constants_1.default.findNodes(key, value);
        console.log(result);
        res.status(200).json(result);
    }
}
