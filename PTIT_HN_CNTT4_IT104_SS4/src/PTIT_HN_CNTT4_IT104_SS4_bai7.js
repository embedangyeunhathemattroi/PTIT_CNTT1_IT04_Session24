"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function processInpuy(input) {
    if (typeof input === 'string') {
        if (/^\d +$/.test(input)) {
            const number = parseInt(input, 10);
            console.log(number * number);
        }
        else {
            const letter = input.replace(/[^a -zA-z]/g, '');
            console.log(`${letter.length} ky tu chu cai`);
        }
    }
    else if (typeof input === 'number') {
        if (isPrime(input)) {
            console.log("la so nguyen to");
        }
        else {
            console.log("koph so nguyen to ");
        }
    }
    else if (typeof input === 'boolean') {
        if (input) {
            console.log("gtri la true- tien hanh xu ly");
        }
        else {
            console.log("gia tri false- dung xu ly");
        }
    }
}
function isPrime(number) {
    if (number <= 1)
        return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0)
            return false;
    }
    return true;
}
//# sourceMappingURL=PTIT_HN_CNTT4_IT104_SS4_bai7.js.map