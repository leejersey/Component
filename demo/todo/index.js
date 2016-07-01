var Todolist =(function(){
	function Todo(){

	}

	Todo.prototype={
		init:function(){
			console.log('init');
			this.getDoms();
			this.bindEvt();
		},
		getDoms:function(){
			this.doms={
				$todoInput : $('.todo-input').find('input')
			}
		},
		bindEvt:function(){
			var _this = this;
			var doms= this.doms;
			doms.$todoInput.on('keyup',function(e){
				if($.trim($(this).val())===''){
					return;
				}

				if(e.metaKey !== 13){
					return;
				}

				_this.add();

			})
		},
		add:function(){
			console.log('add');
		}
	}

	return new Todo();
})(); 