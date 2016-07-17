//第二种写法
//本质上没有任何区别，只是换了种写法

var Person = function(name,age){
	this.name = name;
	this.age = age;
}

Person.prototype={
	say:function(){
		console.log('我的名字是'+this.name+'我今年'+this.age+'岁');
	}
}

var man = new Person('jersey','24');
man.say();