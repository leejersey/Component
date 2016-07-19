var Todolist =(function(){
	function Todo(){

	}

	Todo.prototype={
		init:function(){
			this.getDoms();
			this.bindEvt();
		},
		getDoms:function(){
			this.doms={
				$todoInput : $('.todo-input').find('input'),
				$todoitems : $('.todo-items')
			}
		},
		bindEvt:function(){
			var _this = this;
			var doms= this.doms;
			doms.$todoInput.on('keyup',function(e){

				if($.trim($(this).val())===''){
					return;
				}

				if(e.which !== 13){
					return;
				}

				_this.add($(this).val(),_this);

				$(this).val('');

			})
		},
		add:function(text){
			new TodoItem(text,this);
		},
		remove:function($domitem){
			var doms = this.doms;
			console.log($domitem);
			$domitem.remove();
		}
	}

	function TodoItem(text,app){
		this.app = app;
		this.text=text;
		this.init();
	}

	TodoItem.prototype={
		init:function(){
			this.getDoms();
			this.render();
			this.bindEvt();
		},
		getDoms:function(){
			this.doms={
				$todoitems : $('.todo-items'),
				$delete : $('.delete')
			}
		},
		render:function(){
			var doms = this.doms;
			var tpl = [
				'<li class="todo-item">',
					'<div class="status"></div>',
					'<span class="item-text">'+this.text+'</span>',
					'<div class="delete"></div>',
				'</li>'
			].join('');	
			doms.$todoitems.prepend($(tpl));
			this.tpl = tpl;
		},
		bindEvt:function(){
			var doms = this.doms,
				_this = this;

			//删除
			doms.$todoitems.on('click','.delete',function(){
				_this.app.remove($(_this.tpl));
			}) 
			
		}


	}

	return new Todo();
})(); 