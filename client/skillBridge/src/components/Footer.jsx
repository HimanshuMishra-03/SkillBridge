import React from "react";
import { Link } from "react-router";
import daylightTheme from "../theme";

const Footer = () => {
  const { colors } = daylightTheme;
  return (
    <footer
      style={{
        width: "100%",
        borderTop: `1px solid ${colors.border}`,
        background: colors.card,
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "1.25rem 1rem" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <img src="/vite.svg" alt="SkillBridge" width={22} height={22} />
            <strong style={{ color: colors.textPrimary }}>SkillBridge</strong>
          </div>
          <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/" style={{ color: colors.textSecondary, textDecoration: "none" }}>Home</Link>
            <Link to="/freelancer/all-jobs" style={{ color: colors.textSecondary, textDecoration: "none" }}>Jobs</Link>
            <Link to="/client/post-jobs" style={{ color: colors.textSecondary, textDecoration: "none" }}>Post</Link>
            <Link to="/login" style={{ color: colors.textSecondary, textDecoration: "none" }}>Login</Link>
          </nav>
        </div>
        <div style={{ marginTop: 12, color: colors.textSecondary, fontSize: 14 }}>
          © {new Date().getFullYear()} SkillBridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;


