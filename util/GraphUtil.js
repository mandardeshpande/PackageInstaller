var Graph = function() {
    this.nodes = {};
};

Graph.prototype.addEdge = function(node, edge) {
    if (this.nodes[node] === undefined) {
        return 'node does not exist';
    } else if (this.nodes[node][edge]) {
        return `edge ${node}-${edge} already exists in graph`;
    } else {
        this.nodes[node][edge] = true;
    }
};

Graph.prototype.addNode = function(value) {
    if (this.nodes[value] !== undefined) {
        return `node of value ${value} already added`;
    } else {
        this.nodes[value] = {};
    }
};

Graph.prototype.removeNode = function(node) {
    if (this.nodes[node] === undefined) {
        return 'node does not exist';
    } else {
        delete this.nodes[node];
        for (var currNode in this.nodes) {
            if (this.nodes[currNode][node] !== undefined) {
                delete this.nodes[currNode][node];
            }
        }
    }
};

Graph.prototype.findNodeWithNoChildren = function() {
    for (var node in this.nodes) {
        if (Object.keys(this.nodes[node]).length === 0) {
            return node;
        }
    }
    return undefined;
};

module.exports = Graph;