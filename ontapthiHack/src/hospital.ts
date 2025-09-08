// ======= Lớp Patient =======
class Patient {
  constructor(id, name) {
    this.id = id;               // Mã bệnh nhân
    this.name = name;           // Tên bệnh nhân
    this.medicalRecords = [];   // Hồ sơ y tế
  }

  // Thêm hồ sơ y tế
  addRecord(record) {
    this.medicalRecords.push(record);
  }

  // Lấy danh sách hồ sơ
  getRecords() {
    return this.medicalRecords;
  }
}

// ======= Lớp Doctor =======
class Doctor {
  constructor(id, name, specialty) {
    this.id = id;               // Mã bác sĩ
    this.name = name;           // Tên bác sĩ
    this.specialty = specialty; // Chuyên khoa
    this.patients = [];         // Danh sách bệnh nhân
  }

  // Thêm bệnh nhân
  assignPatient(patient) {
    if (!this.patients.includes(patient)) {
      this.patients.push(patient);
    }
  }

  // Kê đơn thuốc cho bệnh nhân
  prescribe(patientId, prescription) {
    console.log(`Bác sĩ ${this.name} kê đơn cho bệnh nhân ${patientId}: ${prescription}`);
  }
}

// ======= Lớp Appointment =======
class Appointment {
  constructor(id, patientId, doctorId, date) {
    this.id = id;               // Mã lịch hẹn
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.date = date;
    this.status = "scheduled";  // Trạng thái: scheduled, cancelled, completed
  }

  // Đổi ngày hẹn
  reschedule(newDate) {
    this.date = newDate;
  }

  // Hủy lịch hẹn
  cancel() {
    this.status = "cancelled";
  }
}
