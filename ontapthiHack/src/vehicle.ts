// ======= Lớp Vehicle =======
class Vehicle {
  constructor(id, type, capacity) {
    this.id = id;             // Mã phương tiện
    this.type = type;         // Loại xe: xe tải, xe bus,...
    this.capacity = capacity; // Sức chứa
    this.status = "available"; // Trạng thái: available hoặc in use
  }

  // Gán tuyến đường cho xe
  assignRoute(route) {
    this.route = route;
    this.status = "in use";
  }

  // Đánh dấu xe sẵn sàng
  markAvailable() {
    this.status = "available";
    this.route = null;
  }
}

// ======= Lớp Driver =======
class Driver {
  constructor(id, name) {
    this.id = id;             // Mã tài xế
    this.name = name;         // Tên tài xế
    this.assignedVehicleId = null; // Xe được phân công
  }

  // Phân công xe cho tài xế
  assignVehicle(vehicle) {
    this.assignedVehicleId = vehicle.id;
    vehicle.status = "in use";
  }

  // Hủy phân công xe
  unassignVehicle() {
    this.assignedVehicleId = null;
  }
}

// ======= Lớp Route =======
class Route {
  constructor(id, startLocation, endLocation, distance) {
    this.id = id;               // Mã tuyến
    this.startLocation = startLocation;
    this.endLocation = endLocation;
    this.distance = distance;   // Khoảng cách
  }

  // Cập nhật tuyến
  updateRoute(start, end, distance) {
    this.startLocation = start;
    this.endLocation = end;
    this.distance = distance;
  }
}
