---
title:[学习笔记]HTML篇
---

# 一、H5的新特性

## 1.新增语义化标签
`<header>、<nav>、<main>、<article>、<aside>、<section>、<footer>`

作用：使代码更加结构化，利于SEO搜索，方便读者浏览

## 2.新增input类型
`color、time、date、week、tel、email、number、search、url、range`

## 3.新增input属性
`max、min、step、autofocus、required、placeholder（输入为空时的提示）`

## 4.新增audio、video元素
audio为音频播放：支持格式有mp3 或 ogg 

video为视频播放：支持格式有ogg、mp4 或 webm

## 5.新增Canvas和SVG
Canvas：通过JS来绘制2D图形，逐像素进行渲染，依赖分辨率，不支持事件处理器，适合游戏应用

SVG：是使用XML描述2D图形的语言，不依赖分辨率，支持事件处理器，不适合游戏应用

## 6.地理位置
检测是否支持地理定位

如果支持，运行getCurrentPosition() 获取地理位置，否则，向用户显示不支持的消息

向参数showPosition中规定的函数返回一个coordinates对象

showPositon()函数获得并显示经度和纬度

## 7.拖放
把元素设为课拖放的：draggable="true"

拖放的内容：ondragstart属性规定拖动什么数据，dataTransfer。setData()方法设置被拖动数据的数据类型和值

拖到何处: ondragover：event.preventDefault()阻止默认事件的发生

进行放置：ondrop,触发

```JavaSript
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
```

## 8.Web workers
Web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 运行在后台
## 9.Web存储
window.localStorage - 存储没有截止日期的数据(永久存储)

window.sessionStorage - 针对一个 session 来存储数据（当关闭浏览器标签页时数据会丢失）
## 10.应用缓存 cache manifest
应用程序缓存为应用带来三个优势：

离线浏览 - 用户可在应用离线时使用它们

速度 - 已缓存资源加载得更快

减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源

# 二、行内元素和块级元素统计
行内元素：
`<span>、<i>、<em>、<input>、<textarea>、<select>、<a>、<sup>、<sub>、<u>（下划线）`

特性：

	在一行内

	宽高根据内容的宽高

	不能设置宽高

块级元素：
`<div>、<p>、<h1>、<h2>、<h3>、<h4>、<h5>、<ul>、<ol>、<table>、<form>`


特性：

	独占一行

	宽度默认100%

	可以设置宽高