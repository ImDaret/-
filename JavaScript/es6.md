---
title: 【学习笔记】ES6篇
---

# 一、let const
1. let 和 const定义的变量会暂时性死区，不会造成变量提升
2. const定义的是常量，不可变 
```javascript
{
  let a = 5
  var b = 10
}
// console.log(a)//报错
console.log(b)//10
const c = 4
c = 5 //报错Assignment to constant variable
console.log(c)
```

# 二、Symbol
## 特性
1. 每个Symbol都是不一样的

## 作用
1. 作为内置对象的属性，保证属性名是不一样的，但是无法被for...of或者for...in找到，可以通过Object.getOwnPropertySymbols() 和 Reflect.ownKeys() 
2. 定义常量，保证常量是不一样的,一般用在swich中，保证常量唯一性

```javscript
obj = {
  [sy]: '1',
  a: 2
}
for(var item in obj){
  console.log(item)//a,获取不到[sy]
}
console.log(Object.getOwnPropertySymbols(obj))//[ Symbol(i am Symbol) ]
console.log( Reflect.ownKeys(obj))//[ 'a', Symbol(i am Symbol) ]
```

# 三、模块化
1. export 导出,可以单个导出，也可以将多个变量包装成一个对象导出，还可以用export default默认导出,一个模块只能有一个默认导出,默认导出时import导入不需要{}
2. import 导入
3.es6跟commomJS的区别:

```
1. commomJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用
2. commonJS模块是运行时加载,加载的是整个模块，ES6模块是编译时的输出接口，可以指定加载某个值
```

# 四、箭头函数
## 特性
1. 没有this
2. 没有arguments
3. 没有super
4. 没有new.target
5. 匿名函数，不能被作为构造函数

## 作用
1. 更简短
2. 不绑定this

# 五、解构赋值
1. 数组：
```javascript
let [a = 3, b = a] = [];     // a = 3, b = 3
let [a = 3, b = a] = [1];    // a = 1, b = 1
let [a = 3, b = a] = [1, 2]; // a = 1, b = 2
```
2. 对象
```javascript
let {a = 10, b = 5} = {a: 3};
// a = 3; b = 5;
let {a: aa = 10, b: bb = 5} = {a: 3};
// aa = 3; bb = 5;
```

# 六、Map、Set
1. Map 对象保存键值对,它的键可以是任何值
2. Map 对象有for..of 和 forEach()方法
3. Set 对象允许你存储任何类型的唯一值
4. Set 对象可以数组去重，求交叉并集等

```javascript
var map1 = new Map()
map1.set('0',0)
map1.set(0,'0')
map1.set(function(){},'1')
map1.set([],2)
map1.set({},3)
console.log(map1)//Map { '0' => 0, 0 => '0', [Function] => '1', [] => 2, {} => 3 }
for(var [key,value] of map1){
  console.log(key + '=' + value)
}//0=0
// 0=0
// function(){}=1
// =2
// [object Object]=3

// 数组去重
var mySet = new Set([1, 2, 3, 4, 4]);
console.log([...mySet]); // [1, 2, 3, 4]
// 并集
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var union = new Set([...a, ...b]); // {1, 2, 3, 4}
// 交集
var intersect = new Set([...a].filter(x => b.has(x))); // {2, 3}
// 差集
var difference = new Set([...a].filter(x => !b.has(x))); // {1}
```

# 七、iterator
## 概念
1. 迭代器是一个统一的接口，作用是使各种数据结构可以被便捷的访问
2. 迭代器是用于遍历数据结构元素的指针

## 迭代过程
1. 通过一个next()方法，指向下一个位置，返回一个对象，该对象有value和done两个属性
2. done正常是false,当done为true时，遍历结束

## 可迭代的数据结构
1. Array
2. String
3. Map
4. Set
5. Dom元素

## 可以用for..。of循环

# 八、Generator
## 特性
1. function后面,函数名之前有个*
2. 函数内部有yield表达式

## next()可传参可不传参

```javascript
function* fn(){
  console.log('one')
  var x = yield '1'
  console.log('two' + x)
  var y = yield '2'
  console.log('three' + y)
  return '3'
}

var f = fn()
f.next()//one
f.next(20)//two20
f.next(30)//three30
```

