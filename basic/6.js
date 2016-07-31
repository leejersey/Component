//继承
//person.call(this,arguments)
//原型继承
//Child.prototype = new Person()

//父类
function Person(name,age){
	this.name = name;
	this.age = age;
}

Person.prototype.say = function(){
	console.log('我的名字是'+this.name+'我今年'+this.age+'岁');
}

var man = new Person('lee','20');
//console.log(man);
man.say();

//子类
function Coder(name,age,tool,work){
	Person.apply(this,arguments);
	this.tool = tool;
	this.work = work;
}

//原型继承
Coder.prototype = new Person();

//改写父类方法
Coder.prototype.say = function(){
	console.log(this.name+' '+this.age+' '+this.tool+' '+this.work+'+++++++++++++');
	//Person.prototype.say.apply(this,arguments);
}

//子
Coder.prototype.write = function(){
	console.log(this.name+' '+this.age+' '+this.tool+' '+this.work+'------------');
}

var coder = new Coder('tom','28','pc','code');
coder.say();
coder.write();
//console.log(coder);