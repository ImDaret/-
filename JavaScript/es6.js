// 变量声明
{
  let a = 5
  var b = 10
}
// console.log(a)//报错
console.log(b)//10
const c = 4
// c = 5 //报错Assignment to constant variable
console.log(c)

// Symbol
let sy = Symbol('i am Symbol')
console.log(sy)//Symbol(i am Symbol)
console.log(typeof sy)//symbol
let sy1 = Symbol('i am Symbol')
console.log(sy1)//Symbol(i am Symbol)
console.log(typeof sy1)//symbol
console.log(sy === sy1)//false
obj = {
  [sy]: '1',
  a: 2
}
for(var item in obj){
  console.log(item)//a,获取不到[sy]
}
console.log(Object.getOwnPropertySymbols(obj))//[ Symbol(i am Symbol) ]
console.log( Reflect.ownKeys(obj))//[ 'a', Symbol(i am Symbol) ]

// Map Set
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

// Generator
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

// 扩展运算符
var arr1 = ['a','b']
var arr2 = ['c','d']
console.log([...arr1,...arr2])//[ 'a', 'b', 'c', 'd' ]

// 剩余参数
var arr3 = [first,...second] = ['a','b','c','d']
console.log(first)//a
console.log(second)//[ 'b', 'c', 'd' ]

// 将字符串转换为数组
console.log([...'hello'])//[ 'h', 'e', 'l', 'l', 'o' ]

// 具有iterator接口的都可以使用扩展运算符
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

// obj = {
//   a:'1',
//   b:'2',
//   c:'3'
// }
// console.log([...obj])//obj is not iterable

// proxy
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
console.log(pro.name)
console.log(pro.age)


// class
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