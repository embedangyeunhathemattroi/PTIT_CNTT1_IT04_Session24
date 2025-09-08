/******************************************************
 * HỆ THỐNG NGÂN HÀNG HỢP NHẤT (Đề 1 → 8)
 * - User/Admin (login, ban)
 * - Tài khoản: Saving / Checking
 * - Lịch sử giao dịch, thông báo
 * - Tính lãi
 * - Giới hạn giao dịch trong ngày
 * - Liên kết User ↔ Nhiều tài khoản
 ******************************************************/
/* =========================
   ĐỀ 2: UserAccount & Admin
   =========================*/
class UserAccount {
    constructor(id, userName, password, status = "active", role = "user") {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.isLogin = false;
        this.role = role;
        this.status = status;
    }
    // Đăng nhập: chỉ cho phép nếu chưa bị khóa và mật khẩu đúng
    login(password) {
        if (this.status === "banned") {
            console.log(`❌ Tài khoản ${this.userName} đã bị khóa.`);
            return;
        }
        if (this.password === password) {
            this.isLogin = true;
            console.log(`✅ ${this.userName} đăng nhập thành công.`);
        }
        else {
            console.log("❌ Sai mật khẩu.");
        }
    }
    // Đăng xuất
    logout() {
        if (this.isLogin) {
            this.isLogin = false;
            console.log(`👋 ${this.userName} đã đăng xuất.`);
        }
    }
}
class AdminAccount extends UserAccount {
    constructor(id, userName, password) {
        super(id, userName, password, "active", "admin");
    }
    // Khóa 1 user
    banUser(user) {
        user.status = "banned";
        console.log(`⛔ Admin ${this.userName} đã khóa người dùng ${user.userName}.`);
    }
}
/* ==========================================
   ĐỀ 3 (nền tảng) + ĐỀ 6 + ĐỀ 8: Tài khoản gốc
   - Lịch sử giao dịch
   - Thông báo
   - Giới hạn giao dịch trong ngày
   ==========================================*/
class TransactionAccount {
    constructor(accountNumber, dailyLimit) {
        this.accountNumber = accountNumber;
        this.balance = 0;
        this.history = [];
        this.notifications = [];
        this.dailyLimit = dailyLimit;
        this.dailyTotal = 0;
        this.lastTransactionDate = new Date().toDateString();
    }
    /* --------- Helpers về giới hạn ngày ---------- */
    resetDailyIfNewDay() {
        const today = new Date().toDateString();
        if (today !== this.lastTransactionDate) {
            this.dailyTotal = 0;
            this.lastTransactionDate = today;
        }
    }
    canTransactToday(amount) {
        this.resetDailyIfNewDay();
        if (this.dailyLimit == null)
            return true;
        if (this.dailyTotal + amount > this.dailyLimit) {
            const msg = `Vượt giới hạn ngày (${this.dailyLimit}) với giao dịch ${amount}.`;
            console.log(`⚠️ ${msg}`);
            this.notifications.push(`⚠️ ${msg}`);
            return false;
        }
        return true;
    }
    addToDailyTotal(amount) {
        this.dailyTotal += amount;
    }
    /* ------------- Giao dịch cơ bản -------------- */
    deposit(amount) {
        if (amount <= 0) {
            console.log("❌ Số tiền nạp phải > 0.");
            return;
        }
        if (!this.canTransactToday(amount))
            return;
        this.balance += amount;
        const entry = `Deposit: +${amount}, Balance: ${this.balance}`;
        this.history.push(entry);
        this.notifications.push(`📩 Nạp ${amount} thành công.`);
        console.log(`💰 ${entry}`);
        this.addToDailyTotal(amount);
    }
    /* ------------- Tiện ích hiển thị -------------- */
    showHistoryDetailed() {
        console.log(`\n📜 Lịch sử giao dịch [${this.accountNumber}]:`);
        this.history.forEach((entry, idx) => {
            console.log(`${idx + 1}. ${entry} - @${new Date().toLocaleString()}`);
        });
    }
    showNotifications() {
        console.log(`\n🔔 Thông báo [${this.accountNumber}]:`);
        if (this.notifications.length === 0) {
            console.log("(Không có thông báo)");
            return;
        }
        this.notifications.forEach((n) => console.log(n));
    }
    getBalance() {
        return this.balance;
    }
    getLastReport() {
        console.log(`\n🧾 Báo cáo nhanh [${this.accountNumber}] - Số dư hiện tại: ${this.balance}`);
    }
}
/* ==========================================
   ĐỀ 1 + ĐỀ 4: SavingAccount (có lãi suất)
   - Không cho âm: cho rút đến 0
   ==========================================*/
