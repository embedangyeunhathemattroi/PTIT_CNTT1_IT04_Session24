class BankAccount {
    //khoi tao cho bien 
    constructor(initBalance) {
        this.balance = initBalance; //kieu du lieu
        //bien balace rat qtrong, mk ph thong qua 1 cai do la getbance. Giau N ben trong thong qu a 1 giao dien no do 
    }
    //getter: lay ra thong tin ng dung , sudng private de k thay doi so du
    getBalance() {
        return this.balance;
    }
    //method nap tien 
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
        }
        else {
            console.log("avalid");
        }
    }
    //method-rut tien
    withdraw(amount) {
        //tien lon hon 0 nho hon so du
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
        }
        else {
            console.log("invalid withdraw amount");
        }
    }
}
//khoi tao doi tuong
const myAcount = new BankAccount(10000);
//console.log(myAcount.balace);//bao loi luon
//bat dau truy cap, lay gtri ban dau so du tai khoan
console.log("lay so du tai khoan qua get()", myAcount.getBalance());
//lam vs cac phuong thuc
myAcount.deposit(999); //naap
console.log("so du sau khi nap tien", myAcount.getBalance());
myAcount.withdraw(900); //rut ,ko dc so nho hon 0
console.log("so du sau khi rut tien", myAcount.getBalance());
