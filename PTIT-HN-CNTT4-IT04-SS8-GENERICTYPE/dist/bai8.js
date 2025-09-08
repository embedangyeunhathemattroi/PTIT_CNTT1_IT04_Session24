function partialUpdate(obj, updates) {
    return Object.assign(Object.assign({}, obj), updates);
}
const person1 = { name: 'Linh', age: 20, job: 'Developer' };
const updated1 = partialUpdate(person1, { age: 31 });
console.log(updated1);
const person2 = { name: 'Linh', age: 20, job: 'Developer' };
const updated2 = partialUpdate(person2, { name: 'Ngoc', job: 'Designer' });
console.log(updated2);
