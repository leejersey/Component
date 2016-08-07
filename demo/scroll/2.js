window.onload = function() {
    scrollbar.init();
}

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
                disp: document.getElementById('disp'),
                article: document.getElementById('article'),
                bar: document.getElementById('bar'),
                slide: document.getElementById('slide'),
                bDrag: false,
                gapY: 0
            }
        },
        bindEvt: function() {
            var _this = this,
                doms = this.doms;

            doms.bar.addEventListener('mousedown', function(ev) {
                var e = ev || event;
                doms.bDrag = true;
                doms.gapY = e.clientY - doms.slide.offsetTop;
            }, false);

            document.addEventListener('mousemove', function(ev) {
                var e = ev || event;
                if (!doms.bDrag) return;
                var l = e.clientY - doms.gapY;
                _this.changeTop(l);
                return false;
            }, false);

            document.addEventListener('mouseup', function(ev) {
                doms.bDrag = false;
                return false;
            }, false);

            disp.addEventListener('mousewheel', function(ev) {
                _this.wheelMove(ev);
            }, false);

            disp.addEventListener("DOMMouseScroll", function(e) {
                _this.wheelMove(e);
            }, false);

            return false;
        },
        changeTop: function(l) {
            var _this = this,
                doms = this.doms;

            if (l < 0) {
                l = 0;
            } else if (l > doms.bar.offsetHeight - doms.slide.offsetHeight) {
                l = doms.bar.offsetHeight - doms.slide.offsetHeight;
            }
            doms.slide.style.top = l + "px";
            var scale = l / (doms.bar.offsetHeight - doms.slide.offsetHeight);
            doms.article.style.top = -scale * (doms.article.offsetHeight - doms.disp.offsetHeight) + "px";
        },
        wheelMove: function(e) {
            var _this = this,
                doms = this.doms;

            var e = e || event;
            var eCode = (e.wheelDelta) ? (e.wheelDelta > 0) : (e.detail < 0);
            var l;
            if (eCode) {
                l = doms.slide.offsetTop - 10;
            } else {
                l = doms.slide.offsetTop + 10;
            }
            _this.changeTop(l);
            e.preventDefault && e.preventDefault();
            return false;
        }
    }

    return new Scroll();

})();
