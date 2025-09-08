"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 2. Hàm tính tổng đơn hàng
function calculateOrderTotal(order) {
    return order.items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);
}
// 3. Hàm in đơn hàng
function printOrder(order) {
    console.log(`Đơn hàng: #${order.orderId}`);
    console.log(`Khách hàng: ${order.customerName}`);
    console.log(`Sản phẩm:`);
    order.items.forEach(item => {
        const name = item.product.name;
        const quantity = item.quantity;
        const total = item.product.price * item.quantity;
        console.log(`- ${name} × ${quantity} → ${total.toLocaleString()} VND`);
    });
    const totalAmount = calculateOrderTotal(order);
    console.log(`Tổng cộng: ${totalAmount.toLocaleString()} VND`);
    if (order.note) {
        console.log(`Ghi chú: ${order.note}`);
    }
}
// 4. Dữ liệu mẫu
const shirt = {
    id: "P001",
    name: "Áo sơ mi",
    price: 250000,
};
const trousers = {
    id: "P002",
    name: "Quần tây",
    price: 400000,
};
const order = {
    orderId: "ORD001",
    customerName: "Nguyễn Văn A",
    items: [
        { product: shirt, quantity: 2 },
        { product: trousers, quantity: 1 },
    ],
    note: "Giao sau 18h",
};
// 5. Gọi hàm test
printOrder(order);
//# sourceMappingURL=PTIT_HN_CNTT4_IT104_SS4_bai8.js.map