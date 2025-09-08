function createObject(keys, values) {
    const result = {};
    keys.forEach((key, index) => {
        result[key] = values[index];
    });
    return result;
}
const keys = ['name', 'age', 'email'];
const values = ['Linh ', 20, 'linh@example.com'];
const person = createObject(keys, values);
console.log(person);
