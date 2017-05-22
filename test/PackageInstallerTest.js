var packageInstaller = require('../src/PackageInstaller');
var expect = require("chai").expect;

describe("Package Installer Main  ", function(){

    it("should return the order in which project should be installed smaller list", function(){

        var inputProject = (['KittenService: CamelCaser', 'CamelCaser: ']);
        var buildOrder = packageInstaller.init(inputProject);

        expect(buildOrder).to.equal('CamelCaser, KittenService');
    });

    it("should return the order in which project should be larger list", function(){

        var inputProject = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser:KittenService','Fraudstream: Leetmeme','Ice: '];
        var buildOrder = packageInstaller.init(inputProject);

        expect(buildOrder).to.equal('KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream');
    });

    it("should return exception due to cyclic dependency", function(){

        var inputProject = ['KittenService: ','Leetmeme: Cyberportal','Cyberportal: Ice','CamelCaser:KittenService','Fraudstream: ','Ice: Leetmeme'];
        var buildOrder = packageInstaller.init(inputProject);

        expect(buildOrder).to.equal('Cycle detected');
    });
});