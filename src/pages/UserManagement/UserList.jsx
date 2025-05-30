import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete, MdSearch, MdFilterList } from "react-icons/md";
import Pagination from "../../components/Pagination/Pagination";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    role: "",
    status: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Mock data fetch
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockUsers = [
          { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2023-06-15" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active", lastLogin: "2023-06-14" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive", lastLogin: "2023-06-10" },
          { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Pending", lastLogin: "2023-06-12" },
          { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Viewer", status: "Active", lastLogin: "2023-06-13" },
        ];
        
        // Filter, sort, and paginate
        const filtered = applyFiltersAndSearch(mockUsers);
        const sorted = sortUsers(filtered);
        const paginated = paginateUsers(sorted);
        
        setUsers(paginated);
        setPagination(prev => ({ ...prev, total: filtered.length }));
        setLoading(false);
      }, 500);
    };

    fetchUsers();
  }, [searchTerm, filters, sortConfig, pagination.page]);

  const applyFiltersAndSearch = (data) => {
    return data.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = 
        (!filters.role || user.role === filters.role) &&
        (!filters.status || user.status === filters.status);
      
      return matchesSearch && matchesFilters;
    });
  };

  const sortUsers = (data) => {
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const paginateUsers = (data) => {
    const start = (pagination.page - 1) * pagination.limit;
    return data.slice(start, start + pagination.limit);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="user-management">
      <style>{`
        .user-management {
          padding: 20px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .page-header h1 {
          font-size: 1.5rem;
          margin: 0;
        }

        .user-controls {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 20px;
        }

        @media (min-width: 768px) {
          .user-controls {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 250px;
        }

        .search-box .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }

        .search-box input {
          width: 100%;
          padding: 8px 12px 8px 32px;
          border-radius: 4px;
          border: 1px solid #dee2e6;
          font-size: 14px;
        }

        .dark .search-box input {
          border-color: #495057;
          background-color: #2a2e35;
          color: #e9ecef;
        }

        .filters {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-group label {
          font-size: 14px;
          white-space: nowrap;
        }

        .filter-group select {
          padding: 8px 12px;
          border-radius: 4px;
          border: 1px solid #dee2e6;
          font-size: 14px;
          min-width: 120px;
        }

        .dark .filter-group select {
          border-color: #495057;
          background-color: #2a2e35;
          color: #e9ecef;
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin-bottom: 20px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .table th,
        .table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #dee2e6;
        }

        .dark .table th,
        .dark .table td {
          border-color: #495057;
        }

        .table th {
          background-color: #f8f9fa;
          font-weight: 600;
          cursor: pointer;
          user-select: none;
          position: relative;
        }

        .dark .table th {
          background-color: #2a2e35;
        }

        .table th:hover {
          background-color: #e9ecef;
        }

        .dark .table th:hover {
          background-color: #343a40;
        }

        .table tbody tr:hover {
          background-color: #f8f9fa;
        }

        .dark .table tbody tr:hover {
          background-color: #343a40;
        }

        .badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .badge-admin {
          background-color: rgba(74, 108, 247, 0.1);
          color: #4a6cf7;
        }

        .badge-editor {
          background-color: rgba(40, 167, 69, 0.1);
          color: #28a745;
        }

        .badge-viewer {
          background-color: rgba(108, 117, 125, 0.1);
          color: #6c757d;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge.active {
          background-color: rgba(40, 167, 69, 0.1);
          color: #28a745;
        }

        .status-badge.inactive {
          background-color: rgba(220, 53, 69, 0.1);
          color: #dc3545;
        }

        .status-badge.pending {
          background-color: rgba(255, 193, 7, 0.1);
          color: #ffc107;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .btn-sm {
          padding: 4px 8px;
          font-size: 12px;
        }

        .btn-outline-primary {
          background-color: transparent;
          border-color: #4a6cf7;
          color: #4a6cf7;
        }

        .btn-outline-primary:hover {
          background-color: #4a6cf7;
          color: white;
        }

        .btn-outline-danger {
          background-color: transparent;
          border-color: #dc3545;
          color: #dc3545;
        }

        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: white;
        }

        .btn-primary {
          background-color: #4a6cf7;
          color: white;
          border: none;
        }

        .btn-primary:hover {
          background-color: #3a5bd9;
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }

        .pagination button {
          padding: 6px 12px;
          border: 1px solid #dee2e6;
          background-color: white;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dark .pagination button {
          background-color: #2a2e35;
          border-color: #495057;
          color: #e9ecef;
        }

        .pagination button.active {
          background-color: #4a6cf7;
          color: white;
          border-color: #4a6cf7;
        }

        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          color: #6c757d;
        }

        @media (max-width: 768px) {
          .user-management {
            padding: 15px;
          }
        
          .table th,
          .table td {
            padding: 8px 10px;
            font-size: 13px;
          }
        
          .filter-group {
            flex: 1;
            min-width: calc(50% - 8px);
          }
        
          .filter-group select {
            min-width: 0;
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }
        
          .user-controls {
            width: 100%;
          }
        
          .search-box {
            min-width: 100%;
          }
        
          .filters {
            width: 100%;
          }
        
          .filter-group {
            min-width: 100%;
          }
        
          .pagination {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="page-header">
        <h1>User Management</h1>
        <Link to="/users/create" className="btn btn-primary">
          Create User
        </Link>
      </div>

      <div className="user-controls">
        <div className="search-box">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>Role:</label>
            <select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
            >
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => requestSort("name")}>
                Name {sortConfig.key === "name" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => requestSort("email")}>
                Email {sortConfig.key === "email" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => requestSort("role")}>
                Role {sortConfig.key === "role" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => requestSort("status")}>
                Status {sortConfig.key === "status" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th onClick={() => requestSort("lastLogin")}>
                Last Login {sortConfig.key === "lastLogin" && (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge badge-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <div className="actions">
                    <Link
                      to={`/users/${user.id}/edit`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <MdEdit />
                    </Link>
                    <button className="btn btn-sm btn-outline-danger">
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        current={pagination.page}
        total={pagination.total}
        limit={pagination.limit}
        onChange={(page) => setPagination(prev => ({ ...prev, page }))}
      />
    </div>
  );
};

export default UserList;