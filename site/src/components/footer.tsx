"use client";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(to bottom, #1C5FB5 0%, #0A246A 100%)",
        borderTop: "2px solid #00007B",
        fontFamily: "Tahoma, Arial, sans-serif",
        padding: "4px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "28px",
        position: "sticky",
        bottom: 0,
      }}
    >
      {/* Left side: branding */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            background: "#FFD700",
            border: "1px solid #B8860B",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            flexShrink: 0,
          }}
        >
          🔔
        </div>
        <Link
          href="/"
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "11px",
            textDecoration: "none",
            fontFamily: "Tahoma, Arial, sans-serif",
          }}
        >
          ReactPings
        </Link>
        <span
          style={{
            color: "#A6CAF0",
            fontSize: "10px",
            borderLeft: "1px solid #3366CC",
            paddingLeft: "8px",
          }}
        >
          Open source project &mdash; MIT License
        </span>
      </div>

      {/* Right side: social icons + time */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "rgba(0,0,0,0.2)",
            border: "1px inset #00007B",
            borderRadius: "2px",
            padding: "1px 6px",
          }}
        >
          <Link href="" title="Instagram" style={{ display: "flex", alignItems: "center" }}>
            <InstagramIcon size={14} strokeWidth={1.5} color="#FFFFFF" />
          </Link>
          <Link href="" title="LinkedIn" style={{ display: "flex", alignItems: "center" }}>
            <LinkedinIcon size={14} strokeWidth={1.5} color="#FFFFFF" />
          </Link>
          <Link
            href="https://www.github.com/omkashyap28/react-pings"
            title="GitHub"
            style={{ display: "flex", alignItems: "center" }}
          >
            <GithubIcon size={14} strokeWidth={1.5} color="#FFFFFF" />
          </Link>
        </div>

        <div
          style={{
            color: "white",
            fontSize: "11px",
            fontFamily: "Tahoma, Arial, sans-serif",
            background: "rgba(0,0,0,0.2)",
            border: "1px inset #00007B",
            borderRadius: "2px",
            padding: "1px 8px",
          }}
        >
          {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </footer>
  );
}
