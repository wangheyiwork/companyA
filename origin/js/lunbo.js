"use strict";

function animate(dom, targetObject, duration, callback) {
    // 参数默认值
    duration = duration || 1000;
    // 1 定义起点 
    var nowObject = {};
    // 获取计算后样式对象
    var styleObject = window.getComputedStyle(dom);
    // 因为targetObject是对象 所以通过循环得到该对象的每一个属性名
    for (var i in targetObject) {
        // 获取对应的属性
        var prop = styleObject[i];
        // 为了确保能够计算 需要转为数字
        nowObject[i] = parseInt(prop);
    }
    // nowObject在循环之后就拥有了targetObjet的所有属性 并且属性值为运动之前的值
    // console.log(nowObject);
    // 2 定义总距离
    var distanceObject = {};
    for (var i in targetObject) {
        // 总距离 = 终点值 - 初始值
        distanceObject[i] = targetObject[i] - nowObject[i];
    }
    // 3 定义间隔
    var interval = 20;
    // 4 定义总次数
    var allCount = duration / interval;
    // 5 定义计数器
    var count = 0;
    // 开启定时器
    var timer = setInterval(function() {
        // 计数器累加
        count++;
        // 改变每一条属性 
        for (var i in targetObject) {
            if (i === "opacity") {
                dom.style[i] = (nowObject[i] + count * distanceObject[i] / allCount);
            } else {
                dom.style[i] = (nowObject[i] + count * distanceObject[i] / allCount) + "px";
            }
        }
        // 判定是否停止
        if (count >= allCount) {
            // 停止定时器
            clearInterval(timer);

            // if (callback) {
            //     callback();
            // }
            // 短路语法：且运算 有假就假 都真才真
            // 当不传递callback时 为undefined  则&&后面的语句不会被执行 
            // 当传递callback时  为函数 函数为真 就执行了


            // 强行拉到终点去
            for (var i in targetObject) {
                if (i === "opacity") {
                    dom.style[i] = targetObject[i];
                } else {
                    dom.style[i] = targetObject[i] + "px";
                }
            }

            callback && callback();
        }
    }, interval);
}
/* 
    在书写面向对象的代码时 
    1 先把类定义
    2 考虑这个类应当有的属性
        考虑哪些属性是应当传递进来的哪些属性是可以不用传递的
    3 考虑这个类应当有的方法
 */
// 如果决定要使用 animate 必须做一个检测  检测animate函数是否存在 
if (!window.animate) {
    // 只要window.animate为undefined  说明不存在 就会走这里
    throw new Error("Banner需要依赖animate")
}
// 定义类
function Banner(dom, imgArr, duration = 1000) {
    // 1 由外部传递的容器元素
    this.dom = dom;
    // 2 由外部传递的图片数组
    this.imgArr = imgArr;
    // 3 按钮组元素
    this.btns = document.createElement("div");
    // 4 图片列表容器元素
    this.imgUL = document.createElement("ul");
    // 5 小圆点列表容器元素
    this.cirUL = document.createElement("ul");
    // 6 左按钮
    this.leftBtn = document.createElement("div");
    // 7 右按钮
    this.rightBtn = document.createElement("div");
    // 8 小圆点列表元素数组
    this.cirsArr = [];
    this.lisArr = [];
    this.imgEleArr = [];
    // 9 信号量
    this.idx = 0;
    // 10 锁
    this.lock = true;
    // 11 宽度属性
    this.width = dom.clientWidth;
    // 12 高度属性
    this.height = dom.clientHeight;
    // 13 定时器属性
    this.timer = null;
    // 14 动画时长
    this.duration = duration;
    this.init();
}
Banner.prototype.init = function() {
        this.upTree();
        this.create();
        this.render();
        this.change();
        this.bindEvent();
        this.autoLoop();
    }
    // 方法
    // 创建元素 
Banner.prototype.create = function() {
        // 创建图片列表
        this.createImgList();
        // 创建小圆点列表
        this.createCirsList();
    }
    // 创建图片列表
