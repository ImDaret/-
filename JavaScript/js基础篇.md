---
title: 【学习笔记】JavaScript基础篇
---
# 一、数据类型
1. 基本类型：string、number、boolean、null、undefined、symbol
2. 引用数据类型 :object、array、function
其中基本类型存储在栈中，引用数据类型存储在堆中，在栈中存储一个堆的引用

# 二、执行上下文
## 变量提升
变量可以提前被访问
1. var 声明的变量
2. 函数声明提升，function声明的函数,等于直接提到最顶端
```javascript
console.log(f)//undefined
var f = 5
console.log(af) //[Function: af]
function af(){
return 123
}
```

## 执行上下文的方法
1. 全局执行上下文
2. 函数执行上下文
3. eval函数执行上下文

## 执行上下文栈
JS代码首次运行都会先创建一个全局执行上下文栈，之后每当有函数被调用时，就把该函数执行上下文压入栈内，调用完再弹出

## 执行上下文你的创建阶段
1. this绑定
2. 确定词法环境：通过let const创建的
3. 确定变量环境：通过var，function创建的
4. 建立作用域链

# 三、作用域链
当我们使用一个变量的时候，Javascript引擎 会通过变量名在当前作用域查找，若没有查找到，会一直沿着作用域链一直向上查找，直到 global 全局作用域。
```javascript
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
```

# 四、闭包
1. 定义：闭包是一个可以访问外部作用域的内部函数，即使这个外部作用域已经执行结束
2. 作用：当外部作用域执行完毕后，内部函数还存活（仍在其他地方被引用）时，闭包才真正发挥其作用，被闭包引用的那个变量将延长生命周期
3. 场景：
```javascript
// 定时器闭包
(function autorun(){
  let x = 1;
  setTimeout(function log(){
    console.log(x);
  }, 10000);
})();
// 事件闭包
(function autorun(){
  let x = 1;
  $("#btn").on("click", function log(){
    console.log(x);
  });
})();
// ajax闭包
(function autorun(){
  let x = 1;
  fetch("http://").then(function log(){
    console.log(x);
  });
})();
```

# 五、原型，原型链
1. 一个对象的__proto__属性的值就是它所对应的原型对象
2. 函数有prototype属性
3. 一个对象的__protp__属性的__proto__属性...直到Object的__proto__属性指向null
```javascript
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
```

# 六、继承
## 父类
```javascript
function Person(name){
  this.name = name
  this.say = function(){
    console.log(this.name)
  }
}
Person.prototype.age = 10
```

## 原型继承
```javascript
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
}
```

## 构造函数继承
```javascript
function Con(){
  Person.call(this,'lisi')
  this.age = 14
}
var C1 = new Con()
console.log(C1.name)//lisi
console.log(C1.age)//14
// 无法继承父类原型上的属性
// 可以向父类传参
```
## 组合继承
```javascript
function makeUp(name){
  Person.call(this,name)
}
makeUp.prototype = new Person()
var M1 = new makeUp('lisi')
console.log(M1.name)//lisi
console.log(M1.age)//10
// 调用两次构造函数，耗内存
```
## 原型式继承
```javascript
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
```
## 寄生式继承
```javascript
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
```
## 寄生组合继承
```javascript
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
```

# 七、this关键字
1. 在方法中，this指向所有者的对象
2. 单独情况下，指向全局对象
3. 在函数中，this指向全局对象
4. 严格模式下，在函数中，this是undefined
5. 在事件中，this指接收事件的元素
6. call，apply，bind等可以随意改变this指向

# 八、new关键字
1. 创建一个新的对象
2. 将构造函数的this指向这个新的对象
3. 指向构造函数的代码，为这个对象添加属性，方法等
4. 返回新的对象

# 九、类型判断
1. `typeof`:只能判断除了Null以外的原始数据类型，不能判断对象等
2. `instance`:通过原型链判断，返回true or false，所以只能用来判断两个对象是否属于实例关系
3. `constructor`:不能判断Null，undefined，不稳定，因为重写了prototype之后，原有的constructor引用会丢失
4. `toString`:这是一个Object的原型方法，建议使用

