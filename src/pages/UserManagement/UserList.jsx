// src/pages/UserManagement/UserList.jsx
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
          // Add more mock users...
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