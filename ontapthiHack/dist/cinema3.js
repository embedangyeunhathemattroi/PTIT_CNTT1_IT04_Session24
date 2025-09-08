// ==============================
// HỆ THỐNG RẠP PHIM (TYPECRIPT)
// - Dựa trên đề bài tổng hợp (Account, userAcc, adminAcc, Saving/Checking -> Wallet/Credit)
// - Chức năng: đăng nhập/logout, nạp tiền, mua vé (rút), lịch sử, admin khóa user
// ==============================
// ------------------------------
// Lớp Account (lớp cha chung)
// ------------------------------
class Account {
    constructor(id, userName, password, membershipNumber, role = "account") {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.isLogin = false;
        this.role = role;
        this.membershipNumber = membershipNumber;
        this.balance = 0;
        this.history = [];
        this.status = "active";
    }
    // Đăng nhập (có thể ghi đè)
    login(password) {
        if (this.password === password) {
            this.isLogin = true;
            console.log(`[${this.userName}] Đăng nhập thành công.`);
        }
        else {
            console.log(`[${this.userName}] Sai mật khẩu.`);
        }
    }
    // Đăng xuất
    logout() {
        if (this.isLogin) {
            this.isLogin = false;
            console.log(`[${this.userName}] Đã đăng xuất.`);
        }
    }
    // Nạp tiền vào tài khoản
    deposit(amount) {
        if (amount <= 0) {
            console.log("Số tiền nạp phải lớn hơn 0.");
            return;
        }
        this.balance += amount;
        this.history.push(`Deposit: +${amount}`);
        console.log(`[${this.membershipNumber}] Nạp ${amount}. Số dư hiện tại: ${this.balance}.`);
    }
    // Rút tiền / tiêu tiền (mua vé ...) - lớp con thường sẽ override
    withdraw(amount) {
        if (amount <= 0) {
            console.log("Số tiền rút phải lớn hơn 0.");
            return;
        }
        if (amount <= this.balance) {
            this.balance -= amount;
            this.history.push(`Withdraw: -${amount}`);
            console.log(`[${this.membershipNumber}] Đã trừ ${amount}. Số dư: ${this.balance}.`);
        }
        else {
            console.log(`[${this.membershipNumber}] Số dư không đủ để trừ ${amount}.`);
        }
    }
    // Hiển thị lịch sử giao dịch
    showHistory() {
        console.log(`--- Lịch sử ${this.membershipNumber} (${this.userName}) ---`);
        if (this.history.length === 0) {
            console.log("Chưa có giao dịch nào.");
            return;
        }
        this.history.forEach((h, idx) => console.log(`${idx + 1}. ${h}`));
    }
    // Lấy số dư (dùng để hiển thị)
    getBalance() {
        return this.balance;
    }
    // Trạng thái tài khoản
    setStatus(newStatus) {
        this.status = newStatus;
    }
    getStatus() {
        return this.status;
    }
}
// ------------------------------
// Lớp userAcc (lớp con của Account)
// - Dùng để mô phỏng người dùng (khách hàng rạp phim)
// ------------------------------
class userAcc extends Account {
    constructor(id, userName, password, membershipNumber, userStatus = "active") {
        super(id, userName, password, membershipNumber, "user");
        this.userStatus = userStatus;
        this.status = userStatus; // đồng bộ trạng thái bảo mật
    }
    // Ghi đè login: nếu user bị banned thì không cho đăng nhập
    login(password) {
        if (this.userStatus === "banned") {
            console.log(`[${this.userName}] Tài khoản đã bị khóa. Không thể đăng nhập.`);
            return;
        }
        super.login(password);
    }
    // Khi bị ban, cập nhật cả status trong lớp cha
    ban() {
        this.userStatus = "banned";
        this.setStatus("banned");
    }
    activate() {
        this.userStatus = "active";
        this.setStatus("active");
    }
}
// ------------------------------
// Lớp adminAcc (lớp con của Account)
// - Admin có thể ban user
// ------------------------------
class adminAcc extends Account {
    constructor(id, userName, password, membershipNumber) {
        super(id, userName, password, membershipNumber, "admin");
    }
    // Ban 1 userAcc
    banUser(user) {
        user.ban();
        console.log(`[Admin ${this.userName}] Đã khóa tài khoản người dùng ${user.userName}.`);
    }
    // Mở khóa user
    unbanUser(user) {
        user.activate();
        console.log(`[Admin ${this.userName}] Đã mở khóa tài khoản người dùng ${user.userName}.`);
    }
}
// ------------------------------
// Lớp WalletAccount (tương tự SavingAccount)
// - Không cho số dư âm: khi mua vé chỉ trừ tối đa bằng số dư hiện có
// ------------------------------
class WalletAccount extends Account {
    constructor(id, userName, password, membershipNumber, membershipTier = "standard") {
        super(id, userName, password, membershipNumber, "account");
        this.membershipTier = membershipTier;
    }
    // Mua vé: nếu tiền không đủ -> chỉ cho rút tối đa là số dư (hoặc từ chối, tùy chọn)
    withdraw(amount) {
        if (amount <= this.getBalance()) {
            // đủ tiền
            super.withdraw(amount);
            this.history.push(`PurchaseTicket: -${amount}`);
            console.log(`[${this.membershipNumber}] Mua vé thành công: -${amount}.`);
        }
        else if (this.getBalance() > 0) {
            // rút toàn bộ số dư (nếu muốn cho phép rút hết)
            const available = this.getBalance();
            // trừ hết
            // we call parent withdraw with available
            super.withdraw(available);
            this.history.push(`PurchaseTicketPartial: -${available} (attempted ${amount})`);
            console.log(`[${this.membershipNumber}] Không đủ tiền, đã trừ toàn bộ số dư ${available}.`);
        }
        else {
            console.log(`[${this.membershipNumber}] Không có đủ tiền để mua vé ${amount}.`);
        }
    }
}
// ------------------------------
// Lớp CreditAccount (tương tự CheckingAccount)
// - Cho phép âm tới creditLimit (tức credit/line)
// ------------------------------
class CreditAccount extends Account {
    constructor(id, userName, password, membershipNumber, creditLimit) {
        super(id, userName, password, membershipNumber, "account");
        this.creditLimit = creditLimit;
    }
    // Cho phép rút tới âm = -creditLimit
    withdraw(amount) {
        const projected = this.getBalance() - amount;
        if (projected >= -this.creditLimit) {
            // cho phép giao dịch
            // giảm balance (có thể âm)
            // bypass parent check since it forbids overdraft
            this.balance = projected; // trực tiếp cập nhật protected thuộc tính
            this.history.push(`Withdraw (credit): -${amount}`);
            this.history.push(`CreditBalanceAfter: ${projected}`);
            console.log(`[${this.membershipNumber}] Mua vé -${amount}. Số dư sau: ${projected} (hạn mức tín dụng: ${this.creditLimit}).`);
        }
        else {
            console.log(`[${this.membershipNumber}] Vượt quá hạn mức tín dụng. Không thể mua vé ${amount}.`);
        }
    }
}
// ------------------------------
// Lớp Ticket (mô tả vé xem phim)
// ------------------------------
class Ticket {
    constructor(movieTitle, showTime, seat, price) {
        this.movieTitle = movieTitle;
        this.showTime = showTime;
        this.seat = seat;
        this.price = price;
    }
    describe() {
        return `${this.movieTitle} | ${this.showTime} | Seat: ${this.seat} | Price: ${this.price}`;
    }
}
// ------------------------------
// Lớp UserCinemaProfile
// - Liên kết 1 userAcc với nhiều tài khoản (wallet/credit)
// - Kiểm tra user status + login trước khi thao tác
// ------------------------------
class UserCinemaProfile {
    constructor(user) {
        this.user = user;
        this.accounts = [];
    }
    addAccount(acc) {
        this.accounts.push(acc);
    }
    // Kiểm tra trước khi thao tác: user phải active và đã login
    canOperate() {
        if (this.user.userStatus === "banned") {
            console.log(`[${this.user.userName}] Bị khóa. Không thể thực hiện giao dịch.`);
            return false;
        }
        if (!this.user.isLogin) {
            console.log(`[${this.user.userName}] Chưa đăng nhập. Vui lòng login trước.`);
            return false;
        }
        return true;
    }
    // Tìm tài khoản theo membershipNumber
    findAccount(membershipNumber) {
        return this.accounts.find(a => a.membershipNumber === membershipNumber);
    }
    // Mua vé bằng tài khoản cụ thể
    purchaseTicket(membershipNumber, ticket) {
        if (!this.canOperate())
            return;
        const acc = this.findAccount(membershipNumber);
        if (!acc) {
            console.log(`Không tìm thấy tài khoản ${membershipNumber} cho user ${this.user.userName}.`);
            return;
        }
        // Kiểm tra trạng thái tài khoản (account-level)
        if (acc.getStatus() === "banned") {
            console.log(`Tài khoản ${membershipNumber} đang bị khóa, không thể mua vé.`);
            return;
        }
        // Ghi log trước khi mua
        acc.history.push(`Attempt purchase: ${ticket.describe()}`);
        // Thực hiện rút (mua)
        acc.withdraw(ticket.price);
        // Nếu thành công: lưu lịch sử mua vé (Ở trên withdraw đã push history)
        console.log(`[Purchase] ${this.user.userName} mua vé: ${ticket.describe()} bằng tài khoản ${membershipNumber}.`);
    }
    // Nạp tiền vào tài khoản
    topUp(membershipNumber, amount) {
        if (!this.canOperate())
            return;
        const acc = this.findAccount(membershipNumber);
        if (!acc) {
            console.log(`Không tìm thấy tài khoản ${membershipNumber}.`);
            return;
        }
        if (acc.getStatus() === "banned") {
            console.log(`Tài khoản ${membershipNumber} đang bị khóa, không thể nạp tiền.`);
            return;
        }
        acc.deposit(amount);
    }
    // Hiển thị lịch sử tất cả accounts
    showAllHistories() {
        console.log(`\n=== Lịch sử tất cả tài khoản của user ${this.user.userName} ===`);
        this.accounts.forEach(a => a.showHistory());
    }
}
// ==============================
// ==== TEST TOÀN BỘ RẠP PHIM ====
// ==============================
console.log("\n===== TEST HỆ THỐNG RẠP PHIM =====");
// Tạo user và admin
const customer = new userAcc(1, "Minh", "pwd123", "M-1001", "active");
const admin = new adminAcc(999, "AdminHN", "adminpwd", "ADM-0001");
// Tạo 2 loại tài khoản cho user:
// - WalletAccount: không cho âm
// - CreditAccount: cho phép âm tới hạn mức (credit)
const wallet = new WalletAccount(101, "MinhWallet", "wpass", "W-1001", "standard");
const credit = new CreditAccount(102, "MinhCredit", "cpass", "C-1001", 200); // creditLimit = 200
// Liên kết user với hồ sơ cinema
const profile = new UserCinemaProfile(customer);
profile.addAccount(wallet);
profile.addAccount(credit);
// Nạp tiền vào wallet và credit
// (ghi chú: credit account cũng có balance khởi tạo = 0, có thể nạp trả nợ)
customer.login("pwd123"); // user login trước khi thao tác
profile.topUp("W-1001", 150); // wallet +150
profile.topUp("C-1001", 50); // credit +50 (giả sử nạp trả nợ)
// Tạo vé
const ticket1 = new Ticket("Spider-Man: No Way Home", "2025-08-20 19:30", "A5", 120);
const ticket2 = new Ticket("The Shawshank Redemption", "2025-08-21 20:00", "B7", 180);
// Mua vé bằng wallet (giá 120) -> đủ tiền
profile.purchaseTicket("W-1001", ticket1);
// Mua vé bằng wallet (giá 180) -> không đủ (wallet hiện còn 30), theo logic WalletAccount rút hết 30
profile.purchaseTicket("W-1001", ticket2);
// Mua vé bằng credit (giá 180) -> balance hiện 50 => projected = 50 - 180 = -130 >= -200 => OK
profile.purchaseTicket("C-1001", ticket2);
// In lịch sử
profile.showAllHistories();
// Admin khóa user
admin.login("adminpwd");
admin.banUser(customer);
// Thử mua vé khi user bị khóa
profile.purchaseTicket("C-1001", ticket1);
// Admin mở khóa user
admin.unbanUser(customer);
// User login lại và tiếp tục mua
customer.login("pwd123");
profile.purchaseTicket("C-1001", ticket1);
// In lịch sử cuối
profile.showAllHistories();
console.log("\n===== KẾT THÚC TEST =====");
