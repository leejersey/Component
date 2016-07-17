//isPrototypeOf()
//判断某个proptotype对象和某个实例之间的关系。
//hasOwnProperty()
//每个实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。
//in
//in运算符可以用来判断，某个实例是否含有某个属性，不管是不是本地属性。

function Person(name,age){
	this.name = name;
	this.age = age;
}

Person.prototype.say = function(){
	console.log('我的名字是'+this.name+'我今年'+this.age+'岁');
}

var man = new Person('lee','20');
man.say();

console.log(Person.prototype.isPrototypeOf(man)); //true

console.log(man.hasOwnProperty("name")); // true
console.log(man.hasOwnProperty("type")); // false

console.log("name" in man); // true
console.log("type" in man); // false