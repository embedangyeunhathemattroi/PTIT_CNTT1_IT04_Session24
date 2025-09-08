/************************************************************
 * RESORT MANAGEMENT – HỆ THỐNG QUẢN LÝ RESORT TỔNG THỂ
 * ----------------------------------------------------------
 * 1) User Management
 * 2) Hotel (Rooms)
 * 3) F&B (Restaurant)
 * 4) Tours
 * 5) Vehicles (Transportation)
 * 6) Banking (Payment)
 * 7) Pet Care
 * 8) Library (Books/Entertainment)
 * ----------------------------------------------------------
 * Tất cả được điều phối bởi ResortManagement.
 ************************************************************/

/* =========================
   1) USER MANAGEMENT
   =========================*/
class User {
  public id: number;
  public name: string;
  public contact: string;
  public isLoggedIn: boolean;

  constructor(id: number, name: string, contact: string) {
    this.id = id;
    this.name = name;
    this.contact = contact;
    this.isLoggedIn = false;
  }

  login() {
    this.isLoggedIn = true;
    console.log(`✅ User ${this.name} đã đăng nhập`);
  }

  logout() {
    this.isLoggedIn = false;
    console.log(`👋 User ${this.name} đã đăng xuất`);
  }
}

/* =========================
   6) BANKING (PAYMENTS)
   =========================*/
abstract class BankAccount {
  public accountNumber: string;
  protected balance: number;
  protected history: string[];

  constructor(accountNumber: string) {
    this.accountNumber = accountNumber;
    this.balance = 0;
    this.history = [];
  }

  deposit(amount: number) {
    if (amount <= 0) return console.log("❌ Số tiền nạp phải > 0");
    this.balance += amount;
    this.history.push(`Deposit +${amount}, Balance: ${this.balance}`);
    console.log(`💰 Nạp ${amount} vào ${this.accountNumber} (Balance: ${this.balance})`);
  }

  abstract withdraw(amount: number): boolean;

  getBalance() {
    return this.balance;
  }

  showHistory() {
    console.log(`📜 Lịch sử tài khoản ${this.accountNumber}:`);
    this.history.forEach((h, i) => console.log(`${i + 1}. ${h}`));
  }
}

class SavingAccount extends BankAccount {
  // Không cho âm
  withdraw(amount: number): boolean {
    if (amount <= 0) {
      console.log("❌ Số tiền rút phải > 0");
      return false;
    }
    if (amount > this.balance) {
      console.log("❌ Số dư không đủ (SavingAccount)");
      return false;
    }
    this.balance -= amount;
    this.history.push(`Withdraw -${amount}, Balance: ${this.balance}`);
    console.log(`🏦 Rút ${amount} từ ${this.accountNumber} (Balance: ${this.balance})`);
    return true;
  }
}

class CheckingAccount extends BankAccount {
  constructor(accountNumber: string, public overdraftLimit: number) {
    super(accountNumber);
  }

  // Cho phép âm tới overdraftLimit
  withdraw(amount: number): boolean {
    if (amount <= 0) {
      console.log("❌ Số tiền rút phải > 0");
      return false;
    }
    const after = this.balance - amount;
    if (after < -this.overdraftLimit) {
      console.log(`❌ Vượt hạn mức thấu chi ${this.overdraftLimit}`);
      return false;
    }
    this.balance = after;
    this.history.push(`Withdraw -${amount}, Balance: ${this.balance}`);
    console.log(`🏦 Rút ${amount} từ ${this.accountNumber} (Balance: ${this.balance})`);
    return true;
  }
}

/* =========================
   2) HOTEL (ROOMS)
   =========================*/
type RoomType = "Standard" | "Deluxe" | "Suite" | "Villa";

class Room {
  public isBooked: boolean = false;
  public currentUserId?: number;
  constructor(
    public roomId: number,
    public type: RoomType,
    public pricePerNight: number
  ) {}
}

/* =========================
   3) F&B (RESTAURANT)
   =========================*/
class MenuItem {
  constructor(public id: number, public name: string, public price: number) {}
}
class Order {
  public items: MenuItem[] = [];
  constructor(public orderId: number, public userId: number) {}
  addItem(item: MenuItem) {
    this.items.push(item);
  }
  getTotal(): number {
    return this.items.reduce((s, i) => s + i.price, 0);
  }
}

/* =========================
   4) TOURS
   =========================*/
class Tour {
  public bookedUserIds: number[] = [];
  constructor(
    public tourId: number,
    public destination: string,
    public price: number,
    public capacity: number
  ) {}

