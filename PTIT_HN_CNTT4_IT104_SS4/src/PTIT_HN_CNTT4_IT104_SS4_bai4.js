"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//nhan 1 tso la input co the la string hoac number(UNION TYPE)
function handleUnionType(input) {
    //ktra xem du lieu input co ph string hay ko = sdung toan tu typeof
    if (typeof input === 'string') {
        //string la chuoi, nen la ph o trong ngoac
        //dem so luong ky tu trong chuoi
        //neu input la chuoi thi tra ve do dai(sl ky tu chuoi va kqua da dc gan)
        const wordCount = input.length;
        console.log(`output:${wordCount} ky tu`);
    }
    else if (typeof input === 'number') {
        if (input % 2 === 0) {
            console.log("day la so chan");
        }
        else {
            console.log(" so le");
        }
    }
}
handleUnionType("123");
handleUnionType(9);
//# sourceMappingURL=PTIT_HN_CNTT4_IT104_SS4_bai4.js.map