class SavingAccount extends TransactionAccount {
    constructor(accountNumber, interestRate, dailyLimit) {
        super(accountNumber, dailyLimit);
        this.interestRate = interestRate;
    }
    withdraw(amount) {
        if (amount <= 0) {
            console.log("❌ Số tiền rút phải > 0.");
            return;
        }
        if (!this.canTransactToday(amount))
            return;
        if (amount <= this.getBalance()) {
            const newBalance = this.getBalance() - amount;
            // Cập nhật balance qua "hack" nhẹ vì balance là protected ở lớp cha
            this.balance = newBalance;
            const entry = `Withdraw: -${amount}, Balance: ${newBalance}`;
            this.history.push(entry);
            this.notifications.push(`📩 Rút ${amount} thành công.`);
            console.log(`🏦 ${entry}`);
            this.addToDailyTotal(amount);
        }
        else if (this.getBalance() > 0) {
            // Rút đến 0
            const all = this.getBalance();
            this.balance = 0;
            const entry = `Withdraw all: -${all}, Balance: 0`;
            this.history.push(entry);
            this.notifications.push(`📩 Rút toàn bộ ${all} (về 0).`);
            console.log(`🏦 ${entry}`);
            this.addToDailyTotal(all);
        }
        else {
            console.log("❌ Không thể rút, số dư đã hết.");
            this.notifications.push("❌ Rút thất bại: số dư = 0.");
        }
    }
    calculateInterest() {
        return this.getBalance() * (this.interestRate / 100);
    }
}
/* ==========================================
   ĐỀ 1 + ĐỀ 4: CheckingAccount (thấu chi + lãi dương)
   - Cho âm tới overdraftLimit
   ==========================================*/
class CheckingAccount extends TransactionAccount {
    constructor(accountNumber, overdraftLimit, interestRate, dailyLimit) {
        super(accountNumber, dailyLimit);
        this.overdraftLimit = overdraftLimit;
        this.interestRate = interestRate;
    }
    withdraw(amount) {
        if (amount <= 0) {
            console.log("❌ Số tiền rút phải > 0.");
            return;
        }
        if (!this.canTransactToday(amount))
            return;
        const after = this.getBalance() - amount;
        if (after >= -this.overdraftLimit) {
            this.balance = after;
            const entry = `Withdraw: -${amount}, Balance: ${after}`;
            this.history.push(entry);
            this.notifications.push(`📩 Rút ${amount} thành công.`);
            console.log(`🏦 ${entry}`);
            this.addToDailyTotal(amount);
        }
        else {
            const msg = `Không thể rút ${amount}. Vượt quá thấu chi (${this.overdraftLimit}).`;
            console.log(`❌ ${msg}`);
            this.notifications.push(`❌ ${msg}`);
        }
    }
    calculateInterest() {
        return this.getBalance() > 0 ? this.getBalance() * (this.interestRate / 100) : 0;
    }
}
/* =====================================================
   ĐỀ 5: Liên kết User ↔ Nhiều tài khoản + Kiểm soát truy cập
   =====================================================*/
