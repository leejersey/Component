//基础的面相对象

function Person(name,age){
	this.name = name;
	this.age = age;
}

Person.prototype.say = function(){
	console.log('我的名字是'+this.name+'我今年'+this.age+'岁');
}

var man = new Person('lee','20');
man.say();