//创建单表
function SingleLink() {
	this.head = this.creatNode(null);
}

SingleLink.prototype.creatNode = function(value) {
	return {
		data:value,
		next:null
	};
};

SingleLink.prototype.insert = function(value) {
	var p = this.head;
	while(p.next != null) {
		p = p.next;
	}

	return p.next = this.creatNode(value);
};

SingleLink.prototype.remove = function(n) {
	if(n<0) return;

	var p = this.getNodeByIndex(n-1);

	p.next = p.next.next;
};

SingleLink.prototype.getNodeByIndex = function(n) {
	if(n<0) return;

	var p = this.head, i = 0;
	while(i<n && p.next != null) {
		p = p.next;
		i++;
	}
	
	return p;
};

//单链表反转
SingleLink.prototype.reverseSingleLink = function() {
	var arr = [], p = this.head, that = this;
	while(p.next != null) {
		p = p.next;
		arr.push(p);
	}

	this.head.next = null;

	arr.reverse();
	arr.forEach(function(v) {
		that.insert(v);
	});
};

var link = new SingleLink();
link.insert("a");
link.insert("b");
link.insert("c");
