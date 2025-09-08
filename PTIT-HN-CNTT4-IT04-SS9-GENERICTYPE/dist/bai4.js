// Hàm generic withDefault
function withDefault(value) {
    // Nếu không có value => trả về "default" (ép kiểu T)
    if (value === undefined) {
        return "default";
    }
    // Nếu có value => trả về chính nó
    return value;
}
console.log(withDefault());
console.log(withDefault(42));
console.log(withDefault(true));
console.log(withDefault({ a: 1 }));
