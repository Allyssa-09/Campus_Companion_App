"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const wasRedirected = searchParams.get("redirect") === "true";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const success = await login(email, studentId);

    if (success) {
      router.push("/");
    } else {
      setError("Invalid credentials. Please check your email and Student ID.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <header className="login-card__header">
          <h1>Welcome <em>Back</em></h1>
          <p>Sign in to your Campus Companion account</p>
        </header>

        <form className="login-form" onSubmit={handleSubmit}>
          {wasRedirected && !error && (
            <div className="login-info" role="alert">
              Please sign in to view your personalized timetable.
            </div>
          )}
          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">University Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. saoirse.mccarthy@student.uni.ie"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="student-id">Student ID (as Password)</label>
            <input
              type="text"
              id="student-id"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. STU100001"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn--primary login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <footer className="login-card__footer">
          <p>
            Having trouble? <a href="mailto:support@hartwell.ac.ie">Contact IT Support</a>
          </p>
        </footer>
      </div>

      <style jsx>{`
        .login-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - var(--header-h) - 100px);
          padding: 40px 24px;
        }

        .login-card {
          background: white;
          width: 100%;
          max-width: 440px;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-elevated);
          padding: 40px;
          border-top: 6px solid var(--gold);
        }

        .login-card__header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-card__header h1 {
          font-family: var(--font-display);
          font-size: 2.2rem;
          margin-bottom: 8px;
          color: var(--ink);
        }

        .login-card__header h1 em {
          font-style: italic;
          font-weight: 300;
          color: var(--gold);
        }

        .login-card__header p {
          color: var(--ink-muted);
          font-size: 0.95rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .login-error {
          background: #fff5f5;
          color: var(--rust);
          padding: 12px;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          border-left: 3px solid var(--rust);
        }

        .login-info {
          background: var(--blue-light);
          color: var(--blue);
          padding: 12px;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          border-left: 3px solid var(--blue);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-muted);
        }

        .form-group input {
          padding: 12px 16px;
          border: 1.5px solid var(--cream-dark);
          border-radius: var(--radius-md);
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 4px rgba(196, 144, 26, 0.1);
        }

        .login-btn {
          margin-top: 10px;
          width: 100%;
        }

        .login-card__footer {
          margin-top: 32px;
          text-align: center;
          font-size: 0.85rem;
          color: var(--ink-muted);
        }

        .login-card__footer a {
          color: var(--gold);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
