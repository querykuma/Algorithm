const { Kosaraju } = require("../src/Kosaraju");

test("result check", () => {

  var kosaraju = new Kosaraju([
    ["A", "B"],
    ["B", "C"],
    ["C", "A"],
    ["B", "D"],
    ["D", "E"],
    ["E", "F"],
    ["F", "D"],
    ["G", "H"],
    ["H", "I"],
    ["I", "J"],
    ["J", "K"],
    ["J", "G"],
    ["G", "F"]
  ]);

  kosaraju.find_scc();

  expect(kosaraju.stack_scc_result).toStrictEqual([["I", "H", "G", "J"], ["K"], ["B", "A", "C"], ["D", "F", "E"]]);

});

test("coverage up", () => {

  var kosaraju = new Kosaraju([["A", "B"]]);

  kosaraju.find_scc();
  kosaraju.print_result();

  expect(kosaraju.stack_scc_result).toStrictEqual([["A"], ["B"]]);

});


test("coverage up2", () => {

  var kosaraju = () => new Kosaraju([["A", "B"], ["A", "B"]]);

  expect(kosaraju).toThrowError("");

});
