"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Graph = /** @class */ (function () {
    function Graph() {
        this.nodes = new Map;
        this.edges = new Map;
        this.nodeIdCounter = 0;
        this.edgeIdcounter = 0;
    }
    Graph.prototype.addNodes = function (properties) {
        var nodeId = (this.nodeIdCounter++).toString();
        this.nodes.set(nodeId, {
            id: nodeId,
            properties: properties,
            inedges: new Set(),
            outedges: new Set(),
        });
        return nodeId;
    };
    Graph.prototype.addEdge = function (fromNodeId, toNodeId, properties) {
        if (!this.nodes.has(fromNodeId) || !this.nodes.has(toNodeId)) {
            throw new Error("node do not exist");
        }
        var edgeId = (this.edgeIdcounter++).toString();
        this.edges.set(edgeId, {
            id: edgeId,
            from: fromNodeId,
            to: toNodeId,
            properties: properties,
        });
        this.nodes.get(fromNodeId).outedges.add(edgeId);
        this.nodes.get(toNodeId).inedges.add(edgeId);
        return edgeId;
    };
    Graph.prototype.deleteEdge = function (edgeId) {
        var edge = this.edges.get(edgeId);
        if (!edge)
            return false;
        this.nodes.get(edge.from).outedges.delete(edgeId);
        this.nodes.get(edge.to).inedges.delete(edgeId);
        return this.edges.delete(edgeId);
    };
    Graph.prototype.deleteNode = function (nodeId) {
        var node = this.nodes.get(nodeId);
        if (!node)
            return false;
        for (var _i = 0, _a = node.inedges; _i < _a.length; _i++) {
            var edgeId = _a[_i];
            this.deleteEdge(edgeId);
        }
        for (var _b = 0, _c = node.outedges; _b < _c.length; _b++) {
            var edgeId = _c[_b];
            this.deleteEdge(edgeId);
        }
        return this.nodes.delete(nodeId);
    };
    Graph.prototype.getNeighbors = function (nodeId) {
        var node = this.nodes.get(nodeId);
        if (!node)
            return null;
        var neighbors = {
            inbound: [],
            outbound: [],
        };
        for (var _i = 0, _a = node.inedges; _i < _a.length; _i++) {
            var edgeId = _a[_i];
            var edge = this.edges.get(edgeId);
            var node_1 = this.nodes.get(edge.from);
            neighbors.inbound.push(node_1, edge);
        }
        ;
        for (var _b = 0, _c = node.outedges; _b < _c.length; _b++) {
            var edgeId = _c[_b];
            var edge = this.edges.get(edgeId);
            var node_2 = this.nodes.get(edge.to);
            neighbors.outbound.push(node_2, edge);
        }
        ;
        return neighbors;
    };
    Graph.prototype.getNode = function (nodeId) {
        return this.nodes.get(nodeId);
    };
    Graph.prototype.getEdge = function (edgeId) {
        return this.edges.get(edgeId);
    };
    Graph.prototype.updateNode = function (nodeId, properties) {
        var node = this.getNode(nodeId);
        this.nodes.set(nodeId, {
            properties: properties,
            nodeId: nodeId,
            inEdges: node.inEdges,
            outEdges: node.outEdges,
        });
    };
    return Graph;
}());
var graph = new Graph();
var node0 = graph.addNodes({ name: "alice" });
var node1 = graph.addNodes({ name: "bob" });
var node2 = graph.addNodes({ name: "charlie" });
var edge0 = graph.addEdge(node0, node1, { type: "friend" });
var edge1 = graph.addEdge(node1, node2, { type: "sus" });
var edge2 = graph.addEdge(node2, node0, { type: "son" });
graph.deleteNode(node0);
graph.deleteNode(node2);
graph.deleteNode(node1);
console.log(graph);
// console.log(graph.getNeighbors(node0)?.inbound)
// console.log(graph.getNeighbors(node0)?.outbound)
exports.default = Graph;
