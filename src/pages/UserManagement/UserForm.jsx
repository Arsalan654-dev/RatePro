// src/pages/UserManagement/UserForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "Editor",
    status: "Active",
  });

  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      // Fetch user data
      setTimeout(() => {
        setUser({
          name: "John Doe",
          email: "john@example.com",
          role: "Admin",
          status: "Active",
        });
        setLoading(false);
      }, 500);
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here
    console.log("User saved:", user);
    navigate("/users");
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="user-form">
      <h1>{isEditMode ? "Edit User" : "Create User"}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={user.status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditMode ? "Update User" : "Create User"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/users")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;