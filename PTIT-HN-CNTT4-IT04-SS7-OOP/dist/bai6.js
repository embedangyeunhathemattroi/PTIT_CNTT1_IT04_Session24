class Account {
    constructor(id, userName, password, role) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.isLogin = false;
    }
    login(userName, password) {
        if (this.userName === userName && this.password === password) {
            this.isLogin = true;
            console.log(`${this.userName} đăng nhập thành công`);
        }
        else {
            console.log("Sai tên đăng nhập hoặc mật khẩu");
        }
    }
    logout() {
        if (this.isLogin) {
            this.isLogin = false;
            console.log(`${this.userName} đã đăng xuất`);
        }
        else {
            console.log("Bạn chưa đăng nhập, không thể đăng xuất");
        }
    }
}
class userAcc extends Account {
    constructor(id, userName, password, role, status) {
        super(id, userName, password, role);
        this.status = status;
    }
    login(userName, password) {
        if (this.status === "banned") {
            console.log(`Tài khoản ${this.userName} đã bị khóa`);
            return;
        }
        if (this.status === "active") {
            super.login(userName, password);
        }
        else {
            console.log("Trạng thái tài khoản không hợp lệ");
        }
    }
    setStatus(newStatus) {
        this.status = newStatus;
    }
    getStatus() {
        return this.status;
    }
}
class adminAcc extends Account {
    banUser(user) {
        user.setStatus("banned");
        console.log(`Người dùng ${user["userName"]} đã bị khóa`);
    }
}
const user1 = new userAcc(1, "linh", "123", "user", "active");
const user2 = new userAcc(2, "hoang", "456", "user", "active");
const admin = new adminAcc(99, "admin", "adminpass", "admin");
user1.login("linh", "123");
admin.banUser(user1);
user1.login("linh", "123");
