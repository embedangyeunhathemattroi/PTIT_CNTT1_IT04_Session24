function findElement(arr, value) {
    return arr.find(item => item === value);
}
const numbers = [1, 3, 5, 7, 9];
console.log(findElement(numbers, 5));
console.log(findElement(numbers, 10));
const fruits = ["apple", "banana", "cherry"];
console.log(findElement(fruits, "banana"));
console.log(findElement(fruits, "orange"));
