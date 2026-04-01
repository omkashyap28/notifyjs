"use client";

import { SearchBar, Wrapper } from "@/components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const path = usePathname();
  const [active, setActive] = useState<string>("Home");
  const [mobileBar, setMobileBar] = useState<boolean>(false);

  useEffect(() => {
    const activePath = path.replace(/^\/+|\/+$/g, "");
    if (!activePath || activePath === "") {
      setActive("Home");
    } else {
      const found = navigationLinks.find((link) => link.url === path);
      if (found) {
        setActive(found.title);
      } else {
        const lastSegment = activePath.split("/").pop();
        const formatted = lastSegment
          ? lastSegment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
          : "Home";
        setActive(formatted);
      }
    }
  }, [path]);

  return (
    <>
      {/* Windows 2000 Taskbar */}
      <header
        style={{
          background: "linear-gradient(to bottom, #1C5FB5 0%, #0A246A 50%, #0A246A 100%)",
          borderBottom: "2px solid #00007B",
          height: "30px",
          position: "sticky",
          top: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 4px",
          fontFamily: "Tahoma, Arial, sans-serif",
        }}
      >
        {/* Start Button area */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {/* Windows Start button */}
          <button
            style={{
              background: "linear-gradient(to bottom, #3C8C3C, #006400)",
              borderTop: "1px solid #78D078",
              borderLeft: "1px solid #78D078",
              borderRight: "1px solid #005000",
              borderBottom: "1px solid #005000",
              borderRadius: "0 12px 12px 0",
              color: "white",
              fontFamily: "Tahoma, Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "13px",
              padding: "2px 12px 2px 6px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
              marginRight: "4px",
            }}
            title="Start"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
              <rect x="0" y="0" width="7" height="7" fill="#FF0000" />
              <rect x="9" y="0" width="7" height="7" fill="#00CC00" />
              <rect x="0" y="9" width="7" height="7" fill="#0000FF" />
              <rect x="9" y="9" width="7" height="7" fill="#FFCC00" />
            </svg>
            <span style={{ letterSpacing: "0.5px" }}>start</span>
          </button>

          {/* Separator */}
          <div
            style={{
              width: "1px",
              height: "20px",
              background: "#00007B",
              borderRight: "1px solid #3366CC",
              marginRight: "6px",
            }}
          />

          {/* Nav links as taskbar buttons */}
          {navigationLinks.map(({ title, url }) => (
            <Link
              href={url}
              key={title}
              onClick={() => setActive(title)}
              title={title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "2px 8px",
                height: "22px",
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: "11px",
                fontWeight: active === title ? "bold" : "normal",
                color: "white",
                textDecoration: "none",
                background: active === title
                  ? "linear-gradient(to bottom, #0A246A, #1C5FB5)"
                  : "transparent",
                border: active === title
                  ? "1px inset #00007B"
                  : "1px solid transparent",
                borderRadius: "2px",
                minWidth: "80px",
                textAlign: "center" as const,
                boxShadow: active === title ? "inset 1px 1px 2px rgba(0,0,0,0.5)" : "none",
              }}
            >
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  background: "#87CEEB",
                  border: "1px solid #4169E1",
                  borderRadius: "2px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "8px",
                  flexShrink: 0,
                }}
              >
                {title[0]}
              </span>
              {title}
            </Link>
          ))}
        </div>

        {/* System tray */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "linear-gradient(to bottom, #0A246A, #1C5FB5)",
            border: "1px inset #00007B",
            borderRadius: "2px",
            padding: "1px 6px",
            height: "22px",
          }}
        >
          <SearchBar />
          <div
            style={{
              color: "white",
              fontSize: "11px",
              fontFamily: "Tahoma, Arial, sans-serif",
              borderLeft: "1px solid #3366CC",
              paddingLeft: "6px",
            }}
          >
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </header>

      {/* Menu bar below taskbar */}
      <div
        style={{
          background: "#D4D0C8",
          borderBottom: "2px solid #808080",
          padding: "0 8px",
          display: "flex",
          alignItems: "center",
          gap: "0",
          fontFamily: "Tahoma, Arial, sans-serif",
          fontSize: "11px",
          height: "22px",
        }}
      >
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((item) => (
          <button
            key={item}
            style={{
              background: "transparent",
              border: "none",
              padding: "2px 6px",
              fontFamily: "Tahoma, Arial, sans-serif",
              fontSize: "11px",
              cursor: "pointer",
              color: "#000000",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = "#0A246A";
              (e.target as HTMLElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "transparent";
              (e.target as HTMLElement).style.color = "#000000";
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Address bar */}
      <div
        style={{
          background: "#D4D0C8",
          borderBottom: "1px solid #808080",
          padding: "2px 8px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "Tahoma, Arial, sans-serif",
          fontSize: "11px",
          height: "28px",
        }}
      >
        <span style={{ fontWeight: "bold", color: "#000" }}>Address</span>
        <div
          style={{
            flex: 1,
            background: "white",
            borderTop: "2px solid #808080",
            borderLeft: "2px solid #808080",
            borderRight: "2px solid #FFFFFF",
            borderBottom: "2px solid #FFFFFF",
            padding: "1px 4px",
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: "11px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span style={{ color: "#0000EE" }}>🌐</span>
          <span>http://reactpings.local/</span>
        </div>
        <button className="win-btn" style={{ minWidth: "50px", fontSize: "11px" }}>Go</button>
      </div>
    </>
  );
}

const navigationLinks = [
  { title: "Home", url: "/" },
  { title: "Docs", url: "/docs" },
  { title: "Github", url: "https://www.github.com/omkashyap28/react-pings" },
];
