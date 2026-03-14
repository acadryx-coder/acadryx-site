import { useState, useEffect, useRef } from "react";

const MESSAGES = [
  "👋 Hey! I'm Kiki.",
  "🏫 I live inside Acadryx.",
  "✨ Click me anytime.",
  "📚 Your school, your space.",
  "💙 I love seeing results get published!",
  "🌍 We're going global, one school at a time.",
  "⚡ Minimal friction, maximum impact.",
  "🔐 Every record. Permanent. Verified.",
  "📰 No more printing costs — ever.",
];

const WALK_MESSAGES = [
  "🚶‍♂️ Just walking around...",
  "👀 Watching the platform grow...",
  "💭 Thinking about schools...",
];

export default function Kiki() {
  const [bubble, setBubble] = useState(null);
  const [walking, setWalking] = useState(false);
  const [waving, setWaving] = useState(false);
  const bubbleTimer = useRef(null);

  const speak = (msg, duration = 3000) => {
    setBubble(msg);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), duration);
  };

  const wave = () => {
    setWaving(true);
    setTimeout(() => setWaving(false), 500);
  };

  const handleClick = () => {
    wave();
    const msgs = ["You clicked me! 😊", "Hey there!", ...MESSAGES];
    speak(msgs[Math.floor(Math.random() * msgs.length)], 4000);
  };

  useEffect(() => {
    const t = setTimeout(() => speak("👋 Hi! I'm Kiki!"), 1200);
    const walk = setInterval(() => {
      if (Math.random() > 0.7) {
        setWalking(true);
        speak(WALK_MESSAGES[Math.floor(Math.random() * WALK_MESSAGES.length)], 2000);
        setTimeout(() => setWalking(false), 2000);
      }
    }, 8000);
    const idle = setInterval(() => {
      if (!bubble && Math.random() > 0.8) {
        speak(MESSAGES[Math.floor(Math.random() * MESSAGES.length)], 3000);
      }
    }, 15000);
    return () => { clearTimeout(t); clearInterval(walk); clearInterval(idle); };
  }, []);

  return (
    <>
      <style>{`
        .kiki-wrap {
          position: fixed; bottom: 20px; right: 20px;
          width: 60px; height: 60px; z-index: 9999;
          cursor: pointer; user-select: none;
          transition: transform 0.2s;
        }
        .kiki-wrap:hover { transform: scale(1.1); }
        .kiki-wrap:active { transform: scale(0.95); }
        .kiki-wrap.walking { animation: kiki-walk 0.5s infinite; }
        .kiki-wrap.waving .kiki-char { animation: kiki-wave 0.5s ease; }
        @keyframes kiki-walk {
          0%,100% { transform: translateX(0) rotate(0); }
          25% { transform: translateX(3px) rotate(2deg); }
          75% { transform: translateX(-3px) rotate(-2deg); }
        }
        @keyframes kiki-wave {
          0%,100% { transform: rotate(0); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-5deg); }
        }
        .kiki-char { position: relative; width: 100%; height: 100%; }
        .kiki-face {
          position: absolute; width: 70%; height: 60%;
          background: #0d7c96; border-radius: 50% 50% 45% 45%;
          bottom: 0; left: 15%; box-shadow: 0 4px 0 rgba(0,0,0,0.1);
        }
        .kiki-eyes { position: absolute; top: 30%; width: 100%; display: flex; justify-content: space-around; padding: 0 20%; }
        .kiki-eye { width: 20%; height: 30%; background: white; border-radius: 50%; position: relative; }
        .kiki-eye::after {
          content: ''; position: absolute; width: 40%; height: 40%;
          background: #0b0b1f; border-radius: 50%; top: 30%; left: 30%;
          animation: kiki-blink 4s infinite;
        }
        @keyframes kiki-blink { 0%,90%,100% { height: 40%; top: 30%; } 95% { height: 10%; top: 45%; } }
        .kiki-smile { position: absolute; width: 40%; height: 20%; border-bottom: 3px solid rgba(0,0,0,0.2); border-radius: 50%; bottom: 20%; left: 30%; }
        .kiki-cap { position: absolute; top: -5px; left: 25%; width: 50%; height: 30%; }
        .kiki-cap-top { width: 100%; height: 70%; background: #0b29be; border-radius: 50% 50% 0 0; }
        .kiki-cap-bill { width: 120%; height: 30%; background: #081e8c; border-radius: 40% 40% 0 0; margin-left: -10%; }
        .kiki-shadow { position: absolute; width: 80%; height: 10%; background: rgba(0,0,0,0.1); border-radius: 50%; bottom: -15%; left: 10%; filter: blur(2px); }
        .kiki-bubble {
          position: absolute; bottom: 70px; right: 0; max-width: 200px;
          background: white; padding: 10px 15px; border-radius: 20px 20px 4px 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1); font-size: 13px; color: #1a2e3c;
          font-family: 'DM Sans', sans-serif;
          border: 1px solid #e2e8f0; animation: kiki-pop 0.3s ease;
        }
        .kiki-bubble-tail { position: absolute; bottom: -8px; right: 10px; width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid white; }
        @keyframes kiki-pop { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @media (max-width: 600px) { .kiki-wrap { width: 50px; height: 50px; bottom: 10px; right: 10px; } }
      `}</style>

      <div
        className={`kiki-wrap ${walking ? "walking" : ""} ${waving ? "waving" : ""}`}
        onClick={handleClick}
        onMouseEnter={wave}
        role="button"
        tabIndex={0}
        aria-label="Kiki the Acadryx mascot"
        onKeyDown={e => { if (e.key === "Enter") handleClick(); }}
      >
        <div className="kiki-char">
          <div className="kiki-face">
            <div className="kiki-eyes">
              <div className="kiki-eye" />
              <div className="kiki-eye" />
            </div>
            <div className="kiki-smile" />
          </div>
          <div className="kiki-cap">
            <div className="kiki-cap-top" />
            <div className="kiki-cap-bill" />
          </div>
          <div className="kiki-shadow" />
        </div>
        {bubble && (
          <div className="kiki-bubble">
            {bubble}
            <div className="kiki-bubble-tail" />
          </div>
        )}
      </div>
    </>
  );
}
