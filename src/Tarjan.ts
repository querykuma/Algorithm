import { VertexAlphabet, EdgeAlphabet } from "./definitions";
import Graph from "./Graph";
import Vertex from "./Vertex";

export class Tarjan {

  edges_alphabet: EdgeAlphabet[];
  graph = new Graph();
  index = 0;
  stack: VertexAlphabet[] = [];
  scc_results: VertexAlphabet[][] = [];

  constructor(edges_alphabet: EdgeAlphabet[]) {

    this.edges_alphabet = edges_alphabet;
    this.initialize();

  }

  initialize(): void {

    this.edges_alphabet.forEach((edge) => {

      this.graph.add(edge);

    });

  }

  find_scc(): void {

    ["B", "I", ...this.graph.vertexes_alphabet].forEach((va) => {

      var v = this.graph.vertexes.get(va)!;

      if (!v)
        return;

      if (v.index === void 0)
        this.strongconnect(va);

    });

  }

  // eslint-disable-next-line max-statements
  strongconnect(va: VertexAlphabet): void {

    var v: Vertex = this.graph.vertexes.get(va)!;

    v.index = this.index;
    v.lowlink = this.index;
    this.index++;

    this.stack.push(va);
    v.onStack = true;

    this.graph.get_adjacent_vertexes_from_vertex(va).forEach((wa) => {

      var w = this.graph.vertexes.get(wa)!;

      if (w.index === void 0) {

        this.strongconnect(wa);
        v.lowlink = Math.min(v.lowlink!, w.lowlink!);

      } else if (w.onStack)
        v.lowlink = Math.min(v.lowlink!, w.index);

    });

    var wa: VertexAlphabet;
    var w: Vertex;
    var scc: VertexAlphabet[] = [];

    if (v.lowlink === v.index)
      do {

        wa = this.stack.pop()!;
        w = this.graph.vertexes.get(wa)!;
        w.onStack = false;
        scc.push(wa);

      } while (wa !== va);

    if (scc.length)
      this.scc_results.push(scc);

  }

  print_lowlink_values(): void {

    // eslint-disable-next-line prefer-template
    console.log([...this.graph.vertexes.values()].map((v) => `${v.vertex_alphabet}(${v.lowlink === void 0 ? "" : v.lowlink}${v.index === void 0 ? "" : ", " + v.index}${v.onStack ? ", S" : ""})`).join(", "));

  }

  print_result(): void {

    var count_scc = 1;

    this.scc_results.forEach((scc) => {

      console.log(`scc(${count_scc++}): ${scc}`);

    });

  }

}

if (require.main === module) {

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
  tarjan.print_lowlink_values();
  tarjan.print_result();

}
