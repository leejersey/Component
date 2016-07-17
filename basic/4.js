//constructor
//new出来的实例会自动含有一个constructor属性，指向它们的构造函数。
//instanceof
//验证原型对象与实例对象之间的关系。

function Person(name,age){
	this.name = name;
	this.age = age;
}

Person.prototype.say = function(){
	console.log('我的名字是'+this.name+'我今年'+this.age+'岁');
}

var man = new Person('lee','20');
man.say();

console.log(man.constructor);
console.log(man.constructor == Person); //true

console.log(man instanceof Person);//true
console.log(man instanceof Object);//true