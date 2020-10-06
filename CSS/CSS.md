# 一、position：
1.static:默认情况

2.relative：相对的，与正常位置对比

3.absolute：绝对的，与父元素位置对比

4.fixed：相对于浏览器窗口固定

5.sticky:粘性的，滚动后超出区域就粘在目标位置

# 二、盒子模型
1.margin：外边距

2.border：边框

3.padding：内边距

4.content：内容

# 三、伪类，伪元素
1.`a:link`:未访问的链接

2.`a:visited`：访问过的链接

3.`a:active`：活动时的链接

4.`a:hover`：悬浮时的链接

5.`p:before`：在`<p>`标签之前插入内容

6.`p:after`：在`<p>`标签之后插入内容

两者的区别：
1. 伪类用`:`分割，伪元素用`::`分割
2. 伪类是一种额外的样式，伪元素是一种虚拟元素

# 四、Flex布局
容器上的属性：

1.flex-direction：决定主轴的方向
```
.container {
    flex-direction: row(水平，起点在左) | row-reverse（水平，起点在右） | column（垂直，起点在上） | column-reverse（垂直，起点在下）;
}
```
2.flex-wrap：决定是否可以换行
```
.container {
    flex-wrap: nowrap(不换行) | wrap（在主轴上超出则换行，第一行在上方）| wrap-reverse（在主轴上超出则换行，第一行在下方）;
}
```
3.flex-flow：flex-direction和flex-flow的简写形式
```
.container {
    flex-flow: <flex-direction> || <flex-wrap>;
}
```
4.justify-content：决定在主轴上的对齐方式
```
.container {
    justify-content: flex-start(主轴起点对齐) | flex-end（终点对齐） | center（居中） | space-between（两端对齐） | space-around（每个项目间隔相等）;
}
```
5.align-items：决定交叉轴上的对齐方式
```
.container {
    align-items: flex-start(交叉轴起点对齐) | flex-end（终点对齐） | center（居中） | baseline（第一行文字基线对齐） | stretch（默认，占满整个容器高度）;
}
```

6.align-content：定义多根轴线的对齐方式，如果只有一根则不起作用
```
.container {
    align-content: flex-start(交叉轴起点对齐) | flex-end（交叉轴终点对齐） | center（交叉轴中点对齐） | space-between（两端对齐） | space-around（间隔相等对齐） | stretch（默认，占满整个容器高度）;
}
```

项目上的属性

1.order：排列顺序，数值越小越靠前，默认值为0
```
.item {
    order: <integer>;
}
```
2.flex-basis：计算主轴是否还有多余空间
```
.item {
    flex-basis: <length> | auto;
}
```
3.flex-grow:如果有多余空间则根据比例放大，默认值为0，不放大，全部值为1时等分，某个值为2，其他值为1时，前者占据剩余空间是其他的两倍
```
.item {
    flex-grow: <number>;
}
``` 
4.flex-shrink:如果空间不足就缩小，默认值为0，不缩小，全部值为1时等缩小
```
.item {
    flex-shrink: <number>;
}
```
5.flex：flex-grow,flex-shrink,flex-basis的缩写
```
.item{
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
} 
//举个例子：
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
```
6.align-self：单个项目的对齐方式
```
.item {
     align-self: auto(默认，继承父元素的align，如果没有则等同于stretch) | flex-start（交叉轴起点对齐） | flex-end（交叉轴终点对齐） | center（交叉轴中点对齐） | baseline（第一行文字对齐） | stretch（占满整个容器高度）;
}
```
# 五、垂直居中的方式
1.flex：`align-items:center`

2.line-height:`line-height:xxxpx(xxx与父元素的高度一样)`

3.`vertical-align:middle`前提是display为inline-block

4.已知父元素高度,给子元素设置：
```
position:relative
top:50%
transform:translateY(-50%)
```

# 六、解决1px
## 为什么会无法产生1px？
现在的移动主流屏DPR（像素比）一般为2或者3，比如要展示1px，那么实际应该写0.5px。这在ios中是支持的，但是安卓不支持、

## 如何解决？
1.使用伪元素：
```
.div::after {
    content: '';
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
    -webkit-transform: scale(0.5,0.5);
    transform: scale(0.5,0.5);
    -webkit-transform-origin: top left;
}
```
优缺点：可以圆角，但是会影响清除浮动

2.设置viewport的scale值+rem

1.当DPR=2时
```
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
```
2.当DPR=3时
```
<meta name="viewport" content="initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no">
```

优缺点：这种方法适合新项目，老项目修改太大

# 七、层叠上下文 Z-index
层叠上下文：某些元素因为某些原因层叠到了一起

层叠顺序：正Z-index > Z-index=0 > inline或者inlineblock盒子 > 浮动盒子 > block盒子 > 负Z-index > 层叠上下文(background/border)

黄金法则：
1. 谁大谁上，看层叠水平Z-index，谁大谁在上面
2. 后来居上，当层叠水平和层叠顺序一样时，后面的元素覆盖前面的元素

# 八、CSS3新特性
1. 边框：`border-radius:10px`设置圆角，`border-shadow:10px(右) 10px(下) 5px(阴影大小) #888888`设置阴影
2. 背景：`background-image`、`background-size`
3. 渐变：线性渐变`background-image:linear-gradient（xxx）`，径向渐变：`background-image:radial-gradient（xxx）`
4. 文本效果：

`text-shoadow`:文本阴影效果

`box-shadow`：盒子阴影效果

`text-overflow`：文本溢出效果

`word-wrap`：允许换行

`word-break`：换行方式，keep-all(词之间换行),break-all(词内部换行)

5. 2D转换：
```
translate(50px,100px)//从左边移动50px，从顶部移动200px
rotate(30deg)//正值顺时针旋转，负值逆时针旋转
scale(2，3)//宽度变为原来的两倍，高度变为原来的三倍
skew(30deg,20deg)//向x轴倾斜20度，向y轴倾斜30度
```
6. 3D转换：`rotateX(deg)`,`rotateY(deg)`
7. 过渡：
```
transition-property: width;(规定过渡的属性名称)
transition-duration: 1s;（过渡持续时间）
transition-timing-function: linear;（过渡效果方式）
transition-delay: 2s;（从何时开始）
```
8. 动画：
```
animation-name: myfirst;(动画名称)
animation-duration: 5s;（持续时间）
animation-timing-function: linear;（效果方式）
animation-delay: 2s;（何时开始）
animation-iteration-count: infinite;（播放次数）
animation-direction: alternate;（是否在下一周期逆向播放）
animation-play-state: running;（是否正在运行）
```
```
@keyframes myfirst（规则）
{
    0%   {background: red;}
    25%  {background: yellow;}
    50%  {background: blue;}
    100% {background: green;}
}
```
9. 弹性盒子(Flex)：上面说过了，不多说了
10. 边框：`box-sizing: border-box`将padding内边距和border边框包含在width和height中
11. 多媒体查询：当宽度小于xx时，将其xxxx