import { BinaryTree } from './BinaryTree.mjs';

class BinarySearchTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }

  insert(data) {
    if (this.root === null) {
      this.root = new BinaryTree(data);
      return;
    }

    let parentNode = null;
    let currentNode = this.root;

    while(currentNode !== null) {
      parentNode = currentNode;

      if (currentNode.getData() > data) {
        currentNode = currentNode.getLeftSubTree();
      } else if (currentNode.getData() < data) {
        currentNode = currentNode.getRightSubTree();
      } else {
        return;
      }
    }

    const newNode = new BinaryTree(data);

    if (parentNode.getData() > data) {
      parentNode.setLeftSubTree(newNode);
    } else {
      parentNode.setRightSubTree(newNode);
    }
  }

  search(targetData) {
    let currentNode = this.root;

    while(currentNode !== null) {
      if (currentNode.getData() === targetData) {
        return currentNode;
      } else if (currentNode.getData() > targetData) {
        currentNode = currentNode.getLeftSubTree();
      } else if (currentNode.getData() < targetData) {
        currentNode = currentNode.getRightSubTree();
      }
    }

    return null;
  }

  remove(targetData) {
    const fakeParentNode = new BinaryTree(0);
    fakeParentNode.setRightSubTree(this.root);

    let parentNode = fakeParentNode;
    let currentNode = this.root;
    let deletingNode = null;

    while(currentNode !== null && currentNode.getData() !== targetData) {
      parentNode = currentNode;

      if (currentNode.getData() > targetData) {
        currentNode = currentNode.getLeftSubTree();
      } else if (currentNode.getData() < targetData) {
        currentNode = currentNode.getRightSubTree();
      }
    }

    if (currentNode === null) return;

    deletingNode = currentNode;

    if(deletingNode.getLeftSubTree() === null && deletingNode.getRightSubTree() === null){
      // 자식 노드가 없을 때
      if (parentNode.getLeftSubTree() === deletingNode) {
        parentNode.removeLeftSubTree();
      } else {
        parentNode.removeRightSubTree();
      }
    } else if (deletingNode.getLeftSubTree() === null || deletingNode.getRightSubTree() === null) {
      // 자식 노드가 하나만 있을 때
      let deletingNodeChild;

      if (deletingNode.getLeftSubTree() !== null) {
        deletingNodeChild = deletingNode.getLeftSubTree();
      } else {
        deletingNodeChild = deletingNode.getRightSubTree();
      }

      if (parentNode.getLeftSubTree() === deletingNode) {
        parentNode.setLeftSubTree(deletingNodeChild);
      } else {
        parentNode.setRightSubTree(deletingNodeChild);
      }
    }else{
      // 자식 노드가 양쪽 다 있을 때
      let replacingNode = deletingNode.getLeftSubTree();
      let replacingNodeParent = deletingNode;

      while(replacingNode.getRightSubTree() !== null) {
        replacingNodeParent = replacingNode;
        replacingNode = replacingNode.getRightSubTree();
      }

      const deletingNodeData = deletingNode.getData();
      deletingNode.setData(replacingNode.getData());

      if (replacingNodeParent.getLeftSubTree() === replacingNode) {
        replacingNodeParent.setLeftSubTree(replacingNode.getLeftSubTree());
      } else {
        replacingNodeParent.setRightSubTree(replacingNode.getLeftSubTree());
      }

      deletingNode = replacingNode;
      deletingNode.setData(deletingNodeData);
    }

    if (fakeParentNode.getRightSubTree() !== this.root) {
      this.root = fakeParentNode.getRightSubTree();
    }

    return deletingNode;
  }
}

const binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(18);
binarySearchTree.insert(15);
binarySearchTree.insert(10);
binarySearchTree.insert(6);
binarySearchTree.insert(3);
binarySearchTree.insert(8);
binarySearchTree.insert(12);
binarySearchTree.insert(11);
binarySearchTree.insert(31);
binarySearchTree.insert(27);
binarySearchTree.insert(24);
binarySearchTree.insert(20);
binarySearchTree.insert(33);
binarySearchTree.insert(35);
binarySearchTree.insert(37);
binarySearchTree.root.inOrderTraversal(binarySearchTree.root);

console.log('===== search 6 =====');
console.log(binarySearchTree.search(6));

console.log('===== search 1 =====');
console.log(binarySearchTree.search(1));

binarySearchTree.remove(10);
binarySearchTree.root.inOrderTraversal(binarySearchTree.root);