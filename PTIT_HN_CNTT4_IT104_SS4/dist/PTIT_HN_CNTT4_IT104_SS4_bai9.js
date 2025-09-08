function tinhTongTienHoaDon(hoaDon) {
    var _a;
    let tong = 0;
    for (const hang of hoaDon.danhSachHang) {
        const giamGia = (_a = hang.chietKhauPhanTram) !== null && _a !== void 0 ? _a : 0; //gan mac dinh neu la null/underfined
        const thanhTien = hang.sanPham.gia * hang.soLuong * (1 - giamGia / 100);
        tong += thanhTien;
    }
    return tong;
}
function tinhConNo(hoaDon, bienLai) {
    const tong = tinhTongTienHoaDon(hoaDon);
    return tong - bienLai.daThanhToan;
}
function inThongTinHoaDon(hoaDon) {
    var _a;
    console.log(`\nHÓA ĐƠN: #${hoaDon.maHoaDon} - Ngày tạo: ${hoaDon.ngayTao}`);
    console.log(`KHÁCH HÀNG: #${hoaDon.maKhachHang} - ${hoaDon.tenKhachHang}`);
    console.log(`Sản phẩm:`);
    for (const hang of hoaDon.danhSachHang) {
        const giam = hang.chietKhauPhanTram ? ` (Giảm ${hang.chietKhauPhanTram}%)` : '';
        const thanhTien = hang.sanPham.gia * hang.soLuong * (1 - ((_a = hang.chietKhauPhanTram) !== null && _a !== void 0 ? _a : 0) / 100);
        console.log(`- ${hang.sanPham.ten} × ${hang.soLuong} → ${thanhTien.toLocaleString()} VND${giam}`);
    }
    const tong = tinhTongTienHoaDon(hoaDon);
    console.log(`Tổng cộng: ${tong.toLocaleString()} VND`);
}
function inBienLai(hds, bienLais) {
    let tongConNo = 0;
    for (const hd of hds) {
        const bl = bienLais.find(b => b.maHoaDon === hd.maHoaDon);
        if (!bl)
            continue;
        inThongTinHoaDon(hd);
        const conNo = tinhConNo(hd, bl);
        console.log(`Trả trước: ${bl.daThanhToan.toLocaleString()} VND`);
        console.log(`Còn lại: ${conNo.toLocaleString()} VND`);
        console.log("=".repeat(40));
        tongConNo += conNo;
    }
    console.log(`\n➤ Tổng cộng chưa thanh toán: ${tongConNo.toLocaleString()} VND`);
}
const aoSoMi = {
    id: "SP01",
    ten: "Áo sơ mi",
    gia: 250000
};
const quanTay = {
    id: "SP02",
    ten: "Quần tây",
    gia: 400000
};
const hoaDon1 = {
    maHoaDon: "HD001",
    maKhachHang: "KH001",
    tenKhachHang: "Nguyễn Văn A",
    ngayTao: "2025-08-07",
    danhSachHang: [
        { sanPham: aoSoMi, soLuong: 2 },
        { sanPham: quanTay, soLuong: 1 }
    ]
};
const hoaDon2 = {
    maHoaDon: "HD002",
    maKhachHang: "KH002",
    tenKhachHang: "Trần Thị B",
    ngayTao: "2025-08-07",
    danhSachHang: [
        { sanPham: quanTay, soLuong: 1, chietKhauPhanTram: 10 }
    ]
};
const bienLaiDanhSach = [
    { maHoaDon: "HD001", daThanhToan: 500000 },
    { maHoaDon: "HD002", daThanhToan: 300000 }
];
// 7. Gọi hàm chính
inBienLai([hoaDon1, hoaDon2], bienLaiDanhSach);
