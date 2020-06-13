import { VertexAlphabet } from "./definitions";

export default class Vertex {

  adjacent_vertexes: VertexAlphabet[] = [];
  vertex_alphabet: VertexAlphabet;
  index?: number;
  lowlink?: number;
  onStack = false;

  constructor(vertex_alphabet: VertexAlphabet) {

    this.vertex_alphabet = vertex_alphabet;

  }

  add(vertex_alphabet: VertexAlphabet): void {

    if (this.adjacent_vertexes.indexOf(vertex_alphabet) >= 0)
      throw new Error(`adjacent_vertexes from ${this.vertex_alphabet} already include vertex ${vertex_alphabet}`);

    this.adjacent_vertexes.push(vertex_alphabet);

  }

}
