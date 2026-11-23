
import { useState } from "react";
import {
  Building2,
  UserRound,
  SlidersHorizontal,
  Bell,
  Save,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle
} from "lucide-react";

function Settings() {
  const [activeTab, setActiveTab] = useState("Company");

  const [company, setCompany] = useState({
    name: "ACME Pesticides Ltd.",
    email: "info@acmepesticides.com",
    phone: "+880 1700-000000",
    address: "Dhaka, Bangladesh",
    website: "www.acmepesticides.com"
  });

  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@acmepesticides.com",
    role: "Administrator"
  });

  const [preferences, setPreferences] = useState({
    currency: "BDT (৳)",
    language: "English",
    dateFormat: "DD/MM/YYYY",
    timezone: "Asia/Dhaka"
  });

  const [notifications, setNotifications] = useState({
    orders: true,
    inventory: true,
    customers: false,
    reports: true
  });

  const [saved, setSaved] = useState(false);

  const updateCompany = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const updateAdmin = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const updatePreferences = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value
    });
    setSaved(false);
  };

  const updateNotifications = (name) => {
    setNotifications({
      ...notifications,
      [name]: !notifications[name]
    });
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("acme_company_settings", JSON.stringify(company));
    localStorage.setItem("acme_admin_settings", JSON.stringify(admin));
    localStorage.setItem("acme_preferences", JSON.stringify(preferences));
    localStorage.setItem("acme_notifications", JSON.stringify(notifications));

    setSaved(true);
  };

  const tabs = [
    { name: "Company", icon: Building2 },
    { name: "Admin Profile", icon: UserRound },
    { name: "Preferences", icon: SlidersHorizontal },
    { name: "Notifications", icon: Bell }
  ];

  const renderField = (label, name, value, onChange, placeholder, type = "text") => (
    <div className="settings-field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="settings-page">

      <style>{`
        .settings-page {
          padding: 25px;
          min-height: 100%;
          background: #f8fafc;
          color: #263b30;
        }

        .settings-heading {
          margin-bottom: 25px;
        }

        .settings-heading h1 {
          margin: 0 0 7px;
          font-size: 24px;
          color: #173d2c;
        }

        .settings-heading p {
          margin: 0;
          font-size: 14px;
          color: #7b8a80;
        }

        .settings-layout {
          display: grid;
          grid-template-columns: 245px minmax(0, 1fr);
          gap: 22px;
          align-items: start;
        }

        .settings-sidebar,
        .settings-content {
          background: white;
          border: 1px solid #e7eee9;
          border-radius: 12px;
          padding: 18px;
        }

        .settings-sidebar h3 {
          font-size: 14px;
          color: #829087;
          margin: 3px 10px 15px;
        }

        .settings-tab {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 11px;
          border: none;
          padding: 12px;
          border-radius: 8px;
          background: transparent;
          color: #627168;
          font-size: 14px;
          cursor: pointer;
          text-align: left;
          margin-bottom: 5px;
        }

        .settings-tab.active {
          background: #eaf5ee;
          color: #176b45;
          font-weight: 600;
        }

        .settings-content-header {
          padding-bottom: 18px;
          border-bottom: 1px solid #edf1ee;
          margin-bottom: 22px;
        }

        .settings-content-header h2 {
          font-size: 18px;
          color: #193d2b;
          margin: 0 0 6px;
        }

        .settings-content-header p {
          font-size: 13px;
          color: #849188;
          margin: 0;
        }

        .settings-section-title {
          font-size: 14px;
          font-weight: 700;
          color: #315440;
          margin: 20px 0 15px;
        }

        .settings-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .settings-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .settings-field label {
          font-size: 13px;
          color: #52665a;
          font-weight: 600;
        }

        .settings-field input,
        .settings-field select {
          width: 100%;
          box-sizing: border-box;
          padding: 11px 12px;
          border: 1px solid #dce6df;
          border-radius: 8px;
          outline: none;
          font-size: 13px;
          color: #294d39;
          background: white;
        }

        .settings-field input:focus,
        .settings-field select:focus {
          border-color: #238653;
          box-shadow: 0 0 0 3px rgba(35,134,83,.08);
        }

        .settings-field input:disabled {
          background: #f3f6f4;
          color: #849188;
          cursor: not-allowed;
        }

        .settings-info-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          background: #f0f7f2;
          border-radius: 9px;
          margin-top: 22px;
          color: #34724e;
          font-size: 13px;
          line-height: 1.6;
        }

        .notification-list {
          display: flex;
          flex-direction: column;
        }

        .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding: 17px 0;
          border-bottom: 1px solid #edf1ee;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-item strong {
          display: block;
          font-size: 14px;
          color: #294d39;
          margin-bottom: 5px;
        }

        .notification-item p {
          margin: 0;
          font-size: 12px;
          color: #89968d;
        }

        .toggle-switch {
          width: 43px;
          height: 23px;
          border-radius: 20px;
          border: none;
          background: #cbd5ce;
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
          transition: .2s;
        }

        .toggle-switch.on {
          background: #238653;
        }

        .toggle-switch::after {
          content: "";
          position: absolute;
          width: 17px;
          height: 17px;
          background: white;
          border-radius: 50%;
          top: 3px;
          left: 3px;
          transition: .2s;
        }

        .toggle-switch.on::after {
          left: 23px;
        }

        .settings-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 15px;
          border-top: 1px solid #edf1ee;
          padding-top: 20px;
          margin-top: 25px;
          flex-wrap: wrap;
        }

        .settings-save-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          border: none;
          border-radius: 8px;
          background: #176b45;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .settings-save-btn:hover {
          background: #125737;
        }

        .settings-saved {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #238653;
          font-size: 13px;
        }

        @media(max-width: 800px) {
          .settings-layout {
            grid-template-columns: 1fr;
          }

          .settings-sidebar {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          }

          .settings-sidebar h3 {
            width: 100%;
          }

          .settings-tab {
            width: auto;
          }
        }

        @media(max-width: 550px) {
          .settings-page {
            padding: 15px;
          }

          .settings-form-grid {
            grid-template-columns: 1fr;
          }

          .settings-tab {
            font-size: 12px;
            padding: 10px;
          }
        }
      `}</style>

      {/* Page Heading */}
      <div className="settings-heading">
        <h1>System Settings</h1>
        <p>Manage company information, profile and application preferences.</p>
      </div>

      <div className="settings-layout">

        {/* Settings Sidebar */}
        <div className="settings-sidebar">
          <h3>SETTINGS MENU</h3>

          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.name}
                className={`settings-tab ${activeTab === tab.name ? "active" : ""}`}
                onClick={() => setActiveTab(tab.name)}
              >
                <Icon size={18} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="settings-content">

          {activeTab === "Company" && (
            <>
              <div className="settings-content-header">
                <h2>Company Information</h2>
                <p>Manage your organization's basic information.</p>
              </div>

              <div className="settings-form-grid">
                {renderField("Company Name", "name", company.name, updateCompany, "Enter company name")}
                {renderField("Company Email", "email", company.email, updateCompany, "Enter company email", "email")}
                {renderField("Phone Number", "phone", company.phone, updateCompany, "Enter phone number")}
                {renderField("Website", "website", company.website, updateCompany, "Enter website")}
                {renderField("Business Address", "address", company.address, updateCompany, "Enter business address")}
              </div>

              <div className="settings-info-box">
                <Building2 size={20} />
                <span>
                  This is demonstration company information for ACME AgroTrack.
                  You can edit these details as needed.
                </span>
              </div>
            </>
          )}

          {activeTab === "Admin Profile" && (
            <>
              <div className="settings-content-header">
                <h2>Administrator Profile</h2>
                <p>Manage the administrator's account information.</p>
              </div>

              <div className="settings-form-grid">
                {renderField("Full Name", "name", admin.name, updateAdmin, "Enter full name")}
                {renderField("Email Address", "email", admin.email, updateAdmin, "Enter email", "email")}
                {renderField("Account Role", "role", admin.role, updateAdmin, "Account role")}
              </div>

              <div className="settings-info-box">
                <ShieldCheck size={20} />
                <span>
                  Administrator profile settings are currently local demo settings.
                  Login and role-based security will be implemented through Django later.
                </span>
              </div>
            </>
          )}

          {activeTab === "Preferences" && (
            <>
              <div className="settings-content-header">
                <h2>System Preferences</h2>
                <p>Customize how information appears in the application.</p>
              </div>

              <div className="settings-form-grid">

                <div className="settings-field">
                  <label>Currency</label>
                  <select name="currency" value={preferences.currency} onChange={updatePreferences}>
                    <option>BDT (৳)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>

                <div className="settings-field">
                  <label>Language</label>
                  <select name="language" value={preferences.language} onChange={updatePreferences}>
                    <option>English</option>
                    <option>Bangla</option>
                  </select>
                </div>

                <div className="settings-field">
                  <label>Date Format</label>
                  <select name="dateFormat" value={preferences.dateFormat} onChange={updatePreferences}>
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="settings-field">
                  <label>Time Zone</label>
                  <select name="timezone" value={preferences.timezone} onChange={updatePreferences}>
                    <option>Asia/Dhaka</option>
                    <option>UTC</option>
                    <option>Asia/Kolkata</option>
                  </select>
                </div>

              </div>

              <div className="settings-info-box">
                <Globe size={20} />
                <span>
                  These preferences are saved locally. They do not yet change
                  currency, language or date formatting throughout the application.
                </span>
              </div>
            </>
          )}

          {activeTab === "Notifications" && (
            <>
              <div className="settings-content-header">
                <h2>Notification Preferences</h2>
                <p>Choose which types of notifications you want to enable.</p>
              </div>

              <div className="notification-list">

                <div className="notification-item">
                  <div>
                    <strong>Sales Order Notifications</strong>
                    <p>Receive alerts when new sales orders are created.</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notifications.orders}
                    aria-label="Sales Order Notifications"
                    className={`toggle-switch ${notifications.orders ? "on" : ""}`}
                    onClick={() => updateNotifications("orders")}
                  />
                </div>

                <div className="notification-item">
                  <div>
                    <strong>Inventory Alerts</strong>
                    <p>Get notified when products reach low stock levels.</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notifications.inventory}
                    aria-label="Inventory Alerts"
                    className={`toggle-switch ${notifications.inventory ? "on" : ""}`}
                    onClick={() => updateNotifications("inventory")}
                  />
                </div>

                <div className="notification-item">
                  <div>
                    <strong>Customer Updates</strong>
                    <p>Receive notifications about customer information changes.</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notifications.customers}
                    aria-label="Customer Updates"
                    className={`toggle-switch ${notifications.customers ? "on" : ""}`}
                    onClick={() => updateNotifications("customers")}
                  />
                </div>

                <div className="notification-item">
                  <div>
                    <strong>Report Notifications</strong>
                    <p>Receive updates when business reports are available.</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notifications.reports}
                    aria-label="Report Notifications"
                    className={`toggle-switch ${notifications.reports ? "on" : ""}`}
                    onClick={() => updateNotifications("reports")}
                  />
                </div>

              </div>
            </>
          )}

          {/* Save Button */}
          <div className="settings-footer">

            {saved && (
              <span className="settings-saved">
                <CheckCircle size={17} />
                Settings saved successfully!
              </span>
            )}

            <button className="settings-save-btn" onClick={handleSave}>
              <Save size={17} />
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;
