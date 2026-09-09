import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Earn from "./Earn";
import Wallet from "./wallet";
import Profile from "./profile";
import LuckyDraw from "./LuckyDraw";
import Winner from "./Winner"; // Winner Component Import
import AdminDashboard from "./AdminDashboard";
import AuthModal from "./AuthModal";
import { LanguageProvider, useLanguage } from "./LanguageContext";

function MainApp() {
  const { lang, setLang, currency, setCurrency, t, activeCurrency, convertCoins } = useLanguage();
  
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Active User Profile State from LocalStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("goovoUser");
    return saved ? JSON.parse(saved) : null;
  });

  // Balance Coins
  const [coins, setCoins] = useState(() => {
    return Number(localStorage.getItem("goovoCoins")) || 0;
  });

  // Pending Cash Transactions
  const [pendingPayments, setPendingPayments] = useState(() => {
    const saved = localStorage.getItem("goovoPendingPayments");
    return saved ? JSON.parse(saved) : [];
  });

  const [message, setMessage] = useState({ text: "", type: "success" });

  // Sync state changes with LocalStorage
  useEffect(() => {
    localStorage.setItem("goovoCoins", coins);
  }, [coins]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("goovoUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("goovoUser");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("goovoPendingPayments", JSON.stringify(pendingPayments));
  }, [pendingPayments]);

  const addCoins = (amount, customMessage) => {
    setCoins((prev) => prev + amount);
    triggerNotification(
      customMessage || `🎉 You earned ${amount} coins!`,
      "success"
    );
  };

  const deductCoins = (amount, customMessage) => {
    if (coins < amount) {
      triggerNotification("⚠️ Insufficient coins balance!", "error");
      return false;
    }
    setCoins((prev) => prev - amount);
    triggerNotification(
      customMessage || `💸 Paid ${amount} coins successfully!`,
      "info"
    );
    return true;
  };

  const submitPaymentProof = (paymentData) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const newEntry = {
      id: "TRX-" + Date.now(),
      userName: user.name || "Guest",
      userPhone: user.phone || "N/A",
      ...paymentData,
      status: "pending_verification",
      createdAt: new Date().toISOString()
    };
    setPendingPayments((prev) => [newEntry, ...prev]);
    triggerNotification("🚀 Receipt submitted! Waiting for Admin verification.", "success");
  };

  const triggerNotification = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "success" });
    }, 3000);
  };

  const navigateToPage = (newPage) => {
    // Guest user can view Home, Profile, and Winner pages without login
    if (!user && (newPage === "earn" || newPage === "wallet" || newPage === "luckyDraw")) {
      triggerNotification("🔒 Login / Signup required for this feature!", "error");
      setShowAuthModal(true);
      return;
    }
    setPage(newPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("goovoUser");
    triggerNotification("👋 Logged out successfully!", "info");
    setPage("home");
  };

  return (
    <div className="app">
      {/* GUEST BANNER */}
      {!user && (
        <div style={{ background: "#38bdf8", color: "#0f172a", padding: "8px 15px", textAlign: "center", fontSize: "13px", fontWeight: "bold" }}>
          👋 Aap Guest Mode mein hain. Coins kamane ke liye {" "}
          <button 
            onClick={() => setShowAuthModal(true)} 
            style={{ background: "#0f172a", color: "#fff", border: "none", padding: "3px 10px", borderRadius: "4px", cursor: "pointer", marginLeft: "8px" }}
          >
            Signup / Login
          </button>
        </div>
      )}

      {/* NAVBAR WITH LOGO + COMPACT LANGUAGE & CURRENCY SELECTORS */}
      <nav className="navbar">
        <div className="nav-left-group">
          <div className="brand" onClick={() => navigateToPage("home")}>
            <span>GOOVO</span>
          </div>

          <div className="header-controls">
            <div className="compact-pill">
              <span className="pill-icon">🌐</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="compact-select"
              >
                <option value="UR">UR</option>
                <option value="EN">EN</option>
                <option value="HI">HI</option>
              </select>
            </div>

            <div className="compact-pill">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="compact-select"
              >
                <option value="PKR">PKR</option>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>

        <div className="nav-links">
          <button className={page === "home" ? "active" : ""} onClick={() => navigateToPage("home")}>{t.home}</button>
          <button className={page === "earn" ? "active" : ""} onClick={() => navigateToPage("earn")}>{t.earn}</button>
          <button className={page === "luckyDraw" ? "active" : ""} onClick={() => navigateToPage("luckyDraw")}>{t.luckyDraw}</button>
          <button className={page === "winner" ? "active" : ""} onClick={() => navigateToPage("winner")}>🏆 Winners</button>
          <button className={page === "wallet" ? "active" : ""} onClick={() => navigateToPage("wallet")}>{t.wallet}</button>
          <button className={page === "profile" ? "active" : ""} onClick={() => navigateToPage("profile")}>{t.profile}</button>
          
          {user ? (
            <button onClick={handleLogout} style={{ background: "#ef4444", color: "#fff", borderRadius: "6px" }}>Logout</button>
          ) : (
            <button onClick={() => setShowAuthModal(true)} style={{ background: "#0284c7", color: "#fff", borderRadius: "6px" }}>Login</button>
          )}
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => navigateToPage("home")}>🏠 {t.home}</button>
          <button onClick={() => navigateToPage("earn")}>🎮 {t.earn}</button>
          <button onClick={() => navigateToPage("luckyDraw")}>🎁 {t.luckyDraw}</button>
          <button onClick={() => navigateToPage("winner")}>🏆 Winners</button>
          <button onClick={() => navigateToPage("wallet")}>💰 {t.wallet}</button>
          <button onClick={() => navigateToPage("profile")}>👤 {t.profile}</button>
          {user ? (
            <button onClick={handleLogout} style={{ color: "#ef4444" }}>🚪 Logout</button>
          ) : (
            <button onClick={() => { setMenuOpen(false); setShowAuthModal(true); }}>🔑 Login / Signup</button>
          )}
        </div>
      )}

      {/* Global Toast Notification */}
      {message.text && (
        <div className={`toast-notification ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* RENDER PAGES */}
      {page === "home" && (
        <main>
          <section className="hero">
            <div className="hero-content">
              <p className="small-title">{t.welcome}</p>
              <h1>{t.heroTitle1}<span>{t.heroTitle2}</span></h1>
              <p className="description">{t.heroSub}</p>
              
              <div className="search-box">
                <input type="text" placeholder={t.searchPlaceholder} />
                <button type="button">🔍</button>
              </div>
            </div>
          </section>

          <section className="balance-section">
            <div className="balance-card">
              <div>
                <p className="card-label">{t.yourBalance}</p>
                <h2>🪙 {coins.toLocaleString()} Coins</h2>
                <p className="usd">≈ {activeCurrency.symbol}{convertCoins(coins)} {currency}</p>
              </div>
              <div className="coin-icon">🪙</div>
            </div>
          </section>

          <section className="section">
            <div className="cards">
              <div className="action-card">
                <div className="card-icon">🎮</div>
                <h3>{t.earnCoinsTitle}</h3>
                <p>{t.earnCoinsDesc}</p>
                <button className="primary-button" onClick={() => navigateToPage("earn")}>{t.startEarning}</button>
              </div>

              <div className="action-card">
                <div className="card-icon">🎁</div>
                <h3>{t.luckyDrawTitle}</h3>
                <p>{t.luckyDrawDesc}</p>
                <button className="primary-button" onClick={() => navigateToPage("luckyDraw")}>{t.enterLuckyDraw}</button>
              </div>

              <div className="action-card">
                <div className="card-icon">🏆</div>
                <h3>Recent Winners</h3>
                <p>Check out our latest lucky draw winners!</p>
                <button className="primary-button" onClick={() => navigateToPage("winner")}>View Winners</button>
              </div>
            </div>
          </section>
        </main>
      )}

      {page === "earn" && <Earn addCoins={addCoins} user={user} navigate={navigateToPage} />}

      {page === "luckyDraw" && (
        <LuckyDraw
          coins={coins}
          deductCoins={deductCoins}
          submitPaymentProof={submitPaymentProof}
          user={user}
          navigate={navigateToPage}
        />
      )}

      {page === "winner" && <Winner />}

      {page === "wallet" && (
        <Wallet
          coins={coins}
          user={user}
          pendingPayments={pendingPayments}
          deductCoins={deductCoins}
          navigate={navigateToPage}
        />
      )}

      {page === "profile" && (
        <Profile
          user={user || { name: "Guest User", phone: "Not Logged In", isVerified: false }}
          setUser={setUser}
          coins={coins}
          navigate={navigateToPage}
          onOpenAuth={() => setShowAuthModal(true)}
        />
      )}

      {page === "admin" && (
        <div>
          <div style={{ padding: "10px 20px", background: "#0f172a", borderBottom: "1px solid #334155" }}>
            <button
              onClick={() => navigateToPage("profile")}
              style={{
                background: "#334155",
                color: "#fff",
                border: "none",
                padding: "8px 15px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              ⬅️ Exit Admin Mode
            </button>
          </div>
          <AdminDashboard />
        </div>
      )}

      {/* AUTHENTICATION MODAL */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          triggerNotification(`Welcome back, ${loggedUser.name}! 👋`, "success");
        }}
      />

      <footer>
        <div className="footer-brand"><strong>GOOVO</strong></div>
        <p>{t.footerSub}</p>
        <small>{t.rights}</small>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/secret-admin-panel" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}