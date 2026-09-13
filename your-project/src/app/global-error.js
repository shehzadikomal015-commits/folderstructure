"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}>
          <div style={{
            maxWidth: "32rem",
            width: "100%",
            textAlign: "center",
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "1rem",
            padding: "2rem"
          }}>
            <div style={{
              height: "4rem",
              width: "4rem",
              borderRadius: "9999px",
              background: "#fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#111827" }}>
              Something went wrong
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
              {error?.message || "An unexpected error occurred."}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                onClick={() => reset()}
                style={{
                  padding: "0.625rem 1.5rem",
                  borderRadius: "0.75rem",
                  background: "#111827",
                  color: "white",
                  border: "none",
                  fontWeight: 500,
                  cursor: "pointer"
                }}
              >
                Try again
              </button>
              <button
                onClick={() => window.location.href = "/"}
                style={{
                  padding: "0.625rem 1.5rem",
                  borderRadius: "0.75rem",
                  background: "white",
                  color: "#111827",
                  border: "1px solid #e5e7eb",
                  fontWeight: 500,
                  cursor: "pointer"
                }}
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
