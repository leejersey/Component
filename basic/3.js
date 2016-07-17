//对象的字面量

var Person = {
	name:'lee',
	age:'25',
	say:function(){
		console.log('我的名字是'+this.name+'我今年'+this.age+'岁');
	}
}

Person.say();
console.log(Person);
