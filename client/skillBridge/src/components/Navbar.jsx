import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import daylightTheme from "../theme";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/freelancer/all-jobs", label: "Jobs" },
  { to: "/client/post-jobs", label: "Post" },
  { to: "/projectDashboard/overview", label: "Projects" },
  { to: "/login", label: "Login" },
];

const Navbar = () => {
  const { colors } = daylightTheme;
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: colors.card,
        borderBottom: `1px solid ${colors.border}`,
        width: "100%",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0.75rem 1rem",
        }}
      >
        <Link to="/" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <img src="/vite.svg" alt="SkillBridge" width={28} height={28} />
          <span style={{
            fontWeight: 700,
            color: colors.textPrimary,
            letterSpacing: 0.3,
          }}>SkillBridge</span>
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
            background: colors.card,
            cursor: "pointer",
          }}
          className="nav-toggle"
        >
          <span style={{ width: 18, height: 2, background: colors.textPrimary, display: "block", position: "relative" }}>
            <span style={{ position: "absolute", width: 18, height: 2, background: colors.textPrimary, top: -6, left: 0 }} />
            <span style={{ position: "absolute", width: 18, height: 2, background: colors.textPrimary, top: 6, left: 0 }} />
          </span>
        </button>

        <ul
          style={{
            display: "none",
            gap: 16,
            alignItems: "center",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="nav-desktop"
        >
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  style={{
                    padding: "0.5rem 0.75rem",
                    borderRadius: 8,
                    color: active ? colors.primaryDark : colors.textPrimary,
                    background: active ? colors.lightGray : "transparent",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            borderTop: `1px solid ${colors.border}`,
            background: colors.card,
          }}
          className="nav-mobile"
        >
          <ul style={{ listStyle: "none", margin: 0, padding: "0.5rem 1rem" }}>
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "block",
                      padding: "0.75rem 0.5rem",
                      borderRadius: 8,
                      color: active ? colors.primaryDark : colors.textPrimary,
                      background: active ? colors.lightGray : "transparent",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .nav-desktop { display: flex !important; }
          .nav-toggle { display: none !important; }
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;


