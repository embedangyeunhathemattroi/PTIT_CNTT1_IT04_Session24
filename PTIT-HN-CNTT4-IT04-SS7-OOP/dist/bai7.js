class Account {
    constructor(accountNumber, balance = 0, history = [], status = true) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.history = history;
        this.status = status;
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
        console.log("Lịch sử giao dịch:");
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
            const availableWithdrawal = Math.min(amount, this.balance);
            this.balance -= availableWithdrawal;
            this.history.push(`Rút tiền: -${availableWithdrawal}`);
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
const savingAccount = new SavingAccount("123456789", 0.05);
savingAccount.deposit(1000);
savingAccount.withdraw(500);
savingAccount.withdraw(600);
savingAccount.showHistory();
savingAccount.addInterest();
savingAccount.showHistory();
