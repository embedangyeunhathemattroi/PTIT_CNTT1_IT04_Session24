// =======================
// Lớp cha Account
// =======================
class Account {
    constructor(id, userName, password, role) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.isLogin = false; // Mặc định chưa đăng nhập
        this.role = role;
    }
    // Phương thức đăng nhập (có thể ghi đè ở lớp con)
    login(password) {
        if (this.password === password) {
            this.isLogin = true;
            console.log("Đăng nhập thành công!");
        }
        else {
            console.log("Sai mật khẩu!");
        }
    }
    // Phương thức đăng xuất
    logout() {
        if (this.isLogin) {
            this.isLogin = false;
            console.log("Đăng xuất thành công!");
        }
    }
}
// =======================
// Lớp con userAcc
// =======================
class userAcc extends Account {
    constructor(id, userName, password, status) {
        super(id, userName, password, "user");
        this.status = status;
    }
    // Ghi đè phương thức login
    login(password) {
        if (this.status === "banned") {
            console.log("Tài khoản đã bị khóa!");
            return;
        }
        super.login(password);
    }
}
// =======================
// Lớp con adminAcc
// =======================
class adminAcc extends Account {
    constructor(id, userName, password) {
        super(id, userName, password, "admin");
    }
    // Cấm người dùng
    banUser(user) {
        user.status = "banned";
        console.log(`Người dùng ${user.userName} đã bị khóa!`);
    }
}
// ====== Test ======
let user1 = new userAcc(1, "Linh", "123", "active");
let admin1 = new adminAcc(99, "Admin", "admin123");
user1.login("123"); // Đăng nhập thành công
user1.logout(); // Đăng xuất thành công
admin1.banUser(user1); // Khóa tài khoản
user1.login("123"); // Tài khoản đã bị khóa