# 十、隐式转换
## 转换规则
1. toString
```javascript
  String(null) // 'null'
  String(undefined) // 'undefined'
  String(true) // 'true'
  String(10) // '10'
  String(1e21) // '1e+21'
  String([1,2,3]) // '1,2,3'
  String([]) // ''
  String([null]) // ''
  String([1, undefined, 3]) // '1,,3'
  String({}) // '[object Object]'
```
2. toNumber
```javascript
  Number(null) // 0
  Number(undefined) // NaN
  Number('10') // 10
  Number('10a') // NaN
  Number('') // 0 
  Number(true) // 1
  Number(false) // 0
  Number([]) // 0
  Number(['1']) // 1
  Number({}) // NaN
```
3. toBoolean
```javascript
  Boolean(null) // false
  Boolean(undefined) // false
  Boolean('') // flase
  Boolean(NaN) // flase
  Boolean(0) // flase
  Boolean([]) // true
  Boolean({}) // true
  Boolean(Infinity) // true
```
4. toPrimitive
一般先看valueOf有没有返回原始数据类型，如果没有则看toString有没有返回原始数据类型的值,都没有则抛出异常
```javascript
Number([]) // 0
  Number(['10']) //10

  const obj1 = {
    valueOf () {
      return 100
    },
    toString () {
      return 101
    }
  }
  Number(obj1) // 100

  const obj2 = {
    toString () {
      return 102
    }
  }
  Number(obj2) // 102

  const obj3 = {
    toString () {
      return {}
    }
  }
  Number(obj3) // TypeError
```
对象类型在toNumber时会先进行toPrimitive，再根据返回的原始数据类型toNumber
## == 和 ===的区别
==是宽松相等，===是严格相等，宽松相等会在比较的时候进行隐式转换
## 比较规则
1. 布尔类型和其他类型比较：先将布尔类型转换成数字类型
2. 数组类型和字符串类型比较：字符串类型会被转换成数字类型
3. 对象类型和原始类型比较：对象类型会依照toPrimitive规则转换成原始类型
4. null、undefined和其他类型比较：null和undefined之间互相宽松相等，和其他所有值都不相等，比如下面的代码
```
null == false//false
undefined == false//false
```
## 最后再来看一组代码，加深理解
```javascript
  [] == ![] // true

  [] == 0 // true
  
  [2] == 2 // true

  ['0'] == false // true

  '0' == false // true

  [] == false // true

  [null] == 0 // true

  null == 0 // false

  [null] == false // true

  null == false // false

  [undefined] == false // true

  undefined == false // false
```

# 十一、深浅拷贝
## 浅拷贝
只是复制引用，修改一个变量，其他变量跟着变
简单看两个浅拷贝
```javascript
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
```
## 深拷贝
是对目标的完全拷贝，谁也不会影响谁
1.JSON.parse()和JSON.stringify()
```javascript
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
```
2.利用递归实现每一层的拷贝
```javascript
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
```

# 十二、字符串方法
这里列举一些常用的方法：
1. concat():连接两个或多个字符串，返回连接后的字符串
2. indexOf():返回字符串中检索指定字符第一次出现的位置
3. lastIndexOf():返回字符串中检索指定字符最后一次出现的位置
4. slice(start, end):截取部分字符串，包左不包右
6. substr(start, length):截取部分字符串，第二个参数可以规定截取的长度
7. replace():字符安川替换，返回的是新的字符串，默认只替换首个匹配而且堆大小写敏感，可以添加正则表达式，/i,/g等让他对大小写不敏感以及全局替换等
8. tpUpperCase():把字符串转换为大写
9. toLowerCase():把字符串转换为小写
10. trim():删除字符串两端的空白
11. charAt(index):返回字符串下标位置的字符
12. split(分割符):将字符串分割成数组

# 十三、Event loop
执行栈在执行完同步任务之后，查看执行栈是否为空，如果为空则去检查微任务队列是否为空，如果微任务队列为空，则执行宏任务，每执行完一次宏任务都会去检查一下微任务队列，有则依次执行完所有微任务，如此循环

# 十四、函数式编程
## 特性
1. 函数是一等一的公民：就是说可以像变量一样作为其他函数的输入输出
2. 不可变量：就是说不能用var 和 let
3. 纯函数：就是没有副作用的函数，不能修改函数外部的变量
4. 引用透明：同样的输入必须是同样的输出，不依赖外部的状态

