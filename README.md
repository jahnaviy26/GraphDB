# GraphDB

A lightweight, in-memory graph database implementation using TypeScript, Express.js, and Node.js. This project provides a minimal yet powerful graph database with REST API endpoints for managing nodes, edges, and performing graph operations.

## Why Graph Database?

Graph databases excel at managing highly connected data and complex relationships. They are ideal for:

- Social networks (friends, followers)
- Knowledge graphs
- Recommendation systems
- Path finding problems

## Installation

```bash
# Clone the repository
git clone https://github.com/jahnaviy26/GraphDB

# Install dependencies
cd GraphDB
npm install

# Start development server
npm run dev
```

## Graph Class Methods

The core `Graph` class provides the following methods:

| Method | Description |
|--------|-------------|
| `addNode(properties)` | Creates a new node with given properties |
| `addEdge(fromNodeId, toNodeId, properties)` | Creates a directed edge between nodes |
| `getNode(nodeId)` | Retrieves a node by ID |
| `getEdge(edgeId)` | Retrieves an edge by ID |
| `updateNode(nodeId, properties)` | Updates node properties |
| `deleteNode(nodeId)` | Removes a node and its connected edges |
| `deleteEdge(edgeId)` | Removes an edge |
| `getNeighbors(nodeId)` | Gets all connected nodes (inbound/outbound) |
| `findNodes(key, value)` | Searches nodes by property |

## Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | v14 or higher |
| TypeScript | Latest |
| ts-node | Latest (for development) |

## API Reference

| Endpoint | Method | Description 
|----------|--------|-------------
| `/nodes` | POST | Create node 
| `/nodes/:nodeId` | GET | Get node 
| `/nodes/:nodeId` | PUT | Update node 
| `/nodes/:nodeId` | DELETE | Delete node 
| `/nodes/find` | GET | Search nodes 
| `/nodes/:nodeId/neighbors` | GET | Get node neighbors 
| `/edges` | POST | Create edge 
| `/edges/:edgeId` | GET | Get edge 
| `/edges/:edgeId` | DELETE | Delete edge `


## Testing 
```bash
# Find nodes by property
curl http://localhost:3000/nodes/find?key=name&value=Alice

# Get node neighbors
curl http://localhost:3000/nodes/0/neighbors
```