  book(userId: number): boolean {
    if (this.bookedUserIds.length >= this.capacity) {
      console.log("❌ Tour đã hết chỗ");
      return false;
    }
    this.bookedUserIds.push(userId);
    console.log(`✈️  Đã đặt tour ${this.destination} cho userId=${userId}`);
    return true;
  }
}

/* =========================
   5) VEHICLES (TRANSPORT)
   =========================*/
type VehicleType = "Car" | "Van" | "Bus" | "Bike";
class Vehicle {
  public isAssigned: boolean = false;
  public assignedUserId?: number;
  constructor(
    public vehicleId: number,
    public type: VehicleType,
    public capacity: number
  ) {}
}

/* =========================
   7) PET CARE
   =========================*/
type PetType = "Dog" | "Cat" | "Bird" | "Other";
class PetProfile {
  constructor(
    public petId: number,
    public userId: number,
    public name: string,
    public type: PetType,
    public healthStatus: string
  ) {}
}

/* =========================
   8) LIBRARY
   =========================*/
class Book {
  public inStock: number;
  constructor(
    public id: number,
    public title: string,
    public author: string,
    stock: number
  ) {
    this.inStock = stock;
  }
}

class BorrowRecord {
  constructor(
    public recordId: number,
    public userId: number,
    public bookId: number,
    public borrowDate: Date,
    public returnDate?: Date
  ) {}
}

/* =========================
   RESORT MANAGEMENT (ORCHESTRATOR)
   =========================*/
class ResortManagement {
  // Data stores
  private users = new Map<number, User>();
  private accounts = new Map<number, BankAccount[]>(); // userId -> accounts
  private rooms = new Map<number, Room>();
  private menu = new Map<number, MenuItem>();
  private orders = new Map<number, Order>(); // orderId -> order
  private tours = new Map<number, Tour>();
  private vehicles = new Map<number, Vehicle>();
  private pets = new Map<number, PetProfile>();
  private books = new Map<number, Book>();
  private borrowRecords = new Map<number, BorrowRecord>();

  private seq = {
    orderId: 1000,
    petId: 5000,
    recordId: 9000,
  };

  /* ---------- USER ---------- */
  addUser(u: User) {
    this.users.set(u.id, u);
    this.accounts.set(u.id, []);
    console.log(`🆕 Thêm user ${u.name} (id=${u.id})`);
  }
  getUser(userId: number) {
    return this.users.get(userId);
  }

  /* ---------- BANKING ---------- */
  openSavingAccount(userId: number, accountNumber: string): BankAccount | null {
    const u = this.getUser(userId);
    if (!u) return this.fail("User không tồn tại");
    const acc = new SavingAccount(accountNumber);
    this.accounts.get(userId)!.push(acc);
    console.log(`🏦 Mở SavingAccount ${accountNumber} cho userId=${userId}`);
    return acc;
  }

  openCheckingAccount(
    userId: number,
    accountNumber: string,
    overdraft: number
  ): BankAccount | null {
    const u = this.getUser(userId);
    if (!u) return this.fail("User không tồn tại");
    const acc = new CheckingAccount(accountNumber, overdraft);
    this.accounts.get(userId)!.push(acc);
    console.log(
      `🏦 Mở CheckingAccount ${accountNumber} (OD ${overdraft}) cho userId=${userId}`
    );
    return acc;
  }

  pay(userId: number, amount: number, prefer: "saving" | "checking" = "saving"): boolean {
    // ưu tiên trả bằng saving, nếu fail thì dùng checking
    const accs = this.accounts.get(userId);
    if (!accs || accs.length === 0) return this.fail("User chưa có tài khoản");
    const saving = accs.find((a) => a instanceof SavingAccount);
    const checking = accs.find((a) => a instanceof CheckingAccount);

    const tryWithdraw = (acc?: BankAccount) => acc ? acc.withdraw(amount) : false;

    if (prefer === "saving") {
      if (tryWithdraw(saving)) return true;
      return tryWithdraw(checking);
    } else {
      if (tryWithdraw(checking)) return true;
      return tryWithdraw(saving);
    }
  }

  /* ---------- HOTEL ---------- */
  addRoom(r: Room) {
    this.rooms.set(r.roomId, r);
  }

