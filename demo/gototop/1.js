(function($){
	var gototop = {
		init : function(){
			this.getDoms();
			this.template();
			this.render();
			this.bindEvt();
		},
		getDoms:function(){
			this.doms={
				$window : $(window)
			}
		},
		template : function(){
			this.tpl={
				$gottotop : $('<div id="go-top">回到顶部</div>')
			}
		},
		render : function(){
			var tpl = this.tpl;
			$('body').append(tpl.$gottotop);
		},
		bindEvt : function(){
			var self = this,
				tpl = this.tpl,
				doms =this.doms;
				
			doms.$window.on('scroll',function(){
				var $offsetTop = $('body').scrollTop();
				if($offsetTop>100){
					self.tpl.$gottotop.show();
				}else{
					self.tpl.$gottotop.hide();
				}
			})

			tpl.$gottotop.on('click', function(){
    				doms.$window.scrollTop(0);
    		});
		}
	}
	gototop.init();
})(jQuery)