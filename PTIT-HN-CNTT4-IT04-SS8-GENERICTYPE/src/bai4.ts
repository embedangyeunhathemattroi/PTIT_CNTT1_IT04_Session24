function mergeObject<T,U>(obj1:T,obj2:U):T & U {
    return {...obj1,...obj2};
    
}
const person={name:"linh",age:20};
const job={title:"Student",salary:100};

const merged =mergeObject(person,job);
console.log(merged);
