$(function(){
    scrollbar.init();
})

var scrollbar = (function() {
    function Scroll() {
        this.init();
    }

    Scroll.prototype = {
        init: function() {
            this.getDoms();
            this.bindEvt();
        },
        getDoms: function() {
            this.doms = {
                $disp: $('#disp'),
                $article: $('#article'),
                $bar: $('#bar'),
                $slide: $('#slide'),
                $doc:$(document),
                bDrag: false,
                gapY: 0
            }
        },
        bindEvt: function() {
            var _this = this,
                doms = this.doms;

            doms.$bar.on('mousedown', function(e) {
                doms.bDrag = true;
                doms.gapY = e.clientY - doms.$slide[0].offsetTop;
            });

            doms.$doc.on('mousemove', function(e) {
                if (!doms.bDrag) return;
                var l = e.clientY - doms.gapY;
                _this.changeTop(l);
                return false;
            });

            doms.$doc.on('mouseup', function(e) {

                doms.bDrag = false;
                return false;
            });

            doms.$disp.on('mousewheel', function(e) {
                //console.log(e.deltaX, e.deltaY, e.deltaFactor);
                _this.wheelMove(e);
            });

            return false;
        },
        changeTop: function(l) {
            var _this = this,
                doms = this.doms;

            if (l < 0) {
                l = 0;
            } else if (l > doms.$bar.height() - doms.$slide.height()) {
                l = doms.$bar.height() - doms.$slide.height();
            }
            doms.$slide.css('top',l);
            var scale = l / (doms.$bar.height() - doms.$slide.height());
            doms.$article.css('top',-scale * (doms.$article.height() - doms.$disp.height()));
        },
        wheelMove: function(e) {
            var _this = this,
                doms = this.doms;
            if(e.deltaY == -1){
                l = doms.$slide[0].offsetTop + 10;
            }else if(e.deltaY == 1){
                l = doms.$slide[0].offsetTop - 10;
            }    
            
            _this.changeTop(l);
            e.preventDefault();
            return false;
        }
    }

    return new Scroll();

})();
