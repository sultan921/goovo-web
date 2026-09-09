import React, { useState, useEffect } from "react";
import "./Winner.css";

// Dynamic winner add karne ke liye helper function (Admin / Spin end par call karein)
export const addWinnerToStorage = (newWinner) => {
  const existing = JSON.parse(localStorage.getItem("goovo_winners")) || [];
  const updated = [
    {
      id: Date.now(),
      name: newWinner.name,
      prize: newWinner.prize,
      ticket: newWinner.ticket || `GD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      avatar: newWinner.avatar || "🏆",
    },
    ...existing,
  ];
  localStorage.setItem("goovo_winners", JSON.stringify(updated));
};

function Winner() {
  const [winnersList, setWinnersList] = useState([]);

  // LocalStorage se winners load karne ke liye
  useEffect(() => {
    const savedWinners = JSON.parse(localStorage.getItem("goovo_winners")) || [];
    setWinnersList(savedWinners);
  }, []);

  return (
    <div className="winner-container">
      <h2 className="winner-title">🏆 Recent Lucky Draw Winners</h2>
      <p className="winner-subtitle">
        Har 7-8 din baad honay walay Bumper Draw ke lucky winners ki list!
      </p>

      {winnersList.length === 0 ? (
        <div className="no-winners-card">
          <div className="empty-icon">🎲</div>
          <h3>Abhi tak koi winner nahi hua!</h3>
          <p>Bumper draw spin hone ke baad winners ke naam automatically yahan display honge.</p>
        </div>
      ) : (
        <div className="winner-grid">
          {winnersList.map((item) => (
            <div key={item.id} className="winner-card">
              <div className="winner-badge">{item.avatar}</div>
              <div className="winner-info">
                <h3>{item.name}</h3>
                <p className="prize-name">{item.prize}</p>
                <div className="winner-meta">
                  <span>
                    Ticket: <strong>{item.ticket}</strong>
                  </span>
                  <span>Date: {item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Winner;