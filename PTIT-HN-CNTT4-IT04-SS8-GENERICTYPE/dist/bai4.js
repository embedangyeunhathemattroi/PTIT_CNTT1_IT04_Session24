function mergeObject(obj1, obj2) {
    return Object.assign(Object.assign({}, obj1), obj2);
}
const person = { name: "linh", age: 20 };
const job = { title: "Student", salary: 100 };
const merged = mergeObject(person, job);
console.log(merged);
