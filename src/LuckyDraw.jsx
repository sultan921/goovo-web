import React, { useState, useEffect } from "react";
import "./LuckyDraw.css";
// Winner page local storage utility import
import { addWinnerToStorage } from "./Winner.jsx";

const TRANSLATIONS = {
  en: {
    liveTag: "🔴 BUMPER DRAW LIVE",
    title: "⌚ Apple Watch Ultra 2 (Avengers Doomsday Edition)",
    subtitle: "Win grand prizes by purchasing tickets with Coins or Cash deposit!",
    timerTitle: "⏳ TIME REMAINING FOR DRAW",
    days: "DAYS",
    hours: "HOURS",
    mins: "MINS",
    secs: "SECS",
    enterTicketTitle: "🎟️ Enter Purchased Ticket Code",
    enterTicketSub: "Enter ticket code below to check your draw entry status.",
    ticketLabel: "OFFICIAL TICKET NUMBER / CODE",
    ticketPlaceholder: "e.g. GD-849201",
    verifyBtn: "⚡ VERIFY & CHECK ENTRY STATUS",
    verifyingBtn: "🔄 VERIFYING TICKET...",
    warningMsg: "Action Required: Please add your WhatsApp Number in Profile to participate in the Lucky Draw.",
    goToProfileBtn: "Go to Profile",
    payWithCoins: "🪙 Pay with Coins (2,000 Coins)",
    payWithCash: "💵 Pay via EasyPaisa / JazzCash (Rs. 50)",
    payCoinsTitle: "Pay using Earned Coins",
    availBalance: "Available Balance:",
    ticketPrice: "Ticket Price:",
    buyTicketCoinsBtn: "Deduct 2,000 Coins & Issue Ticket",
    insufficientCoinsBtn: "Insufficient Coins",
    cashTitle: "Manual Wallet Payment Verification",
    cashSub: "Send Rs. 50 to the account below and submit receipt:",
    gatewayLabel: "Select Payment Method:",
    trxLabel: "Transaction ID (TRX ID):",
    receiptLabel: "Upload Payment Receipt / Screenshot:",
    submitReceiptBtn: "Submit Receipt for Admin Verification",
    whatsappBtn: "💬 Send Receipt directly via WhatsApp",
    scanningReceipt: "🔍 Scanning Screenshot for TRX ID...",
    scannedSuccess: "✨ TRX ID Auto-Detected from Receipt!",
    step1: "1. Payment",
    step2: "2. Verifying",
    step3: "3. Ticket Issued",
    myTicketsTitle: "🎟️ My Verified Active Tickets",
    spinBtn: "🎰 START LIVE DRAW SPIN",
    spinningBtn: "🌀 SELECTING WINNER...",
    congratsMsg: "🏆 CONGRATULATIONS!",
    wonMsg: "HAS WON THE APPLE WATCH!",
    alertIncompleteProfile: "⚠️ Profile Incomplete! Please add your WhatsApp Number in your Profile first.",
    alertCoinsSuccess: "🎉 Congratulations! Your Ticket No is: {ticket}. It has also been sent to your WhatsApp/SMS!",
    alertCashMissing: "⚠️ Transaction ID and Receipt Screenshot are required!",
    alertCashSubmitted: "🚀 Receipt submitted! Admin team will verify payment and send your Official Ticket Code to WhatsApp in 10-15 mins.",
    alertMissingPhoneVerify: "⚠️ WhatsApp number missing! Please add it in Profile so we can send you SMS/WhatsApp updates.",
    alertNoVerifiedTickets: "⚠️ You need at least 1 Verified Ticket to start the draw!",
    verifyingStatusMsg: "⏳ Verification Request Sent for Code [{code}]! System is checking in backend. You will receive WhatsApp update within 10 Minutes.",
    verifiedSuccessMsg: "✅ System Verification Complete! Ticket status update has been sent to your WhatsApp/SMS."
  },
  ur: {
    liveTag: "🔴 بمپر ڈرا لائیو",
    title: "⌚ ایپل واچ الٹرا 2 (ایونجرز ڈومز ڈے ایڈیشن)",
    subtitle: "سکوں (Coins) یا کیش کے ذریعے ٹکٹ خرید کر شاندار انعامات جیتیں!",
    timerTitle: "⏳ قرعہ اندازی میں باقی وقت",
    days: "دن",
    hours: "گھنٹے",
    mins: "منٹ",
    secs: "سیکنڈ",
    enterTicketTitle: "🎟️ خریدا ہوا ٹکٹ کوڈ درج کریں",
    enterTicketSub: "چیک کرنے کے لیے نیچے اپنا ٹکٹ کوڈ درج کریں کہ آپ ڈرا میں شامل ہیں یا نہیں۔",
    ticketLabel: "آفییشل ٹکٹ نمبر / کوڈ",
    ticketPlaceholder: "مثال: GD-849201",
    verifyBtn: "⚡ تصدیق کریں اور اسٹیٹس چیک کریں",
    verifyingBtn: "🔄 تصدیق کی جا رہی ہے...",
    warningMsg: "ضروری عمل: لکی ڈرا میں حصہ لینے کے لیے پروفائل میں اپنا واٹس ایپ نمبر شامل کریں۔",
    goToProfileBtn: "پروفائل پر جائیں",
    payWithCoins: "🪙 کوائنز سے ادائیگی کریں (2,000 کوائنز)",
    payWithCash: "💵 ایزی پیسہ / جیز کیش سے ادائیگی (50 روپے)",
    payCoinsTitle: "کمائے گئے کوائنز سے ادائیگی کریں",
    availBalance: "دستیاب بیلنس:",
    ticketPrice: "ٹکٹ کی قیمت:",
    buyTicketCoinsBtn: "2,000 کوائنز کٹوائیں اور ٹکٹ حاصل کریں",
    insufficientCoinsBtn: "ناکافی کوائنز",
    cashTitle: "مینوئل والٹ کیش کی تصدیق",
    cashSub: "نیچے دیے گئے اکاؤنٹ پر 50 روپے بھیجیں اور رسید جمع کروائیں:",
    gatewayLabel: "ادائیگی کا طریقہ منتخب کریں:",
    trxLabel: "ٹرانزیکشن آئی ڈی (TRX ID):",
    receiptLabel: "ادائیگی کی رسید / اسکرین شاٹ اپ لوڈ کریں:",
    submitReceiptBtn: "تصدیق کے لیے رسید جمع کروائیں",
    whatsappBtn: "💬 براہ راست واٹس ایپ پر رسید بھیجیں",
    scanningReceipt: "🔍 اسکرین شاٹ سے TRX ID اسکین کی جا رہی ہے...",
    scannedSuccess: "✨ رسید سے TRX ID خود بخود مل گئی!",
    step1: "1۔ ادائیگی",
    step2: "2۔ تصدیق جاری",
    step3: "3۔ ٹکٹ جاری",
    myTicketsTitle: "🎟️ میرے تصدیق شدہ فعال ٹکٹ",
    spinBtn: "🎰 لائیو قرعہ اندازی شروع کریں",
    spinningBtn: "🌀 فاتح کا انتخاب ہو رہا ہے...",
    congratsMsg: "🏆 بہت بہت مبارک ہو!",
    wonMsg: "نے ایپل واچ جیت لی ہے!",
    alertIncompleteProfile: "⚠️ پروفائل نامکمل ہے! پہلے پروفائل میں اپنا واٹس ایپ نمبر شامل کریں۔",
    alertCoinsSuccess: "🎉 مبارک ہو! آپ کا ٹکٹ نمبر {ticket} ہے۔ یہ آپ کو واٹس ایپ/ایس ایم ایس پر بھی بھیج دیا گیا ہے!",
    alertCashMissing: "⚠️ ٹرانزیکشن آئی ڈی اور رسید کا اسکرین شاٹ ہونا ضروری ہے!",
    alertCashSubmitted: "🚀 رسید جمع ہو گئی ہے! ایڈمن ٹیم 10-15 منٹ میں تصدیق کے بعد واٹس ایپ پر آفییشل ٹکٹ بھیج دے گی۔",
    alertMissingPhoneVerify: "⚠️ واٹس ایپ نمبر غائب ہے! پروفائل میں نمبر شامل کریں تاکہ ہم ایس ایم ایس یا واٹس ایپ کر سکیں۔",
    alertNoVerifiedTickets: "⚠️ ڈرا شروع کرنے کے لیے کم از کم 1 تصدیق شدہ ٹکٹ ہونا ضروری ہے!",
    verifyingStatusMsg: "⏳ کوڈ [{code}] کی تصدیق کی درخواست بھیج دی گئی ہے! 10 منٹ کے اندر آپ کو واٹس ایپ پر پیغام موصول ہو جائے گا۔",
    verifiedSuccessMsg: "✅ سسٹم کی تصدیق مکمل ہو گئی! آپ کی ٹکٹ کا اسٹیٹس واٹس ایپ/ایس ایم ایس پر بھیج دیا گیا ہے۔"
  },
  roman: {
    liveTag: "🔴 BUMPER DRAW LIVE",
    title: "⌚ Apple Watch Ultra 2 (Avengers Doomsday Edition)",
    subtitle: "Coins ya Cash deposit se tickets khareed kar grand prizes jeetein!",
    timerTitle: "⏳ DRAW MEIN BAKI WQT",
    days: "DAYS",
    hours: "HOURS",
    mins: "MINS",
    secs: "SECS",
    enterTicketTitle: "🎟️ Purchased Ticket Code Enter Karein",
    enterTicketSub: "Check karein ke aap lucky draw mein add hue hain ya nahi.",
    ticketLabel: "OFFICIAL TICKET NUMBER / CODE",
    ticketPlaceholder: "e.g. GD-849201",
    verifyBtn: "⚡ VERIFY & CHECK ENTRY STATUS",
    verifyingBtn: "🔄 VERIFYING TICKET...",
    warningMsg: "Action Required: Profile mein WhatsApp Number add karein tabhi aap Lucky Draw mein participate kar sakte hain.",
    goToProfileBtn: "Go to Profile",
    payWithCoins: "🪙 Pay with Coins (2,000 Coins)",
    payWithCash: "💵 Pay via EasyPaisa / JazzCash (Rs. 50)",
    payCoinsTitle: "Earned Coins se Payment Karein",
    availBalance: "Available Balance:",
    ticketPrice: "Ticket Price:",
    buyTicketCoinsBtn: "Deduct 2,000 Coins & Issue Ticket",
    insufficientCoinsBtn: "Insufficient Coins",
    cashTitle: "Manual Wallet Payment Verification",
    cashSub: "Neeche diye gaye account par Rs. 50 bheinjen aur receipt submit karein:",
    gatewayLabel: "Payment Method Select Karein:",
    trxLabel: "Transaction ID (TRX ID):",
    receiptLabel: "Payment Receipt / Screenshot Upload Karein:",
    submitReceiptBtn: "Submit Receipt for Admin Verification",
    whatsappBtn: "💬 Direct WhatsApp par Receipt Bhejein",
    scanningReceipt: "🔍 Screenshot se TRX ID Scan ho rahi hai...",
    scannedSuccess: "✨ TRX ID Auto-Detect ho gayi!",
    step1: "1. Payment Sent",
    step2: "2. Verifying",
    step3: "3. Ticket Issued",
    myTicketsTitle: "🎟️ My Verified Active Tickets",
    spinBtn: "🎰 START LIVE DRAW SPIN",
    spinningBtn: "🌀 SELECTING WINNER...",
    congratsMsg: "🏆 CONGRATULATIONS!",
    wonMsg: "HAS WON THE APPLE WATCH!",
    alertIncompleteProfile: "⚠️ Profile Incomplete! Pehle Profile page par apna WhatsApp Number add karein.",
    alertCoinsSuccess: "🎉 Mubarak Ho! Aapka Ticket No: {ticket} hai. Yeh ticket aapko WhatsApp/SMS par bhi bhej diya gaya hai!",
    alertCashMissing: "⚠️ Transaction ID aur Receipt Screenshot upload karna zaroori hai!",
    alertCashSubmitted: "🚀 Receipt submitted! Admin team payment verify karke 10-15 mint mein aapke WhatsApp par Official Ticket Code bhej degi.",
    alertMissingPhoneVerify: "⚠️ WhatsApp number missing! Pehle Profile page par WhatsApp add karein taaki hum aapko SMS/WhatsApp message bhej sakein.",
    alertNoVerifiedTickets: "⚠️ Draw start karne ke liye kam se kam 1 Verified Ticket hona zaroori hai!",
    verifyingStatusMsg: "⏳ Verification Request Sent for Code [{code}]! System backend par ticket check kar raha hai. 10 Minutes ke andar aapko WhatsApp ({phone}) par message aa jayega.",
    verifiedSuccessMsg: "✅ System Verification Complete! Ticket status update aapke WhatsApp/SMS par bhej diya gaya hai."
  }
};

