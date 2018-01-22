class Move {
  constructor(x, y, depth, children, parent) {
    this.x = x;
    this.y = y;
    this.depth = depth;
    this.children = children;
    this.parent = parent;
  }
}

class MoveTree {
  constructor(coordinates, maxDepth) {
    this.root = new Move(coordinates[0], coordinates[1], 0, [], null);
    this.maxDepth = maxDepth;
    this.count = 1;

    this.populate(this.root, 0);
  }

  populate(node, currentDepth) {
    if (currentDepth < this.maxDepth) {
      this.newMoves(node);
      node.children.forEach(child => {
        this.populate(child, currentDepth + 1);
      });
    }
  }

  inspect() {
    return `You have ${this.count} nodes and a max depth of ${this.maxDepth}`;
  }

  newMoves(node) {
    let moves = [
      [node.x + 3, node.y + 1],
      [node.x + 3, node.y - 1],
      [node.x + 1, node.y + 3],
      [node.x + 1, node.y - 3],
      [node.x - 1, node.y + 3],
      [node.x - 1, node.y - 3],
      [node.x - 3, node.y - 1],
      [node.x - 3, node.y + 1]
    ];
    moves = moves.filter(coordinate => {
      return (
        coordinate[0] >= 0 &&
        coordinate[0] <= 7 &&
        coordinate[1] >= 0 &&
        coordinate[1] <= 7
      );
    });
    moves.forEach(move => {
      node.children.push(new Move(move[0], move[1], node.depth + 1, [], node));
      this.count += 1;
    });
  }
}
let tree = new MoveTree([6, 4], 8);
//console.log(tree.inspect());

class KnightSearcher {
  constructor(tree) {
    this.tree = tree;
  }

  bfsFor(coordinates) {
    let queue = [this.tree.root];
    let currentNode;
    let targetNode;
    let searched = {};
    while (queue.length) {
      currentNode = queue.shift();
      if (!searched[`${currentNode.x}${currentNode.y}${currentNode.depth}`]) {
        if (
          currentNode.x === coordinates[0] &&
          currentNode.y === coordinates[1]
        ) {
          targetNode = currentNode;
          break;
        }
        searched[`${currentNode.x}${currentNode.y}${currentNode.depth}`] = true;
        currentNode.children.forEach(child => queue.push(child));
      }
    }

    if (targetNode) {
      let moves = [];
      currentNode = targetNode;
      while (currentNode) {
        moves.push([currentNode.x, currentNode.y]);
        currentNode = currentNode.parent;
      }
      console.log(`${moves.length - 1} moves`);
      while (moves.length) {
        console.log(moves.pop());
      }
    } else {
      console.log("Coordinates not found");
    }
  }

  dfsFor(coordinates) {
    let stack = [this.tree.root];
    let currentNode;
    let targetNode;
    let searched = {};
    while (stack.length) {
      currentNode = stack.pop();
      if (!searched[`${currentNode.x}${currentNode.y}${currentNode.depth}`]) {
        if (
          currentNode.x === coordinates[0] &&
          currentNode.y === coordinates[1]
        ) {
          targetNode = currentNode;
          break;
        }
        searched[`${currentNode.x}${currentNode.y}${currentNode.depth}`] = true;
        currentNode.children.forEach(child => stack.push(child));
      }
    }

    if (targetNode) {
      let moves = [];
      currentNode = targetNode;
      while (currentNode) {
        moves.push([currentNode.x, currentNode.y]);
        currentNode = currentNode.parent;
      }
      console.log(`${moves.length - 1} moves`);
      while (moves.length) {
        console.log(moves.pop());
      }
    } else {
      console.log("Coordinates not found");
    }
  }
}

const searcher = new KnightSearcher(tree);
searcher.bfsFor([0, 6]);

searcher.dfsFor([0, 6]);
