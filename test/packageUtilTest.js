var packageInstaller = require('../util/packageInstallerUtil');
var expect = require("chai").expect;

describe("Package Installer Util ", function(){

    it("should be added to Project list", function(){
        var list = packageInstaller.getIndividualProjects(['KittenService: CamelCaser', 'CamelCaser: ']);
        expect(list).to.deep.have.same.members(['KittenService','CamelCaser']);
    });

    it("should be added to Project with a bigger list", function(){
        var list = packageInstaller.getIndividualProjects(['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser:KittenService','Fraudstream: Leetmeme','Ice: ']);
        expect(list).to.deep.have.same.members(['KittenService','Leetmeme','Cyberportal','Ice','CamelCaser','Fraudstream']);
    });

    it("should be added to Project dependency with a bigger list", function(){
        var list = packageInstaller.getDependenciesArray(['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser:KittenService','Fraudstream: Leetmeme','Ice: ']);
        expect(list).to.deep.have.same.members([
                ['KittenService',''],
                ['Leetmeme','Cyberportal'],
                ['Cyberportal','Ice'],
                ['CamelCaser','KittenService'],
                ['Fraudstream','Leetmeme'],
                ['Ice','']
            ]);
    });

    it("should be added to Project dependency with a smaller list", function(){
        var list = packageInstaller.getDependenciesArray(['KittenService: CamelCaser', 'CamelCaser: ']);
        expect(list).to.deep.have.same.members([
            ['KittenService','CamelCaser'],
            ['CamelCaser','']
        ]);
    });


    it("should build a graph with dependencies", function(){
        var testGraphObbject = packageInstaller.buildPackageOrderGraph(['KittenService: CamelCaser', 'CamelCaser: ']);
        var expectedGraphObject = {
            "nodes": {
                "KittenService": {
                    "CamelCaser": true
                },
                "CamelCaser": {}
            }
        };
        expect(JSON.stringify(testGraphObbject.graph)).to.deep.equal(JSON.stringify(expectedGraphObject));
    });

});