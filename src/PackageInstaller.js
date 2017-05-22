var packageUtil = require('../util/packageInstallerUtil');

function init(inputList){
    var buildOrderReturnedObject = packageUtil.buildPackageOrderGraph(inputList);
    var buildOrderList = getBuildOrder(buildOrderReturnedObject);

    return buildOrderList;
}

function getBuildOrder(graphData){

    var graphObj = graphData.graph;
    var projects = graphData.projectList;

    var buildOrder = [];
    var currNode = graphObj.findNodeWithNoChildren();
    while (currNode !== undefined) {
        buildOrder.push(currNode);
        graphObj.removeNode(currNode);
        currNode = graphObj.findNodeWithNoChildren();
    }
    if (buildOrder.length === projects.length) {
        return buildOrder.join(', ');
    } else {
        return 'Cycle detected';
    }

}


module.exports = {
    init:init
}