  bookRoom(userId: number, roomId: number, nights: number): boolean {
    const u = this.getUser(userId);
    const r = this.rooms.get(roomId);
    if (!u || !r) return this.fail("User/Room không tồn tại");
    if (r.isBooked) return this.fail("Phòng đã được đặt");
    const total = r.pricePerNight * nights;
    console.log(`🛏️  Đặt phòng #${roomId} (${r.type}) ${nights} đêm. Tổng: ${total}`);

    if (!this.pay(userId, total, "saving")) return this.fail("Thanh toán thất bại");
    r.isBooked = true;
    r.currentUserId = userId;
    console.log(`✅ Đã đặt phòng #${roomId} cho userId=${userId}`);
    return true;
  }

  checkoutRoom(userId: number, roomId: number) {
    const r = this.rooms.get(roomId);
    if (!r || !r.isBooked || r.currentUserId !== userId) return this.fail("Không thể checkout");
    r.isBooked = false;
    r.currentUserId = undefined;
    console.log(`🏁 Checkout phòng #${roomId} thành công`);
  }

  /* ---------- F&B ---------- */
  addMenuItem(item: MenuItem) {
    this.menu.set(item.id, item);
  }

  createOrder(userId: number): Order {
    const order = new Order(this.seq.orderId++, userId);
    this.orders.set(order.orderId, order);
    console.log(`🍽️  Tạo Order #${order.orderId} cho userId=${userId}`);
    return order;
  }

  addItemToOrder(orderId: number, menuItemId: number) {
    const order = this.orders.get(orderId);
    const item = this.menu.get(menuItemId);
    if (!order || !item) return this.fail("Order/Item không tồn tại");
    order.addItem(item);
    console.log(`  ➕ Thêm món ${item.name} (${item.price}) vào Order #${orderId}`);
  }

  payOrder(orderId: number): boolean {
    const order = this.orders.get(orderId);
    if (!order) return this.fail("Order không tồn tại");
    const total = order.getTotal();
    console.log(`💳 Thanh toán Order #${orderId} – Tổng: ${total}`);
    if (!this.pay(order.userId, total, "checking")) return this.fail("Thanh toán thất bại");
    console.log(`✅ Đã thanh toán Order #${orderId}`);
    return true;
  }

  /* ---------- TOURS ---------- */
  addTour(t: Tour) {
    this.tours.set(t.tourId, t);
  }

  bookTour(userId: number, tourId: number): boolean {
    const u = this.getUser(userId);
    const tour = this.tours.get(tourId);
    if (!u || !tour) return this.fail("User/Tour không tồn tại");
    if (!tour.book(userId)) return false;
    if (!this.pay(userId, tour.price, "saving")) {
      // Fail -> hủy ghế đã giữ
      tour.bookedUserIds = tour.bookedUserIds.filter((id) => id !== userId);
      return this.fail("Thanh toán tour thất bại");
    }
    console.log(`✅ Đã thanh toán tour #${tourId} cho userId=${userId}`);
    return true;
  }

  /* ---------- VEHICLES ---------- */
  addVehicle(v: Vehicle) {
    this.vehicles.set(v.vehicleId, v);
  }

  assignVehicle(userId: number, vehicleId: number): boolean {
    const v = this.vehicles.get(vehicleId);
    if (!v) return this.fail("Vehicle không tồn tại");
    if (v.isAssigned) return this.fail("Vehicle đã được sử dụng");
    v.isAssigned = true;
    v.assignedUserId = userId;
    console.log(`🚗 Gán xe #${vehicleId} (${v.type}) cho userId=${userId}`);
    return true;
  }

  returnVehicle(vehicleId: number) {
    const v = this.vehicles.get(vehicleId);
    if (!v || !v.isAssigned) return this.fail("Không thể trả xe");
    v.isAssigned = false;
    v.assignedUserId = undefined;
    console.log(`🔁 Trả xe #${vehicleId} thành công`);
  }

  /* ---------- PET CARE ---------- */
  registerPet(userId: number, name: string, type: PetType, healthStatus: string): PetProfile {
    const pet = new PetProfile(this.seq.petId++, userId, name, type, healthStatus);
    this.pets.set(pet.petId, pet);
    console.log(`🐶 Đăng ký thú cưng #${pet.petId} (${name}) cho userId=${userId}`);
    return pet;
  }

  /* ---------- LIBRARY ---------- */
  addBook(b: Book) {
    this.books.set(b.id, b);
  }

  borrowBook(userId: number, bookId: number): BorrowRecord | null {
    const book = this.books.get(bookId);
    if (!book) return this.fail("Sách không tồn tại"), null;
    if (book.inStock <= 0) return this.fail("Sách đã hết"), null;

    book.inStock -= 1;
    const record = new BorrowRecord(this.seq.recordId++, userId, bookId, new Date());
    this.borrowRecords.set(record.recordId, record);
    console.log(`📚 Mượn sách #${bookId} (${book.title}) – record #${record.recordId}`);
    return record;
  }

