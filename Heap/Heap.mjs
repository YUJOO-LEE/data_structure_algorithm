import { BinaryTree } from './BinaryTree.mjs';

class Heap {
  constructor() {
    this.root = null;
    this.lastInsertedNode = null;
  }

  insert(data) {
    if (this.lastInsertedNode === null) {
      this.lastInsertedNode = new BinaryTree(data);
      this.root = this.lastInsertedNode;
      return;
    }

    const insertingParent = this.getInsertingParent();
    let newNode = new BinaryTree(data);

    if (insertingParent.getLeftSubTree() === null) {
      insertingParent.setLeftSubTree(newNode);
    } else if (insertingParent.getRightSubTree() === null) {
      insertingParent.setRightSubTree(newNode);
    }
    newNode.setParent(insertingParent);
    this.lastInsertedNode = newNode;

    while (newNode.getParent() !== null) {
      if (this.isBigPriority(newNode.getData(), newNode.getParent().getData()) === true) {
        const tempData = newNode.getParent().getData();
        newNode.getParent().setData(newNode.getData());
        newNode.setData(tempData);
        newNode = newNode.getParent();
      } else { 
        break;
      }
    }
  }

  isBigPriority(first, second) {
    return (first < second);
  }
  
  getInsertingParent() {
    if (this.lastInsertedNode.getParent() === null) {
      return this.lastInsertedNode;
    }
    
    if (this.lastInsertedNode === this.lastInsertedNode.getParent().getLeftSubTree()) {
      return this.lastInsertedNode.getParent();
    }

    let current = this.lastInsertedNode;
    let firstRightSibling = null;

    while (current.getParent().getParent() !== null) {
      current = current.getParent();
      
      firstRightSibling = this.getRightSibling(current);
      if (firstRightSibling !== null) {
        break;
      }
    }

    if (firstRightSibling !== null) {
      while (firstRightSibling.getLeftSubTree() !== null) {
        firstRightSibling = firstRightSibling.getLeftSubTree();
      }
      return firstRightSibling;
    }

    current = this.root;
    while (current.getLeftSubTree() !== null) {
      current = current.getLeftSubTree();
    }
    return current;
  }
  
  getRightSibling(node) {
    if (node.getParent().getRightSubTree() !== node) {
      return node.getParent().getRightSubTree();
    }
    return null;
  }

  getLeftSibling(node) {
    if (node.getParent().getLeftSubTree() !== node) {
      return node.getParent().getLeftSubTree();
    }
    return null;
  }
}

let heap = new Heap();

heap.insert(4);
heap.insert(2);
heap.insert(5);
heap.insert(7);
heap.insert(1);

heap.root.inOrderTraversal(heap.root);
console.log(heap.root);