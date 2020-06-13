import { VertexAlphabet, EdgeAlphabet } from "./definitions";
import Graph from "./Graph";

export class Kosaraju {

  visited: Set<VertexAlphabet> = new Set();
  stack: VertexAlphabet[] = [];
  stack_scc: VertexAlphabet[] = [];
  stack_scc_result: VertexAlphabet[][] = [];
  graph = new Graph();
  graph_reverse = new Graph();
  edges_alphabet: EdgeAlphabet[];

  constructor(edges_alphabet: EdgeAlphabet[]) {

    this.edges_alphabet = edges_alphabet;
    this.initialize();

  }

  initialize(): void {

    this.edges_alphabet.forEach(([v1a, v2a]) => {

      this.graph.add([v1a, v2a]);
      this.graph_reverse.add([v2a, v1a]);

    });

  }

  find_scc(): void {

    this.first_path();
    this.visited.clear();
    this.second_path();

  }

  first_path(): void {


    ["B", "I", ...this.graph.vertexes_alphabet].forEach((va) => {

      if (!this.graph.vertexes_alphabet.includes(va))
        return;

      this.visit(va);

    });

  }

  second_path(): void {

    while (this.stack.length) {

      var vertex = this.stack.pop()!;

      this.visit2(vertex);

      if (this.stack_scc.length) {

        this.stack_scc_result.push(this.stack_scc);
        this.stack_scc = [];

      }

    }

  }

  visit(vertex: VertexAlphabet): void {

    if (this.visited.has(vertex))
      return;

    this.visited.add(vertex);

    this.graph.get_adjacent_vertexes_from_vertex(vertex).forEach((vertex2) => {

      this.visit(vertex2);

    });

    this.stack.push(vertex);

  }

  visit2(vertex: VertexAlphabet): void {

    if (this.visited.has(vertex))
      return;

    this.visited.add(vertex);
    this.stack_scc.push(vertex);

    this.graph_reverse.get_adjacent_vertexes_from_vertex(vertex).forEach((vertex2) => {

      this.visit2(vertex2);

    });

  }

  print_result(): void {

    var count_scc = 1;

    this.stack_scc_result.forEach((scc) => {

      console.log(`scc(${count_scc++}): ${scc}`);

    });

  }

}

if (require.main === module) {

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
  kosaraju.print_result();

}
