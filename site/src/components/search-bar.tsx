"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SearchIcon } from "@/icons";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    document.body.style.overflow = visibility ? "hidden" : "auto";
  }, [visibility]);

  useEffect(() => {
    const visibleSearch = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setVisibility(true);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setVisibility(false);
      }
    };
    window.addEventListener("keydown", visibleSearch);
    return () => window.removeEventListener("keydown", visibleSearch);
  }, []);

  return (
    <>
      {/* Compact search trigger in taskbar/tray */}
      <button
        onClick={() => setVisibility(true)}
        title="Search (Ctrl+K)"
        style={{
          background: "rgba(255,255,255,0.15)",
          border: "1px inset rgba(0,0,70,0.5)",
          borderRadius: "2px",
          color: "white",
          fontFamily: "Tahoma, Arial, sans-serif",
          fontSize: "10px",
          padding: "1px 6px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "3px",
          height: "18px",
        }}
      >
        <SearchIcon size={11} strokeWidth={2} color="#FFFFFF" />
        <span>Search</span>
        <kbd
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "1px",
            padding: "0 3px",
            fontSize: "9px",
          }}
        >
          Ctrl+K
        </kbd>
      </button>

      {/* Win2k-style search dialog */}
      <AnimatePresence>
        {visibility && (
          <>
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.3)",
                zIndex: 9998,
              }}
              onClick={() => setVisibility(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.1 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "400px",
                zIndex: 9999,
                fontFamily: "Tahoma, Arial, sans-serif",
                /* Win2k window */
                background: "#D4D0C8",
                border: "2px solid",
                borderColor: "#FFFFFF #404040 #404040 #FFFFFF",
              }}
            >
              {/* Title bar */}
              <div
                style={{
                  background: "linear-gradient(to right, #0A246A, #A6CAF0)",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "3px 6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <SearchIcon size={14} strokeWidth={2} color="#FFFFFF" />
                  <span>Search Documentation</span>
                </div>
                <button
                  onClick={() => setVisibility(false)}
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
                  }}
                  title="Close"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div style={{ padding: "12px 14px 14px" }}>
                <div style={{ marginBottom: "10px", fontSize: "11px" }}>
                  Type a keyword to search the documentation:
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    autoFocus
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                      flex: 1,
                      height: "22px",
                      padding: "2px 6px",
                      fontFamily: "Tahoma, Arial, sans-serif",
                      fontSize: "11px",
                      background: "white",
                      borderTop: "2px solid #808080",
                      borderLeft: "2px solid #808080",
                      borderRight: "2px solid #FFFFFF",
                      borderBottom: "2px solid #FFFFFF",
                      outline: "none",
                      color: "#000",
                    }}
                  />
                  <button
                    className="win-btn"
                    style={{ minWidth: "60px", fontSize: "11px", padding: "3px 10px" }}
                  >
                    Search
                  </button>
                </div>

                {/* Results area */}
                <div
                  style={{
                    background: "white",
                    borderTop: "2px solid #808080",
                    borderLeft: "2px solid #808080",
                    borderRight: "2px solid #FFFFFF",
                    borderBottom: "2px solid #FFFFFF",
                    minHeight: "80px",
                    padding: "8px",
                    fontSize: "11px",
                    color: "#808080",
                  }}
                >
                  {searchText === "" ? (
                    <span>No search results to display.</span>
                  ) : (
                    <span>Searching for &quot;{searchText}&quot;...</span>
                  )}
                </div>

                {/* Bottom buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "6px",
                    marginTop: "10px",
                    paddingTop: "8px",
                    borderTop: "1px solid #808080",
                  }}
                >
                  <button
                    className="win-btn"
                    onClick={() => setVisibility(false)}
                    style={{ minWidth: "70px", fontSize: "11px" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