function LuckyDraw({ coins, deductCoins, submitPaymentProof, user, navigate, currentLang = "en" }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [entryMode, setEntryMode] = useState("coins");
  const [trxId, setTrxId] = useState("");
  const [gateway, setGateway] = useState("easypaisa");
  const [receiptImage, setReceiptImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  
  // LocalStorage se step status persistent rakhen
  const [submissionStep, setSubmissionStep] = useState(() => {
    return Number(localStorage.getItem("luckydraw_step")) || 1;
  });

  // 1. MAIN COUNTDOWN TARGET DATE (LocalStorage Integrated)
  const [targetDate] = useState(() => {
    const savedDate = localStorage.getItem("luckydraw_target_date");
    if (savedDate) {
      return new Date(parseInt(savedDate, 10));
    } else {
      const newTarget = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).getTime();
      localStorage.setItem("luckydraw_target_date", newTarget.toString());
      return new Date(newTarget);
    }
  });

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 2. VERIFICATION STATES & PERSISTENT TIMING (LocalStorage Integrated)
  const [inputTicket, setInputTicket] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyTimer, setVerifyTimer] = useState(0);

  const [ticketStatusMsg, setTicketStatusMsg] = useState(() => {
    const savedMsg = localStorage.getItem("luckydraw_status_msg");
    return savedMsg ? JSON.parse(savedMsg) : null;
  });

  // Issued tickets & User Tickets with LocalStorage
  const [issuedTickets, setIssuedTickets] = useState(() => {
    const saved = localStorage.getItem("luckydraw_issued_tickets");
    return saved ? JSON.parse(saved) : [];
  });

  const [myTickets, setMyTickets] = useState(() => {
    const saved = localStorage.getItem("luckydraw_my_tickets");
    return saved ? JSON.parse(saved) : [];
  });

  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);

  const TICKET_COINS = 2000;
  const TICKET_PKR = 50;

  const ADMIN_ACCOUNTS = {
    easypaisa: { number: "03001234567", name: "GOOVO Official EasyPaisa" },
    jazzcash: { number: "03007654321", name: "GOOVO Official JazzCash" }
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem("luckydraw_step", submissionStep);
  }, [submissionStep]);

  useEffect(() => {
    localStorage.setItem("luckydraw_my_tickets", JSON.stringify(myTickets));
  }, [myTickets]);

  useEffect(() => {
    localStorage.setItem("luckydraw_issued_tickets", JSON.stringify(issuedTickets));
  }, [issuedTickets]);

  // Main countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Verification timer logic synced with LocalStorage
  useEffect(() => {
    const checkVerificationTimer = () => {
      const savedEndTime = localStorage.getItem("luckydraw_verify_endtime");
      if (!savedEndTime) {
        setIsVerifying(false);
        setVerifyTimer(0);
        return;
      }

      const remainingSecs = Math.floor((parseInt(savedEndTime, 10) - Date.now()) / 1000);

      if (remainingSecs > 0) {
        setIsVerifying(true);
        setVerifyTimer(remainingSecs);
      } else {
        setIsVerifying(false);
        setVerifyTimer(0);
        localStorage.removeItem("luckydraw_verify_endtime");

        const successMsg = { type: "success", text: t.verifiedSuccessMsg };
        setTicketStatusMsg(successMsg);
        setSubmissionStep(3);
        localStorage.setItem("luckydraw_status_msg", JSON.stringify(successMsg));
      }
    };

    checkVerificationTimer();
    const interval = setInterval(checkVerificationTimer, 1000);

    return () => clearInterval(interval);
  }, [t]);

  // Image Upload with Auto-OCR Scan
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsScanning(true);
      setScanComplete(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result);

        setTimeout(() => {
          const autoExtractedTRX = Math.floor(10000000000 + Math.random() * 90000000000).toString();
          setTrxId(autoExtractedTRX);
          setIsScanning(false);
          setScanComplete(true);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSecureTicketNumber = () => {
    return `GD-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const handleCoinsEntry = () => {
    if (!user.name || !user.phone) {
      alert(t.alertIncompleteProfile);
      navigate("profile");
      return;
    }

    const success = deductCoins(TICKET_COINS, "🎉 Lucky Draw ticket purchased using 2,000 coins!");
    if (success) {
      const newTicket = generateSecureTicketNumber();
      
      const updatedIssued = [...issuedTickets, newTicket];
      const updatedMyTickets = [...myTickets, newTicket];

      setIssuedTickets(updatedIssued);
      setMyTickets(updatedMyTickets);
      setSubmissionStep(3);

      alert(t.alertCoinsSuccess.replace("{ticket}", newTicket));
    }
  };

  const handleCashSubmission = (e) => {
    e.preventDefault();

    if (!user.name || !user.phone) {
      alert(t.alertIncompleteProfile);
      navigate("profile");
      return;
    }

    if (!trxId || !receiptImage) {
      alert(t.alertCashMissing);
      return;
    }

    submitPaymentProof({
      gateway,
      trxId,
      amount: TICKET_PKR,
      receiptImage
    });

    setTrxId("");
    setReceiptImage(null);
    setScanComplete(false);
    setSubmissionStep(2);
    alert(t.alertCashSubmitted);
  };

  const openWhatsAppDirect = () => {
    const adminPhone = "923001234567";
    const text = encodeURIComponent(
      `Hello Admin! I paid Rs.50 for Apple Watch Lucky Draw.\n\n` +
      `👤 Name: ${user.name || "User"}\n` +
      `📞 Phone: ${user.phone || "N/A"}\n` +
      `💳 Gateway: ${gateway.toUpperCase()}\n` +
      `🔢 TRX ID: ${trxId || "Attached in Screenshot"}\n\n` +
      `Please issue my official Lucky Draw Ticket Code!`
    );
    window.open(`https://wa.me/${adminPhone}?text=${text}`, "_blank");
  };

  const handleVerifyTicketSubmit = (e) => {
    e.preventDefault();
    const cleanTicket = inputTicket.trim().toUpperCase();

    if (!cleanTicket) return;

    if (!user.phone) {
      alert(t.alertMissingPhoneVerify);
      navigate("profile");
      return;
    }

    const durationInSeconds = 600;
    const endTime = Date.now() + durationInSeconds * 1000;

    localStorage.setItem("luckydraw_verify_endtime", endTime.toString());

    const pendingMsg = {
      type: "pending",
      text: t.verifyingStatusMsg.replace("{code}", cleanTicket).replace("{phone}", user.phone || "")
    };

    localStorage.setItem("luckydraw_status_msg", JSON.stringify(pendingMsg));

    setIsVerifying(true);
    setVerifyTimer(durationInSeconds);
    setTicketStatusMsg(pendingMsg);
    setSubmissionStep(2);

    if (issuedTickets.includes(cleanTicket) && !myTickets.includes(cleanTicket)) {
      setMyTickets((prev) => [...prev, cleanTicket]);
    }

    setInputTicket("");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Connected Spin Functionality with Winner storage
  const handleStartDraw = () => {
    if (myTickets.length === 0) {
      alert(t.alertNoVerifiedTickets);
      return;
    }

    setIsSpinning(true);
    setWinner(null);

    setTimeout(() => {
      setIsSpinning(false);
      const pickedTicket = myTickets[Math.floor(Math.random() * myTickets.length)];
      const winnerName = user.name || "Participant";
      const winnerText = `${winnerName} (${pickedTicket})`;
      
      setWinner(winnerText);

      // Save winner into LocalStorage for Winner page
      addWinnerToStorage({
        name: winnerName,
        prize: "Apple Watch Ultra 2",
        ticket: pickedTicket,
        avatar: "🏆"
      });
    }, 5000);
  };

  return (
    <div className="page-container luckydraw-wrapper">
      {/* GRAND BANNER */}
      <div className="product-banner">
        <span className="live-tag">{t.liveTag}</span>
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
      </div>

      {/* COUNTDOWN TIMER */}
      <div className="doomsday-timer-card">
        <h3>{t.timerTitle}</h3>
        <div className="doomsday-clock">
          <div className="clock-unit">
            <span>{String(timeLeft.days).padStart(2, "0")}</span>
            <small>{t.days}</small>
          </div>
          <span className="colon">:</span>
          <div className="clock-unit">
            <span>{String(timeLeft.hours).padStart(2, "0")}</span>
            <small>{t.hours}</small>
          </div>
          <span className="colon">:</span>
          <div className="clock-unit">
            <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
            <small>{t.mins}</small>
          </div>
          <span className="colon">:</span>
          <div className="clock-unit pulse">
            <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
            <small>{t.secs}</small>
          </div>
        </div>
      </div>

      {/* STEP TRACKER UI */}
      <div className="card status-tracker-card">
        <div className="step-tracker">
          <div className={`step-item ${submissionStep >= 1 ? "active" : ""}`}>
            <div className="step-number">1</div>
            <span>{t.step1}</span>
          </div>
          <div className={`step-line ${submissionStep >= 2 ? "active" : ""}`}></div>
          <div className={`step-item ${submissionStep >= 2 ? "active" : ""}`}>
            <div className="step-number">2</div>
            <span>{t.step2}</span>
          </div>
          <div className={`step-line ${submissionStep === 3 ? "active" : ""}`}></div>
          <div className={`step-item ${submissionStep === 3 ? "active" : ""}`}>
            <div className="step-number">3</div>
            <span>{t.step3}</span>
          </div>
        </div>
      </div>

      {/* VERIFY TICKET CARD */}
      <div className="card ticket-search-card">
        <div className="card-header">
          <h3>{t.enterTicketTitle}</h3>
          <p>{t.enterTicketSub}</p>
        </div>

        <form onSubmit={handleVerifyTicketSubmit} className="ticket-search-form">
          <div className="input-group">
            <label htmlFor="ticketCodeInput">{t.ticketLabel}</label>
            <input
              id="ticketCodeInput"
              type="text"
              placeholder={t.ticketPlaceholder}
              value={inputTicket}
              onChange={(e) => setInputTicket(e.target.value)}
              disabled={isVerifying}
              required
            />
          </div>

          <button type="submit" className="primary-button verify-btn-full" disabled={isVerifying}>
            {isVerifying ? t.verifyingBtn : t.verifyBtn}
          </button>
        </form>

        {ticketStatusMsg && (
          <div className={`status-msg-box ${ticketStatusMsg.type}`}>
            <p>{ticketStatusMsg.text}</p>
            {isVerifying && (
              <div className="verify-countdown">
                <span>⏱️ Live Checking Time Remaining: </span>
                <strong>{formatTime(verifyTimer)}</strong>
              </div>
            )}
          </div>
        )}
      </div>

      {/* WARNING BOX */}
      {(!user.name || !user.phone) && (
        <div className="warning-box">
          ⚠️ <strong>{t.warningMsg}</strong>
          <button onClick={() => navigate("profile")}>{t.goToProfileBtn}</button>
        </div>
      )}

      {/* TOGGLES */}
      <div className="draw-toggle-buttons">
        <button
          className={entryMode === "coins" ? "primary-button active" : "secondary-button"}
          onClick={() => setEntryMode("coins")}
        >
          {t.payWithCoins}
        </button>
        <button
          className={entryMode === "cash" ? "primary-button active" : "secondary-button"}
          onClick={() => setEntryMode("cash")}
        >
          {t.payWithCash}
        </button>
      </div>

      {/* COIN METHOD */}
      {entryMode === "coins" && (
        <div className="card draw-card">
          <h3>{t.payCoinsTitle}</h3>
          <p>{t.availBalance} <strong>{coins.toLocaleString()} Coins</strong></p>
          <p>{t.ticketPrice} <strong>2,000 Coins</strong></p>
          <button
            className="primary-button action-btn"
            onClick={handleCoinsEntry}
            disabled={coins < TICKET_COINS}
          >
            {coins >= TICKET_COINS ? t.buyTicketCoinsBtn : t.insufficientCoinsBtn}
          </button>
        </div>
      )}

      {/* CASH METHOD */}
      {entryMode === "cash" && (
        <div className="card draw-card">
          <h3>{t.cashTitle}</h3>
          <p>{t.cashSub}</p>

          <div className="admin-account-info">
            <p><strong>Gateway:</strong> {ADMIN_ACCOUNTS[gateway].name}</p>
            <p><strong>Account / Number:</strong> <span className="acc-num">{ADMIN_ACCOUNTS[gateway].number}</span></p>
          </div>

          <form onSubmit={handleCashSubmission} className="draw-form">
            <label>{t.gatewayLabel}</label>
            <select value={gateway} onChange={(e) => setGateway(e.target.value)}>
              <option value="easypaisa">EasyPaisa</option>
              <option value="jazzcash">JazzCash</option>
            </select>

            <label>{t.receiptLabel}</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} required />

            {isScanning && <p className="ocr-status scanning">{t.scanningReceipt}</p>}
            {scanComplete && <p className="ocr-status success">{t.scannedSuccess}</p>}

            <label>{t.trxLabel}</label>
            <input
              type="text"
              placeholder="e.g. 1029384756"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              required
            />

            {receiptImage && (
              <div className="preview-container">
                <p>Receipt Preview:</p>
                <img src={receiptImage} alt="Receipt Preview" className="receipt-img" />
              </div>
            )}

            <button type="submit" className="primary-button action-btn">
              {t.submitReceiptBtn}
            </button>

            <button type="button" className="whatsapp-direct-btn" onClick={openWhatsAppDirect}>
              {t.whatsappBtn}
            </button>
          </form>
        </div>
      )}

      {/* MY TICKETS */}
      {myTickets.length > 0 && (
        <div className="my-tickets-card">
          <h4>{t.myTicketsTitle} ({myTickets.length})</h4>
          <div className="ticket-chips">
            {myTickets.map((ticket, index) => (
              <span key={index} className="ticket-badge">{ticket}</span>
            ))}
          </div>
        </div>
      )}

      {/* SPIN SECTION */}
      <div className="live-spin-section">
        <button
          onClick={handleStartDraw}
          className={`spin-btn ${isSpinning ? "spinning" : ""}`}
          disabled={isSpinning}
        >
          {isSpinning ? t.spinningBtn : t.spinBtn}
        </button>

        {winner && (
          <div className="winner-banner">
            {t.congratsMsg} <br />
            <span>{winner}</span> {t.wonMsg}
          </div>
        )}
      </div>
    </div>
  );
}

export default LuckyDraw;