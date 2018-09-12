var Localytics = require("nativescript-localytics").Localytics;
var localytics = new Localytics();

describe("greet function", function() {
    it("exists", function() {
        expect(localytics.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(localytics.greet()).toEqual("Hello, NS");
    });
});