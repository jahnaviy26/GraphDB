type Neighbor = {
    inbound : any,
    outbound : any
};

class Graph{

    nodes: Map<string, any>;
    edges: Map<string, any>;
    nodeIdCounter : number;
    edgeIdcounter : number;

    constructor(){
        this.nodes = new Map;
        this.edges = new Map;
        this.nodeIdCounter = 0;
        this.edgeIdcounter = 0;
    }

    addNodes(properties: {}): string {
        const nodeId = (this.nodeIdCounter++).toString();
        this.nodes.set(nodeId, {
            id: nodeId,
            properties: properties,
            inedges: new Set(),
            outedges: new Set(),
        });

        return nodeId;
    }

    findNodes(propertyKey: string, propertyValue: string) {
        const results = [];
        for (const [nodeId, node] of this.nodes) {
          if (node.properties[propertyKey] === propertyValue) {
            results.push(node);
          }
        }
        return results;
      }

    addEdge( fromNodeId: string, toNodeId : string, properties : {}){
        if (!this.nodes.has(fromNodeId) || !this.nodes.has(toNodeId)){
            throw new Error("node do not exist");
        }

        const edgeId = (this.edgeIdcounter++).toString();
        this.edges.set(edgeId, {
            id: edgeId,
            from: fromNodeId,
            to: toNodeId,
            properties: properties,
        });

        this.nodes.get(fromNodeId).outedges.add(edgeId);
        this.nodes.get(toNodeId).inedges.add(edgeId);

        return edgeId;
    }
    
    deleteEdge(edgeId : string) : boolean {
        const edge = this.edges.get(edgeId);

        if(!edge) return false;

        this.nodes.get(edge.from).outedges.delete(edgeId);
        this.nodes.get(edge.to).inedges.delete(edgeId);

        return this.edges.delete(edgeId);
    }

    deleteNode(nodeId : string): boolean{
        const node= this.nodes.get(nodeId);

        if(!node) return false;

        for(let edgeId of node.inedges){
            this.deleteEdge(edgeId);
        }
        for(let edgeId of node.outedges){
            this.deleteEdge(edgeId);
        }

        return this.nodes.delete(nodeId);
    }

    getNeighbors(nodeId: string){
        const node = this.nodes.get(nodeId);
        if(!node) return null

        let neighbors: Neighbor ={
            inbound : [],
            outbound : [],
        };

        for(let edgeId of node.inedges){
            const edge= this.edges.get(edgeId);
            const node= this.nodes.get(edge.from);
            neighbors.inbound.push(node, edge);
        };

        for(let edgeId of node.outedges){
            const edge= this.edges.get(edgeId);
            const node= this.nodes.get(edge.to);
            neighbors.outbound.push(node, edge);
        };

        return neighbors;
    }

    getNode(nodeId: string) {
        return this.nodes.get(nodeId);
    }
    
    getEdge(edgeId: string) {
        return this.edges.get(edgeId);
    }

    updateNode(nodeId: string, properties: Object) {
        let node = this.getNode(nodeId);
        this.nodes.set(nodeId, {
          properties,
          nodeId: nodeId,
          inEdges: node.inEdges,
          outEdges: node.outEdges,
        });
    }
}

const graph = new Graph();

let node0 = graph.addNodes({ name: "alice" });
let node1 = graph.addNodes({ name: "bob" });
let node2 = graph.addNodes({ name: "charlie" });

let edge0 = graph.addEdge(node0, node1, { type: "friend" });
let edge1 = graph.addEdge(node1, node2, { type: "sus" });
let edge2 = graph.addEdge(node2, node0, { type: "son" });


graph.deleteNode(node0);
graph.deleteNode(node2);
graph.deleteNode(node1);

console.log(graph);

// console.log(graph.getNeighbors(node0)?.inbound)
// console.log(graph.getNeighbors(node0)?.outbound)

export default Graph