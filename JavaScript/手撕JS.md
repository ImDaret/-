---
title: 【学习笔记】手撕JS
---
# 数组扁平化
```javascript
arr1 = [1,[2,3],[1,[2,3]]]
// 1.利用flat
console.log(arr1.flat(Infinity))//[ 1, 2, 3, 1, 2, 3 ]
// 2.利用函数递归
let arr2 = []
function flatten(arr){
  for(let i=0; i<arr.length; i++){
    if(Array.isArray(arr[i])){
      flatten(arr[i])
    }
    else{
      arr2.push(arr[i])
    }
  }
}
flatten(arr1)
console.log(arr2)//[ 1, 2, 3, 1, 2, 3 ]
```

# 数组去重
```javascript
// 1.利用set
arr3 = [1,2,3,3,4,2]
console.log(Array.from(new Set(arr3)))//[ 1, 2, 3, 4 ]
// 2. 利用indexOf
let unique1 = arr =>{
  const res = [];
  for(let i =0; i<arr.length; i++){
    if(res.indexOf(arr[i]) === -1){
      res.push(arr[i])
    }
  }
  return res
}
console.log(unique1(arr3))//[ 1, 2, 3, 4 ]
// 3.利用filter
const unique2 = arr =>{
  return arr.filter((item,index)=>{
    return arr.indexOf(item) === index
  })
}
console.log(unique2(arr3))//[ 1, 2, 3, 4 ]
```

# 伪数组转换为真数组
```javascript
// 1. Array.from
Array.from(document.querySelectorAll('div'))
// 2. 扩展运算符
const ar = [...document.querySelectorAll('div')]
```
# apply,call,bind
```javascript
obj = {
  name : 'zhangsan',
  age : 10,
  say(){
    console.log(this.name +' is '+ this.age +' years old' )
  }
}
function test1(name){
  this.name = name
  console.log(this.age)
}
```
## apply
```javascript
Function.prototype.myApply = function(context,arr){
  var context = Object(context) || window;
  context.fn = this
  let res;
  if(!arr){
    res = context.fn()
  }
  else{
    res = context.fn(...arr) 
  }
  delete context.fn;
  return res
}
test1.myApply(obj,'lisi')//10
```
## call
```javascript
// 1.call
Function.prototype.myCall = function(context) {
  var context = Object(context) || window;
  context.fn = this;
  let args = []
  for(let i=1;i<arguments.length;i++){
    args.push(arguments[i])
  }
  let res = context.fn(...args);
  delete context.fn;
  return res
}
test1.myCall(obj,'lisi')//10
```
## bind
```javascript
Function.prototype.myBind = function(context,arr){
  var self = this
  return function F(){
    if(this instanceof F){
      return new self(...arr,...arguments)
    }
    return self.apply(context,[...arr,...arguments])
  }
}
test1.myBind(obj,'lisi')()//10
```

# 防抖
```javascript
// 1.防抖,在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时,适用于提交按钮
const debounce = (fn,time)=>{
  let timer = null
  return function(){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      fn.apply(this,arguments)
    },time)
  }
}
```
# 节流
```javascript
// 节流,规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效,适用于拖拽和动画场景
const throttle = (fn, delay = 500) => {
  let flag = true;
  return (...args) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
};
```

# new操作符
```javascript
/* 模拟new操作
    1.以ctor.prototype为原型创建一个对象。
    2.执行构造函数并将this绑定到新创建的对象上。
    3. 判断构造函数执行返回的结果是否是引用数据类型，若是则返回构造函数执行的结果，否则返回创建的对象。
*/
function myNew(ctor,...args){
  const obj = Object.create(ctor.prototype)
  const res = ctor.apply(obj,args)

  const isObject = typeof res === 'object' && res !== null
  const isFunction = typeof res === 'function'
  return isObject || isFunction ? res:obj
}

function Person(name,age){
  this.name = name
  this.age = age
}

var P =  myNew(Person,'lisi',12)
console.log(P.name)//lisi
console.log(P.age)
```

# instanceof操作符
```javascript
/* instanceof */
const myInstanceof = (left,right) =>{
  let proto = Object.getPrototypeOf(left)
  while(true){
    if(proto === null) return false
    if(proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto)
  }
}
console.log(P instanceof Person)//true
```

# promise
```javascript
/* Promise */
class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      };
    });
    return promise2;
  }
  catch(fn){
    return this.then(null,fn);
  }
}
function resolvePromise(promise2, x, resolve, reject){
  if(x === promise2){
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  let called;
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') { 
        then.call(x, y => {
          if(called)return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if(called)return;
          called = true;
          reject(err);
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      if(called)return;
      called = true;
      reject(e); 
    }
  } else {
    resolve(x);
  }
}
//resolve方法
Promise.resolve = function(val){
  return new Promise((resolve,reject)=>{
    resolve(val)
  });
}
//reject方法
Promise.reject = function(val){
  return new Promise((resolve,reject)=>{
    reject(val)
  });
}
//race方法 
Promise.race = function(promises){
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(resolve,reject)
    };
  })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function(promises){
  let arr = [];
  let i = 0;
  function processData(index,data){
    arr[index] = data;
    i++;
    if(i == promises.length){
      resolve(arr);
    };
  };
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(data=>{
        processData(i,data);
      },reject);
    };
  });
}
```

# object.create()
```javascript
/* object.create */
function create(proto){
  function f(){}
  f.prototype = proto
  return new f()
}
```