  returnBook(recordId: number) {
    const rec = this.borrowRecords.get(recordId);
    if (!rec || rec.returnDate) return this.fail("Record không hợp lệ hoặc đã trả");
    const book = this.books.get(rec.bookId)!;
    rec.returnDate = new Date();
    book.inStock += 1;
    console.log(`✅ Trả sách record #${recordId} (${book.title})`);
  }

  /* ---------- UTIL ---------- */
  private fail(msg: string) {
    console.log("❌ " + msg);
    return false;
  }

  /* ---------- DEMO SNAPSHOT ---------- */
  snapshot() {
    console.log("\n===== SNAPSHOT =====");
    console.log("👥 Users:", [...this.users.values()].map((u) => ({ id: u.id, name: u.name })));
    console.log("🏨 Rooms:", [...this.rooms.values()].map((r) => ({ id: r.roomId, type: r.type, booked: r.isBooked })));
    console.log("🍽️  Menu:", [...this.menu.values()].map((m) => ({ id: m.id, name: m.name, price: m.price })));
    console.log("🗺️  Tours:", [...this.tours.values()].map((t) => ({ id: t.tourId, dest: t.destination, price: t.price })));
    console.log("🚙 Vehicles:", [...this.vehicles.values()].map((v) => ({ id: v.vehicleId, type: v.type, assigned: v.isAssigned })));
    console.log("📖 Books:", [...this.books.values()].map((b) => ({ id: b.id, title: b.title, stock: b.inStock })));
    console.log("====================\n");
  }
}

/* =======================================================
   TEST FLOW – MÔ PHỎNG SỬ DỤNG TẤT CẢ PHÂN HỆ
   =======================================================*/
(function main() {
  const rm = new ResortManagement();

  // Seed data
  rm.addRoom(new Room(101, "Standard", 800_000));
  rm.addRoom(new Room(201, "Deluxe", 1_200_000));
  rm.addRoom(new Room(501, "Suite", 2_500_000));

  rm.addMenuItem(new MenuItem(1, "Phở bò", 50_000));
  rm.addMenuItem(new MenuItem(2, "Cơm gà", 60_000));
  rm.addMenuItem(new MenuItem(3, "Cà phê", 25_000));

  rm.addTour(new Tour(1, "Đà Nẵng", 3_000_000, 20));
  rm.addTour(new Tour(2, "Phú Quốc", 4_500_000, 10));

  rm.addVehicle(new Vehicle(10, "Car", 4));
  rm.addVehicle(new Vehicle(20, "Van", 8));

  rm.addBook(new Book(100, "Lập trình Java cơ bản", "Nguyễn A", 2));
  rm.addBook(new Book(101, "Hướng dẫn TypeScript", "Trần B", 1));

  // User + Accounts
  const u = new User(1, "Linh", "0123-456-789");
  rm.addUser(u);
  u.login();
  const sa = rm.openSavingAccount(u.id, "SA-001")!;
  const ca = rm.openCheckingAccount(u.id, "CA-001", 500_000)!;

  // Nạp tiền
  sa.deposit(5_000_000);
  ca.deposit(500_000);

  rm.snapshot();

  // BOOK ROOM (thanh toán bằng Saving)
  rm.bookRoom(u.id, 201, 2); // Deluxe 2 đêm = 2.4tr
  // ORDER F&B
  const order = rm.createOrder(u.id);
  rm.addItemToOrder(order.orderId, 1);
  rm.addItemToOrder(order.orderId, 3);
  rm.payOrder(order.orderId); // ưu tiên Checking

  // BOOK TOUR
  rm.bookTour(u.id, 1); // Đà Nẵng 3tr (Saving)

  // VEHICLE
  rm.assignVehicle(u.id, 10); // Car
  // ... đi chơi ...
  rm.returnVehicle(10);

  // PET CARE
  rm.registerPet(u.id, "Bông", "Dog", "Healthy");

  // LIBRARY
  const br = rm.borrowBook(u.id, 100)!;
  rm.borrowBook(u.id, 101);
  rm.returnBook(br.recordId);

  // CHECKOUT ROOM
  rm.checkoutRoom(u.id, 201);

  // Lịch sử tài khoản
  console.log("\n=== BANK HISTORIES ===");
  sa.showHistory();
  ca.showHistory();

  u.logout();
})();
