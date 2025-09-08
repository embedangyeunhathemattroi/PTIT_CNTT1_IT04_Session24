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
        this.isLogin = false;
    }

    public login(userName: string, password: string): void {
        if (this.userName === userName && this.password === password) {
            this.isLogin = true;
            console.log(`${this.userName} đăng nhập thành công`);
        } else {
            console.log("Sai tên đăng nhập hoặc mật khẩu");
        }
    }

    public logout(): void {
        if (this.isLogin) {
            this.isLogin = false;
            console.log(`${this.userName} đã đăng xuất`);
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
            console.log(`Tài khoản ${this.userName} đã bị khóa`);
            return;
        }
        if (this.status === "active") {
            super.login(userName, password);
        } else {
            console.log("Trạng thái tài khoản không hợp lệ");
        }
    }

    public setStatus(newStatus: string): void {
        this.status = newStatus;
    }

    public getStatus(): string {
        return this.status;
    }
}

class adminAcc extends Account {
    public banUser(user: userAcc): void {
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
