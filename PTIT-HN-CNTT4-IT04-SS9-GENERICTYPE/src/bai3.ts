// Hàm generic mergeObjects nhận 2 tham số với kiểu bất kỳ T và U
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
    // Dùng spread operator để gộp hai object
    return { ...obj1, ...obj2 };
}

const person = { name: "John" };
const job = { role: "Developer" };

const result = mergeObjects(person, job);

console.log(result); 

