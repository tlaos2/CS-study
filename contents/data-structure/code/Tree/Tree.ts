class TreeNode {
  parent: TreeNode | null;

  children: TreeNode[];

  data: any;

  level: number;

  constructor(key: any, level: number, parent: TreeNode | null) {
    this.parent = parent;
    this.data = key;
    this.children = [];
    this.level = level;
  }

  addChlid(key: any): void {
    this.children.push(new TreeNode(key, this.level + 1, this));
  }

  printChildNodes(): void {
    this.children.forEach((e) => console.log(e.data));
  }

  getNode(key: any): TreeNode | null {
    if (key === this.data) return this;
    if (this.children.length === 0) return null;

    for (const child of this.children) {
      const res = child.getNode(key);
      if (res) return res;
    }

    return null;
  }

  removeNode(key: any): void {
    const target = this.getNode(key);
    const targetedChildren = target.parent.children;
    targetedChildren.splice(
      targetedChildren.findIndex((child) => child.data === key),
      1
    );
    // 삭제하고자하는 노드의 부모가 가진 자식 정보인 children 배열에서 삭제하고자하는 노드를 splice 메서드를 사용해 지움.
  }
}

const root = new TreeNode("root", 1, null);
root.addChlid("Fruit"); // key 값이 Fruit인 노드 생성 후 root의 자식으로 추가
root.addChlid("Celebrity"); // key 값이 Celebrity인 노드 생성 후 root의 자식으로 추가
root.addChlid("Game"); //  key 값이 Game인 노드 생성 후 root의 자식으로 추가
root.addChlid("Netflix"); // key값이 Netflix인 노드 생성 후 root의 자식으로 추가

root.getNode("Netflix").addChlid("Kingdom"); // Netflix 자식으로 Kingdom 추가
root.getNode("Kingdom").addChlid("Zombie"); // Kingdom 자식으로 Zombie 추가

root.getNode("Celebrity").addChlid("aespa"); // Celebrity 자식으로 aespa 추가
root.getNode("Celebrity").addChlid("psy"); // Celebrity 자식으로 psy 추가
root.getNode("aespa").addChlid("Winter"); // aespa 자식으로 Winter 추가

root.getNode("Celebrity").printChildNodes(); // asepa psy
root.removeNode("aespa"); // aespa 노드를 삭제
root.getNode("Celebrity").printChildNodes(); // psy
console.log(root.getNode("aespa")); // null
