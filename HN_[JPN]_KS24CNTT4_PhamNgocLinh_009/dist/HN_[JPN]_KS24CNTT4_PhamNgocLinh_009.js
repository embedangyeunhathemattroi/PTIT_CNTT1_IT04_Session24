class Course {
    constructor(courseId, courseName, price, duration, // giờ
    students = 0) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.price = price;
        this.duration = duration;
        this.students = students;
    }
    displayCourse() {
        console.log(`#${this.courseId} | ${this.courseName} | Giá: ${this.price} | Thời lượng: ${this.duration}h | Người mua: ${this.students} | Loại: ${this.constructor.name}`);
    }
    // Mua khóa học (tăng students lên 1), trả về chuỗi hóa đơn/ngắn gọn
    getCourse(discount) {
        const appliedDiscount = Math.max(0, Math.min(100, discount !== null && discount !== void 0 ? discount : 0));
        const finalPrice = Math.round(this.price * (1 - appliedDiscount / 100));
        this.students += 1;
        return `Mua thành công: ${this.courseName}. Giá gốc: ${this.price}, Giảm: ${appliedDiscount}%, Thanh toán: ${finalPrice}`;
    }
}
class FreeCourse extends Course {
    constructor(id, name, duration) {
        super(id, name, 0, duration);
    }
    getCertificate() {
        return `Khóa ${this.courseName} (Free): Không cấp chứng chỉ.`;
    }
    getRefundPolicy() {
        return `Khóa ${this.courseName} (Free): Không có chính sách hoàn tiền.`;
    }
}
class PaidCourse extends Course {
    constructor(id, name, price, duration) {
        super(id, name, price, duration);
    }
    getCertificate() {
        return `Chứng chỉ: Hoàn thành ${this.courseName}.`;
    }
    getRefundPolicy() {
        return `Chính sách: Hoàn tiền nếu thời lượng đã học < 2 giờ (áp dụng theo đề).`;
    }
}
class User {
    constructor(id, name, email, phone) {
        this.purchasedCourses = []; // courseId[]
        this.discounts = []; // discount code[]
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    getDetails() {
        return `User #${this.id} | ${this.name} | ${this.email} | ${this.phone}`;
    }
    /**
     * Mua khóa học: tự động áp dụng mã giảm cao nhất nếu có trong tài khoản user.
     * Việc tăng students và tính tiền thực hiện qua Course.getCourse(discount)
     * Trả về chuỗi kết quả.
     */
    buyCourse(course, availableDiscounts) {
        // Lọc discount trên user rồi đối chiếu value theo danh sách hệ thống
        const myDiscountObjs = this.discounts
            .map(code => availableDiscounts.find(d => d.code === code))
            .filter((d) => Boolean(d));
        // chọn % giảm cao nhất (find + reduce)
        const bestDiscount = myDiscountObjs.reduce((acc, cur) => (cur.value > acc ? cur.value : acc), 0);
        // Gọi mua
        const result = course.getCourse(bestDiscount);
        // lưu purchasedCourses
        this.purchasedCourses.push(course.courseId);
        return result + (bestDiscount > 0 ? ` | Áp dụng mã giảm tối đa: ${bestDiscount}%` : ``);
    }
}
/**
 * ========== CourseManager ==========
 */
class CourseManager {
    constructor() {
        this.courses = [];
        this.users = [];
        this.discounts = [];
    }
    genId(prefix) {
        return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    }
    addCourse(type, courseName, coursePrice, courseDuration) {
        const id = this.genId("C");
        let c;
        if (type === "free") {
            c = new FreeCourse(id, courseName, courseDuration);
        }
        else {
            c = new PaidCourse(id, courseName, coursePrice, courseDuration);
        }
        this.courses.push(c);
        console.log(`Đã thêm khóa học:`);
        c.displayCourse();
    }
    createUser(name, email, phone) {
        // không cho trùng email
        if (this.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            console.log(`Email đã tồn tại!`);
            return;
        }
        const u = new User(this.genId("U"), name, email, phone);
        this.users.push(u);
        console.log(`Đã tạo người dùng: ${u.getDetails()}`);
    }
    createNewDiscount(discountCode, discountValue) {
        if (this.discounts.find(d => d.code === discountCode)) {
            console.log(`Mã giảm ${discountCode} đã tồn tại!`);
            return;
        }
        if (discountValue < 0 || discountValue > 100) {
            console.log(`Giá trị giảm phải trong [0, 100].`);
            return;
        }
        this.discounts.push({ code: discountCode, value: discountValue });
        console.log(`Đã tạo mã giảm: ${discountCode} - ${discountValue}%`);
    }
    findUserById(userId) {
        return this.users.find(u => u.id === userId);
    }
    findCourseById(courseId) {
        return this.courses.find(c => c.courseId === courseId);
    }
    handleBuyCourse(userId, courseId) {
        const user = this.findUserById(userId);
        const course = this.findCourseById(courseId);
        if (!user)
            return `Không tìm thấy người dùng ${userId}`;
        if (!course)
            return `Không tìm thấy khóa học ${courseId}`;
        if (user.purchasedCourses.includes(course.courseId)) {
            return `Người dùng đã mua khóa này rồi.`;
        }
        const msg = user.buyCourse(course, this.discounts);
        return msg;
    }
    /**
     * Hoàn tiền:
     * - FreeCourse: không hoàn
     * - PaidCourse: cho hoàn nếu "thời gian học dưới 2 giờ" (theo đề).
     *   Ở đây mô phỏng: nếu duration < 2 thì cho hoàn (vì không có dữ liệu "đã học bao nhiêu").
     */
    handleRefundCourse(userId, courseId) {
        const user = this.findUserById(userId);
        const course = this.findCourseById(courseId);
        if (!user)
            return `Không tìm thấy người dùng ${userId}`;
        if (!course)
            return `Không tìm thấy khóa học ${courseId}`;
        if (!user.purchasedCourses.includes(course.courseId)) {
            return `Người dùng chưa mua khóa này nên không thể hoàn.`;
        }
        if (course instanceof FreeCourse) {
            return `Khóa miễn phí không có chính sách hoàn tiền.`;
        }
        // PaidCourse
        if (course.duration < 2) {
            // Cho hoàn: giảm students, gỡ khỏi purchasedCourses
            course.students = Math.max(0, course.students - 1);
            user.purchasedCourses = user.purchasedCourses.filter(id => id !== course.courseId);
            // (Do đề không yêu cầu lưu/bù tiền thật, chỉ trả thông báo)
            return `Đã hoàn tiền khóa ${course.courseName} cho người dùng ${user.name}.`;
        }
        else {
            return `Không đáp ứng điều kiện hoàn tiền (< 2 giờ).`;
        }
    }
    /**
     * Hiển thị toàn bộ khóa học; nếu truyền numOfStudents, lọc theo số người mua >= numOfStudents
     * Yêu cầu: Sử dụng map kết hợp filter
     */
    listCourses(numOfStudents) {
        const filtered = (numOfStudents == null)
            ? this.courses
            : this.courses.filter(c => c.students >= numOfStudents);
        // map để in chuỗi
        filtered
            .map(c => `#${c.courseId} | ${c.courseName} | Giá: ${c.price} | ${c.duration}h | Mua: ${c.students} | ${c.constructor.name}`)
            .forEach(line => console.log(line));
        if (filtered.length === 0)
            console.log("(Không có khóa học phù hợp)");
    }
    /**
     * Sử dụng find
     */
    showUserInformation(email) {
        const u = this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
        if (!u) {
            console.log(`Không tìm thấy user với email ${email}`);
            return;
        }
        console.log(u.getDetails());
        console.log(`- Khóa đã mua:`);
        if (u.purchasedCourses.length === 0) {
            console.log("  (chưa mua)");
        }
        else {
            u.purchasedCourses.forEach(id => {
                const c = this.courses.find(cc => cc.courseId === id);
                console.log(`  • ${c ? c.courseName : id}`);
            });
        }
        console.log(`- Mã giảm giá: ${u.discounts.length ? u.discounts.join(", ") : "(không có)"}`);
    }
    /**
     * Sử dụng reduce
     */
    calculateTotalRevenue() {
        // Chỉ tính các khóa có phí (PaidCourse): students * price
        const total = this.courses.reduce((sum, c) => {
            if (c instanceof PaidCourse) {
                return sum + c.students * c.price;
            }
            return sum;
        }, 0);
        return total;
    }
    /**
     * Sử dụng find
     */
    giftDiscount(userId, discountCode) {
        const user = this.findUserById(userId);
        if (!user) {
            console.log(`Không tìm thấy người dùng ${userId}`);
            return;
        }
        const d = this.discounts.find(dd => dd.code === discountCode);
        if (!d) {
            console.log(`Không tồn tại mã giảm ${discountCode} trong hệ thống.`);
            return;
        }
        if (!user.discounts.includes(discountCode)) {
            user.discounts.push(discountCode);
        }
        console.log(`Đã tặng mã ${discountCode} cho ${user.name}.`);
    }
    /**
     * Sử dụng find
     */
    getCertificate(userId) {
        const user = this.findUserById(userId);
        if (!user) {
            console.log(`Không tìm thấy người dùng ${userId}`);
            return;
        }
        console.log(`Chứng chỉ của ${user.name}:`);
        const owned = user.purchasedCourses
            .map(id => this.courses.find(c => c.courseId === id))
            .filter((c) => Boolean(c));
        let count = 0;
        owned.forEach(c => {
            const cert = c.getCertificate();
            // Chỉ coi là chứng chỉ thực khi là PaidCourse
            if (c instanceof PaidCourse) {
                console.log(` • ${cert}`);
                count++;
            }
        });
        if (count === 0)
            console.log("(Không có chứng chỉ nào hoặc chỉ học khóa miễn phí)");
    }
    /**
     * Sử dụng find
     */
    getRefundPolicy(courseId) {
        const c = this.findCourseById(courseId);
        if (!c) {
            console.log(`Không tìm thấy khóa học ${courseId}`);
            return;
        }
        console.log(c.getRefundPolicy());
    }
    /**
     * Tiện ích hiển thị nhanh: người dùng & khóa học
     */
    listUsers() {
        if (this.users.length === 0)
            return console.log("(Chưa có user)");
        this.users.forEach(u => console.log(`${u.getDetails()} | Discounts: [${u.discounts.join(", ")}]`));
    }
    listAllCoursesRaw() {
        if (this.courses.length === 0)
            return console.log("(Chưa có khóa)");
        this.courses.forEach(c => c.displayCourse());
    }
}
/**
 * ========== CLI ==========
 */
const manager = new CourseManager();
// Seed nhẹ để test nhanh (có thể xóa nếu không muốn)
(function seed() {
    manager.createUser("Nguyen Van A", "a@example.com", "0900000001");
    manager.createUser("Tran Thi B", "b@example.com", "0900000002");
    manager.addCourse("free", "TypeScript Basics", 0, 1.5);
    manager.addCourse("paid", "Node.js Masterclass", 1000000, 20);
    manager.addCourse("paid", "React Pro", 1200000, 1.5);
    manager.createNewDiscount("WELCOME10", 10);
    manager.createNewDiscount("SUPER30", 30);
})();
function pause() {
    rl.question("\nNhấn Enter để tiếp tục...");
}
function inputNumber(prompt) {
    while (true) {
        const s = rl.question(prompt);
        const n = Number(s);
        if (!Number.isNaN(n))
            return n;
        console.log("Vui lòng nhập số hợp lệ!");
    }
}
function mainMenu() {
    let running = true;
    while (running) {
        console.log("\n=== HỆ THỐNG QUẢN LÝ KHÓA HỌC ONLINE (MÃ ĐỀ 009) ===");
        console.log("1. Thêm người dùng. (10đ)");
        console.log("2. Thêm khóa học. (10đ)");
        console.log("3. Thêm mã giảm giá. (5đ)");
        console.log("4. Mua khóa học. (10đ)");
        console.log("5. Hoàn tiền khóa học. (10đ)");
        console.log("6. Hiển thị danh sách khóa học (map + filter). (10đ)");
        console.log("7. Hiển thị thông tin người dùng (find). (10đ)");
        console.log("8. Tính tổng doanh thu (reduce). (10đ)");
        console.log("9. Tặng mã giảm giá (find). (10đ)");
        console.log("10. Hiển thị toàn bộ chứng chỉ của người dùng (find). (5đ)");
        console.log("11. Hiển thị chính sách hoàn tiền (find). (5đ)");
        console.log("12. Thoát chương trình. (5đ)");
        const choice = rl.question("Chon: ").trim();
        switch (choice) {
            case "1": {
                const name = rl.question("Tên: ");
                const email = rl.question("Email: ");
                const phone = rl.question("SĐT: ");
                manager.createUser(name, email, phone);
                pause();
                break;
            }
            case "2": {
                const typeRaw = rl.question('Loại khóa học ("free" | "paid"): ').trim().toLowerCase();
                if (typeRaw !== "free" && typeRaw !== "paid") {
                    console.log("Loại không hợp lệ!");
                    pause();
                    break;
                }
                const name = rl.question("Tên khóa học: ");
                let price = 0;
                if (typeRaw === "paid") {
                    price = inputNumber("Giá (VND): ");
                }
                const duration = inputNumber("Thời lượng (giờ): ");
                manager.addCourse(typeRaw, name, price, duration);
                pause();
                break;
            }
            case "3": {
                const code = rl.question("Mã giảm giá: ").toUpperCase().trim();
                const val = inputNumber("Giá trị giảm (%): ");
                manager.createNewDiscount(code, val);
                pause();
                break;
            }
            case "4": {
                console.log("\n-- Danh sách người dùng --");
                manager.listUsers();
                const uid = rl.question("Nhập userId: ").trim();
                console.log("\n-- Danh sách khóa học --");
                manager.listAllCoursesRaw();
                const cid = rl.question("Nhập courseId: ").trim();
                const msg = manager.handleBuyCourse(uid, cid);
                console.log(msg);
                pause();
                break;
            }
            case "5": {
                console.log("\n-- Danh sách người dùng --");
                manager.listUsers();
                const uid = rl.question("Nhập userId: ").trim();
                console.log("\n-- Danh sách khóa học --");
                manager.listAllCoursesRaw();
                const cid = rl.question("Nhập courseId: ").trim();
                const msg = manager.handleRefundCourse(uid, cid);
                console.log(msg);
                pause();
                break;
            }
            case "6": {
                const filterStr = rl.question("Lọc theo số người mua tối thiểu? (bỏ trống để hiển thị tất cả): ").trim();
                if (filterStr === "") {
                    manager.listCourses();
                }
                else {
                    const n = Number(filterStr);
                    if (Number.isNaN(n)) {
                        console.log("Giá trị lọc không hợp lệ.");
                    }
                    else {
                        manager.listCourses(n);
                    }
                }
                pause();
                break;
            }
            case "7": {
                const email = rl.question("Nhập email người dùng: ");
                manager.showUserInformation(email);
                pause();
                break;
            }
            case "8": {
                const total = manager.calculateTotalRevenue();
                console.log(`Tổng doanh thu (chỉ khóa trả phí): ${total} VND`);
                pause();
                break;
            }
            case "9": {
                console.log("\n-- Danh sách người dùng --");
                manager.listUsers();
                const uid = rl.question("Nhập userId: ").trim();
                console.log("\n-- Danh sách mã giảm giá --");
                console.log(manager.discounts.length ? manager.discounts.map(d => `${d.code}(${d.value}%)`).join(", ") : "(Chưa có mã)");
                const code = rl.question("Nhập mã giảm giá: ").toUpperCase().trim();
                manager.giftDiscount(uid, code);
                pause();
                break;
            }
            case "10": {
                console.log("\n-- Danh sách người dùng --");
                manager.listUsers();
                const uid = rl.question("Nhập userId: ").trim();
                manager.getCertificate(uid);
                pause();
                break;
            }
            case "11": {
                console.log("\n-- Danh sách khóa học --");
                manager.listAllCoursesRaw();
                const cid = rl.question("Nhập courseId: ").trim();
                manager.getRefundPolicy(cid);
                pause();
                break;
            }
            case "12": {
                running = false;
                console.log("Thoát chương trình. Tạm biệt!");
                break;
            }
            default:
                console.log("Lựa chọn không hợp lệ!");
                pause();
        }
    }
}
mainMenu();
