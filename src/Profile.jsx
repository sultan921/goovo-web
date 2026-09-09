import React, { useState, useEffect } from "react";
import "./Profile.css";

function Profile({ user, setUser, coins, navigate }) {
  // LocalStorage se pehle se saved user data retrieve karein
  const savedUser = JSON.parse(localStorage.getItem("goovoUser")) || {};

  const [name, setName] = useState(user?.name || savedUser.name || "");
  const [phone, setPhone] = useState(user?.phone || savedUser.phone || "");
  const [walletType, setWalletType] = useState(user?.walletType || savedUser.walletType || "easypaisa");
  const [walletNumber, setWalletNumber] = useState(user?.walletNumber || savedUser.walletNumber || "");
  
  // Dynamic Check: Agar naam pehle se saved hai toh input lock ho jayega
  const isNameLocked = Boolean(user?.name || savedUser.name);

  // Profile Picture State initialized from localStorage
  const [avatar, setAvatar] = useState(user?.avatar || savedUser.avatar || "");
  const [message, setMessage] = useState({ text: "", type: "success" });

  // Admin Modal & Auth States
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [adminError, setAdminError] = useState("");

  // Secret Admin Password
  const ADMIN_PASSWORD = "mySecretAdminPass123";

  // Component mount hone par localStorage se avatar sync karein
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("goovoUser"));
    if (localData && localData.avatar) {
      setAvatar(localData.avatar);
    }
  }, []);

  const handleAdminAuth = (e) => {
    e.preventDefault();
    
    // Space ignore aur case-insensitive matching ke liye trim aur toLowerCase use kiya hai
    const enteredPassword = passcode.trim().toLowerCase();
    const actualPassword = ADMIN_PASSWORD.trim().toLowerCase();

    if (enteredPassword === actualPassword) {
      setShowAdminLogin(false);
      setPasscode("");
      setAdminError("");
      
      // Admin verification flag ko session storage mein set karein taaki Admin page dobara password na maange
      sessionStorage.setItem("isAdminAuthenticated", "true");

      if (navigate) {
        navigate("admin");
      }
    } else {
      setAdminError("❌ Incorrect Password!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage({
          text: "⚠️ Image size must be smaller than 2MB!",
          type: "error"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result;
        setAvatar(newAvatar);

        // Instant saving to LocalStorage when picture is selected
        const existingData = JSON.parse(localStorage.getItem("goovoUser")) || {};
        const updatedData = { ...existingData, avatar: newAvatar };
        localStorage.setItem("goovoUser", JSON.stringify(updatedData));
        if (setUser) setUser(updatedData);

        setMessage({
          text: "✅ Profile picture updated & saved!",
          type: "success"
        });
        setTimeout(() => setMessage({ text: "", type: "success" }), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage({ text: "⚠️ Please enter your full name.", type: "error" });
      return;
    }

    if (!phone || phone.length < 10) {
      setMessage({
        text: "⚠️ Please enter a valid 10 to 11-digit WhatsApp number.",
        type: "error"
      });
      return;
    }

    const updatedUser = {
      ...user,
      name,
      phone,
      walletType,
      walletNumber: walletNumber || phone,
      avatar,
      isVerified: true
    };

    if (setUser) setUser(updatedUser);
    localStorage.setItem("goovoUser", JSON.stringify(updatedUser));

    setMessage({
      text: "✅ Profile details & picture saved successfully!",
      type: "success"
    });

    setTimeout(() => setMessage({ text: "", type: "success" }), 3500);
  };

  // WhatsApp Support Click Handler
  const openWhatsAppSupport = () => {
    const whatsappUrl = `https://wa.me/923409510992?text=${encodeURIComponent(
      "Hello Support, mujhe GOOVO app me madad chahiye."
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="profile-container">
      {/* HEADER SECTION WITH IMAGE UPLOAD */}
      <div className="profile-header">
        <div className="avatar-wrapper">
          <div className="avatar-badge">
            {avatar ? (
              <img src={avatar} alt="Profile" className="avatar-img" />
            ) : name ? (
              name.charAt(0).toUpperCase()
            ) : (
              "👤"
            )}
          </div>
          
          <label htmlFor="avatar-input" className="upload-icon-btn" title="Change Profile Picture">
            📷
          </label>
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="user-meta">
          <h2>{name || "Guest User"}</h2>
          <p className="status-badge">
            {user?.isVerified || savedUser.isVerified ? "✓ Verified Account" : "⚠️ Profile Incomplete"}
          </p>
        </div>
      </div>

      {/* BALANCE CARD */}
      <div className="profile-balance-card">
        <div className="balance-info">
          <span className="balance-label">Total Earnings</span>
          <h3>🪙 {coins?.toLocaleString() || 0} Coins</h3>
          <p className="usd-estimate">≈ ${((coins || 0) / 10000).toFixed(2)} USD</p>
        </div>
        <div className="balance-icon">💎</div>
      </div>

      {/* NOTIFICATION TOAST */}
      {message.text && (
        <div className={`profile-toast ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* FORM SECTION */}
      <div className="profile-card">
        <h3>⚙️ Personal & Payment Info</h3>
        <p className="card-subtext">
          Draw winners ko inhi details par paisa bheja jayega.
        </p>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="e.g. Ali Raza"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isNameLocked}
              style={{
                backgroundColor: isNameLocked ? "#1e293b" : "inherit",
                cursor: isNameLocked ? "not-allowed" : "text",
                opacity: isNameLocked ? 0.7 : 1
              }}
              required
            />
            {isNameLocked && (
              <small style={{ color: "#f59e0b", display: "block", marginTop: "4px" }}>
                🔒 Security reason ki waja se naam aik martaba save hone ke baad change nahi ho sakta.
              </small>
            )}
          </div>

          <div className="form-group">
            <label>WhatsApp / Mobile Number</label>
            <input
              type="tel"
              placeholder="e.g. 03001234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <small>Prizes aur verification updates ke liye zaroori hai.</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Payout Method</label>
              <select
                value={walletType}
                onChange={(e) => setWalletType(e.target.value)}
              >
                <option value="easypaisa">EasyPaisa</option>
                <option value="jazzcash">JazzCash</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div className="form-group">
              <label>Account / Wallet Number</label>
              <input
                type="text"
                placeholder="e.g. 03001234567"
                value={walletNumber}
                onChange={(e) => setWalletNumber(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="save-btn">
            Save Profile Details
          </button>
        </form>
      </div>

      {/* HELP CENTER SECTION */}
      <div className="profile-card" style={{ marginTop: "20px", border: "1px solid #22c55e" }}>
        <h3>💬 Help Center & Support</h3>
        <p className="card-subtext">Agar aap ko application me koi masla aa raha hai ya help chahiye toh hum se WhatsApp par contact karein.</p>
        <button
          type="button"
          onClick={openWhatsAppSupport}
          style={{
            background: "#22c55e",
            color: "#0f172a",
            border: "none",
            padding: "12px",
            width: "100%",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          <span>📱 Contact Official WhatsApp Support</span>
        </button>
      </div>

      {/* ADMIN CONTROL SECTION */}
      <div className="profile-card" style={{ marginTop: "20px", border: "1px solid #0284c7" }}>
        <h3>👑 Control Panel</h3>
        <p className="card-subtext">Admin features ke liye niche click karein.</p>
        <button
          type="button"
          onClick={() => setShowAdminLogin(true)}
          style={{
            background: "#0284c7",
            color: "#fff",
            border: "none",
            padding: "12px",
            width: "100%",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          🔐 Switch to Admin Mode
        </button>
      </div>

      {/* ADMIN LOGIN MODAL */}
      {showAdminLogin && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
        }}>
          <div style={{ background: "#1e293b", padding: "25px", borderRadius: "12px", width: "90%", maxWidth: "350px", color: "#fff" }}>
            <h3 style={{ margin: "0 0 10px 0" }}>🔐 Admin Authentication</h3>
            <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "15px" }}>Enter password to open Admin Dashboard.</p>

            {adminError && <p style={{ color: "#f87171", fontSize: "13px", marginBottom: "10px" }}>{adminError}</p>}

            <form onSubmit={handleAdminAuth}>
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px",
                  borderRadius: "6px",
                  border: "1px solid #475569",
                  background: "#0f172a",
                  color: "#fff",
                  boxSizing: "border-box"
                }}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  style={{ background: "#0284c7", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", flex: 1, fontWeight: "bold" }}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAdminLogin(false); setAdminError(""); }}
                  style={{ background: "#475569", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;