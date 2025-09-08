
abstract class Job {
    type: string;

    constructor(type: string) {
        this.type = type;
    }

    printType(): void {
        console.log(`Loại công việc: ${this.type}`);
    }
   
    abstract calculateSalary(): number;
}


class FulltimeJob extends Job {
    // Lương cố định
    private fixedSalary: number = 10000000;

    constructor() {
        super("Fulltime");
    }

    calculateSalary(): number {
        return this.fixedSalary;
    }
}


class ParttimeJob extends Job {
    // Số giờ làm việc
    workingHour: number;

    constructor(workingHour: number) {
     
        super("Parttime");
        this.workingHour = workingHour;
    }


    calculateSalary(): number {
        return this.workingHour * 30000; 
    }
}


const job1 = new FulltimeJob();  
const job2 = new ParttimeJob(80);  

// In thông tin lương
job1.printType();
console.log(`Lương: ${job1.calculateSalary().toLocaleString()} VNĐ\n`);

job2.printType();
console.log(`Lương: ${job2.calculateSalary().toLocaleString()} VNĐ`);
