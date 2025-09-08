// 2. Hàm updateUser
function updateUser(user, updates) {
    if ("id" in updates) {
        return "Id cannot be changed";
    }
    return Object.assign(Object.assign({}, user), updates);
}
const user1 = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
};
const updates1 = {
    name: "Alice Johnson",
};
console.log(updateUser(user1, updates1));
const user2 = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
};
console.log(updateUser(user2, updates1));
