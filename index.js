const PriorityQueue = require('js-priority-queue');

var queue = new PriorityQueue({ comparator: function(a, b) { return b - a; }});

var arr = [50, 20, 35, 25, 28, 51, 42, 45, 23, 32, 38, 22, 25, 25, 50, 80, 90];

var diffs = [];
var arr1 = [];
var arr2 = [];
arr.sort().reverse();

function karmarkarKarpPartition(baseArr) {
  let heap = new PriorityQueue({initialValues: arr, comparator: function(a, b) { return b - a; }});
  while (heap.length > 1) {
    let val1 = heap.dequeue();
    let val2 = heap.dequeue();
    heap.queue(val1 - val2);
    diffs.push(val1 - val2);
  }
  return heap.dequeue();
}

function sum(arr) {
  return arr.reduce((memo, num)=> {
    return memo + num;
  }, 0)
}

//reconstruct
while (arr.length) {
  let diff = diffs.shift();
  let num = arr.shift();
  let secondNum = arr.find((num2) => num - num2 === diff);
  if (secondNum) {
    arr1.push(num);
    arr2.push(secondNum);
    arr.splice(arr.indexOf(secondNum), 1);
  } else if(((sum(arr1) + num) - sum(arr2)) > num) {
    arr2.push(num);
  } else {
    arr1.push(num);
  }
}


console.log('sum 1: ', arr1.reduce(function (memo, num) {
  return memo + num;
}, 0))

console.log('sum 2: ', arr2.reduce(function (memo, num) {
  return memo + num;
}, 0))

