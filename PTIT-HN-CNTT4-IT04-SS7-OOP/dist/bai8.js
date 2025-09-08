class Account {
    constructor(accountNumber) {
        this.accountNumber = accountNumber;
        this.balance = 0;
        this.history = [];
        this.status = true;
    }
    deposit(amount) {
        this.balance += amount;
        this.history.push(`Gửi tiền: +${amount}`);
    }
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            this.history.push(`Rút tiền: -${amount}`);
        }
        else {
            console.log("Số dư không đủ.");
        }
    }
    showHistory() {
        console.log(`\nLịch sử giao dịch của tài khoản ${this.accountNumber}:`);
        this.history.forEach((transaction) => {
            console.log(transaction);
        });
    }
}
class SavingAccount extends Account {
    constructor(accountNumber, interestRate) {
        super(accountNumber);
        this.interestRate = interestRate;
    }
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            this.history.push(`Rút tiền: -${amount}`);
        }
        else {
            console.log("Số dư không đủ.");
        }
    }
    addInterest() {
        const interest = this.balance * this.interestRate;
        this.deposit(interest);
        this.history.push(`Nhận lãi: +${interest}`);
    }
}
class CheckingAccount extends Account {
    constructor(accountNumber, overdraftLimit) {
        super(accountNumber);
        this.overdraftLimit = overdraftLimit;
    }
    withdraw(amount) {
        const maxAvailable = this.balance + this.overdraftLimit;
        if (amount <= maxAvailable) {
            this.balance -= amount;
            this.history.push(`Rút tiền: -${amount}`);
        }
        else {
            console.log("Vượt quá giới hạn thấu chi.");
        }
    }
}
const savingAccount = new SavingAccount("123456789", 0.05);
savingAccount.deposit(1000);
savingAccount.withdraw(500);
savingAccount.withdraw(600);
savingAccount.addInterest();
savingAccount.showHistory();
const checkingAccount = new CheckingAccount("987654321", 500);
checkingAccount.deposit(1000);
checkingAccount.withdraw(1200);
checkingAccount.withdraw(400);
checkingAccount.showHistory();
