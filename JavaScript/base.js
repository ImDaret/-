// 作用域链
let x0 = 0;
(function f1(){
 let x1 = 1;
  
 (function f2(){
   let x2 = 2;
  
   (function f3(){
     let x3 = 3;
      
     console.log(x0 + " " + x1 + " " + x2 + " " + x3);//0 1 2 3
    })();
  })();
})();

// 闭包
// 定时器闭包
// (function autorun(){
//   let x = 1;
//   setTimeout(function log(){
//     console.log(x);
//   }, 10000);
// })();
// 事件闭包
// (function autorun(){
//   let x = 1;
//   $("#btn").on("click", function log(){
//     console.log(x);
//   });
// })();
// ajax闭包
// (function autorun(){
//   let x = 1;
//   fetch("http://").then(function log(){
//     console.log(x);
//   });
// })();


// 原型链
function Person(name,age) {
  this.name = name
  this.age = age
  this.say = function () {
    console.log(this.name + 'is' + this.age + 'years old')
  }
}

var P1 = new Person('小明',16)
P1.say()
console.log(P1.__proto__) //Person {}
console.log(P1.__proto__.__proto__) //{}
console.log(P1.__proto__.__proto__.__proto__) //null
console.log(Person.__proto__) //Function
console.log(Person.__proto__.__proto__) //{}
console.log(Person.__proto__.__proto__.__proto__) //null
console.log(Function.__proto__) //Function
console.log(Function.__proto__.__proto__) //{}
console.log(Function.__proto__.__proto__.__proto__) //null
console.log(Object.__proto__) //Function
console.log(Object.__proto__.__proto__) //{}
console.log(Object.__proto__.__proto__.__proto__) //null
console.log(P1 instanceof Person) //true
console.log(P1 instanceof Function) //false，看上面P1的原型链
console.log(P1 instanceof Object) //true
console.log(Person instanceof Function) //true
console.log(Person instanceof Object) //true
console.log(Function instanceof Object) //true
console.log(Object instanceof Function) //true
console.log(Person.prototype) //Person {}
console.log(Function.prototype) //Function
console.log(Person.constructor) //[Function:Function]
console.log(P1.constructor)// [Function:Person]

// 继承
function Person(name){
  this.name = name
  this.say = function(){
    console.log(this.name)
  }
}
Person.prototype.age = 10
// 原型继承
function Per(){
  this.name = 'zhangsan'
}
Per.prototype = new Person('lisi')
var P1 = new Per()
var P2 = new Per()
console.log(P1.age)//10
console.log(P2.age)//10
P2.__proto__.age = 12
console.log(P1.age)//12
console.log(P2.age)//12
console.log(P1.name)//zhangsan
// 无法继承父类实例的属性
// 所有新实例共享父类实例的属性（浅拷贝）
// 无法向父类传参

// 构造函数继承
function Con(){
  Person.call(this,'lisi')
  this.age = 14
}
var C1 = new Con()
console.log(C1.name)//lisi
console.log(C1.age)//14
// 无法继承父类原型上的属性
// 可以向父类传参

// 组合继承
function makeUp(name){
  Person.call(this,name)
}
makeUp.prototype = new Person()
var M1 = new makeUp('lisi')
console.log(M1.name)//lisi
console.log(M1.age)//10
// 调用两次构造函数，耗内存

// 原型式继承
function Proto(obj){
  function F(){}
  F.prototype = obj
  return new F()
}
var P2 = new Person('wangwu')
Pr1 = Proto(P2)
Pr2 = Proto(P2)
console.log(Pr1.name)//wangwu
console.log(Pr1.age)//10
Pr2.__proto__.age = 12
Pr2.name = 'laoliu'
console.log(Pr1.name)//wangwu
console.log(Pr1.age)//12
// 所有实例共享原型链上的属性（浅拷贝）

// 寄生式继承
function Proto(obj){
  function F(){}
  F.prototype = obj
  return new F()
}
function subProto(obj){
  var s1 = Proto(obj)
  s1.name = 'laoqi'
  return s1;
}
var P3 = new Person()
var sub = subProto(P3)
console.log(sub.name)//laoqi
console.log(sub.age)//10
// 不能复用

// 寄生组合式继承
function proto(obj){
  function F(){}
  F.prototype = obj
  return new F()
}

var P = proto(Person.prototype)

function Sub(name){
  Person.call(this,name)
}

Sub.prototype = P
P.constructor = Sub
var sub1 = new Sub('laoba')
console.log(sub1.name)
console.log(sub1.age)
// 有点复杂

console.log(Number([1]))

// 深浅拷贝
// 浅拷贝
var obj1 = {
  a: 1,
  b: 2
}
var obj2 = obj1
obj2.a = 3
console.log(obj1.a)//3

var obj3 = {
  a:1,
  b:{
    c:2,
    d:3
  }
}
var obj4 = Object.assign(obj3)
obj4.b.d = 4
console.log(obj3.b.d)//4

// 深拷贝
// JSON.parse()和JSON.stringify()
var obj3 = {
  a:1,
  b:{
    c:2,
    d:3
  }
}
var obj4 = JSON.parse(JSON.stringify(obj3))
obj4.b.d = 4
console.log(obj3.b.d)//3

// 递归
function deepClone(obj){
  let obj1 = obj.constructor == Array? []:{};
  for(let keys in obj){
      if(obj[keys] && typeof obj[keys] === 'object'){
        obj1[keys] = deepClone(obj[keys])
      }
      else{
        obj1[keys] = obj[keys]
      }
  }
return obj1
}
var obj3 = {
  a:1,
  b:{
    c:2,
    d:3
  }
}
var obj4 = deepClone(obj3)
obj4.b.d = 5
console.log(obj3.b.d)//3

// 函数柯里化
function add(x){
  return function(y){
    return function(z){
      return x+y+z
    }
  }
}
var a = add(1)
console.log(a(2)(3))//6

// 变量提升
console.log(f)//undefined
var f = 5

console.log(af) //[Function: af]
function af(){
  return 123
}







