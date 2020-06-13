const { Tarjan } = require("../src/Tarjan");

test("result check", () => {

  var tarjan = new Tarjan([
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

  tarjan.find_scc();

  expect(tarjan.scc_results).toStrictEqual([["F", "E", "D"], ["A", "C", "B"], ["K"], ["H", "G", "J", "I"]]);

});

test("coverage up", () => {

  var tarjan = new Tarjan([["A", "B"]]);

  tarjan.find_scc();
  tarjan.print_lowlink_values();
  tarjan.print_result();

  expect(tarjan.scc_results).toStrictEqual([["B"], ["A"]]);

});
