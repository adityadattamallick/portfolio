import React, { useState } from "react";

import styles from "./Navbar.module.css";
import { DarkModeToggle } from "../DarkModeToggle/DarkModeToggle";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <a href="/" className={styles.title}>
        Portfolio
      </a>
      <div className={styles.menu}>
        <DarkModeToggle />
        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={menuOpen ? styles.closeIcon : styles.menuIcon}
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
        <ul
          className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ""}`}
        >
          <li>
            <a href="#about">About</a>
          </li>
          {/* <li>
            <a href="#experience">Experience</a>
          </li> */}
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#knowledgegraph">Skills</a>
          </li>
          <li>
            <a href="#contact">Contacts</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
