import { useState, useEffect } from "react";

function AdminDashboard() {
  // 1. LocalStorage aur SessionStorage dono se authentication status read karein
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const isLocalAuth = localStorage.getItem("isAdminAuthenticated") === "true";
    const isSessionAuth = sessionStorage.getItem("isAdminAuthenticated") === "true";
    return isLocalAuth || isSessionAuth;
  });
  
  const [password, setPassword] = useState("");

  // Target Admin Password (Profile.jsx ke secret pass ke sath sync kiya gaya hai)
  const ADMIN_SECRET = "sultanhamid00966";
  const PROFILE_ADMIN_SECRET = "mySecretAdminPass123";

  // Dashboard States
  const [withdrawals, setWithdrawals] = useState([]);
  const [settings, setSettings] = useState({
    minCoins: 500,
    adRewardCoins: 50,
    inrRate: 1.0,
    usdRate: 0.012,
    pkrRate: 3.35,
  });
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: "", coinPrice: "", validityDays: "" });
  const [activeTab, setActiveTab] = useState("withdrawals");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchWithdrawals();
      fetchSettings();
      fetchProducts();
    }
  }, [isAuthenticated]);

  // Handle Admin Login with LocalStorage & SessionStorage Sync
  const handleLogin = (e) => {
    e.preventDefault();
    const enteredPass = password.trim().toLowerCase();
    
    if (enteredPass === ADMIN_SECRET.toLowerCase() || enteredPass === PROFILE_ADMIN_SECRET.toLowerCase()) {
      setIsAuthenticated(true);
      localStorage.setItem("isAdminAuthenticated", "true");
      sessionStorage.setItem("isAdminAuthenticated", "true");
    } else {
      alert("❌ Galat Password! Dubara koshish karein.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAdminAuthenticated");
    sessionStorage.removeItem("isAdminAuthenticated");
  };

  // Fetch Requests
  const fetchWithdrawals = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/withdrawals");
      const data = await res.json();
      if (data.success) setWithdrawals(data.withdrawals || []);
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch Settings
  const fetchSettings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settings");
      const data = await res.json();
      if (data.success && data.settings) setSettings(data.settings);
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      if (data.success) setProducts(data.products || []);
    } catch (e) {
      console.error(e);
    }
  };

  // Update Status (Approve / Reject)
  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/withdraw-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg(`Status changed to ${status}`);
        fetchWithdrawals();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) setMsg("Settings Saved Successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("Product Added!");
        setNewProduct({ title: "", coinPrice: "", validityDays: "" });
        fetchProducts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMsg("Product Removed!");
        fetchProducts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 1. LOGIN SCREEN (Agar Authenticated nahi hai)
  if (!isAuthenticated) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#0f172a", color: "#fff" }}>
        <div style={{ background: "#1e293b", padding: "40px", borderRadius: "10px", width: "100%", maxWidth: "400px", textAlign: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.3)" }}>
          <h2>👑 Admin Login</h2>
          <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>Enter password to access control panel</p>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: "12px", borderRadius: "5px", border: "1px solid #334155", background: "#0f172a", color: "#fff", outline: "none" }}
              required
            />
            <button
              type="submit"
              style={{ padding: "12px", background: "#38bdf8", border: "none", borderRadius: "5px", color: "#0f172a", fontWeight: "bold", cursor: "pointer" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. MAIN DASHBOARD (Login hone ke baad)
  return (
    <div style={{ padding: "30px", background: "#0f172a", color: "#fff", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>👑 Admin Control Panel</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {msg && <p style={{ background: "#22c55e", padding: "8px 15px", borderRadius: "6px", margin: 0 }}>{msg}</p>}
          <button onClick={handleLogout} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        <button onClick={() => setActiveTab("withdrawals")} style={{ padding: "10px 20px", background: activeTab === "withdrawals" ? "#38bdf8" : "#334155", border: "none", color: "#fff", cursor: "pointer", borderRadius: "5px" }}>
          💸 Withdrawals
        </button>
        <button onClick={() => setActiveTab("settings")} style={{ padding: "10px 20px", background: activeTab === "settings" ? "#38bdf8" : "#334155", border: "none", color: "#fff", cursor: "pointer", borderRadius: "5px" }}>
          ⚙️ Price & Currency Settings
        </button>
        <button onClick={() => setActiveTab("products")} style={{ padding: "10px 20px", background: activeTab === "products" ? "#38bdf8" : "#334155", border: "none", color: "#fff", cursor: "pointer", borderRadius: "5px" }}>
          📦 Manage Products / Offers
        </button>
      </div>

      {/* TAB 1: WITHDRAWAL REQUESTS */}
      {activeTab === "withdrawals" && (
        <div style={{ background: "#1e293b", padding: "20px", borderRadius: "10px" }}>
          <h2>Withdrawal Requests</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ background: "#334155", textAlign: "left" }}>
                <th style={{ padding: "10px" }}>Coins</th>
                <th>Currency</th>
                <th>Method</th>
                <th>Account</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr key={w._id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "10px" }}>{w.coins || w.reqCoins}</td>
                  <td>{w.currency || w.selectedCurrency}</td>
                  <td>{w.paymentMethod}</td>
                  <td>{w.accountDetails}</td>
                  <td style={{ color: w.status === "Approved" || w.status === "Completed" ? "#4ade80" : w.status === "Rejected" ? "#f87171" : "#facc15" }}>
                    {w.status}
                  </td>
                  <td>
                    <button onClick={() => handleStatusChange(w._id, "Approved")} style={{ background: "#16a34a", color: "#fff", border: "none", padding: "5px 10px", marginRight: "5px", cursor: "pointer" }}>Approve</button>
                    <button onClick={() => handleStatusChange(w._id, "Rejected")} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: SETTINGS */}
      {activeTab === "settings" && (
        <div style={{ background: "#1e293b", padding: "20px", borderRadius: "10px", maxWidth: "500px" }}>
          <h2>Coins & Currency Settings</h2>
          <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label>
              Min Coins Limit:
              <input type="number" value={settings.minCoins} onChange={(e) => setSettings({ ...settings, minCoins: e.target.value })} style={{ width: "100%", padding: "8px", margin: "5px 0" }} />
            </label>
            <label>
              Ad Reward (Coins):
              <input type="number" value={settings.adRewardCoins} onChange={(e) => setSettings({ ...settings, adRewardCoins: e.target.value })} style={{ width: "100%", padding: "8px", margin: "5px 0" }} />
            </label>
            <label>
              100 Coins = INR (₹):
              <input type="number" step="0.01" value={settings.inrRate} onChange={(e) => setSettings({ ...settings, inrRate: e.target.value })} style={{ width: "100%", padding: "8px", margin: "5px 0" }} />
            </label>
            <label>
              100 Coins = PKR (Rs):
              <input type="number" step="0.01" value={settings.pkrRate} onChange={(e) => setSettings({ ...settings, pkrRate: e.target.value })} style={{ width: "100%", padding: "8px", margin: "5px 0" }} />
            </label>
            <label>
              100 Coins = USD ($):
              <input type="number" step="0.001" value={settings.usdRate} onChange={(e) => setSettings({ ...settings, usdRate: e.target.value })} style={{ width: "100%", padding: "8px", margin: "5px 0" }} />
            </label>
            <button type="submit" style={{ background: "#0284c7", color: "#fff", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Save Settings</button>
          </form>
        </div>
      )}

      {/* TAB 3: PRODUCTS & OFFERS */}
      {activeTab === "products" && (
        <div style={{ background: "#1e293b", padding: "20px", borderRadius: "10px" }}>
          <h2>Add Product / Offer (Kitne din aur kya Price)</h2>
          <form onSubmit={handleAddProduct} style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
            <input type="text" placeholder="Product Title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} required style={{ padding: "8px" }} />
            <input type="number" placeholder="Price in Coins" value={newProduct.coinPrice} onChange={(e) => setNewProduct({ ...newProduct, coinPrice: e.target.value })} required style={{ padding: "8px" }} />
            <input type="number" placeholder="Validity (Days)" value={newProduct.validityDays} onChange={(e) => setNewProduct({ ...newProduct, validityDays: e.target.value })} required style={{ padding: "8px" }} />
            <button type="submit" style={{ background: "#16a34a", color: "#fff", padding: "8px 15px", border: "none" }}>Add Product</button>
          </form>

          <h3>Active Products List</h3>
          <ul>
            {products.map((p) => (
              <li key={p._id} style={{ marginBottom: "8px" }}>
                <strong>{p.title}</strong> — {p.coinPrice} Coins | Valid: {p.validityDays} Days{" "}
                <button onClick={() => handleDeleteProduct(p._id)} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "3px 8px", marginLeft: "10px", cursor: "pointer" }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;