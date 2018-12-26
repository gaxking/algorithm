/*
 *1. 每个节点非红即黑
 *2. 根节点是黑的; 
 *3. 每个叶节点（叶节点即树尾端NULL指针或NULL节点）都是黑的; 
 *4. 如图所示，如果一个节点是红的，那么它的两儿子都是黑的; 
 *5. 对于任意节点而言，其到叶子点树NULL指针的每条路径都包含相同数目的黑节点;
 *6. 每条路径都包含相同的黑节点;

 *代码思路是按照以下4种情况
 *情形1	  node为红,无father	将node变成黑色，完成
 *情形2	  node为红,father为黑 完成
 *情形3   node,father为红,grand,uncle为黑或者无uncle 旋转一次,并重新着色,目的是让情况3变成情况2
		 （情况3.1.1为 当前节点，父节点都是右边节点 左旋转, 父节点变黑，祖父节点变红, 目的是变成情况2）
		 （情况3.1.2为 当前节点，父节点都是左边节点 右旋转, 父节点变黑，祖父节点变红, 目的是变成情况2）
		 （情况3.1.3为 当前节点为右节点，父节为左节点 左旋转,设置当前节点为父节点,目的是变成情况3.1.1）
		 （情况3.1.4为 当前节点为左节点，父节为右节点 右旋转,设置当前节点为父节点,目的是变成情况3.1.2）
 *情形4   node,father,uncle为红,grand为黑	将father, uncle,grand重新着色, grand作为新的node 继续判断这四种情况
 **/

function RedBlackTree() {
	this.root = null;
}

RedBlackTree.prototype.creatNode = function(value) {
	return {
		value:value,
		color:'red', //默认为红色，容易符合特性4
		parent:null,
		left:null,
		right:null
	};
};

RedBlackTree.prototype.insert = function(value) {
	var node = this.creatNode(value);

	if(this.root == null) {
		this.root = node;
	} else {
		var current = this.root;
		var parent = null;

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
			parent.left = node;
		}else{
			parent.right = node;
		}

		node.parent = parent;
	}

	this.fixTree(node);
};

RedBlackTree.prototype.fixTree = function(node) {
	// 当node.parent不存在时，即为情形1，跳出循环
	// 当node.parent.color === 'black'时，即为情形2，跳出循环
	while (!(node.color === 'red' && node.parent === null || node.color === 'red' && node.parent.color === 'black')) {
		var parent = node.parent;
		var grand = parent.parent;
		if(grand) { //根据红黑树的特性grand必定是黑色
			var uncle = grand.left === parent ? grand.right : grand.left; 
			if(!uncle || uncle.color === 'black') {
				if(grand.left === parent && parent.left === node ){ //右旋转 情况3.1.2
					this.rotate_right(parent);
					parent.color = 'black';
					grand.color = 'red';
				}else if(grand.right === parent && parent.right === node ){  //左旋转 情况3.1.1
					this.rotate_left(parent);
					parent.color = 'black';
					grand.color = 'red';
				}else if(grand.left === parent && parent.right === node ){  //左旋转 情况3.1.3
					// 左旋转后，将parent设为新的node, 变成了情况 3.1.2
					this.rotate_left(parent);
					node = parent;
				}else if(grand.right === parent && parent.left === node ){  //右旋转 情况3.1.4
					// 右旋转后，将parent设为新的node, 变成了情况 3.1.1
					this.rotate_right(parent);
					node = parent;
				}
			}else{ //情况4
				parent.color = 'black';
				uncle.color = 'black';
				grand.color = 'red';

				// 将grand设为新的node，往上层判断情况1，2，3，4
				node = grand;
			}
		}
	}

	// 情况1
	if(node.parent === null) {
		this.root = node;
		node.color = 'black';
	}
	
}

//右旋转
RedBlackTree.prototype.rotate_right = function(node) {
	var left = node.left;
	var right = node.right;
	var parent = node.parent;

	if(parent){
		node.parent = parent.parent;

		if(node.parent) {
			if(node.parent.right === parent){
				node.parent.right = node;
			}else{
				node.parent.left = node;
			}
		}else{
			this.root = node;
		}

		parent.parent = node;
		parent.left = null;

		node.right = parent;
	}
}

//左旋转
RedBlackTree.prototype.rotate_left = function(node) {
	var left = node.left;
	var right = node.right;
	var parent = node.parent;

	if(parent){
		node.parent = parent.parent;

		if(node.parent) {
			if(node.parent.right === parent){
				node.parent.right = node;
			}else{
				node.parent.left = node;
			}
		}else{
			this.root = node;
		}
	
		parent.parent = node;
		parent.right = null;

		node.left = parent;
	}
}


RedBlackTree.prototype.reverse = function(node) {
	if(node) {
		this.reverse(node.left);
		this.reverse(node.right);

		var temp = node.right;
		node.right = node.left;
		node.left = temp;
	}
};

var btree = new RedBlackTree();
btree.insert(3);
btree.insert(2);
btree.insert(1);
btree.insert(4);
btree.insert(5);
console.log(btree.root)
