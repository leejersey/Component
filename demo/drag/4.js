//面向对象写法2
$(function() {
    dragBox.init();
});

var dragBox = (function($) {
    function Drag() {
        this.init();
    }

    Drag.prototype = {
        init: function() {
            this.getDoms();
            this.bindEvt();
        },
        getDoms: function() {
            this.doms = {
                $box: $('#box'),
                $doc: $(document),
                disX:0,
                disY:0
            }
        },
        bindEvt: function() {
            var _this = this,
                doms = this.doms;

            doms.$box.on('mousedown', function(ev) {
                _this.mouseDown(ev,this)
            });
        },
        mouseDown: function(ev,app) {
            var _this = this,
                doms = this.doms;

            doms.disX = ev.clientX - $(app).offset().left;
            doms.disY = ev.clientY - $(app).offset().top;

            doms.$doc.on('mousemove', function(ev) {
                _this.mouseMove(ev);
            });

            doms.$doc.on('mouseup', function() {
                _this.mouseUp();
            });
        },
        mouseMove: function(ev) {
            var _this = this,
                doms = this.doms;

            doms.$box.css({
                left: ev.clientX - doms.disX + 'px',
                top: ev.clientY - doms.disY + 'px'
            });
        },
        mouseUp: function() {
            var _this = this,
                doms = this.doms;

            doms.$doc.off('mousemove');
            doms.$doc.off('mouseup');
        }
    }

    return new Drag();
})(jQuery);
