
/* 冒泡排序
 * 双重循环，先把最小的值冒泡到顶端，再把次小的值冒泡到顶端
 */
function BubbleSort(data) {
	for(var i = 0; i < data.length; i++) {
		for(var j = data.length; j > 0; j--) {
			if(data[j] < data[j-1]) {
				data[j] = [data[j-1], data[j-1] = data[j]][0];
			}
		}
	}
	return data;
}

/* 简单选择排序
 * 双重循环，每次直接找到min的key，然后交换
 */
function SelectSort(data) {
	for(var i = 0; i < data.length; i++) {
		var min = i;
		for(var j = i+1; j < data.length; j++) {
			if(data[j] < data[min]) {
				min = j;
			}
		}

		if(min!=i) {
			data[i] = [data[min], data[min] = data[i]][0];
		}
	}
	return data;
}

/* 直接插入排序
 * 双重循环，每次直接找到min的key，然后交换
 */
function InsertSort(data) {
	for(var i = 1; i <= data.length; i++) {
		if(data[i-1] > data[i]) {
			var save = data[i];
			for(var j = i - 1; data[j] > save; j--) {
				data[j+1] = data[j];
			}
			data[j+1] = save;
		}
	}
	return data;
}

//希尔排序(直接插入排序的升级版)
function ShellSort(data) {
	var increment = data.length;
	do
	{
		increment = parseInt(increment/3) + 1;
		for(var i = increment;i<=data.length;i++) {
			if(data[i] < data[i-increment]) {
				var save = data[i];
				for(var j=i-increment;j>=0&&save<data[j];j-=increment) {
					data[j+increment] = data[j];
				}
				data[j+increment] = save;
			}
		}
	}
	while (increment>1);
	return data;
}

//堆排序
function HeapSort(data) {
	data.unshift(null);

	for(var i = parseInt((data.length-1)/2);i>0;i--) {
		HeadAdjust(data, i, data.length-1);
	}

	for(var x = data.length-1; x>0; x--) {
		data[x] = [data[1], data[1] = data[x]][0];
		HeadAdjust(data, 1, x-1);
	}
	return data;
}

function HeadAdjust(data, s, l) {
	var temp = data[s];
	for(var j=2*s; j<=l; j*=2) {
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

	return merge(mergeSort(left), mergeSort(right));
}

//快速排序(冒泡排序的升级版)
function quickSort(data) {
	QSort(data, 0, data.length-1);
	return data;
}

function QSort(data, low, high) {
	var pivot;
	if(low < high) {
		pivot = Partition(data, low, high);

		QSort(data, low, pivot-1);
		QSort(data, pivot+1, high);
	}
}

function Partition(data, low, high) {
	var pivotkey = data[low];

	while(low<high) {
		while(low<high&&data[high]>=pivotkey) {
			high--;
		}
		data[low] = [data[high], data[low] = data[high]][0];

		while(low<high&&data[low]<=pivotkey) {
			low++;
		}
		data[low] = [data[high], data[low] = data[high]][0];
	}
	return low;
}

//二分法查找,arr:已徘好序的数组，x：查找目标
function binarySearch(arr,x){
	var low = 0; high = arr.length -1;
	while(low <= high){
		var mid = Math.floor((high + low)/2);

		if(arr[mid] == x){
			return mid;
		}else if(arr[mid]>x){
			high = mid-1;
		}else{
			low = mid+1;
		}
	}

	return -1;
}
