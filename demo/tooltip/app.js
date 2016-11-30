var tooltips =(function($){
    
    function Tooltip(options){
        this.options = options;
        this.defaults={
                element:null,
                opacity: 0.9,
                content:'',
                size: 'medium',
                gravity: 'south',
                theme: 'dark',
                trigger: 'hover',
                animation: 'none',
                confirm: false,
                yes: 'Yes',
                no: 'No',
                finalMessage: '',
                finalMessageDuration: 1000,
                onYes: function(){},
                onNo: function(){}
            }

            options = $.extend({}, this.defaults, options);
    }

    Tooltip.prototype={
        init:function(){
            this.ele = this.options.element; 
            //this.setContent();
            this.setEvent();
        },
        show:function(){
            $('.dark-tooltip').hide();
            this.tooltip.show();
        },
        hide:function(){
            this.tooltip.hide();
        },
        toggle:function(){
            if(this.tooltip.is(':visible')){
                this.hide();
            }else{
                this.show();
            }
        },
        addAnimation:function(){

        },
        setContent:function(){
            $(this.ele).css('cursor','pointer');
            //设置内容
            if(this.options.content){
                this.content=this.options.content;
            }else if($(this.ele).data('tooltip')){
                this.content=$(this.ele).data('tooltip');
            }else{
                console.log('没有内容');
                return;
            }
            //传id
            if(this.content.charAt(0) == '#'){
                this.content = $(this.content).html();
            }

            this.tooltip =$("<ins class = 'dark-tooltip " + this.options.theme + " " + this.options.size + " " 
				+ this.options.gravity + "'><div>" + this.content + "</div><div class = 'tip'></div></ins>");

            this.tip = this.tooltip.find(".tip");

            $(this.ele).append(this.tooltip);
        },
        setPosition:function(){

        },
        setEvent:function(){
            var that = this;
            $(this.ele).each(function(i, item){
                 if(that.options.trigger == 'hover'){
                        $(item).hover(function(){
                            that.ele = item;
                            that.setContent();
                            that.show();
                        },function(){
                            that.hide();
                        })
                    }
            });           
        },
        onYes:function(){

        },
        onNo:function(){

        }
    }
    
    return {
        create:function(options){
           return new Tooltip(options).init();
        }
    };
    
})(jQuery);