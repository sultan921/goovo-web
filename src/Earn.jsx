import { useState, useEffect } from "react";

console.log("🔥 PROFESSIONAL ARCADE LOADED WITH STRICT AD VERIFICATION");

function Earn({ addCoins }) {
  const [selectedGame, setSelectedGame] = useState(null);

  // ---------------- STATE FOR ADS & GAME WIN COUNTER ----------------
  const [winsCount, setWinsCount] = useState(0);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adTimer, setAdTimer] = useState(5);
  const [adStatus, setAdStatus] = useState("idle"); // 'idle' | 'loading' | 'playing' | 'completed' | 'error'
  const [adMessage, setAdMessage] = useState("");

  // ---------------- STATE FOR 10-MINUTE PLAYTIME REWARD ----------------
  const [playTimeSeconds, setPlayTimeSeconds] = useState(0);
  const [timeRewardClaimed, setTimeRewardClaimed] = useState(false);

  // 10 Minutes Timer Hook (600 seconds)
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setPlayTimeSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Helper to record game win & trigger Ad Modal every 4 wins
  const registerWin = (coinsEarned = 0) => {
    // Immediate win coins (if any)
    if (coinsEarned > 0 && addCoins) {
      addCoins(coinsEarned);
    }

    setWinsCount((prev) => {
      const newWinCount = prev + 1;
      if (newWinCount % 4 === 0) {
        // Trigger Ad Flow on every 4th win
        triggerAdFlow();
      }
      return newWinCount;
    });
  };

  // Function to Trigger Ad Loading & Availability Check
  const triggerAdFlow = () => {
    setShowAdModal(true);
    setAdStatus("loading");
    setAdMessage("Ads search kiye ja rahe hain...");

    // Simulating Ad SDK Load / Check Availability
    setTimeout(() => {
      // Example condition: Set to true if Ad Network delivers ad, false if no ads available
      const isAdAvailable = Math.random() > 0.1; // 90% chance ad loads (Change to your AdMob / SDK check)

      if (isAdAvailable) {
        setAdStatus("playing");
        setAdTimer(5);
        setAdMessage("Ad chal raha hai...");
      } else {
        setAdStatus("error");
        setAdMessage("❌ Ads abhi available nahi hain! Kuch waqt baad koshish karein.");
      }
    }, 1500);
  };

  // Video Ad Countdown Hook
  useEffect(() => {
    let interval;
    if (showAdModal && adStatus === "playing" && adTimer > 0) {
      interval = setInterval(() => {
        setAdTimer((prev) => prev - 1);
      }, 1000);
    } else if (adTimer === 0 && adStatus === "playing") {
      setAdStatus("completed");
      setAdMessage("🎉 Ad Poora Dekh Liya Gaya Hai!");
    }
    return () => clearInterval(interval);
  }, [showAdModal, adStatus, adTimer]);

  // Handle Reward Claiming after Ad Completion
  const handleClaimAdReward = () => {
    if (adStatus === "completed") {
      if (addCoins) addCoins(10); // Reward given ONLY after full ad completion
      setShowAdModal(false);
      setAdStatus("idle");
    }
  };

  // Close Modal when Ad Fails / Not Available
  const handleCloseAdModal = () => {
    setShowAdModal(false);
    setAdStatus("idle");
  };

  // Handle Playtime Reward Claim
  const handleClaimTimeReward = () => {
    if (playTimeSeconds >= 600 && !timeRewardClaimed) {
      if (addCoins) addCoins(20);
      setTimeRewardClaimed(true);
    }
  };

  // ---------------- GAME STATES ----------------
  // 1. Guess Number
  const [secret, setSecret] = useState(null);
  const [guess, setGuess] = useState("");
  const [guessMessage, setGuessMessage] = useState("");
  const [guessWon, setGuessWon] = useState(false);

  // 2. Rock Paper Scissors
  const [rpsResult, setRpsResult] = useState("");

  // 3. Quiz
  const questions = [
    {
      question: "Which language is used with React?",
      options: ["JavaScript", "Python", "PHP", "C++"],
      answer: "JavaScript",
    },
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyper Tool Markup Language",
        "Home Text Language",
      ],
      answer: "HyperText Markup Language",
    },
    {
      question: "Which hook is used for state in React?",
      options: ["useState", "useColor", "useData", "useHTML"],
      answer: "useState",
    },
  ];

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizMessage, setQuizMessage] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);

  // 4. Memory
  const [memoryCards, setMemoryCards] = useState([]);
  const [memorySelected, setMemorySelected] = useState([]);
  const [memoryMatched, setMemoryMatched] = useState([]);
  const [memoryMessage, setMemoryMessage] = useState("");

  // 5. Reaction
  const [reactionStatus, setReactionStatus] = useState("waiting");
  const [reactionStart, setReactionStart] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);

  // 6. Math
  const [mathQuestion, setMathQuestion] = useState(null);
  const [mathAnswer, setMathAnswer] = useState("");
  const [mathMessage, setMathMessage] = useState("");

  // 7. Coin Flip
  const [coinResult, setCoinResult] = useState("");

  // 8. Dice Roller
  const [diceVal, setDiceVal] = useState(1);
  const [diceMessage, setDiceMessage] = useState("");

  // 9. Spin Wheel Slot
  const [slots, setSlots] = useState(["🍒", "🍋", "🍊"]);
  const [slotMessage, setSlotMessage] = useState("");

  // 10. Word Scramble
  const wordList = [
    { word: "REACT", scrambled: "TCERA" },
    { word: "GOOVO", scrambled: "OOVOG" },
    { word: "COINS", scrambled: "NICO1" },
    { word: "SMART", scrambled: "MTSAR" },
  ];
  const [wordIdx, setWordIdx] = useState(0);
  const [wordInput, setWordInput] = useState("");
  const [wordMessage, setWordMessage] = useState("");

  // 11. High or Low
  const [cardCurrent, setCardCurrent] = useState(5);
  const [cardMessage, setCardMessage] = useState("");

  // 12. Tic Tac Toe
  const [tttBoard, setTttBoard] = useState(Array(9).fill(null));
  const [tttMsg, setTttMsg] = useState("");

  // 13. Color Matcher
  const colorNames = ["RED", "BLUE", "GREEN", "YELLOW"];
  const colorCodes = ["red", "blue", "green", "gold"];
  const [targetColor, setTargetColor] = useState({ text: "", color: "" });
  const [colorMsg, setColorMsg] = useState("");

  // 14. Tap Speed
  const [tapScore, setTapScore] = useState(0);
  const [tapTimer, setTapTimer] = useState(5);
  const [tapActive, setTapActive] = useState(false);
  const [tapMsg, setTapMsg] = useState("");

  // 15. Simon Says Pattern
  const [simonPattern, setSimonPattern] = useState([]);
  const [simonUserStep, setSimonUserStep] = useState(0);
  const [simonMsg, setSimonMsg] = useState("");

  // 16. Whack Mole
  const [molePos, setMolePos] = useState(null);
  const [moleScore, setMoleScore] = useState(0);
  const [moleActive, setMoleActive] = useState(false);

  // ALL 16 GAMES DATA
  const games = [
    { id: 1, icon: "🎯", title: "Guess the Number", description: "Test your skill & guess the secret number." },
    { id: 2, icon: "✂️", title: "Rock Paper Scissors", description: "Outsmart the computer AI opponent." },
    { id: 3, icon: "🧠", title: "Quick Quiz", description: "Test your general tech knowledge." },
    { id: 4, icon: "🃏", title: "Memory Match", description: "Match all card pairs to win." },
    { id: 5, icon: "⚡", title: "Reaction Game", description: "Test your fast reflexes and reaction speed." },
    { id: 6, icon: "🔢", title: "Math Challenge", description: "Solve quick math puzzles accurately." },
    { id: 7, icon: "🪙", title: "Coin Flip", description: "Test your luck in heads or tails." },
    { id: 8, icon: "🎲", title: "Dice Roll", description: "Roll high numbers to clear the stage." },
    { id: 9, icon: "🎰", title: "Slot Machine", description: "Match symbols in the spin wheel." },
    { id: 10, icon: "🔤", title: "Word Scramble", description: "Unscramble the secret words." },
    { id: 11, icon: "🎴", title: "High or Low", description: "Predict the next card sequence." },
    { id: 12, icon: "🔲", title: "Tic Tac Toe", description: "Beat the intelligent AI player." },
    { id: 13, icon: "🎨", title: "Color Matcher", description: "Match true text colors accurately." },
    { id: 14, icon: "👆", title: "Tap Speed Test", description: "Fast finger tapping speed test." },
    { id: 15, icon: "🟢", title: "Simon Pattern", description: "Memorize & repeat color patterns." },
    { id: 16, icon: "💥", title: "Whack-A-Target", description: "Hit moving targets rapidly." },
  ];

  function selectGame(game) {
    setSelectedGame(game);
    if (game.id === 1) startGuess();
    if (game.id === 2) setRpsResult("");
    if (game.id === 3) { setQuizIndex(0); setQuizMessage(""); setQuizFinished(false); }
    if (game.id === 4) startMemory();
    if (game.id === 5) startReaction();
    if (game.id === 6) newMathQuestion();
    if (game.id === 7) setCoinResult("");
    if (game.id === 8) { setDiceVal(1); setDiceMessage(""); }
    if (game.id === 9) { setSlots(["🍒", "🍋", "🍊"]); setSlotMessage(""); }
    if (game.id === 10) { setWordIdx(0); setWordInput(""); setWordMessage(""); }
    if (game.id === 11) { setCardCurrent(Math.floor(Math.random() * 10) + 1); setCardMessage(""); }
    if (game.id === 12) { setTttBoard(Array(9).fill(null)); setTttMsg(""); }
    if (game.id === 13) startColorGame();
    if (game.id === 14) { setTapScore(0); setTapTimer(5); setTapActive(false); setTapMsg(""); }
    if (game.id === 15) startSimon();
    if (game.id === 16) startMole();
  }

  // Game Handlers
  function startGuess() { setSecret(Math.floor(Math.random() * 10) + 1); setGuess(""); setGuessMessage(""); setGuessWon(false); }
  function checkGuess() {
    const num = Number(guess);
    if (num === secret) {
      setGuessMessage("🎉 Correct! Stage Cleared.");
      setGuessWon(true);
      registerWin();
    } else if (num < secret) setGuessMessage("📈 Too low!");
    else setGuessMessage("📉 Too high!");
    setGuess("");
  }

  function playRPS(choice) {
    const opts = ["Rock", "Paper", "Scissors"];
    const comp = opts[Math.floor(Math.random() * opts.length)];
    if (choice === comp) setRpsResult(`🤝 Draw! Computer chose ${comp}.`);
    else if ((choice === "Rock" && comp === "Scissors") || (choice === "Paper" && comp === "Rock") || (choice === "Scissors" && comp === "Paper")) {
      setRpsResult(`🎉 You Win!`);
      registerWin();
    } else setRpsResult(`😔 You Lose! Computer chose ${comp}.`);
  }

  function answerQuiz(option) {
    if (option === questions[quizIndex].answer) {
      if (quizIndex === questions.length - 1) {
        setQuizMessage("🎉 All correct! Quiz Cleared.");
        setQuizFinished(true);
        registerWin();
      } else {
        setQuizMessage("✅ Correct!");
        setTimeout(() => { setQuizIndex((old) => old + 1); setQuizMessage(""); }, 600);
      }
    } else setQuizMessage("❌ Wrong answer!");
  }

  function startMemory() {
    const cards = ["🍎", "🍎", "🚀", "🚀", "⭐", "⭐", "🎮", "🎮"];
    setMemoryCards(cards.sort(() => Math.random() - 0.5));
    setMemorySelected([]); setMemoryMatched([]); setMemoryMessage("");
  }
  function selectMemory(idx) {
    if (memorySelected.includes(idx) || memoryMatched.includes(idx) || memorySelected.length === 2) return;
    const newSel = [...memorySelected, idx];
    setMemorySelected(newSel);
    if (newSel.length === 2) {
      if (memoryCards[newSel[0]] === memoryCards[newSel[1]]) {
        const newMatched = [...memoryMatched, newSel[0], newSel[1]];
        setMemoryMatched(newMatched); setMemorySelected([]);
        if (newMatched.length === memoryCards.length) {
          setMemoryMessage("🎉 You matched all pairs!");
          registerWin();
        }
      } else setTimeout(() => setMemorySelected([]), 700);
    }
  }

  function startReaction() { setReactionStatus("waiting"); setReactionTime(null); setTimeout(() => { setReactionStatus("GO"); setReactionStart(Date.now()); }, Math.random() * 2000 + 1500); }
  function reactNow() {
    if (reactionStatus !== "GO") return;
    const time = Date.now() - reactionStart;
    setReactionTime(time); setReactionStatus("finished");
    if (time < 1000) registerWin();
  }

  function newMathQuestion() {
    const a = Math.floor(Math.random() * 20) + 1, b = Math.floor(Math.random() * 20) + 1;
    setMathQuestion({ a, b, answer: a + b }); setMathAnswer(""); setMathMessage("");
  }
  function checkMath() {
    if (Number(mathAnswer) === mathQuestion.answer) {
      setMathMessage("🎉 Correct Answer!");
      registerWin();
    } else setMathMessage("❌ Wrong answer!");
  }

  function flipCoin(choice) {
    const res = Math.random() > 0.5 ? "Heads" : "Tails";
    if (choice === res) {
      setCoinResult(`🎉 Result: ${res}. You Won!`);
      registerWin();
    } else setCoinResult(`😔 Result: ${res}. You lost!`);
  }

  function rollDice() {
    const val = Math.floor(Math.random() * 6) + 1;
    setDiceVal(val);
    if (val >= 5) {
      setDiceMessage(`🎉 Rolled ${val}! Stage Cleared!`);
      registerWin();
    } else setDiceMessage(`🎲 Rolled ${val}. Try for 5 or 6!`);
  }

  function spinSlot() {
    const icons = ["🍒", "🍋", "🍊", "💎", "7️⃣"];
    const s1 = icons[Math.floor(Math.random() * icons.length)];
    const s2 = icons[Math.floor(Math.random() * icons.length)];
    const s3 = icons[Math.floor(Math.random() * icons.length)];
    setSlots([s1, s2, s3]);
    if (s1 === s2 && s2 === s3) {
      setSlotMessage("🎉 JACKPOT WON!");
      registerWin();
    } else setSlotMessage("Try again!");
  }

  function checkWord() {
    if (wordInput.trim().toUpperCase() === wordList[wordIdx].word) {
      setWordMessage("🎉 Correct Word Unscrambled!");
      registerWin();
    } else setWordMessage("❌ Wrong word, try again!");
  }

  function guessHighLow(isHigher) {
    const next = Math.floor(Math.random() * 10) + 1;
    const won = isHigher ? next >= cardCurrent : next <= cardCurrent;
    if (won) {
      setCardMessage(`🎉 Next card was ${next}! You won.`);
      registerWin();
    } else setCardMessage(`😔 Next card was ${next}! Try again.`);
    setCardCurrent(next);
  }

  function handleTttClick(idx) {
    if (tttBoard[idx] || tttMsg) return;
    const newB = [...tttBoard]; newB[idx] = "❌";
    setTttBoard(newB);
    if (checkTttWinner(newB, "❌")) {
      setTttMsg("🎉 You Beat AI!");
      registerWin();
      return;
    }
    const empty = newB.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);
    if (empty.length > 0) {
      const aiChoice = empty[Math.floor(Math.random() * empty.length)];
      newB[aiChoice] = "⭕";
      setTttBoard(newB);
      if (checkTttWinner(newB, "⭕")) setTttMsg("😔 AI Won!");
    }
  }
  function checkTttWinner(b, p) {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return wins.some((w) => w.every((i) => b[i] === p));
  }

  function startColorGame() {
    const randText = colorNames[Math.floor(Math.random() * colorNames.length)];
    const randCode = colorCodes[Math.floor(Math.random() * colorCodes.length)];
    setTargetColor({ text: randText, color: randCode });
    setColorMsg("");
  }
  function checkColor(chosenCode) {
    if (chosenCode === targetColor.color) {
      setColorMsg("🎉 Correct Color Match!");
      registerWin();
    } else setColorMsg("❌ Wrong match!");
  }

  function tapNow() {
    if (!tapActive) { setTapActive(true); setTapScore(1); return; }
    setTapScore((s) => s + 1);
  }
  useEffect(() => {
    let interval;
    if (tapActive && tapTimer > 0) {
      interval = setInterval(() => setTapTimer((t) => t - 1), 1000);
    } else if (tapTimer === 0) {
      setTapActive(false);
      if (tapScore >= 25) {
        setTapMsg(`🎉 Fast Tapper! ${tapScore} taps! Challenge cleared!`);
        registerWin();
      } else setTapMsg(`😔 You tapped ${tapScore} times. Need 25+ taps!`);
    }
    return () => clearInterval(interval);
  }, [tapActive, tapTimer]);

  function startSimon() {
    const pat = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    setSimonPattern(pat); setSimonUserStep(0); setSimonMsg("Watch the order & repeat!");
  }
  function simonTap(idx) {
    if (simonPattern.length === 0) return;
    if (simonPattern[simonUserStep] === idx) {
      if (simonUserStep === simonPattern.length - 1) {
        setSimonMsg("🎉 Pattern Cleared!");
        registerWin();
      } else setSimonUserStep((s) => s + 1);
    } else setSimonMsg("❌ Wrong sequence!");
  }

  function startMole() { setMoleScore(0); setMoleActive(true); setMolePos(Math.floor(Math.random() * 6)); }
  function whack(idx) {
    if (!moleActive) return;
    if (idx === molePos) {
      const nextScore = moleScore + 1;
      setMoleScore(nextScore);
      if (nextScore >= 5) {
        setMoleActive(false);
        registerWin();
      } else setMolePos(Math.floor(Math.random() * 6));
    }
  }

  // Format MM:SS for timer
  const formattedMinutes = Math.floor(playTimeSeconds / 60);
  const formattedSeconds = playTimeSeconds % 60;
  const progressPercent = Math.min(100, Math.floor((playTimeSeconds / 600) * 100));

  return (
    <main className="section" style={{ position: "relative" }}>
      {/* FULLSCREEN AD MODAL AFTER 4 WINS */}
      {showAdModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            color: "#fff",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              border: adStatus === "error" ? "2px solid #ef4444" : "2px solid #38bdf8",
              padding: "30px",
              borderRadius: "16px",
              textAlign: "center",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>
              {adStatus === "error" ? "⚠️" : "📺"}
            </div>
            <h2 style={{ margin: "0 0 10px 0", color: adStatus === "error" ? "#ef4444" : "#38bdf8" }}>
              {adStatus === "error" ? "Ads Not Available" : "Sponsor Video Ad"}
            </h2>
            
            <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>
              {adMessage}
            </p>

            {adStatus === "playing" && (
              <div
                style={{
                  background: "#0f172a",
                  padding: "20px",
                  borderRadius: "10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  border: "1px dashed #475569",
                }}
              >
                Ad Playing... ({adTimer}s)
              </div>
            )}

            {/* BUTTON LOGIC: ONLY ACTIVE WHEN AD COMPLETED OR WHEN ERROR OCCURS */}
            {adStatus === "completed" ? (
              <button
                onClick={handleClaimAdReward}
                className="primary-button"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#22c55e",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Claim +10 Coins & Continue ▶
              </button>
            ) : adStatus === "error" ? (
              <button
                onClick={handleCloseAdModal}
                className="primary-button"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#ef4444",
                  cursor: "pointer",
                }}
              >
                Close (No Coins Earned)
              </button>
            ) : (
              <button
                disabled
                className="primary-button"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#475569",
                  cursor: "not-allowed",
                }}
              >
                {adStatus === "loading" ? "Searching Ads..." : `Please Wait (${adTimer}s)`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* TOP HEADER & TIME PLAY REWARD BANNER */}
      <div style={{ marginBottom: "20px" }}>
        <p className="small-title">GOOVO ARCADE</p>
        <h1 style={{ margin: "0 0 10px 0" }}>🎮 Arcade Hub ({games.length} Games)</h1>

        {/* PROFESSIONAL TIME REWARD BANNER */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            border: "1px solid #334155",
            borderRadius: "12px",
            padding: "16px 20px",
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <h3 style={{ margin: 0, color: "#38bdf8", fontSize: "16px" }}>
                ⏱️ Play 10 Minutes & Earn +20 Coins Extra
              </h3>
              <p style={{ margin: "4px 0 0 0", color: "#94a3b8", fontSize: "13px" }}>
                Keep playing arcade games! Your play time accumulates automatically.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              {playTimeSeconds >= 600 && !timeRewardClaimed ? (
                <button
                  onClick={handleClaimTimeReward}
                  style={{
                    padding: "8px 12px",
                    background: "#22c55e",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Claim +20 Coins
                </button>
              ) : (
                <span style={{ fontSize: "18px", fontWeight: "bold", color: timeRewardClaimed ? "#4ade80" : "#f59e0b" }}>
                  {timeRewardClaimed ? "✅ Reward Claimed" : `${formattedMinutes}m ${formattedSeconds < 10 ? "0" : ""}${formattedSeconds}s / 10m`}
                </span>
              )}
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div style={{ width: "100%", height: "8px", background: "#334155", borderRadius: "4px", overflow: "hidden" }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: timeRewardClaimed ? "#4ade80" : "linear-gradient(90deg, #38bdf8, #818cf8)",
                transition: "width 1s linear",
              }}
            />
          </div>
        </div>
      </div>

      {/* ACTIVE GAME RENDER */}
      {selectedGame ? (
        <div>
          <button className="secondary-button" onClick={() => setSelectedGame(null)}>
            ← Back to Games Hub
          </button>

          {selectedGame.id === 1 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>🎯 Guess the Number</h2>
              <input type="number" value={guess} onChange={(e) => setGuess(e.target.value)} disabled={guessWon} placeholder="1 - 10" />
              <br /><button className="primary-button" onClick={checkGuess} disabled={guessWon} style={{ marginTop: "10px" }}>Guess</button>
              <h3>{guessMessage}</h3>
              {guessWon && <button className="secondary-button" onClick={startGuess}>🔄 Play Again</button>}
            </div>
          )}

          {selectedGame.id === 2 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>✂️ Rock Paper Scissors</h2>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
                <button className="secondary-button" onClick={() => playRPS("Rock")}>🪨 Rock</button>
                <button className="secondary-button" onClick={() => playRPS("Paper")}>📄 Paper</button>
                <button className="secondary-button" onClick={() => playRPS("Scissors")}>✂️ Scissors</button>
              </div>
              <h3>{rpsResult}</h3>
            </div>
          )}

          {selectedGame.id === 3 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>🧠 Quick Quiz</h2>
              {!quizFinished ? (
                <>
                  <h3>{questions[quizIndex].question}</h3>
                  <div style={{ display: "grid", gap: "8px", marginTop: "15px" }}>
                    {questions[quizIndex].options.map((opt) => (
                      <button key={opt} className="secondary-button" onClick={() => answerQuiz(opt)}>{opt}</button>
                    ))}
                  </div>
                  <h3>{quizMessage}</h3>
                </>
              ) : (
                <button className="primary-button" onClick={() => selectGame(selectedGame)}>🔄 Play Again</button>
              )}
            </div>
          )}

          {selectedGame.id === 4 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>🃏 Memory Match</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 70px)", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
                {memoryCards.map((card, idx) => (
                  <button key={idx} onClick={() => selectMemory(idx)} style={{ height: "70px", fontSize: "24px" }}>
                    {memorySelected.includes(idx) || memoryMatched.includes(idx) ? card : "❓"}
                  </button>
                ))}
              </div>
              <h3>{memoryMessage}</h3>
            </div>
          )}

          {selectedGame.id === 5 && (
            <div className="action-card" style={{ marginTop: "20px", textAlign: "center" }}>
              <h2>⚡ Reaction Game</h2>
              <button onClick={reactNow} style={{ padding: "30px", fontSize: "22px", marginTop: "15px", width: "200px" }}>
                {reactionStatus === "waiting" && "WAIT..."}
                {reactionStatus === "GO" && "CLICK NOW!"}
                {reactionStatus === "finished" && `${reactionTime} ms`}
              </button>
              {reactionStatus === "finished" && <button className="secondary-button" onClick={startReaction} style={{ display: "block", margin: "15px auto" }}>🔄 Try Again</button>}
            </div>
          )}

          {selectedGame.id === 6 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>🔢 Math Challenge</h2>
              {mathQuestion && (
                <>
                  <h3>{mathQuestion.a} + {mathQuestion.b} = ?</h3>
                  <input type="number" value={mathAnswer} onChange={(e) => setMathAnswer(e.target.value)} />
                  <br /><button className="primary-button" onClick={checkMath} style={{ marginTop: "10px" }}>Submit</button>
                  <h3>{mathMessage}</h3>
                  <button className="secondary-button" onClick={newMathQuestion}>🔄 Next</button>
                </>
              )}
            </div>
          )}

          {selectedGame.id === 7 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>🪙 Coin Flip</h2>
              <p>Pick Heads or Tails:</p>
              <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginTop: "15px" }}>
                <button className="primary-button" onClick={() => flipCoin("Heads")}>Heads</button>
                <button className="primary-button" onClick={() => flipCoin("Tails")}>Tails</button>
              </div>
              <h3>{coinResult}</h3>
            </div>
          )}

          {selectedGame.id === 8 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>🎲 Dice Roll</h2>
              <div style={{ fontSize: "60px", margin: "15px 0" }}>{diceVal}</div>
              <button className="primary-button" onClick={rollDice}>Roll Dice</button>
              <h3>{diceMessage}</h3>
            </div>
          )}

          {selectedGame.id === 9 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>🎰 Slot Machine</h2>
              <div style={{ fontSize: "40px", letterSpacing: "15px", margin: "15px 0" }}>
                {slots.join(" ")}
              </div>
              <button className="primary-button" onClick={spinSlot}>Spin Wheel</button>
              <h3>{slotMessage}</h3>
            </div>
          )}

          {selectedGame.id === 10 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>🔤 Word Scramble</h2>
              <h3>Scrambled: {wordList[wordIdx].scrambled}</h3>
              <input type="text" value={wordInput} onChange={(e) => setWordInput(e.target.value)} placeholder="Type word" />
              <br /><button className="primary-button" onClick={checkWord} style={{ marginTop: "10px" }}>Submit</button>
              <h3>{wordMessage}</h3>
            </div>
          )}

          {selectedGame.id === 11 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>🎴 High or Low</h2>
              <h3>Current Card: {cardCurrent}</h3>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
                <button className="primary-button" onClick={() => guessHighLow(true)}>Higher ⬆️</button>
                <button className="primary-button" onClick={() => guessHighLow(false)}>Lower ⬇️</button>
              </div>
              <h3>{cardMessage}</h3>
            </div>
          )}

          {selectedGame.id === 12 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>🔲 Tic Tac Toe</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 60px)", gap: "8px", justifyContent: "center", marginTop: "15px" }}>
                {tttBoard.map((val, i) => (
                  <button key={i} onClick={() => handleTttClick(i)} style={{ height: "60px", fontSize: "20px" }}>{val}</button>
                ))}
              </div>
              <h3>{tttMsg}</h3>
              {tttMsg && <button className="secondary-button" onClick={() => selectGame(selectedGame)}>Restart</button>}
            </div>
          )}

          {selectedGame.id === 13 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>🎨 Color Matcher</h2>
              <p>Click the button matching the TEXT COLOR below:</p>
              <h1 style={{ color: targetColor.color, fontSize: "36px" }}>{targetColor.text}</h1>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                {colorCodes.map((code) => (
                  <button key={code} onClick={() => checkColor(code)} style={{ background: code, color: "#fff", padding: "10px 15px", border: "none", borderRadius: "8px" }}>{code}</button>
                ))}
              </div>
              <h3>{colorMsg}</h3>
              <button className="secondary-button" onClick={startColorGame} style={{ marginTop: "10px" }}>Next Round</button>
            </div>
          )}

          {selectedGame.id === 14 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>👆 Tap Speed Test</h2>
              <h3>Time Left: {tapTimer}s | Taps: {tapScore}</h3>
              <button onClick={tapNow} className="primary-button" style={{ padding: "20px 40px", fontSize: "20px" }}>
                {tapActive ? "TAP TAP TAP!" : "START TAPPING"}
              </button>
              <h3>{tapMsg}</h3>
            </div>
          )}

          {selectedGame.id === 15 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>🟢 Simon Says</h2>
              <p>Pattern sequence length: {simonPattern.length}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width: "160px", margin: "15px auto" }}>
                {["red", "blue", "green", "yellow"].map((c, i) => (
                  <button key={c} onClick={() => simonTap(i)} style={{ background: c, height: "60px", border: "none", borderRadius: "8px" }} />
                ))}
              </div>
              <h3>{simonMsg}</h3>
              <button className="secondary-button" onClick={startSimon}>Start Pattern</button>
            </div>
          )}

          {selectedGame.id === 16 && (
            <div className="action-card" style={{ marginTop: "20px" }}>
              <h2>💥 Whack-A-Target</h2>
              <h3>Score: {moleScore} / 5</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 70px)", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <button key={i} onClick={() => whack(i)} style={{ height: "70px", fontSize: "28px" }}>
                    {molePos === i ? "🎯" : "⭕"}
                  </button>
                ))}
              </div>
              {moleScore >= 5 && <h3>🎉 Whacked all targets!</h3>}
              {!moleActive && <button className="primary-button" onClick={startMole} style={{ marginTop: "15px" }}>Start Game</button>}
            </div>
          )}
        </div>
      ) : (
        /* MAIN HUB GRID */
        <div className="cards">
          {games.map((game) => (
            <div className="action-card" key={game.id}>
              <div className="card-icon">{game.icon}</div>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <button className="primary-button" onClick={() => selectGame(game)}>
                Play Now
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Earn;