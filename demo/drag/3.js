//面向对象写法1
window.onload = function (){
    var drag = new Drag('box');

    drag.init();
};

// 构造函数Drag
function Drag(id){
    this.obj = document.getElementById(id);
    this.disX = 0;
    this.disY = 0;
}

Drag.prototype.init = function (){
    var _this = this;

    this.obj.onmousedown = function (e){
        var e = e || event;
        _this.mouseDown(e);

        // 阻止默认事件
        return false;
    };
};

Drag.prototype.mouseDown = function (e){
    var _this = this;
    
    this.disX = e.clientX - this.obj.offsetLeft;
    this.disY = e.clientY - this.obj.offsetTop;

    document.onmousemove = function (e){
        var e = e || window.event;

        _this.mouseMove(e);
    };  

    document.onmouseup = function (){
        _this.mouseUp();
    }
};

Drag.prototype.mouseMove = function (e){
    this.obj.style.left = (e.clientX - this.disX) + 'px';
    this.obj.style.top = (e.clientY - this.disY) + 'px';
};

Drag.prototype.mouseUp = function (){
    document.onmousemove = null;
    document.onmouseup = null;
};