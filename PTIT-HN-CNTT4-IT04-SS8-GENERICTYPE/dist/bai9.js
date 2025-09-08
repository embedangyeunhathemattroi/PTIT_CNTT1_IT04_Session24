function flatten(arr) {
    let result = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            // Nếu là mảng → gọi đệ quy để làm phẳng tiếp
            result = result.concat(flatten(item));
        }
        else {
            // Nếu không phải mảng → thêm vào kết quả
            result.push(item);
        }
    }
    return result;
}
const numberss = [1, [2, [3, 4], 5], 6];
console.log(flatten(numberss));
const strings = ["a", ["b", ["c", "d"], "e"], "f"];
console.log(flatten(strings));