## 实现iterator

```javascript
function* objectEntries(obj) {
    const propKeys = Reflect.ownKeys(obj);
    for (const propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}
 
const jane = { first: 'Jane', last: 'Doe' };
for (const [key,value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

# 九、扩展运算符/剩余参数

## 合并数组

```javascript
var arr1 = ['a','b']
var arr2 = ['c','d']
console.log([...arr1,...arr2])//[ 'a', 'b', 'c', 'd' ]
```

## 剩余参数

```javascript
var arr3 = [first,...second] = ['a','b','c','d']
console.log(first)//a
console.log(second)//[ 'b', 'c', 'd' ]
```

## 将字符串转换为数组

```javascript
console.log([...'hello'])//[ 'h', 'e', 'l', 'l', 'o' ]
```

## 具有iterator接口的都可以使用扩展运算符

```javascript
var mapp = new Map()
mapp.set(1,'one')
mapp.set(2,'two')
mapp.set(3,'three')
console.log([...mapp.keys()])//[ 1, 2, 3 ]

function* gen(){
  yield '1'
  yield '2'
  yield '3'
}
console.log([...gen()])//[ '1', '2', '3' ]

obj = {
  a:'1',
  b:'2',
  c:'3'
}
console.log([...obj])//obj is not iterable
```

# 十、Promise
1. 三种状态,pending,fulfilled,rejected
2. 状态改变只能从pending=>fulfilled,pending=>rejected,状态一经改变无法再改变
3. then，接收两个参数，一个是promise成功的回调，另一个是失败的回调
4. then可以链式调用，添加多个回调函数

# 十一、Proxy、Reflect

## Proxy
1. 可以对目标对象的读取，函数的调用操作进行拦截，在进行这些操作时，可以添加一些额外的操作
2. 由target、handler组成，target是目标对象，handler对target指定行为
3. get 和 set方法

```javascript
let obj2 = {
  name:'zhangsan',
  age: 10
}

let handler = {
  get:function(target,key){
    console.log(target[key])
  },
  set:function(target,key,value){
    target[key] = value
    console.log(key + ' is changed ' + value)
  }
}

let pro = new Proxy(obj2,handler)
pro.name//zhangsan
pro.age = 12//age is changed 12
```

4. 其他方法(放一张别人的总结https://juejin.im/post/6844904090116292616)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a062aa5a4d9446e98c9e2bc470c9f1d4~tplv-k3u1fbpfcp-watermark.webp)

## Reflect
1. 用于获取目标对象的行为，和Object类似，方式更加优雅，更加易读
2. 方法和上面的Proxy方法一一对应

# 十二、Class

## 概念
1. Class是语法糖，本质是function
2. 类的定义，用class关键字

## 类的属性
1，静态属性: class本身的属性，不需要实例化
2. 公共属性: 直接定义的属性
3. 实例属性： 定义在实例对象this上的属性

## 类的方法
1. constructor：通过new命令，自动调用该方法
2. 静态方法 stctic关键字定义的方法
3. 原型方法：正常定义方法，或在类的外部在prototype上定义
4. 实例方法：在constructor里面定义的方法

## 类的继承
1. 使用extends关键字实现继承
2. 子类里面必须有super()且必须在this之前
3. 不可继承常规的对象

```javascript
class test{
  constructor(name,age){
    this.name = name
    this.age = age
  }
  a = 2
  static b = 3
  say(){
    console.log(this.name + ' is ' + this.age + ' years old ')
  }
  static say2(){
    console.log(this.name + ' is ' + this.age)
  }
}

var t = new test('zhangsan','20')
t.say()//zhangsan is 20 years old
// t.say2()//t.say2 is not a function
console.log(t.a)//2
console.log(t.b)//undfined

class t1 extends test{
  constructor(name,age,sex){
    super();
    console.log('继承了父类的方法')
    this.sex = sex
    this.name = name
    this.age = age
  }
  say3(){
    super.say()
  }
}

var t11 = new t1('lisi','30','男')
t11.say3()//lisi is 30 years old
```