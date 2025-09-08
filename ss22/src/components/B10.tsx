import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// Material Icons CSS
const MaterialIcons = () => (
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
);

export default function B10() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Jssa Jas', date: '09 Apr 2021', active: true },
    { id: 2, name: 'Pauline Jas', date: '26 Jan 2021', active: false },
    { id: 3, name: 'Sherilyn Metzel', date: '27 Jan 2021', active: true },
    { id: 4, name: 'Haily Carthew', date: '27 Jan 2018', active: true },
    { id: 5, name: 'Dorothea Joicey', date: '12 Dec 2017', active: true },
    { id: 6, name: 'Mikaela Pinel', date: '10 Dec 2017', active: false },
    { id: 7, name: 'Donnell Farries', date: '03 Dec 2017', active: true },
    { id: 8, name: 'Letizia Puncher', date: '09 Dec 2017', active: false },
  ]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('any');
  const [searchName, setSearchName] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add or edit
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', active: true });

  // === Pagination ===
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // === Derived Data ===
  const filteredUsers = users
    .filter((u) =>
      statusFilter === 'any'
        ? true
        : statusFilter === 'active'
        ? u.active
        : !u.active
    )
    .filter((u) => u.name.toLowerCase().includes(searchName.toLowerCase()));

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeUsers = users.filter((user) => user.active).length;
  const totalUsers = users.length;

  // === Handlers ===
  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    const currentPageIds = paginatedUsers.map((u) => u.id);
    const allSelected = currentPageIds.every((id) => selectedUsers.includes(id));
    if (allSelected) {
      setSelectedUsers((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedUsers((prev) => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setCurrentUser({ id: null, name: '', active: true });
    setModalVisible(true);
  };

  const openEditModal = (user) => {
    setModalMode('edit');
    setCurrentUser(user);
    setModalVisible(true);
  };

  const saveUser = () => {
    if (modalMode === 'add') {
      const newUser = {
        ...currentUser,
        id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      };
      setUsers([...users, newUser]);
    } else if (modalMode === 'edit') {
      setUsers(users.map((u) => (u.id === currentUser.id ? currentUser : u)));
    }
    setModalVisible(false);
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure to delete this user?')) {
      setUsers(users.filter((u) => u.id !== userId));
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const toggleActive = (userId) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, active: !u.active } : u)));
  };

  // === Pagination Handlers ===
  const goPage = (num) => {
    if (num < 1 || num > totalPages) return;
    setCurrentPage(num);
  };

  return (
    <>
      <MaterialIcons />
      <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 bg-white p-3" style={{ minHeight: '100vh' }}>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3 text-primary">
                <span className="material-icons me-2">bar_chart</span>
                <span>Overview</span>
              </div>
              <div className="d-flex align-items-center mb-3 text-primary fw-bold">
                <span className="material-icons me-2">apps</span>
                <span>CRUD</span>
              </div>
              <div className="d-flex align-items-center text-muted">
                <span className="material-icons me-2">settings</span>
                <span>Settings</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-10 p-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="text-muted mb-0">Users</h5>
                <h4 className="mb-0">Users Details</h4>
              </div>
              <button className="btn btn-success" onClick={openAddModal}>
                <span className="material-icons me-1" style={{ fontSize: '18px' }}>
                  add
                </span>
                New User
              </button>
            </div>

            <div className="row">
              {/* Main Table */}
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th style={{ width: '40px' }}>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={paginatedUsers.every((u) => selectedUsers.includes(u.id))}
                                onChange={handleSelectAll}
                              />
                            </th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedUsers.map((user) => (
                            <tr key={user.id}>
                              <td>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={selectedUsers.includes(user.id)}
                                  onChange={() => handleUserSelect(user.id)}
                                />
                              </td>
                              <td>
                                <div
                                  className="bg-light rounded d-flex align-items-center justify-content-center"
                                  style={{ width: '40px', height: '40px' }}
                                >
                                  <span className="material-icons text-muted">person</span>
                                </div>
                              </td>
                              <td className="fw-medium">{user.name}</td>
                              <td className="text-muted">{user.date}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="form-check form-switch me-3">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={user.active}
                                      onChange={() => toggleActive(user.id)}
                                    />
                                  </div>
                                  <button
                                    className="btn btn-outline-secondary btn-sm me-2"
                                    onClick={() => openEditModal(user)}
                                  >
                                    <span className="material-icons" style={{ fontSize: '16px' }}>
                                      edit
                                    </span>
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => deleteUser(user.id)}
                                  >
                                    <span className="material-icons" style={{ fontSize: '16px' }}>
                                      delete
                                    </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center p-3">
                      <nav>
                        <ul className="pagination mb-0">
                          <li className="page-item">
                            <button className="page-link" onClick={() => goPage(currentPage - 1)}>
                              <span className="material-icons" style={{ fontSize: '18px' }}>
                                chevron_left
                              </span>
                            </button>
                          </li>
                          {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => goPage(i + 1)}>
                                {i + 1}
                              </button>
                            </li>
                          ))}
                          <li className="page-item">
                            <button className="page-link" onClick={() => goPage(currentPage + 1)}>
                              <span className="material-icons" style={{ fontSize: '18px' }}>
                                chevron_right
                              </span>
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    {/* Statistics */}
                    <div className="mb-4">
                      <div className="text-primary mb-2">All/ {totalUsers}</div>
                      <div className="text-success mb-2">Active/ {activeUsers}</div>
                      <div className="text-muted">Selected/ {selectedUsers.length}</div>
                    </div>

                    {/* Search */}
                    <div className="mb-4">
                      <label className="form-label text-muted">Search by Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                      />
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label className="form-label text-muted">Status:</label>
                      {['active', 'disabled', 'any'].map((s) => (
                        <div className="form-check" key={s}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="status"
                            id={s}
                            value={s}
                            checked={statusFilter === s}
                            onChange={(e) => setStatusFilter(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setModalVisible(false)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalMode === 'add' ? 'Add User' : 'Edit User'}</h5>
                <button type="button" className="btn-close" onClick={() => setModalVisible(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                />
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={currentUser.active}
                    onChange={() => setCurrentUser({ ...currentUser, active: !currentUser.active })}
                  />
                  <label className="form-check-label">Active</label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalVisible(false)}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={saveUser}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
