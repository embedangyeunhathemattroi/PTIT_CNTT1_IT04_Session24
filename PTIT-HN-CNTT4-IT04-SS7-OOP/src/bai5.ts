class Account {
    protected id: number;
    protected userName: string;
    private password: string;
    protected role: string;
    protected isLogin: boolean;

    constructor(id: number, userName: string, password: string, role: string) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.isLogin = false; // mặc định chưa đăng nhập
    }

    public login(userName: string, password: string): void {
        if (this.userName === userName && this.password === password) {
            this.isLogin = true;
            console.log("Đăng nhập thành công");
        } else {
            console.log("Sai tên đăng nhập hoặc mật khẩu");
        }
    }

    public logout(): void {
        if (this.isLogin) {
            this.isLogin = false;
            console.log("Đăng xuất thành công");
        } else {
            console.log("Bạn chưa đăng nhập, không thể đăng xuất");
        }
    }
}

class userAcc extends Account {
    private status: string;

    constructor(id: number, userName: string, password: string, role: string, status: string) {
        super(id, userName, password, role);
        this.status = status;
    }

    public login(userName: string, password: string): void {
        if (this.status === "banned") {
            console.log("Tài khoản bị khóa");
            return;
        }
        if (this.status === "active") {
            super.login(userName, password);
        } else {
            console.log("Trạng thái tài khoản không hợp lệ");
        }
    }
}

// Test
const acc1 = new userAcc(1, "linh", "123", "user", "active");
acc1.login("linh", "123"); // Đăng nhập thành công
acc1.logout(); // Đăng xuất thành công

const acc2 = new userAcc(2, "hoang", "456", "user", "banned");
acc2.login("hoang", "456"); // Tài khoản bị khóa
