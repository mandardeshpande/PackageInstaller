var Graph = require('../util/GraphUtil');
var expect = require("chai").expect;

describe("Graph Util ", function(){

    it("should be add Project to Graph with smaller list", function(){
        var testGraphObj = new Graph();

        testGraphObj.addNode('KittenService');
        testGraphObj.addNode('CamelCaser');

        var expectedJSON = {
                nodes: {
                    KittenService: {},
                    CamelCaser: {}
                }
        }

        expect(JSON.stringify(testGraphObj)).to.deep.equal(JSON.stringify(expectedJSON));
    });

    it("should be not add Project to Graph which is already present", function(){
        var testGraphObj = new Graph();

        testGraphObj.addNode('KittenService');
        testGraphObj.addNode('CamelCaser');
        var testResult = testGraphObj.addNode('CamelCaser');

        var expectedJSON = {
            nodes: {
                KittenService: {},
                CamelCaser: {}
            }
        }

        expect(JSON.stringify(testGraphObj)).to.deep.equal(JSON.stringify(expectedJSON));
        expect(testResult).to.equal('node of value CamelCaser already added');
    });

    it("should be add Project to Graph with larger list", function(){
        var testGraphObj = new Graph();

        testGraphObj.addNode('KittenService');
        testGraphObj.addNode('Leetmeme');
        testGraphObj.addNode('Cyberportal');
        testGraphObj.addNode('Ice');
        testGraphObj.addNode('Fraudstream');
        testGraphObj.addNode('CamelCaser');

        var expectedJSON = {
            nodes: {
                KittenService: {},
                Leetmeme: {},
                Cyberportal: {},
                Ice: {},
                Fraudstream: {},
                CamelCaser: {}
            }
        }

        expect(JSON.stringify(testGraphObj)).to.deep.equal(JSON.stringify(expectedJSON));
    });

    it("should be add Project dependency to Graph with smaller list", function(){
        var testGraphObj = new Graph();

        testGraphObj.addNode('KittenService');
        testGraphObj.addNode('CamelCaser');

        testGraphObj.addEdge('KittenService','CamelCaser');

        var expectedJSON = {
            nodes:{
                KittenService: {
                    CamelCaser:true
                },
                CamelCaser: {}
            }
        }

        expect(JSON.stringify(testGraphObj)).to.deep.equal(JSON.stringify(expectedJSON));
    });

    it("should be not add Project dependency to Graph with which is already present", function(){
        var testGraphObj = new Graph();

        testGraphObj.addNode('KittenService');
        testGraphObj.addNode('CamelCaser');

        testGraphObj.addEdge('KittenService','CamelCaser');
        var testResult = testGraphObj.addEdge('KittenService','CamelCaser');

        var expectedJSON = {
            nodes:{
                KittenService: {
                    CamelCaser:true
                },
                CamelCaser: {}
            }
        }

        expect(JSON.stringify(testGraphObj)).to.deep.equal(JSON.stringify(expectedJSON));
        expect(testResult).to.equal('edge KittenService-CamelCaser already exists in graph');
    });

    it("should be add Project dependency to Graph with larger list", function(){
        var testGraphObj = new Graph();

        testGraphObj.addNode('KittenService');
        testGraphObj.addNode('Leetmeme');
        testGraphObj.addNode('Cyberportal');
        testGraphObj.addNode('Ice');
        testGraphObj.addNode('Fraudstream');
        testGraphObj.addNode('CamelCaser');

        testGraphObj.addEdge('Leetmeme','Cyberportal');
        testGraphObj.addEdge('Cyberportal','Ice');
        testGraphObj.addEdge('CamelCaser','KittenService');
        testGraphObj.addEdge('Fraudstream','Leetmeme');

        var expectedJSON = {
            "nodes": {
                "KittenService": {},
                "Leetmeme": {
                    "Cyberportal": true
                },
                "Cyberportal": {
                    "Ice": true
                },
                "Ice": {},
                "Fraudstream": {
                    "Leetmeme": true
                },
                "CamelCaser": {
                    "KittenService": true
                }
            }
        }


        expect(JSON.stringify(testGraphObj)).to.deep.equal(JSON.stringify(expectedJSON));
    });

    it("should be remove node from Graph", function(){
        var testGraphObj = new Graph();

        testGraphObj.addNode('KittenService');
        testGraphObj.addNode('Leetmeme');
        testGraphObj.addNode('Cyberportal');
        testGraphObj.addNode('Ice');
        testGraphObj.addNode('Fraudstream');
        testGraphObj.addNode('CamelCaser');

        testGraphObj.addEdge('Leetmeme','Cyberportal');
        testGraphObj.addEdge('Cyberportal','Ice');
        testGraphObj.addEdge('CamelCaser','KittenService');
        testGraphObj.addEdge('Fraudstream','Leetmeme');

        testGraphObj.removeNode('Fraudstream');

        var expectedJSON = {
            "nodes": {
                "KittenService": {},
                "Leetmeme": {
                    "Cyberportal": true
                },
                "Cyberportal": {
                    "Ice": true
                },
                "Ice": {},
                "CamelCaser": {
                    "KittenService": true
                }
            }
        }



        expect(JSON.stringify(testGraphObj)).to.deep.equal(JSON.stringify(expectedJSON));
    });


    it("should be return the node with no children from Graph", function(){
        var testGraphObj = new Graph();

        testGraphObj.addNode('KittenService');
        testGraphObj.addNode('Leetmeme');
        testGraphObj.addNode('Cyberportal');
        testGraphObj.addNode('Ice');
        testGraphObj.addNode('Fraudstream');
        testGraphObj.addNode('CamelCaser');

        testGraphObj.addEdge('Leetmeme','Cyberportal');
        testGraphObj.addEdge('Cyberportal','Ice');
        testGraphObj.addEdge('CamelCaser','KittenService');
        testGraphObj.addEdge('Fraudstream','Leetmeme');

        var testNoChildNode = testGraphObj.findNodeWithNoChildren();


        expect(testNoChildNode).to.equal('KittenService');
    });


});