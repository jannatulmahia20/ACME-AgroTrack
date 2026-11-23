
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  MapPin,
  Package,
  ShoppingCart,
  Users,
  Sprout,
  ShieldCheck,
  Menu,
  X,
  Sun,
  Moon,
  Leaf,
  CheckCircle2
} from "lucide-react";

import "./Landing.css";

function Landing({ onEnter = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const features = [
    {
      icon: Package,
      number: "01",
      title: "Product Management",
      description:
        "Organize agricultural products, categories, pricing and product availability in one place."
    },
    {
      icon: Users,
      number: "02",
      title: "Customer Management",
      description:
        "Maintain customer information and manage your distributor, dealer and retailer network."
    },
    {
      icon: ShoppingCart,
      number: "03",
      title: "Sales Management",
      description:
        "Create and manage sales orders while keeping track of order status and sales activity."
    },
    {
      icon: Boxes,
      number: "04",
      title: "Inventory Control",
      description:
        "Monitor stock levels, record stock movements and identify products that need restocking."
    },
    {
      icon: MapPin,
      number: "05",
      title: "Regional Management",
      description:
        "Organize distribution regions, covered areas and representatives efficiently."
    },
    {
      icon: BarChart3,
      number: "06",
      title: "Reports & Analytics",
      description:
        "Explore sales performance, order summaries and regional business insights."
    }
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className={`lp-page ${darkMode ? "lp-dark" : "lp-light"}`}>

      {/* NAVBAR */}
      <nav className="lp-navbar">
        <a href="#home" className="lp-brand" onClick={closeMenu}>
          <span className="lp-brand-icon">
            <Sprout size={23} />
          </span>
          <span>
            <strong>ACME</strong>
            <small>AGROTRACK</small>
          </span>
        </a>

        <div className={`lp-nav-links ${menuOpen ? "lp-nav-open" : ""}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#features" onClick={closeMenu}>Features</a>
          <a href="#about" onClick={closeMenu}>About</a>

          <button
            className="lp-mobile-start"
            onClick={() => {
              closeMenu();
              onEnter();
            }}
          >
            Get Started <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="lp-nav-actions">
          <button
            className="lp-theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="lp-nav-login" onClick={onEnter}>
            Get Started <ArrowUpRight size={16} />
          </button>
        </div>

        <button
          className="lp-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* HERO */}
      <section className="lp-hero" id="home">
        <div className="lp-hero-background"></div>
        <div className="lp-hero-overlay"></div>

        <div className="lp-hero-content">
          <div className="lp-eyebrow">
            <span className="lp-eyebrow-dot"></span>
            SMARTER AGRICULTURAL MANAGEMENT
          </div>

          <h1>
            Growing smarter.
            <br />
            <span>Managing better.</span>
          </h1>

          <p className="lp-hero-description">
            A connected platform for managing products, customers,
            sales, inventory and distribution — all in one place.
          </p>

          

          <div className="lp-hero-note">
            <ShieldCheck size={17} />
            <span>One platform. Connected operations.</span>
          </div>
        </div>

        <div className="lp-hero-bottom-label">
          <Leaf size={16} />
          <span>SMARTER AGRICULTURAL OPERATIONS</span>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="lp-overview" id="about">
        <div className="lp-overview-intro">
          <span>THE PLATFORM</span>
          <h2>Everything working together.</h2>
        </div>

        <div className="lp-overview-item">
          <strong>06</strong>
          <span>Core Management Modules</span>
        </div>

        <div className="lp-overview-item">
          <strong>01</strong>
          <span>Connected Platform</span>
        </div>

        <div className="lp-overview-item">
          <strong>360°</strong>
          <span>Business Overview</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-features-section" id="features">
        <div className="lp-section-heading">
          <div>
            <span className="lp-section-label">WHAT YOU CAN DO</span>
            <h2>
              Everything you need.
              <br />
              <span>One connected workspace.</span>
            </h2>
          </div>

          <p>
            Manage essential business operations through a clear,
            organized and easy-to-use platform.
          </p>
        </div>

        <div className="lp-features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article className="lp-feature-card" key={feature.number}>
                <div className="lp-feature-top">
                  <div className="lp-feature-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <span>{feature.number}</span>
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>

                <div className="lp-feature-bottom">
                  <span>Platform feature</span>
                  <CheckCircle2 size={17} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta-section">
        <div className="lp-cta-decoration"></div>

        <div className="lp-cta-content">
          <span>ACME AGROTRACK</span>
          <h2>Bring your business operations together.</h2>
          <p>
            Explore a smarter way to manage agricultural products,
            customers, inventory and sales.
          </p>

        
        </div>

        <div className="lp-cta-icon">
          <Sprout size={100} strokeWidth={0.8} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <a href="#home" className="lp-brand lp-footer-brand">
          <span className="lp-brand-icon">
            <Sprout size={21} />
          </span>
          <span>
            <strong>ACME</strong>
            <small>AGROTRACK</small>
          </span>
        </a>

        <p>
          Smart management for connected agricultural operations.
        </p>

        <div className="lp-footer-bottom">
          <span>© 2026 ACME AgroTrack. All rights reserved.</span>
          <span>Designed for smarter business management.</span>
        </div>
      </footer>

    </main>
  );
}

export default Landing;
