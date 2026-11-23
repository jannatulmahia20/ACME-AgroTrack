
import "./App.css";
import { useState } from "react";
import Products from "./Products";
import Customers from "./Customers";
import SalesOrders from "./SalesOrders";
import Inventory from "./Inventory";

import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Warehouse,
  MapPin,
  BarChart3,
  Settings,
  Bell,
  Search
} from "lucide-react";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">A</div>
          <div>
            <h2>ACME</h2>
            <span>AgroTrack</span>
          </div>
        </div>

        <p className="menu-label">MAIN MENU</p>

        <nav>
          {/* Dashboard */}
          <a
            className={`nav-item ${activePage === "Dashboard" ? "active" : ""}`}
            onClick={() => setActivePage("Dashboard")}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </a>

          {/* Products */}
          <a
            className={`nav-item ${activePage === "Products" ? "active" : ""}`}
            onClick={() => setActivePage("Products")}
          >
            <Package size={19} />
            Products
          </a>

          {/* Customers */}
          <a
            className={`nav-item ${activePage === "Customers" ? "active" : ""}`}
            onClick={() => setActivePage("Customers")}
          >
            <Users size={19} />
            Customers
          </a>

          {/* Sales Orders */}
          <a
            className={`nav-item ${activePage === "Sales Orders" ? "active" : ""}`}
            onClick={() => setActivePage("Sales Orders")}
          >
            <ShoppingCart size={19} />
            Sales Orders
          </a>

          {/* Inventory */}
          <a
            className={`nav-item ${activePage === "Inventory" ? "active" : ""}`}
            onClick={() => setActivePage("Inventory")}
          >
            <Warehouse size={19} />
            Inventory
          </a>

          {/* Regions */}
          <a
            className={`nav-item ${activePage === "Regions" ? "active" : ""}`}
            onClick={() => setActivePage("Regions")}
          >
            <MapPin size={19} />
            Regions
          </a>

          {/* Reports */}
          <a
            className={`nav-item ${activePage === "Reports" ? "active" : ""}`}
            onClick={() => setActivePage("Reports")}
          >
            <BarChart3 size={19} />
            Reports
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a
            className={`nav-item ${activePage === "Settings" ? "active" : ""}`}
            onClick={() => setActivePage("Settings")}
          >
            <Settings size={19} />
            Settings
          </a>

          <p>ACME AgroTrack v1.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Topbar */}
        <header className="topbar">
          <div>
            <h2>{activePage}</h2>
            <p>Welcome back! Here's what's happening today.</p>
          </div>

          <div className="topbar-actions">
            <button className="icon-button">
              <Search size={19} />
            </button>

            <button className="icon-button">
              <Bell size={19} />
            </button>

            <div className="profile">
              <div className="avatar">A</div>
              <div>
                <strong>Admin User</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}

        {activePage === "Products" ? (

<Products />

) : activePage === "Customers" ? (

<Customers />

) : activePage === "Sales Orders" ? (

  <SalesOrders />
  
  ) : activePage === "Inventory" ? (
  
  <Inventory />
  
  ) : activePage === "Dashboard" ? (

          /* Dashboard */
          <section className="dashboard-body">

            <div className="page-heading">
              <div>
                <h1>Overview</h1>
                <p>Monitor your business performance at a glance.</p>
              </div>

              <span className="date-label">November 2026</span>
            </div>

            {/* Statistics */}
            <div className="stats-grid">

              <div className="stat-card">
                <span>Total Sales</span>
                <h2>৳ 485,000</h2>
                <small>+12.5% from last month</small>
              </div>

              <div className="stat-card">
                <span>Total Orders</span>
                <h2>248</h2>
                <small>+8.2% from last month</small>
              </div>

              <div className="stat-card">
                <span>Total Customers</span>
                <h2>156</h2>
                <small>+5 new customers</small>
              </div>

              <div className="stat-card">
                <span>Products in Stock</span>
                <h2>1,240</h2>
                <small>Across all products</small>
              </div>

            </div>

            {/* Dashboard Content */}
            <div className="content-grid">

              <div className="panel">
                <h3>Sales Overview</h3>
                <p>Your sales performance will appear here.</p>

                <div className="chart-placeholder">
                  <BarChart3 size={48} />
                  <span>Sales analytics chart</span>
                </div>
              </div>

              <div className="panel">
                <h3>Recent Activity</h3>

                <div className="activity-item">
                  <span className="activity-dot"></span>
                  <div>
                    <strong>New order received</strong>
                    <p>Order #ORD-1025</p>
                  </div>
                </div>

                <div className="activity-item">
                  <span className="activity-dot"></span>
                  <div>
                    <strong>New customer added</strong>
                    <p>Customer registration</p>
                  </div>
                </div>

                <div className="activity-item">
                  <span className="activity-dot"></span>
                  <div>
                    <strong>Stock updated</strong>
                    <p>Product inventory updated</p>
                  </div>
                </div>

              </div>
            </div>

          </section>

        ) : (

          /* Placeholder for upcoming modules */
          <section className="dashboard-body">
            <div className="page-heading">
              <div>
                <h1>{activePage}</h1>
                <p>This module is under development.</p>
              </div>
            </div>

            <div className="panel">
              <h3>{activePage} Management</h3>
              <p>
                We will build this module in the upcoming development steps.
              </p>
            </div>
          </section>

        )}

      </main>
    </div>
  );
}

export default App;
