var _ = require('underscore');

var Graph = require('../util/GraphUtil');


function buildPackageOrderGraph(projectInput) {

    var graphObj = new Graph();

    var graphDataObject = {};
    var projects = getIndividualProjects(projectInput);
    var DependencyList = getDependenciesArray(projectInput);

    projects.forEach(project => {
        graphObj.addNode(project);
    });

    DependencyList.forEach(dependency => {

        if (!_.isEmpty(dependency[1]) && !_.isEmpty(dependency[0])) {
            graphObj.addEdge(dependency[0], dependency[1]);
        }

    });

    graphDataObject.graph = graphObj;
    graphDataObject.projectList = projects;
    graphDataObject.dependency = DependencyList;

    return graphDataObject;

}


function getDependenciesArray(input) {

    var dependenciesList = [];

    _.each(input, function (item) {
        var individualArray = [];
        var projectThatDependsOn = (!_.isEmpty(item.split(':')[0])) ? item.split(':')[0] : '';
        var projectNotDependent = (!_.isEmpty(item.split(':')[1])) ? item.split(':')[1] : '';

        individualArray.push(projectThatDependsOn.trim());
        individualArray.push(projectNotDependent.trim());

        dependenciesList.push(individualArray);

    });

    return dependenciesList;

}

function getIndividualProjects(input) {

    var projects = [];

    _.each(input, function (singleInput) {
        _splitAndAddToProjectList(singleInput, projects);
    });

    return projects
}

function _splitAndAddToProjectList(projectDependency, projectList) {

    var projectDepencySplit = projectDependency.split(':');


    _.each(projectDepencySplit, function (eachProject) {
        var projectName = eachProject.trim();
        if (!_.contains(projectList, projectName) && !_.isEmpty(projectName))
            projectList.push(eachProject.trim());

    });

}

module.exports = {
    getIndividualProjects: getIndividualProjects,
    getDependenciesArray: getDependenciesArray,
    buildPackageOrderGraph: buildPackageOrderGraph

}