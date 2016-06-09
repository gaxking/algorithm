var data = [9, 1, 5, 8, 3, 7, 4, 6, 2];
var count = 0;

//冒泡排序
function BubbleSort() {
	for(var i = 0; i < data.length; i++) {
		count ++;
		for(var j = data.length; j > 0; j--) {
			if(data[j] < data[j-1]) {
				data[j] = [data[j-1], data[j-1] = data[j]][0];
			}
			count ++;
			//console.log(data);
		}
	}
}

//简单选择排序
function SelectSort() {
	for(var i = 0; i < data.length; i++) {
		count ++;
		var min = i;
		for(var j = i+1; j < data.length; j++) {
			if(data[j] < data[min]) {
				min = j;
			}
			count ++;
		}

		if(min!=i) {
			data[i] = [data[min], data[min] = data[i]][0];
		}
		//console.log(data);
	}
}

//直接插入排序
function InsertSort() {
	//var data = [5,3,4,6,2];
	for(var i = 1; i <= data.length; i++) {
		count ++;
		if(data[i-1] > data[i]) {
			var save = data[i];
			for(var j = i - 1; data[j] > save; j--) {
				data[j+1] = data[j];
				count ++;
			}
			data[j+1] = save;
			//console.log(data.toString());
		}
	}
}

//希尔排序
function ShellSort() {
	var increment = data.length;
	do
	{
		count ++;
		increment = parseInt(increment/3) + 1;
		for(var i = increment;i<=data.length;i++) {
			count ++;
			if(data[i] < data[i-increment]) {
				var save = data[i];
				for(var j=i-increment;j>=0&&save<data[j];j-=increment) {
					count ++;
					data[j+increment] = data[j];
				}
				data[j+increment] = save;
				//console.log(data.toString());
			}
		}
	}
	while (increment>1);
}

//堆排序
function HeapSort() {
	data.unshift(null);

	for(var i = parseInt((data.length-1)/2);i>0;i--) {
		count++;
		HeadAdjust(data, i, data.length-1);
		//console.log(data.toString());
	}

	for(var x = data.length-1; x>0; x--) {
		count++;
		data[x] = [data[1], data[1] = data[x]][0];
		HeadAdjust(data, 1, x-1);
		//console.log(data);
	}
}

function HeadAdjust(data, s, l) {
	var temp = data[s];
	for(var j=2*s; j<=l; j*=2) {
		count++;
		if(j<l && data[j]<data[j+1]) {
			j++;
		}
		if(temp < data[j]) {
			data[s] = data[j];
			s = j;
		}
	}
	data[s] = temp;
}

function merge(left, right) {
	var result=[];
	while(left.length>0 && right.length>0) {
		if(left[0]<right[0]) {
			result.push(left.shift());
		}else{
			result.push(right.shift());
		}
		count++;
	}
	return result.concat(left).concat(right);
}
function mergeSort(data) {
	if(data.length == 1) {
		return data;
	}
	var middle = Math.floor(data.length/2),
		left = data.slice(0, middle),
		right = data.slice(middle);

	count++;
	return merge(mergeSort(left), mergeSort(right));
}

var a = mergeSort(data);

console.log(a);