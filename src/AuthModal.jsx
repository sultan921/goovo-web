import React, { useState } from "react";

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Profile.jsx wala same Secret Admin Password
  const SHARED_ADMIN_PASSWORD = "mySecretAdminPass123";

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const cleanedPassword = password.trim();
    const cleanedPhone = phone.trim();

    if (isSignup) {
      if (!name.trim() || !cleanedPhone || !cleanedPassword) {
        setError("⚠️ All fields are required!");
        return;
      }
      
      // Save User Credentials to LocalStorage
      const newUser = { 
        name: name.trim(), 
        phone: cleanedPhone, 
        password: cleanedPassword, 
        isVerified: true, 
        avatar: "" 
      };

      localStorage.setItem("goovoUser", JSON.stringify(newUser));
      onLoginSuccess(newUser);
      onClose();
    } else {
      // Login Check: Pehle LocalStorage se data laayein
      const savedUser = JSON.parse(localStorage.getItem("goovoUser"));

      // Direct Admin Password Check ya LocalStorage User Password Check
      const isAdminPass = cleanedPassword.toLowerCase() === SHARED_ADMIN_PASSWORD.toLowerCase();
      const isUserPass = savedUser && savedUser.password === cleanedPassword;

      if (savedUser && savedUser.phone === cleanedPhone && (isUserPass || isAdminPass)) {
        // Shared password hone par status verify update karein
        const authenticatedUser = { ...savedUser, isVerified: true };
        localStorage.setItem("goovoUser", JSON.stringify(authenticatedUser));
        
        onLoginSuccess(authenticatedUser);
        onClose();
      } else {
        setError("❌ Invalid Phone Number or Password!");
      }
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
    }}>
      <div style={{ background: "#1e293b", padding: "25px", borderRadius: "12px", width: "90%", maxWidth: "380px", color: "#fff" }}>
        <h3>{isSignup ? "📝 Create Account to Earn" : "🔑 Login to GOOVO"}</h3>
        <p style={{ fontSize: "13px", color: "#94a3b8" }}>
          {isSignup ? "Earn karne aur coins save karne ke liye signup karein." : "Wapas aane par login karein."}
        </p>

        {error && <p style={{ color: "#f87171", fontSize: "13px", margin: "8px 0" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div style={{ marginBottom: "10px" }}>
              <label style={{ fontSize: "12px" }}>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #475569", background: "#0f172a", color: "#fff", boxSizing: "border-box" }}
              />
            </div>
          )}

          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "12px" }}>WhatsApp / Mobile No.</label>
            <input
              type="tel"
              placeholder="03001234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #475569", background: "#0f172a", color: "#fff", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "12px" }}>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #475569", background: "#0f172a", color: "#fff", boxSizing: "border-box" }}
            />
          </div>

          <button type="submit" style={{ width: "100%", padding: "12px", background: "#0284c7", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
            {isSignup ? "Register Now" : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "13px", textAlign: "center" }}>
          {isSignup ? "Pehle se account hai?" : "Naya account banana hai?"}{" "}
          <span 
            onClick={() => { setIsSignup(!isSignup); setError(""); }}
            style={{ color: "#38bdf8", cursor: "pointer", textDecoration: "underline" }}
          >
            {isSignup ? "Login karein" : "Signup karein"}
          </span>
        </p>

        <button 
          onClick={onClose} 
          style={{ width: "100%", padding: "8px", background: "transparent", color: "#94a3b8", border: "none", cursor: "pointer", marginTop: "5px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AuthModal;