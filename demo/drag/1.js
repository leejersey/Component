//面向过程写法
window.onload = function() {
    //获取元素
    var oBox = document.getElementById('box');
    //设置初始值
    var disX = 0,
        disY = 0;

    //事件
    oBox.onmousedown = function(e) {
        var oEvent = e || window.event;
        disX = e.clientX - this.offsetLeft;
        disY = e.clientY - this.offsetTop;

        document.onmousemove = function(e) {
            var oEvent = e || window.event;
            oBox.style.left = (e.clientX - disX) + 'px';
            oBox.style.top = (e.clientY - disY) + 'px';
        };

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };

    };
}