class UserBankProfile {
    constructor(user) {
        this.user = user;
        this.accounts = new Map();
    }
    addAccount(acc) {
        this.accounts.set(acc.accountNumber, acc);
        console.log(`🆕 Gắn tài khoản ${acc.accountNumber} cho user ${this.user.userName}.`);
    }
    canOperate() {
        if (this.user.status === "banned") {
            console.log(`⛔ User ${this.user.userName} bị khóa, không thể giao dịch.`);
            return false;
        }
        if (!this.user.isLogin) {
            console.log(`🔐 User ${this.user.userName} chưa đăng nhập.`);
            return false;
        }
        return true;
    }
    deposit(accountNumber, amount) {
        if (!this.canOperate())
            return;
        const acc = this.accounts.get(accountNumber);
        if (!acc) {
            console.log(`❓ Không tìm thấy tài khoản ${accountNumber}.`);
            return;
        }
        acc.deposit(amount);
    }
    withdraw(accountNumber, amount) {
        if (!this.canOperate())
            return;
        const acc = this.accounts.get(accountNumber);
        if (!acc) {
            console.log(`❓ Không tìm thấy tài khoản ${accountNumber}.`);
            return;
        }
        acc.withdraw(amount);
    }
    showAllHistories() {
        for (const acc of this.accounts.values())
            acc.showHistoryDetailed();
    }
    showAllNotifications() {
        for (const acc of this.accounts.values())
            acc.showNotifications();
    }
}
/* =====================================================
   (Tiện ích) In divider cho đẹp mắt khi chạy test
   =====================================================*/
function divider(title) {
    console.log("\n" + "─".repeat(16) + " " + title + " " + "─".repeat(16));
}
/* =====================================================
   TEST CASE TỔNG HỢP (đúng flow bạn yêu cầu)
   =====================================================*/
(function main() {
    divider("KHỞI TẠO ADMIN & USER (Đề 2)");
    const admin = new AdminAccount(99, "admin", "adminpass");
    const user = new UserAccount(1, "linh", "123456");
    divider("ĐĂNG NHẬP USER (Đề 2)");
    user.login("123456"); // đúng mật khẩu
    divider("MỞ HAI TÀI KHOẢN + GIỚI HẠN NGÀY (Đề 1,3,6,8)");
    // Saving: lãi 5%, limit/ngày = 1000
    const sa = new SavingAccount("SA-001", 5, 1000);
    // Checking: thấu chi 300, lãi dương 2%, limit/ngày = 1000
    const ca = new CheckingAccount("CA-001", 300, 2, 1000);
    divider("LIÊN KẾT USER ↔ ACCOUNT (Đề 5)");
    const profile = new UserBankProfile(user);
    profile.addAccount(sa);
    profile.addAccount(ca);
    divider("NẠP/RÚT + TÍNH LÃI (Đề 1,3,4)");
    profile.deposit("SA-001", 800); // ok
    profile.withdraw("SA-001", 300); // ok
    console.log(`💹 Lãi SA hiện tại: ${sa.calculateInterest()}`);
    profile.deposit("CA-001", 200); // ok
    profile.withdraw("CA-001", 450); // thấu chi còn trong hạn mức
    console.log(`💹 Lãi CA hiện tại: ${ca.calculateInterest()}`);
    divider("THỬ VƯỢT GIỚI HẠN NGÀY (Đề 8 + Thông báo Đề 6)");
    // Đã tiêu 800 + 300 + 200 + 450 = 1750 tổng giao dịch? (Lưu ý: limit áp dụng theo từng tài khoản)
    // Mỗi account có limit 1000/ngày riêng biệt.
    // Thử đẩy SA vượt limit:
    profile.deposit("SA-001", 300); // còn room (800+300+... việc tính limit theo acc: hiện tại SA giao dịch 800 + 300 = 1100 -> giao dịch 300 này có thể bị chặn).
    // Để minh họa rõ ràng, thử tiếp:
    profile.deposit("SA-001", 500); // chắc chắn vượt limit ngày của SA
    profile.withdraw("CA-001", 700); // CA cũng có limit 1000/ngày, thử đụng limit
    divider("XEM THÔNG BÁO & LỊCH SỬ (Đề 6 + 3)");
    profile.showAllNotifications();
    profile.showAllHistories();
    divider("ADMIN KHÓA USER (Đề 2 & 7 tinh thần phân quyền)");
    admin.banUser(user);
    divider("THỬ GIAO DỊCH SAU KHI BỊ KHÓA (Đề 5 kiểm soát)");
    profile.deposit("CA-001", 50); // bị chặn vì user bị ban
    user.logout();
    divider("BÁO CÁO NHANH CUỐI NGÀY");
    sa.getLastReport();
    ca.getLastReport();
})();
