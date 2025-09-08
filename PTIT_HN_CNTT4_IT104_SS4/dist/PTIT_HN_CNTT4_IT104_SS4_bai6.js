// Khởi tạo một mảng listProduct gồm 3 sản phẩm mẫu
const listProduct = [
    {
        id: "1",
        name: "Áo thun nam",
        price: 100000,
        category: {
            id: "C1",
            name: "Thời trang nam",
        },
        discount: 10,
    },
    {
        id: "2",
        name: "Quần jean nữ",
        price: 200000,
        category: {
            id: "C2",
            name: "Thời trang nữ",
        },
    },
    {
        id: "3",
        name: "Giày sneaker",
        price: 300000,
        category: {
            id: "C3",
            name: "Giày dép",
        },
        discount: 20,
    },
];
// Hàm tính giá sau giảm nếu có discount, ngược lại trả lại giá gốc
function getFinalPrice(product) {
    if (product.discount) {
        return product.price * (1 - product.discount / 100);
    }
    return product.price;
}
// Hàm in ra thông tin sản phẩm
function printProductInfo(product) {
    console.log("Thông tin sản phẩm:");
    console.log(`- ID: ${product.id}`);
    console.log(`- Tên: ${product.name}`);
    console.log(`- Giá gốc: ${product.price}`);
    console.log(`- Giá sau giảm: ${getFinalPrice(product)}`);
    console.log(`- Danh mục: ${product.category.name}`);
    console.log("---");
}
// Sử dụng các hàm
listProduct.forEach((product) => {
    printProductInfo(product);
});
