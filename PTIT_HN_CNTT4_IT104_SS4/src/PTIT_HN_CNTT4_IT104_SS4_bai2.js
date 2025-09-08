"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function caculator(score) {
    if (!Array.isArray(score) || score.length === 0) {
        return 0;
    }
    let sum = 0;
    for (let i = 0; i < score.length; i++) {
        if (typeof score[i] !== 'number') {
            return 0;
        }
        sum += score[i];
    }
    return sum / score.length;
}
const score = [8.5, 7.2, 9.0, 6.8, 7.5, 8.0, 6.9, 9.2, 7.8, 8.3];
const averageScore = caculator(score);
console.log(score);
console.log(`diem trung binh la ${averageScore}`);
//# sourceMappingURL=PTIT_HN_CNTT4_IT104_SS4_bai2.js.map