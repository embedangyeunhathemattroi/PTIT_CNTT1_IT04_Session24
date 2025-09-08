// Hàm generic mergeObjects nhận 2 tham số với kiểu bất kỳ T và U
function mergeObjects(obj1, obj2) {
    // Dùng spread operator để gộp hai object
    return Object.assign(Object.assign({}, obj1), obj2);
}
const person = { name: "John" };
const job = { role: "Developer" };
const result = mergeObjects(person, job);
console.log(result);