## 函数柯里化
函数柯里化就是将一个多元函数转换成一个依次调用的单元函数
`f(a,b,c)->f(a)(b)(c)`
比如一个curry版本的add函数
```javascript
function add(x){
  return function(y){
    return function(z){
      return x+y+z
    }
  }
}
var a = add(1)
console.log(a(2)(3))//6
```

# 十五、数组和伪数组
## 数组的方法
1. jion():将数组元素结合为一个字符串
2. pop():删除最后一个元素
3. push():向数组末尾添加一个新的元素
4. shift():删除首个数组元素，并且更新索引，返回删除的元素
5. unshift():向数组开头添加新的元素，并且更新索引,返回新数组的长度
6. delete():删除元素，会在数组中留下空洞,不建议
7. splice(2,0,'zhangsan'):向数组中第二个位置添加新的元素,第一个数字代表起始位置，第二个数字代表要删除元素的个数，剩余为添加的元素，所以splice方法既可以用于添加元素也可以用于删除元素，并且不留空洞
8. concat():连接数组，返回一个新的数组
9. slice(1，3):切出新数组，返回新数组，第一个数字是起始位置，第二个数字是截止位置，包左不包右,如果没有第二个数字，默认切出剩余部分
10. sort():用于对数组进行排序
11. reverse():用于数组元素反转
12. Math.max.apply():用于查找数组中最高值
13. Math.min.apply():用于查找数组中最低值
## 伪数组
常见的是arguments

特性：
1. 具有length属性
2. 按索引方式存储
3. 没有内置方法，比如pop(),push()

如何转换成真数组:
1. Array.from(arguments)
2. 扩展运算符

# 十六、严格模式
1. 消除js不合理，不严谨的地方，减少怪异行为
2. 消除代码运行的不安全之处
3. 提高编译器的效率，增加运行速度
4. 为未来的js版本做铺垫

# 十七、call、apply、bind
这三者都用于改变this指向
## 区别
1. call和bind的参数是一个列表，需要将每个参数一一列出
2. apply的参数是一个数组，将每个参数放到一个数组中
3. bind绑定一个函数可以稍后执行，call和apply是立即调用

# 十八、循环
效率问题：for > forEach > map
1. map:将数组按照某种规则映射为另一个数组
2. forEach:进行简单的遍历
3. for of:对迭代器进行遍历

# 十九、Web worker
## 作用：
可以加载一个JS进行大量的复杂计算而不挂起主进程，并通过postMessage，onmessage进行通信，解决了大量计算对UI渲染的阻塞问题。
## 应用场景：
1. 数学运算
2. 图像处理
3. 大数据处理

# 二十、Service Worker
## Service Worker是什么
这是一个再浏览器背后运行的脚本，独立于web页面，有自己单独的线程，最重要是它允许你支持离线体验,本质上是一个代理服务器
## 生命周期
1. 下载（注册）
2. 安装
3. 激活
## 功能
1. 推送通知，通过用户订阅，发布消息
2. 后台同步，通过http请求拦截
3. 定期同步

# 二十一、PWA
PWA解决了哪些问题
1. 可以让Web的快捷方式添加至主屏幕(Mainfest)
2. 实现离线缓存功能(Service Worker)
3. 实现消息推送(Service Worker)

# 二十二、正则表达式
## 修饰符
1. i：对大小写不敏感
2. g：全局匹配
3. m：多行匹配
## 表达式
1. \[abc]:查找方括号之间的任何字符
2. \[0-9]:查找0-9之间的数字
3. (x|y):查找任何以|分隔的选项
## 元字符
1. \d:查找数字
2. \s:查找空白字符
3. \b:匹配单词边界
4. \uxxxx:查找十六进制xxxx规定的Unicode字符
## 量词
1. n+:匹配任何至少包含一个n的字符串
2. n*:匹配任何包含零个或者多个n的字符串
3. n?:匹配任何包含零个或一个n的字符串
## test()
用于检测是否符合某个规则，返回true or false
## exec()
返回一个数组，其中存放返回结果,如果没找到，就返回null
## 实例
`^`和`$`同时使用表示精准匹配
1. 是否带有小数: `/^\d+\.\d+$/.test()`
2. 是否中文名称组成: `/^[\u4E00-\u9FA5]{2,4}$/.test()`
3. 检查电话号码格式: `/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test()`
4. 检查邮箱地址格式: `/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test()`
5. 检查密码格式(包含字母和数字且至少八位):`/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test()`