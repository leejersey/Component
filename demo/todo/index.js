(function($){
var Utils = {
		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},
		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		},
		store: function (namespace, data) {
			if (arguments.length > 1) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			} else {
				var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];
			}
		}
	};

	var App={
		//初始化
		init:function(){
			this.ENTER_KEY = 13;
			this.todos = [];//把每一条消息放到数组中
			this.cacheElements();
			this.bindEvents();
			this.render();
		},
		//获取jquery对象
		cacheElements:function(){
			//this.todoTemplate = this.getTodoTemplate();
			this.$todoApp = $('#todoapp');
			this.$header = this.$todoApp.find('#header');
			this.$main = this.$todoApp.find('#main');
			this.$footer = this.$todoApp.find('#footer');
			this.$newTodo = this.$header.find('#new-todo');
			this.$toggleAll = this.$main.find('#toggle-all');
			this.$todoList = this.$main.find('#todo-list');
			this.$count = this.$footer.find('#todo-count');
			this.$clearBtn = this.$footer.find('#clear-completed');
		},
		//获取单个list模板
		getTodoTemplate:function(data){
			var tpl = [
				'{{#this}}',
				'<li {{#if completed}}class="completed"{{/if}} data-id="{{id}}">',
					'<div class="view">',
						'<input class="toggle" type="checkbox" {{#if completed}}checked{{/if}}>',
						'<label>{{title}}</label>',
						'<button class="destroy"></button>',
					'</div>',
					'<input class="edit" value="{{title}}">',
				'</li>',
				'{{/this}}'
			].join('');
			var template = Handlebars.compile(tpl);
			var html = template(data);
			return html;
		},
		//获取底部模板
		getFootTemlate:function(data){
			var tpl = [
				'<span id="todo-count"><strong>{{activeTodoCount}}</strong> {{activeTodoWord}} left</span>',
				'{{#if completedTodos}}<button id="clear-completed">Clear completed ({{completedTodos}})</button>{{/if}}'
			].join('');
			var template = Handlebars.compile(tpl);
			var html = template(data);
			return html;
		},
		//绑定事件
		bindEvents:function(){
			this.$newTodo.on('keyup',this.create);
			this.$todoList.on('click','.destroy',this.destroy);
			this.$toggleAll.on('click',this.toggleAll);
			this.$todoList.on('change','.toggle',this.toggle);
			this.$todoList.on('dblclick','label',this.edit);
			this.$todoList.on('keypress','.edit',this.blurOnEnter);
			this.$todoList.on('blur', '.edit', this.update);
			this.$footer.on('click','#clear-completed',this.destroyCompleted);
		},
		//渲染
		render:function(){
			this.$todoList.html(this.getTodoTemplate(this.todos));
			this.$main.toggle(!!this.todos.length);
			this.$toggleAll.prop('checked', !this.activeTodoCount());
			this.renderFooter();
			Utils.store('todos-jquery', this.todos);
		},
		//渲染底部
		renderFooter:function(){
			var todoCount = this.todos.length;
			var activeTodoCount = this.activeTodoCount();
			var footer={
				activeTodoCount: activeTodoCount,
				activeTodoWord: Utils.pluralize(activeTodoCount, 'item'),
				completedTodos: todoCount - activeTodoCount
			}
			this.$footer.toggle(!!todoCount);
			this.$footer.html(this.getFootTemlate(footer))
		},
		//选中所有
		toggleAll:function(){
			var isChecked = $(this).prop('checked');

			$.each(App.todos,function(index,val){
				val.completed = isChecked;
			})
			App.render();
		},
		//获取完成的个数
		activeTodoCount:function(){
			var count = 0;

			$.each(this.todos,function(index,val){
				if(!val.completed){
					count++;
				}
			})

			return count;
		},
		//清除完成
		destroyCompleted:function(){
			var todos = App.todos;
			var l = todos.length;

			while (l--) {
				if (todos[l].completed) {
					todos.splice(l, 1);
				}
			}

			App.render();
		},
		//选中单个
		toggle:function(){
			App.getTodo(this, function (i, val) {
				val.completed = !val.completed;
			});
			App.render();
		},
		//修改内容
		edit:function(){
			var $input = $(this).closest('li').addClass('editing').find('.edit');
			var val = $input.val();
			$input.val(val).focus();
		},
		//修改结束
		blurOnEnter:function(e){
			if (e.which === App.ENTER_KEY) {
				e.target.blur();
			}
		},
		//失去焦点后更新数据
		update:function(){
			var cval = $.trim($(this).removeClass('editing').val());

			App.getTodo(this,function(index,val){
				if(cval){
					this.todos[index].title = cval;
				}else {
					this.todos.splice(index, 1);
				}
			})
			App.render();
		},
		//获取一条list
		getTodo:function(elem,callback){
			var id = $(elem).closest('li').data('id');
			//遍历this.todos数组查找id相同的
			$.each(this.todos,function(index,val){
				if(id === val.id){
					//执行回调函数进行数组的操作
					callback.apply(App,arguments);
					return false;
				}
			})
		},
		//生成一条数据
		create:function(e){
			var $input = $(this);
			var val = $.trim($input.val());

			if(e.which !== App.ENTER_KEY || !val){
				return;
			}

			App.todos.push({
				id:Utils.uuid(),
				title:val,
				completed:false
			})

			$input.val('');
			App.render();
		},
		//删除一条数据
		destroy:function(){
			App.getTodo(this,function(index,val){
				App.todos.splice(index,1);
				App.render();
			})
		}

	}

	App.init();
	console.log(App);

})(jQuery)