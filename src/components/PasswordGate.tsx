import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "../App.css"; // reuse existing site styles

const CORRECT_PASSWORD = "earlycircle";
const STORAGE_KEY = "lightedits_auth";

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const [formState, handleEmailSubmit] = useForm("mjgdqjrq");

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      setUnlocked(true);
    }
  }, []);

  const handleSubmit = () => {
    if (input === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="app">
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/lightning.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <img src="/logo.png" alt="Lightedits logo" className="logo" />

        <div style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "360px" }}>
<div className={`password-box${shake ? " password-shake" : ""}`}>
              <p className="password-eyebrow">EARLY ACCESS</p>
              <p className="password-sub">Enter the password to continue</p>

              <input
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Password"
                autoFocus
                className={`password-input${error ? " password-input--error" : ""}`}
              />

              {error && <p className="password-error">Incorrect password</p>}

              <button
                onClick={handleSubmit}
                className="add-to-bag"
                type="button"
                style={{ marginTop: "8px", width: "100%" }}
              >
                Enter
              </button>
            </div>
            {/* ── Email notify box ── */}
            <div className="password-box" style={{ padding: "28px 40px" }}>
              <p className="password-sub" style={{ textAlign: "center" }}>
                Get notified when we launch
              </p>

              {formState.succeeded ? (
                <p className="email-success">You're on the list ✓</p>
              ) : (
                <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
                  <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      className="password-input"
                      style={{ flex: 1 }}
                    />
                    <button
                      type="submit"
                      disabled={formState.submitting}
                      className="notify-btn"
                    >
                      {formState.submitting ? "…" : "Notify me"}
                    </button>
                  </div>
                  <ValidationError prefix="Email" field="email" errors={formState.errors} className="password-error" />
                </form>
              )}
            </div>

            {/* ── Password box ── */}
            

          </div>
        </div>
      </div>

      <style>{`
        .password-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: 48px 40px;
          width: 100%;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          animation: fadeInUp 0.5s ease both;
          box-sizing: border-box;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-8px); }
          30%       { transform: translateX(8px); }
          45%       { transform: translateX(-6px); }
          60%       { transform: translateX(6px); }
          75%       { transform: translateX(-3px); }
          90%       { transform: translateX(3px); }
        }

        .password-shake {
          animation: shake 0.6s ease !important;
        }

        .password-eyebrow {
          margin: 0;
          color: rgba(255, 255, 255, 0.35);
          font-size: 10px;
          letter-spacing: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .password-sub {
          margin: 0 0 4px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
        }

        .password-input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: #fff;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .password-input:focus {
          border-color: rgba(255, 255, 255, 0.5);
        }

        .password-input--error {
          border-color: #ff4444 !important;
          box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.25);
        }

        .password-input::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }

        .password-error {
          margin: 0;
          color: #ff6666;
          font-size: 12px;
        }

        .email-success {
          margin: 0;
          color: rgba(160, 255, 180, 0.85);
          font-size: 14px;
          font-weight: 500;
        }

        .notify-btn {
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
        }

        .notify-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .notify-btn:disabled {
          opacity: 0.5;
          cursor: default;
        }
      `}</style>
    </div>
  );
}