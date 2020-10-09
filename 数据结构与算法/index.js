// 快速排序
// 选择一个目标值，比目标值小的放左边，比目标值大的放右边，目标值的位置已排好，将左右两侧再进行快排。
function quickSort(arr){
  if (arr.length == 0) {
		return []
	}
  let target = arr[0]
  let arrLeft = []
  let arrRight = []
  for (let i = 1; i < arr.length; i++) {
		if (arr[i] < target) {
			arrLeft.push(arr[i])
		} else {
			arrRight.push(arr[i])
		}
	}
	return quickSort(arrLeft).concat(target, quickSort(arrRight))
}
console.log(quickSort([4,3,5,1,8]))

// 选择排序
// 每次排序取一个最大或最小的数字放到前面的有序序列中。
function selectSort(arr){
  for(let i = 0; i<arr.length-1; i++){
    let minIndex = i
    for(let j = i+1;j<arr.length;j++){
      if(arr[j]<arr[minIndex]){
        minIndex = j
      }
    }
    [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]]
  }
  return arr
}
console.log(selectSort([4,3,5,1,8]))

// 插入排序
// 将左侧序列看成一个有序序列，每次将一个数字插入该有序序列。插入时，从有序序列最右侧开始比较，若比较的数较大，后移一位。
function insertSort(arr){
  for(let i = 1; i<arr.length; i++){
    let target = i
    for(let j = i-1; j>=0 ;j--){
      if(arr[target] < arr[j]){
        [arr[j],arr[target]] = [arr[target],arr[j]]
        target = j
      }
      else{
        break
      }
    }
  }
  return arr
}
console.log(insertSort([4,3,5,1,8]))

// 冒泡排序
// 循环数组，比较当前元素和下一个元素，如果当前元素比下一个元素大，向上冒泡。下一次循环继续上面的操作，不循环已经排序好的数，每次循环得到一个最大数
function bubbleSort(arr){
  for(let i = 0; i<arr.length; i++){
    for(let j = 0; j<arr.length-i-1; j++){
      if(arr[j] > arr[j+1]){
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
      }
    }
  }
  return arr
}
console.log(bubbleSort([4,3,5,1,8]))

// 二分查找
// 二分查找的条件是必须有序
function search(arr,data){
  let start = 0
  let end = arr.length
  while(start <= end){
    let mid = Math.floor((start+end)/2)
    if(arr[mid] == data){
      return mid
    }
    else if(arr[mid] >= data){
      end = mid - 1
    }
    else{
      start = mid + 1
    }
  }
  return -1
}
console.log(search([1,2,3,4],3))//2
console.log(search([1,2,3,4],5))//-1