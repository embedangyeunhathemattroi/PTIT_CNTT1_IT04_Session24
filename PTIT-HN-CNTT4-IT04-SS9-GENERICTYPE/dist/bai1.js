function identity(value) {
    return value;
}
console.log(identity(5));
console.log(identity("hello"));
// Truyền vào object
console.log(identity({ a: 1 }));
