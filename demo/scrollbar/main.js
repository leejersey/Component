/************************/
/*滑块移动距离/滑块可移动距离 =内容滚动高度/内容可滚动的高度
/*滑块移动距离 = 鼠标移动距离
/************************/
var Scroll = (function() {
    function CusScrollBar() {
        this.init();
    };

    CusScrollBar.prototype = {
        init: function() {
            this.getDoms();
            this.bindEvt();
        },
        getDoms: function() {
            this.doms = {
                $tabItem: $('.tab-item'), //标签
                $scrollWwrap: $('.scroll-wrap'), //滚动内容区
                $scrollCont:$('.scroll-cont'),
                $scrollSlider: $('.scroll-slider'), //滚动条滑块
                $scrollBar: $('.scroll-bar'), //滚动条
                $doc : $(document),
                bDrag: false,
                gapY: 0
            }
        },
        bindEvt: function() {
            var _this = this,
                doms = this.doms;

            //标签切换
            doms.$tabItem.on('click', function() {
                var index = $(this).index();
                this.changeSelect(index);
                // 切换标签后同步内容
                //_this.scrollContTo(self.$cont[0].scrollTop + self.getAnchorPosition(index));

            });

            //拖动滑块
            doms.$scrollSlider.on('mousedown',function(e){
            	doms.bDrag = true;
                doms.gapY = e.clientY - doms.$scrollSlider[0].offsetTop;
            });

            doms.$doc.on('mousemove',function(e){
                if (!doms.bDrag) return;
                var l = e.clientY - doms.gapY;
                 _this.changeTop(l);
                return false;
            });

            doms.$doc.on('mouseup',function(){
                doms.bDrag = false;
                return false;
            })
        },
        changeSelect: function(index) {
            var _this = this,
                doms = this.doms;

            doms.$tabItem.eq(index).addClass('tab-active').siblings().removeClass('tab-active');
        },
        changeTop:function(l){
            var _this = this,
                doms = this.doms;

            if (l < 0) {
                l = 0;
            } else if (l > doms.$scrollBar.height() - doms.$scrollSlider.height()) {
                l = doms.$scrollBar.height() - doms.$scrollSlider.height();
            }
            doms.$scrollSlider.css('top',l);
            var scale = l / (doms.$scrollBar.height() - doms.$scrollSlider.height());
            doms.$scrollCont.css('top',-scale * (doms.$scrollCont.height() - doms.$scrollWwrap.height()));
        },
        // 内容可滚动的高度
        getMaxScrollPosition:function(){
        	var _this = this,
        		doms = this.doms;

			return Math.max(_this.doms.$scrollWwrap.height(),_this.doms.$scrollWwrap[0].scrollHeight) - _this.doms.$scrollWwrap.height();
        },
        // 滑块可移动距离
        getMaxSliderPosition:function(){
        	var _this = this,
        		doms = this.doms;

        	return _this.doms.$scrollBar.height() - _this.doms.$scrollSlider.height();
        },
        scrollContTo:function(positionVal){
        	var _this = this,
        		doms = this.doms;

        	_this.doms.$scrollWwrap.scrollTop(positionVal);
        }
    }

    return new CusScrollBar();
})();