Banner.prototype.createImgList = function() {
        // 图片列表要根据数组进行创建
        for (var i = 0; i < this.imgArr.length; i++) {
            // 创建li
            var li = document.createElement("li");
            // 创建img
            var img = new Image(); // 等价于 document.createElement("img");
            // 设置src
            img.src = this.imgArr[i];
            // 将img元素装入imgEleArr中
            this.imgEleArr.push(img);
            // 追加img到li中
            li.appendChild(img);
            this.lisArr.push(li);
            // 追加li到ul中
            this.imgUL.appendChild(li);
        }
        // 复制猫腻图 
        var fake = this.imgUL.firstElementChild.cloneNode(true);
        this.imgEleArr.push(fake.firstElementChild)
        this.lisArr.push(fake);
        // 追加到ul中
        this.imgUL.appendChild(fake);
    }
    // 创建小圆点列表
Banner.prototype.createCirsList = function() {
    // 创建小圆点列表 也是根据图片数量来创建的
    for (var i = 0; i < this.imgArr.length; i++) {
        var li = document.createElement("li");
        this.cirUL.appendChild(li);
        this.cirsArr.push(li);
    }
}

// 调整按钮样式
Banner.prototype.renderBtn = function() {
        // 1 按钮容器的样式
        var obj = {
            position: 'absolute',
            top: "35%",
            height: "30%",
            width: "100%",
            // background: "red"
        }
        for (var i in obj) {
            this.btns.style[i] = obj[i]
        }
        // 2 左按钮的样式
        // 3 右按钮的样式
        var obj1 = {
            width: "10%",
            height: "100%",
            fontSize: this.height * .09 + "px",
            lineHeight: this.height * .3 + "px",
            textAlign: 'center',
            color: 'white',
            cursor: "pointer",
            fontWeight: "bold",
            backgroundColor: "rgba(0,0,0,.3)"


        }
        for (var i in obj1) {
            this.leftBtn.style[i] = obj1[i];
            this.rightBtn.style[i] = obj1[i];
        }
        this.leftBtn.style.float = "left";
        this.rightBtn.style.float = "right";
        this.leftBtn.innerHTML = "&lt;";
        this.rightBtn.innerHTML = "&gt;";
    }
    // 按钮组合
Banner.prototype.appendBtn = function() {
    this.btns.appendChild(this.leftBtn);
    this.btns.appendChild(this.rightBtn);
}

// 调整小圆点的样式
Banner.prototype.renderCirs = function() {
        // 1 容器样式
        var obj = {
            position: "absolute",
            bottom: "5%",
            left: '25%',
            right: '25%',
            display: 'flex',
            justifyContent: "space-between",
            alignItems: "center",
            listStyle: "none"
        }
        for (var i in obj) {
            this.cirUL.style[i] = obj[i];
        }
        // 2 小圆点本身样式
        var obj1 = {
            width: this.height * .07 + "px",
            height: this.height * .07 + "px",
            borderRadius: "50%",
            backgroundColor: "red",
            cursor: "pointer"
        }
        this.cirsArr.forEach(function(value) {
            for (var i in obj1) {
                value.style[i] = obj1[i];
            }
        });

    }
    // 添加样式
Banner.prototype.render = function() {
        // 图片列表样式
        this.renderImg();
        // 按钮样式
        this.renderBtn();
        // 小圆点样式
        this.renderCirs();
        // 更新容器的样式
        this.renderContainer();

    }
    // 渲染容器
Banner.prototype.renderContainer = function() {
        this.dom.style.position = "relative";
        this.dom.style.overflow = "hidden";
    }
    // 渲染图片列表
Banner.prototype.renderImg = function() {
        var _this = this;
        this.lisArr.forEach(function(value) {
            value.style.float = "left";
            value.style.width = _this.width + "px";
            value.style.height = _this.height + "px";
        });

        this.imgEleArr.forEach(function(value) {
            value.style.width = _this.width + "px";
            value.style.height = _this.height + "px";
        });

        var obj = {
            position: "absolute",
            top: "0",
            left: "0",
            width: (this.imgArr.length + 1) * this.width + "px",
            height: this.height + "px"
        }
        for (var i in obj) {
            this.imgUL.style[i] = obj[i];
        }

    }
    // 组合
