function flatten(arr) {
    return arr.reduce((acc, curr) => acc.concat(curr), []);
}
const numberssss = [[1, 2], [3, 4], [5, 6]];
console.log(flatten(numberssss));
const fruitss = [['apple', 'banana'], ['cherry'], ['date', 'elderberry']];
console.log(flatten(fruitss));
