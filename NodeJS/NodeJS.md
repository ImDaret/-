---
title: 【学习笔记】NodeJS篇
---
# 一、简介
node也是一个JS引擎，通过node可以使js代码在服务端执行，但是它不包含DOM和BOM，node的服务器是单线程的，但是后台拥有一个I/O池，node的底层是C++编写的

## node的特点
1. 非阻塞，异步的I/O
2. 事件和回调函数
3. 单线程
4. 跨平台

# 二、CMD命令
1. dir：列出当前目录下的所有文件
2. cd 目录名：进入到指定的目录
3. md 目录名：创建一个文件夹
4. rd 目录名：删除一个文件夹
5. .表示当前目录
6. ..表示上级目录
7. 当我们用命令窗口打开一个文件或者调用一个程序的时候系统会首先在当前目录下寻找文件程序，如果找到了就直接打开，如果没有找到则会依次到环境变量path的路径中寻找，直到找到

# 三、模块化

## 模块的引用
1. 使用require('模块的表示')来引入一个模块

## 模块的定义
1. module.exports.属性 = 属性值
2. module.exports.方法 = 函数
3. module.exports = {};

## 模块的标识
1. 对于核心模块，直接使用模块的名字对其引入
2. 对于自定义的文件模块，需要通过文件的路径对模块进行引入，路径可以是绝对的也可以是相对的，但是必须以./或者../开头

# 四、npm命令
1. npm -v，查看npm版本
2. npm version，查看所有模块的版本
3. npm search 包名，搜索包
4. npm install/r 包名, 安装包
5. npm remove/r 包名，删除包
6. npm install 包名 --save 安装包并添加到依赖
7. npm install 下载当前项目所依赖的包
8. npm install 包名 -g 全局安装的包（一般都是些工具）

# 五、package包
## 定义
将多个模块组合成一个完整的功能，就是一个包
## 包结构
1. bin：二进制的可执行文件，一般在工具包中有
2. lib：js文件
3. doc：文档
4. test：测试代码
5. package.json:包的描述文件
## package.json
它里面保存了包各种相关的信息
1. name：包名
2. version:版本
3. dependencies:依赖
4. main:包的主要文件
5. bin：可执行文件

# 六、缓冲区
Buffer和数组的结构非常类似，Buffer是用来存储二进制数据的
1. Buffer.from(字符串)：将一个字符串内容保存到一个Buffer中
2. Buffer.toString():将一个BUffer转换为字符串
3. Buffer.alloc(size):创建一个指定大小的Buffer对象
4. Buffer.allocUnsafe(size):创建一个指定大小的Buffer对象，可以包含敏感数据

# 七、fs模块
`var fs = require('fs')`
1. path：文件的路径
2. flag：文件打开的行为
3. mode：文件的权限
4. callback：回调函数，一般带有两个参数err，data
5. fd:写入文件的数据
6. optitons:该参数是一个对象，包含{encoding,mode,flag}
7. buffer:数据写入缓冲区
8. offset：写入偏移量
9. length:要读取的字节数
10. position：文件图区的起始位置
## 打开文件
1. 异步：fs.open(path,flags[,mode],callback),这里的callback一般带有两个参数err，data
2. 同步：fs.openSync(path,flags[,mode])
## 写入文件
1. 异步：fs.write(fd, string[, position[, encoding]], callback),这里的callback只包含err一个参数
2. 同步：fs.writeSync(fd, string[, position[, encoding]])
## 读取文件
1. 异步：fs.read(fd, buffer, offset, length, position, callback)这里的callback包含err,bytesRead(字节数),buffer
2. 同步：fs.readSync(fd, buffer, offset, length, position)
## 关闭文件
1. 异步：fs.close(fd,callback)这里的callback没有参数
2. 同步：fs.closeSync(fd);
## 简单文件的读取和写入
1. fs.writeFile(file, data[, options], callback)
2. fs.writeFileSync(file, data[, options])
3. fs.readFile(path[, options], callback)
4. fs.readFileSync(path[, options])
## 流式文件的读取和写入(针对大文件)
1. fs.createWriteStream(path[, options])
2. fs.createReadStream(path[, options])