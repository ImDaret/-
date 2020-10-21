---
title: 【学习笔记】Vue篇
---
# MVVM
1. ViewModel：内部集成了Binder，Binder会实现View和Model的双向绑定
2. View，可组件化，View的变化会通过Binder自动更新相应的Model
3. Model：Model的变化会被Binder监听，一旦监听到变化则会自动实现视图更新

# 生命周期
1. beforeCreate&created,实例化Vue，初始化数据观测，属性，方法
2. beforeMount&mounted,Dom挂载
3. beforeUpdate&updated,数据更新
4. beforeDestroy&destroyed,组件销毁 

# 双向绑定原理
1. 通过数据劫持，加上发布订阅模式的方式，通过object。defineProperty()来劫持各个属性的setter,getter,在数据变动的时候发布消息给订阅者，触发相应的监听回调，
2. 整合Observer,Compile,Watcher三者，通过Observer监听model的数据变化，通过compile来解析编译模板指令,最终利用watcher搭建observer和compile之间的通信桥梁，达到双向绑定的效果

# Vue router
1. hash模式:URL中#以及#后面的字符称为hash，它不被包括在http请求中，对服务端安全没有用，不会重新加载页面
2. history模式:发起的请求地址必须前后端一致，提供了两个新的方法，pushState(),replaceState()可以对浏览器的历史记录栈进行修改，还有就是popState()监听状态的变更

# Vuex状态管理
1. state:state改变,View也会跟着改变
2. mutation:这是修改state的唯一方法，但是mutation是同步的，同步就会阻塞
3. action:action是异步的，通过store.dispatch来触发某个action，谭厚action里面通过store.commit('xxxx')来触发mutation,一个action可以触发多个mutation
4. getter:方便计算属性的复用
5. modules:模块化管理

# 组件通信
1. 父传子：props,$children
2. 子传父:$emit,$parent
3. 非父子组件之间：eventBus,vuex
4. 跨级通信：provide/inject(父组件通过provide注入变量，子组件通过injected接收),$attrs/$listeners

# virtual DOM
## 是什么
是对DOM的抽象，本质上是JS对象
## 作用
1. 通过diff算法，减少js操作的真实DOM带来的性能消耗
2. 抽象了原本的渲染过程，实现了跨平台的能力

# diff算法
1. 用JS模拟真实的DOM节点
2，把虚拟的DOM转换成真实的DOM插入页面中
3. 发生变化时，比较两棵树的差异，生成差异对象
4. 根据差异对象更新真实的DOM

# computed 和 watch的区别
1. computed有缓存，watch无缓存
2. computed主要用于对同步数据的处理，watch则主要用于观测某个值的变化去完成一段开销较大的复杂业务逻辑
总结：computed擅长一个数据受多给数据影响，watch擅长一个数据影响多个数据

# v-if和v-show的区别
1. v-show是控制元素的display属性，v-if是条件渲染，只有为真时才被渲染
2. v-show首次渲染开销大，切换开销小，v-if首次开销小，切换开销大
3. v-if可以搭配v-else-if,v-else

# vue常用的事件修饰符
1. .prevent：提交事件不再重新加载页面
2. .stop：阻止事件的冒泡
3. .self：当事件发生在该元素本身而不是子元素时才会触发
4. .capture：事件侦听，事件发生的时候会调用
5. .once：事件只触发一次
6. 。passive：移动端优化，滚动行为发生时立即触发事件