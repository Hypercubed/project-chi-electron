// This file contains tests for the computeLayout function.

// Use the "expect" assert style.
// See http://chaijs.com/guide/styles/
var expect = require("chai").expect,
    computeLayout = require("../index").computeLayout;

describe("computeLayout", function () {

  it("single component", function() {
    var layout = "foo",
        box = { width: 100, height: 100 },
        result = computeLayout(layout, null, box);

    expect(result.foo.width).to.equal(100);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);
  });

  it("two components horizontal, unspeficied sizes", function() {
    var layout = {
          orientation: "horizontal",
          children: ["foo", "bar"]
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, null, box);

    expect(result.foo.width).to.equal(50);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(50);
    expect(result.bar.height).to.equal(100);
    expect(result.bar.x).to.equal(50);
    expect(result.bar.y).to.equal(0);
  });

  it("two components vertical, unspeficied sizes", function() {
    var layout = {
          orientation: "vertical",
          children: ["foo", "bar"]
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, null, box);

    expect(result.foo.width).to.equal(100);
    expect(result.foo.height).to.equal(50);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(100);
    expect(result.bar.height).to.equal(50);
    expect(result.bar.x).to.equal(0);
    expect(result.bar.y).to.equal(50);
  });

  it("two components horizontal, relative size", function() {
    var layout = {
          orientation: "horizontal",
          children: ["foo", "bar"]
        },
        sizes = {
          foo: { size: 3 },
          // bar size defaults to 1
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, sizes, box);

    expect(result.foo.width).to.equal(75);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(25);
    expect(result.bar.height).to.equal(100);
    expect(result.bar.x).to.equal(75);
    expect(result.bar.y).to.equal(0);
  });

  it("two components horizontal, relative size as a string", function() {
    var layout = {
          orientation: "horizontal",
          children: ["foo", "bar"]
        },
        sizes = {
          foo: { size: "3" },
          // bar size defaults to 1
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, sizes, box);

    expect(result.foo.width).to.equal(75);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(25);
    expect(result.bar.height).to.equal(100);
    expect(result.bar.x).to.equal(75);
    expect(result.bar.y).to.equal(0);
  });

  it("two components vertical, relative size", function() {
    var layout = {
          orientation: "vertical",
          children: ["foo", "bar"]
        },
        sizes = {
          foo: { size: 3 },
          // bar size defaults to 1
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, sizes, box);

    expect(result.foo.width).to.equal(100);
    expect(result.foo.height).to.equal(75);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(100);
    expect(result.bar.height).to.equal(25);
    expect(result.bar.x).to.equal(0);
    expect(result.bar.y).to.equal(75);
  });

  it("two components horizontal, absolute size", function() {
    var layout = {
          orientation: "horizontal",
          children: ["foo", "bar"]
        },
        sizes = {
          foo: { size: "60px" },
          // bar size defaults to 1
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, sizes, box);

    expect(result.foo.width).to.equal(60);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(40);
    expect(result.bar.height).to.equal(100);
    expect(result.bar.x).to.equal(60);
    expect(result.bar.y).to.equal(0);
  });

  it("two components vertical, absolute size", function() {
    var layout = {
          orientation: "vertical",
          children: ["foo", "bar"]
        },
        sizes = {
          foo: { size: "60px" },
          // bar size defaults to 1
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, sizes, box);

    expect(result.foo.width).to.equal(100);
    expect(result.foo.height).to.equal(60);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(100);
    expect(result.bar.height).to.equal(40);
    expect(result.bar.x).to.equal(0);
    expect(result.bar.y).to.equal(60);
  });

  it("three components horizontal", function() {
    var layout = {
          orientation: "horizontal",
          children: ["foo", "bar", "baz"]
        },
        sizes = {
          foo: { size: 2},
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, sizes, box);

    expect(result.foo.width).to.equal(50);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(25);
    expect(result.bar.height).to.equal(100);
    expect(result.bar.x).to.equal(50);
    expect(result.bar.y).to.equal(0);

    expect(result.baz.width).to.equal(25);
    expect(result.baz.height).to.equal(100);
    expect(result.baz.x).to.equal(75);
    expect(result.baz.y).to.equal(0);
  });

  it("three components nested horizontal, unspecified sizes", function() {
    var layout = {
          orientation: "horizontal",
          children: [
            "foo",
            {
              orientation: "horizontal",
              children: ["bar", "baz"]
            }
          ]
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, null, box);

    expect(result.foo.width).to.equal(50);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(25);
    expect(result.bar.height).to.equal(100);
    expect(result.bar.x).to.equal(50);
    expect(result.bar.y).to.equal(0);

    expect(result.baz.width).to.equal(25);
    expect(result.baz.height).to.equal(100);
    expect(result.baz.x).to.equal(75);
    expect(result.baz.y).to.equal(0);
  });

  it("three components nested horizontal & vertical, unspecified sizes", function() {
    var layout = {
          orientation: "horizontal",
          children: [
            "foo",
            {
              orientation: "vertical",
              children: ["bar", "baz"]
            }
          ]
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, null, box);

    expect(result.foo.width).to.equal(50);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(50);
    expect(result.bar.height).to.equal(50);
    expect(result.bar.x).to.equal(50);
    expect(result.bar.y).to.equal(0);

    expect(result.baz.width).to.equal(50);
    expect(result.baz.height).to.equal(50);
    expect(result.baz.x).to.equal(50);
    expect(result.baz.y).to.equal(50);
  });

  it("three components nested horizontal & vertical, relative size in layout", function() {
    var layout = {
          orientation: "horizontal",
          children: [
            "foo",
            {
              orientation: "vertical",
              size: 3,
              children: ["bar", "baz"]
            }
          ]
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, null, box);

    expect(result.foo.width).to.equal(25);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(75);
    expect(result.bar.height).to.equal(50);
    expect(result.bar.x).to.equal(25);
    expect(result.bar.y).to.equal(0);

    expect(result.baz.width).to.equal(75);
    expect(result.baz.height).to.equal(50);
    expect(result.baz.x).to.equal(25);
    expect(result.baz.y).to.equal(50);
  });

  it("three components nested horizontal & vertical, relative size in layout as a string", function() {
    var layout = {
          orientation: "horizontal",
          children: [
            "foo",
            {
              orientation: "vertical",
              size: "3",
              children: ["bar", "baz"]
            }
          ]
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, null, box);

    expect(result.foo.width).to.equal(25);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(75);
    expect(result.bar.height).to.equal(50);
    expect(result.bar.x).to.equal(25);
    expect(result.bar.y).to.equal(0);

    expect(result.baz.width).to.equal(75);
    expect(result.baz.height).to.equal(50);
    expect(result.baz.x).to.equal(25);
    expect(result.baz.y).to.equal(50);
  });

  it("three components nested horizontal & vertical, absolute size in layout", function() {
    var layout = {
          orientation: "horizontal",
          children: [
            "foo",
            {
              orientation: "vertical",
              size: "60px",
              children: ["bar", "baz"]
            }
          ]
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, null, box);

    expect(result.foo.width).to.equal(40);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(60);
    expect(result.bar.height).to.equal(50);
    expect(result.bar.x).to.equal(40);
    expect(result.bar.y).to.equal(0);

    expect(result.baz.width).to.equal(60);
    expect(result.baz.height).to.equal(50);
    expect(result.baz.x).to.equal(40);
    expect(result.baz.y).to.equal(50);
  });

  it("three components, absolute size in layout, relative size in sizes", function() {
    var layout = {
          orientation: "horizontal",
          children: [
            "foo",
            {
              orientation: "vertical",
              size: "60px",
              children: ["bar", "baz"]
            }
          ]
        },
        sizes = { bar: { size: 3 }},
        box = { width: 100, height: 100 },
        result = computeLayout(layout, sizes, box);

    expect(result.foo.width).to.equal(40);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(60);
    expect(result.bar.height).to.equal(75);
    expect(result.bar.x).to.equal(40);
    expect(result.bar.y).to.equal(0);

    expect(result.baz.width).to.equal(60);
    expect(result.baz.height).to.equal(25);
    expect(result.baz.x).to.equal(40);
    expect(result.baz.y).to.equal(75);
  });

  it("three components, one hidden", function() {
    var layout = {
          orientation: "horizontal",
          children: [
            "foo",
            {
              orientation: "vertical",
              children: ["bar", "baz"]
            }
          ]
        },
        sizes = { baz: { hidden: true }},
        box = { width: 100, height: 100 },
        result = computeLayout(layout, sizes, box);
    
    expect(result.foo.width).to.equal(50);
    expect(result.foo.height).to.equal(100);
    expect(result.foo.x).to.equal(0);
    expect(result.foo.y).to.equal(0);

    expect(result.bar.width).to.equal(50);
    expect(result.bar.height).to.equal(100);
    expect(result.bar.x).to.equal(50);
    expect(result.bar.y).to.equal(0);

    expect("baz" in result).to.equal(false);
  });

  it("quantization from floats to ints for pixel dimensions", function() {
    var layout = {
          orientation: "horizontal",

          // Using 3 children will induce 33.333333 widths,
          // which should be quantized to integers and ensure no gaps.
          children: ["a", "b","c"]
        },
        box = { width: 100, height: 100 },
        result = computeLayout(layout, null, box);
    
    expect(result.a.x).to.equal(0);
    expect(result.a.width).to.equal(33);

    expect(result.b.x).to.equal(result.a.width);
    expect(result.b.width).to.equal(34);

    expect(result.c.x).to.equal(result.b.x + result.b.width);
    expect(result.c.width).to.equal(33);

    expect(result.a.width + result.b.width + result.c.width).to.equal(100);

  });
});
