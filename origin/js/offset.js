function offset(dom) {
    // 定义两个变量
    var left = 0;
    var top = 0;
    // 第一次不应该把自己的边框算进去 
    left = dom.offsetLeft;
    top = dom.offsetTop;
    // 为了兼容性考虑，IE8要单独处理
    // 检测window.navigator.userAgent这个字符串里面是否包含"MSIE 8" 
    // 如果包含就说明是IE 如果不包含就说明不是IE
    var isIE8 = false;
    if (window.navigator.userAgent.indexOf("MSIE 8") != -1) {
        isIE8 = true;
    }
    // 让自己指向上一层
    dom = dom.offsetParent;
    // 而且因为dom没有直接获取到页面的属性所以只能一层一层的往上找
    while (dom != document.body) {
        // 如果是IE8  不需要加 clientTop clientLeft
        if (isIE8) {
            // 累加每一层的offsetLeft
            left += dom.offsetLeft
            // 累加每一层的offsetTop 
            top += dom.offsetTop
                } else {
                    // 累加每一层的offsetLeft 和clientLeft
                    left += dom.offsetLeft + dom.clientLeft;
                    // 累加每一层的offsetTop 和clientTop
                    top += dom.offsetTop + dom.clientTop;
                }
                // 让dom指向上一层
                dom = dom.offsetParent;
            }
            return {
                left: left,
                top: top
            }
        }