// src/pages/Auth/EnterResetCode.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterResetCode = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset code submitted:", code);
    // Mock logic: Navigate to reset-password page
    navigate("/reset-password");
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>Enter Reset Code</h2>
        <p style={styles.subtext}>We’ve sent a code to your email. Please enter it below.</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter your reset code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Submit</button>
        </form>
        <p style={styles.note}>Didn’t get a code? <span style={styles.link}>Resend</span></p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f9f9f9",
    padding: "1rem",
  },
  formWrapper: {
    maxWidth: "400px",
    width: "100%",
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  subtext: {
    marginBottom: "1.5rem",
    fontSize: "0.95rem",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  note: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#555",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
  },
};

export default EnterResetCode;
