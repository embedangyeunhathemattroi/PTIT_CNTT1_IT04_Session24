function filterByType(arr, types) {
    return arr.filter(item => {
        if (types.includes("null") && item === null)
            return true;
        if (types.includes("array") && Array.isArray(item))
            return true;
        return types.includes(typeof item);
    });
}
const mixedArray = [
    1,
    'hello',
    3,
    'world',
    5,
    'typescript',
    true,
    null,
    undefined,
    { name: 'Alice' },
    [1, 2, 3]
];
console.log(filterByType(mixedArray, ['number', 'string']));
console.log(filterByType(mixedArray, ['object']));
console.log(filterByType(mixedArray, ['null']));
console.log(filterByType(mixedArray, ['array']));
