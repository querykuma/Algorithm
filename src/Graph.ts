import { VertexAlphabet, EdgeAlphabet } from "./definitions";
import Vertex from "./Vertex";

export default class Graph {

  vertexes = new Map<VertexAlphabet, Vertex>();
  vertexes_alphabet: VertexAlphabet[] = [];

  // eslint-disable-next-line max-statements
  add([v1a, v2a]: EdgeAlphabet): void {

    var v1 = this.vertexes.get(v1a);

    if (!v1) {

      v1 = new Vertex(v1a);
      this.vertexes.set(v1a, v1);

      this.vertexes_alphabet.push(v1a);

    }

    v1.add(v2a);

    var v2 = this.vertexes.get(v2a);

    if (!v2) {

      v2 = new Vertex(v2a);
      this.vertexes.set(v2a, v2);

      this.vertexes_alphabet.push(v2a);

    }

  }

  get_adjacent_vertexes_from_vertex(vertex: VertexAlphabet): VertexAlphabet[] {

    return this.vertexes.get(vertex)!.adjacent_vertexes;

  }

}