Banner.prototype.upTree = function() {
    // 1 图片列表
    this.dom.appendChild(this.imgUL);
    // 2 按钮列表
    // this.dom.appendChild(this.btns);
    // // 3 小圆点列表
    // this.dom.appendChild(this.cirUL);
    // 4 按钮追加子按钮
    this.appendBtn();
}

// 初始状态的设置
Banner.prototype.change = function() {
    // 小圆点有初始状态
    // 所有的小圆点都取消样式
    for (var i = 0; i < this.cirsArr.length; i++) {
        this.cirsArr[i].style.backgroundColor = "red";
    }
    // 跟当前的idx对应的小圆点应当显示不同的样式
    this.cirsArr[this.idx].style.backgroundColor = "orange";
}


// 绑定事件
Banner.prototype.bindEvent = function() {
    // 左按钮绑定事件
    this.bindLeft();
    // 右按钮绑定事件
    this.bindRight();
    // 小圆点绑定事件
    this.bindCirs();
    // 容器绑定事件
    // this.bindContainer();
    this.bindEnter();
    this.bindLeave();
}

// 左按钮绑定事件
Banner.prototype.bindLeft = function() {
        this.leftBtn.onclick = () => {
            console.log("点击到左按钮了")
                // 检测锁的状态
            if (!this.lock) {
                return;
            }
            // 关锁
            this.lock = false;
            // 信号量改变
            this.idx--;
            // 检测是否到了第一张图的前面(越界了)
            if (this.idx < 0) {
                this.imgUL.style.left = -this.imgArr.length * this.width + "px";
                this.idx = this.imgArr.length;
                this.idx--;
            }
            // 开始动画
            animate(this.imgUL, { left: -this.idx * this.width }, this.duration, () => {
                // 开锁
                this.lock = true;
                this.change();
            });
        }
    }
    // 右按钮绑定事件
Banner.prototype.bindRight = function() {
        this.rightBtn.onclick = () => {

            // 检测锁的状态
            if (!this.lock) {
                return;
            }
            // 关锁
            this.lock = false;
            // 信号量改变
            this.idx++;
            // 开始动画
            animate(this.imgUL, { left: -this.idx * this.width }, this.duration, () => {
                // 检测是否到了最后一张图
                if (this.idx >= this.imgArr.length) {
                    this.imgUL.style.left = 0;
                    this.idx = 0;
                }
                // 开锁
                this.lock = true;
                this.change();
            })
        }
    }
    // 小圆点绑定事件
Banner.prototype.bindCirs = function() {
        this.cirsArr.forEach((value, index) => {
            value.onclick = () => {
                console.log("我是第" + index + "个小圆点")
                    // 判定锁
                if (!this.lock) {
                    return;
                }
                // 关锁
                this.lock = false;
                // 改变信号量
                this.idx = index;
                // 动画
                animate(this.imgUL, { left: -this.idx * this.width }, this.duration, () => {
                    this.lock = true;
                    this.change();
                });

            }
        });
    }
    // 容器绑定事件
    // Banner.prototype.bindContainer = function () {

//     this.dom.onmouseenter = function () {
//         console.log("鼠标进入了")
//     }
//     this.dom.onmouseleave = function () {
//         console.log('鼠标离开了')
//     }
// }


// 自动轮播方法
Banner.prototype.autoLoop = function() {
    this.timer = setInterval(() => {
        this.rightBtn.onclick();
    }, this.duration + 5000);
}

// 鼠标进入
Banner.prototype.bindEnter = function() {
        this.dom.onmouseenter = () => {
            this.dom.appendChild(this.btns);
            // clearInterval(this.timer)
        }
    }
    // 鼠标离开
Banner.prototype.bindLeave = function() {
    this.dom.onmouseleave = () => {
        this.dom.removeChild(this.btns);
        // this.autoLoop();
    }
}