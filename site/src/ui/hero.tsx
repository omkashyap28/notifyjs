"use client";

import { CopyCheckIcon, CopyIcon } from "@/icons";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePings } from "react-pings";

export default function Hero() {
  const commandRef = useRef<HTMLSpanElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [copied, setCopied] = useState(false);

  const ping = usePings();

  async function copyCommand() {
    if (!commandRef.current) return;
    try {
      const command = commandRef.current.innerText;
      await navigator.clipboard.writeText(command);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 5000);
    } catch (error) {
      console.error(`Error on copy command: ${error}`);
    }
  }

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  });

  return (
    <div
      className="relative z-1"
      style={{
        minHeight: "calc(100vh - 80px)",
        background: "#D4D0C8",
        padding: "16px",
        fontFamily: "Tahoma, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Main Window */}
        <div
          className="win-window"
          style={{ background: "#D4D0C8" }}
        >
          {/* Title Bar */}
          <div className="win-titlebar">
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {/* Window icon */}
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  background: "#FFD700",
                  border: "1px solid #B8860B",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  flexShrink: 0,
                }}
              >
                🔔
              </div>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                ReactPings - Toast Notification Library
              </span>
            </div>
            {/* Window controls */}
            <div style={{ display: "flex", gap: "2px" }}>
              {["_", "□", "×"].map((btn, i) => (
                <button
                  key={btn}
                  title={["Minimize", "Maximize", "Close"][i]}
                  style={{
                    width: "16px",
                    height: "14px",
                    background: "#D4D0C8",
                    borderTop: "1px solid #FFFFFF",
                    borderLeft: "1px solid #FFFFFF",
                    borderRight: "1px solid #404040",
                    borderBottom: "1px solid #404040",
                    fontSize: "9px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#000",
                    padding: 0,
                    fontFamily: "Tahoma, Arial, sans-serif",
                  }}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* Menu strip */}
          <div
            style={{
              background: "#D4D0C8",
              borderBottom: "1px solid #808080",
              padding: "1px 4px",
              display: "flex",
              gap: "2px",
              fontSize: "11px",
            }}
          >
            {["File", "View", "Help"].map((m) => (
              <button
                key={m}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "1px 6px",
                  fontSize: "11px",
                  cursor: "pointer",
                  fontFamily: "Tahoma, Arial, sans-serif",
                  textDecoration: "none",
                  color: "#000",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = "#0A246A";
                  (e.target as HTMLElement).style.color = "#FFF";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = "transparent";
                  (e.target as HTMLElement).style.color = "#000";
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Window content */}
          <div style={{ padding: "20px 24px 24px" }}>
            {/* Hero content inside window */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  fontFamily: "Tahoma, Arial, sans-serif",
                  color: "#0A246A",
                  marginBottom: "10px",
                  textShadow: "1px 1px 0 #FFFFFF",
                }}
              >
                New way to add toast notifications
              </h1>
              <p
                style={{
                  fontSize: "12px",
                  color: "#000000",
                  maxWidth: "560px",
                  margin: "0 auto 20px",
                  lineHeight: "1.6",
                  fontFamily: "Tahoma, Arial, sans-serif",
                }}
              >
                A open source modern toast notification library for React apps with fully
                customizable designs and easy implementation without complex setups.
              </p>
            </div>

            {/* Info box with Win2k inset border */}
            <div
              className="win-inset"
              style={{
                background: "white",
                padding: "10px 14px",
                marginBottom: "20px",
                fontSize: "11px",
                fontFamily: "Tahoma, Arial, sans-serif",
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "22px", lineHeight: 1, flexShrink: 0 }}>ℹ️</span>
              <div>
                <strong>Welcome to ReactPings!</strong>
                <br />
                ReactPings is a lightweight, customizable toast notification library for React
                applications. Simply install via npm and add beautiful notifications to your app
                in seconds. No complex configuration required.
              </div>
            </div>

            {/* Install command */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  fontFamily: "Tahoma, Arial, sans-serif",
                }}
              >
                Install Command:
              </label>
              <div
                className="win-inset"
                style={{
                  background: "black",
                  color: "#C0C0C0",
                  padding: "8px 12px",
                  fontFamily: "Courier New, monospace",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "copy",
                }}
                onClick={copyCommand}
              >
                <span>
                  <span style={{ color: "#00FF00" }}>C:\Users\Developer&gt; </span>
                  <span ref={commandRef}>npm install react-pings</span>
                </span>
                <button
                  onClick={copyCommand}
                  title="Copy command"
                  style={{
                    background: "#D4D0C8",
                    borderTop: "1px solid #FFFFFF",
                    borderLeft: "1px solid #FFFFFF",
                    borderRight: "1px solid #404040",
                    borderBottom: "1px solid #404040",
                    padding: "2px 6px",
                    fontSize: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    color: "#000",
                    fontFamily: "Tahoma, Arial, sans-serif",
                  }}
                >
                  {!copied ? (
                    <CopyIcon size={12} strokeWidth={2} color="#000000" />
                  ) : (
                    <CopyCheckIcon size={12} strokeWidth={2} color="#000000" />
                  )}
                  {!copied ? "Copy" : "Copied!"}
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/docs"
                title="Get started"
                style={{
                  background: "#D4D0C8",
                  borderTop: "2px solid #FFFFFF",
                  borderLeft: "2px solid #FFFFFF",
                  borderRight: "2px solid #404040",
                  borderBottom: "2px solid #404040",
                  color: "#000000",
                  fontFamily: "Tahoma, Arial, sans-serif",
                  fontSize: "11px",
                  padding: "5px 20px",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  minWidth: "100px",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#E8E8E8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#D4D0C8";
                }}
              >
                📄 Get Started
              </Link>

              <button
                onClick={() => ping("Welcome Toast")}
                title="Generate random toast"
                style={{
                  background: "#D4D0C8",
                  borderTop: "2px solid #FFFFFF",
                  borderLeft: "2px solid #FFFFFF",
                  borderRight: "2px solid #404040",
                  borderBottom: "2px solid #404040",
                  color: "#000000",
                  fontFamily: "Tahoma, Arial, sans-serif",
                  fontSize: "11px",
                  padding: "5px 20px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  minWidth: "100px",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#E8E8E8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#D4D0C8";
                }}
              >
                ✨ Generate Toast
              </button>

              <Link
                href="https://www.github.com/omkashyap28/react-pings"
                title="View on GitHub"
                style={{
                  background: "#D4D0C8",
                  borderTop: "2px solid #FFFFFF",
                  borderLeft: "2px solid #FFFFFF",
                  borderRight: "2px solid #404040",
                  borderBottom: "2px solid #404040",
                  color: "#000000",
                  fontFamily: "Tahoma, Arial, sans-serif",
                  fontSize: "11px",
                  padding: "5px 20px",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  minWidth: "100px",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#E8E8E8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#D4D0C8";
                }}
              >
                🐙 GitHub
              </Link>
            </div>
          </div>
        </div>

        {/* Feature tiles row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {features.map((f) => (
            <div key={f.title} className="win-window" style={{ background: "#D4D0C8" }}>
              <div className="win-titlebar" style={{ fontSize: "11px" }}>
                <span>{f.icon} {f.title}</span>
              </div>
              <div style={{ padding: "10px 12px", fontSize: "11px", fontFamily: "Tahoma, Arial, sans-serif", lineHeight: "1.5" }}>
                {f.description}
              </div>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div
          className="win-inset"
          style={{
            background: "#D4D0C8",
            padding: "2px 8px",
            fontSize: "11px",
            fontFamily: "Tahoma, Arial, sans-serif",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>✅ ReactPings v1.0.0 loaded successfully</span>
          <span style={{ color: "#0000AA" }}>
            📦 Open Source &bull; MIT License
          </span>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "⚡",
    title: "Easy Setup",
    description: "Install with a single npm command. No complex configuration required. Works out of the box with any React project.",
  },
  {
    icon: "🎨",
    title: "Customizable",
    description: "Fully customizable designs. Change colors, positions, animations and more to match your app's style.",
  },
  {
    icon: "📦",
    title: "Lightweight",
    description: "Zero dependencies. Ultra-small bundle size. Won't slow down your application. Ships only what you need.",
  },
];
