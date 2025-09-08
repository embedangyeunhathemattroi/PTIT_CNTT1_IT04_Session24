// QUẢN LÝ NGÂN HÀNG
// ===== LỚP CUSTOMER (KHÁCH HÀNG) =====
class Customer {
    constructor(name, email) {
        this.id = Customer.nextId++;
        this.name = name;
        this.email = email;
    }
    getInfo() {
        return `Customer[ID=${this.id}, Name=${this.name}, Email=${this.email}]`;
    }
}
Customer.nextId = 1; // ID tự động tăng
// ===== LỚP ACCOUNT (TÀI KHOẢN) =====
class Account {
    constructor(customer, type, balance) {
        this.id = Account.nextId++;
        this.customer = customer;
        this.type = type;
        this.balance = balance;
    }
    getInfo() {
        return `Account[ID=${this.id}, Customer=${this.customer.name}, Type=${this.type}, Balance=${this.balance}]`;
    }
}
Account.nextId = 1001; // ID tài khoản bắt đầu từ 1001
// ===== LỚP BANK (NGÂN HÀNG) =====
class Bank {
    constructor() {
        this.customers = [];
        this.accounts = [];
    }
    // 1. Thêm khách hàng
    addCustomer(name, email) {
        const newCustomer = new Customer(name, email);
        this.customers.push(newCustomer);
        alert("Đã thêm khách hàng mới!");
    }
    // 2. Tạo tài khoản
    createAccount(customerId, type, initialBalance) {
        const customer = this.customers.find(c => c.id === customerId);
        if (!customer) {
            alert("Không tìm thấy khách hàng!");
            return;
        }
        const newAccount = new Account(customer, type, initialBalance);
        this.accounts.push(newAccount);
        alert("Đã tạo tài khoản thành công!");
    }
    // 3. Nạp tiền
    deposit(accountId, amount) {
        const account = this.accounts.find(a => a.id === accountId);
        if (!account) {
            alert("Không tìm thấy tài khoản");
            return;
        }
        account.balance += amount;
        alert("Nạp tiền thành công!");
    }
    // 4. Rút tiền
    withdraw(accountId, amount) {
        const account = this.accounts.find(a => a.id === accountId);
        if (!account) {
            alert("Không tìm thấy tài khoản");
            return;
        }
        if (account.balance < amount) {
            alert("Số dư không đủ!");
            return;
        }
        account.balance -= amount;
        alert("Rút tiền thành công!");
    }
    // 5. Chuyển tiền
    transfer(fromAccountId, toAccountId, amount) {
        const fromAccount = this.accounts.find(a => a.id === fromAccountId);
        const toAccount = this.accounts.find(a => a.id === toAccountId);
        if (!fromAccount || !toAccount) {
            alert("Không tìm thấy tài khoản");
            return;
        }
        if (fromAccount.balance < amount) {
            alert("Số dư tài khoản nguồn không đủ!");
            return;
        }
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        alert("Chuyển tiền thành công!");
    }
    // 6. Danh sách khách hàng
    listCustomers() {
        this.customers.forEach(c => console.log(c.getInfo()));
    }
    // 7. Danh sách tài khoản
    listAccounts() {
        this.accounts.forEach(a => console.log(a.getInfo()));
    }
    // 8. Tìm kiếm khách hàng theo tên
    findCustomerByName(keyword) {
        return this.customers.filter(c => c.name.toLowerCase().includes(keyword.toLowerCase()));
    }
    // 9. Tìm kiếm tài khoản theo ID
    findAccountById(accountId) {
        return this.accounts.find(a => a.id === accountId);
    }
    // 10. Tính tổng số dư của ngân hàng
    totalBalance() {
        return this.accounts.reduce((sum, acc) => sum + acc.balance, 0);
    }
    // 11. Cập nhật thông tin khách hàng
    updateCustomer(customerId, name, email) {
        const customer = this.customers.find(c => c.id === customerId);
        if (!customer) {
            alert("Không tìm thấy khách hàng");
            return;
        }
        customer.name = name;
        customer.email = email;
        alert("Cập nhật thông tin khách hàng thành công!");
    }
}
// ===== MENU CHÍNH =====
const bankSystem = new Bank();
function mainMenu() {
    while (true) {
        const choice = prompt(`===== MENU NGÂN HÀNG =====
1. Thêm khách hàng
2. Tạo tài khoản
3. Nạp tiền
4. Rút tiền
5. Chuyển tiền
6. Danh sách khách hàng
7. Danh sách tài khoản
8. Tìm kiếm khách hàng theo tên
9. Tìm kiếm tài khoản theo ID
10. Tính tổng số dư ngân hàng
11. Cập nhật thông tin khách hàng
12. Thoát
Chọn:`);
        if (!choice)
            break;
        switch (choice) {
            case "1":
                bankSystem.addCustomer(prompt("Nhập tên khách hàng:"), prompt("Nhập email:"));
                break;
            case "2":
                bankSystem.createAccount(parseInt(prompt("Nhập ID khách hàng:")), prompt("Loại tài khoản (Tiết kiệm/Thanh toán):"), parseFloat(prompt("Số dư ban đầu:")));
                break;
            case "3":
                bankSystem.deposit(parseInt(prompt("Nhập ID tài khoản:")), parseFloat(prompt("Số tiền nạp:")));
                break;
            case "4":
                bankSystem.withdraw(parseInt(prompt("Nhập ID tài khoản:")), parseFloat(prompt("Số tiền rút:")));
                break;
            case "5":
                bankSystem.transfer(parseInt(prompt("ID tài khoản nguồn:")), parseInt(prompt("ID tài khoản đích:")), parseFloat(prompt("Số tiền chuyển:")));
                break;
            case "6":
                bankSystem.listCustomers();
                break;
            case "7":
                bankSystem.listAccounts();
                break;
            case "8":
                const keyword = prompt("Nhập tên khách hàng tìm kiếm:");
                const results = bankSystem.findCustomerByName(keyword);
                console.log(results.map(c => c.getInfo()).join("\n"));
                break;
            case "9":
                const accId = parseInt(prompt("Nhập ID tài khoản:"));
                const acc = bankSystem.findAccountById(accId);
                alert(acc ? acc.getInfo() : "Không tìm thấy tài khoản");
                break;
            case "10":
                alert("Tổng số dư ngân hàng: " + bankSystem.totalBalance());
                break;
            case "11":
                bankSystem.updateCustomer(parseInt(prompt("Nhập ID khách hàng:")), prompt("Tên mới:"), prompt("Email mới:"));
                break;
            case "12":
                alert("Thoát chương trình");
                return;
            default:
                alert("Lựa chọn không hợp lệ");
        }
    }
}
mainMenu();
