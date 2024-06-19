class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    // use the set method add to insert vertex to nodes property
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    // iterate through array and add to nodes
    for(let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    // use set method add to insert verticies into each others adjacent property
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    // use set method delete to remove verticies from each other's adjacent property.
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // iterate through vertex's adjacent property
    for(let e of vertex.adjacent) {
      // use removeEdge to delete edge
      this.removeEdge(vertex, e);
    }

    // remove vertex from nodes property.
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    // Create Set to track which verticies were visited
    const visited = new Set();
    // Create Array to store visited verticies for output later
    const result = [];

    // Helper Functions
    /** Traverse Function
     * Recursive function that will handle traversing the graph w/o running into cycles within the graph
     * 
     * Parameters:
     * - vertex: vertex object from graph nodes property
     */
    function traverse(vertex) {
      // base case
      if (!vertex) {
        return null;
      }
      // visit vertex
      visited.add(vertex);
      result.push(vertex.value);
      // visit neighbors
      vertex.adjacent.forEach(neighbor => {
        if(!visited.has(neighbor)) {
          return traverse(neighbor);
        }
      });
    }

    traverse(start);
    return result;

  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    // Create an empty queue
    const queue = [start];
    // Create a result array to track visited verticies for output
    const result = [];
    // Create a Set to track visited vertices to prevent verticies from being revisited.
    const visited = new Set();
    // Create let var to store current vertex
    let curr;

    // Visit node
    visited.add(start);

    // While there is still remaian vertices in queue
    while(queue.length) {
      // Update curr to first in queue
      curr = queue.shift();
      // Add current vertex's value to result array
      result.push(curr.value);

      // Visit neighbors
      curr.adjacent.forEach(neighbor => {
        if(!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}

module.exports = {Graph, Node}