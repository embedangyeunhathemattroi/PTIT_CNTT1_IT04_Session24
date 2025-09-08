function findFirstDivisibleByTwo(arr) {
    for (let item of arr) {
        if (typeof item === "number" && item % 2 === 0) {
            return item;
        }
    }
    return undefined;
}
const numbers = [1, 3, 5, 8, 10, 12];
const result1 = findFirstDivisibleByTwo(numbers);
console.log(result1);
const mixed = ["hello", 3, 9, 12, "world"];
const result2 = findFirstDivisibleByTwo(mixed);
console.log(result2);
