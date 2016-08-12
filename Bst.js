//创建而叉排序树
function Bst() {
	this.root = null;
}

Bst.prototype.creatNode = function(value) {
	return {
		value:value,
		left:null,
		right:null
	};
};

Bst.prototype.insert = function(value) {
	if(this.root == null) {
		return this.root = this.creatNode(value);
	}

	var current = this.root;
	while(current!=null) {
		if(value<=current.value) {
			parent = current;
			current = current.left;
		}else{
			parent = current;
			current = current.right;
		}
	}

	
	if(value<=parent.value) {
		parent.left = this.creatNode(value);
	}else{
		parent.right = this.creatNode(value);
	}
};

//中序,左节点>根节点>右节点
Bst.prototype.inOrder = function(node) {
	if(node) {
		this.inOrder(node.left);
		console.log(node.value);
		this.inOrder(node.right);
	}
};

//前序，根节点>左节点>右节点
Bst.prototype.preOrder = function(node) {
	if(node) {
		console.log(node.value);
		this.preOrder(node.left);
		this.preOrder(node.right);
	}
};

//后序，左节点>右节点>根节点
Bst.prototype.postOrder = function(node) {
	if(node) {
		this.preOrder(node.left);
		this.preOrder(node.right);
		console.log(node.value);
	}
};

//广度优先
Bst.prototype.levelOrder = function(node) {
	var arr = [];
	arr.push(node);
	while(arr.length>0) {
		node = arr.shift();
		console.log(node.value);

		if(node.left)arr.push(node.left);
		if(node.right)arr.push(node.right);
	}
};

//最小值
Bst.prototype.getMin = function() {
	var node = this.root;
	while(node.left) {
		node = node.left;
	}
	console.log(node.value);
};

//最大值
Bst.prototype.getMax = function() {
	var node = this.root;
	while(node.right) {
		node = node.right;
	}
	console.log(node.value);
};

Bst.prototype.countNode = function(node) {
	if(node) {
		var a = this.countNode(node.left);
		var b = this.countNode(node.right);

		return a + b + 1;
	}
	return 0;
};

Bst.prototype.getDepth = function(node) {
	if(!node)return 0;

	var leftDepth = this.getDepth(node.left);
	var rightDepth = this.getDepth(node.right);

	var h = (leftDepth>rightDepth?leftDepth:rightDepth)+1;

	return h;
};

Bst.prototype.reverse = function(node) {
	if(node) {
		this.reverse(node.left);
		this.reverse(node.right);

		var temp = node.right;
		node.right = node.left;
		node.left = temp;
	}
};

var btree = new Bst();
btree.insert(1);
btree.insert(2);
btree.insert(3);
btree.insert(4);
btree.insert(5);
//btree.inOrder(btree.root);
//btree.getMax();
//var count = btree.countNode(btree.root);
//btree.levelOrder(btree.root);
