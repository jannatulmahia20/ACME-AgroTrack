
import { useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  MapPin,
  Users,
  UserRound,
  Map,
  ArrowUpRight,
  Building2,
  Navigation,
  Layers,
  UsersRound
} from "lucide-react";

function Regions() {
  const initialRegions = [
    {
      id: "REG-001",
      name: "Dhaka North",
      area: "Uttara, Mirpur, Gulshan",
      representative: "Rahim Ahmed",
      customers: 35
    },
    {
      id: "REG-002",
      name: "Dhaka South",
      area: "Dhanmondi, Motijheel, Jatrabari",
      representative: "Karim Hasan",
      customers: 28
    },
    {
      id: "REG-003",
      name: "Gazipur",
      area: "Gazipur Sadar, Tongi, Kaliakair",
      representative: "Sabbir Hossain",
      customers: 22
    },
    {
      id: "REG-004",
      name: "Chattogram",
      area: "Agrabad, Halishahar, Pahartali",
      representative: "Nusrat Jahan",
      customers: 31
    }
  ];

  const [regions, setRegions] = useState(initialRegions);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRegion, setEditingRegion] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    area: "",
    representative: "",
    customers: ""
  });

  const filteredRegions = regions.filter((region) =>
    `${region.id} ${region.name} ${region.area} ${region.representative}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalCustomers = regions.reduce(
    (total, region) => total + Number(region.customers),
    0
  );

  const averageCustomers = regions.length
    ? Math.round(totalCustomers / regions.length)
    : 0;

  const topRegion = regions.length
    ? [...regions].sort((a, b) => b.customers - a.customers)[0]
    : null;

  const openAddModal = () => {
    setEditingRegion(null);
    setFormData({
      name: "",
      area: "",
      representative: "",
      customers: ""
    });
    setShowModal(true);
  };

  const openEditModal = (region) => {
    setEditingRegion(region);
    setFormData({
      name: region.name,
      area: region.area,
      representative: region.representative,
      customers: region.customers
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingRegion) {
      setRegions((previousRegions) =>
        previousRegions.map((region) =>
          region.id === editingRegion.id
            ? {
                ...region,
                ...formData,
                customers: Number(formData.customers)
              }
            : region
        )
      );
    } else {
      const newRegion = {
        id: `REG-${String(Date.now()).slice(-6)}`,
        ...formData,
        customers: Number(formData.customers)
      };

      setRegions((previousRegions) => [...previousRegions, newRegion]);
    }

    setShowModal(false);
  };

  const deleteRegion = (id) => {
    if (window.confirm("Are you sure you want to delete this region?")) {
      setRegions((previousRegions) =>
        previousRegions.filter((region) => region.id !== id)
      );
    }
  };

  const colors = [
    "region-green",
    "region-blue",
    "region-orange",
    "region-purple"
  ];

  return (
    <div className="regions-page">

      <style>{`
        .regions-page {
          padding: 26px 30px 40px;
          color: #19382b;
          font-family: inherit;
        }

        .regions-hero {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          padding: 32px 36px;
          border-radius: 18px;
          background: linear-gradient(120deg, #123e2c, #1d6846 65%, #27865a);
          color: white;
          margin-bottom: 25px;
        }

        .regions-hero::before {
          content: "";
          position: absolute;
          width: 280px;
          height: 280px;
          border: 1px solid rgba(255,255,255,.13);
          border-radius: 50%;
          right: 100px;
          top: -150px;
        }

        .regions-hero::after {
          content: "";
          position: absolute;
          width: 190px;
          height: 190px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 50%;
          right: -40px;
          bottom: -125px;
        }

        .regions-hero-content {
          position: relative;
          z-index: 1;
        }

        .regions-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.6px;
          color: #b8e7ca;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .regions-hero h1 {
          font-size: 29px;
          margin: 0 0 9px;
          color: white;
          font-weight: 750;
        }

        .regions-hero p {
          margin: 0;
          font-size: 14px;
          color: #d1e9db;
          max-width: 480px;
          line-height: 1.7;
        }

        .regions-hero-button {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border: none;
          background: white;
          color: #17613e;
          padding: 13px 19px;
          border-radius: 9px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          white-space: nowrap;
          transition: .2s;
        }

        .regions-hero-button:hover {
          background: #e9f6ee;
          transform: translateY(-2px);
        }

        .regions-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 17px;
          margin-bottom: 27px;
        }

        .region-stat {
          display: flex;
          align-items: center;
          gap: 15px;
          background: white;
          padding: 20px;
          border: 1px solid #e9eee9;
          border-radius: 13px;
          box-shadow: 0 3px 12px rgba(20, 60, 40, .035);
          min-width: 0;
        }

        .region-stat-icon {
          width: 47px;
          height: 47px;
          flex-shrink: 0;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .region-stat-icon.green {
          background: #e7f5eb;
          color: #21834d;
        }

        .region-stat-icon.blue {
          background: #e9f1fc;
          color: #3977c5;
        }

        .region-stat-icon.orange {
          background: #fff1e4;
          color: #d77b2e;
        }

        .region-stat-icon.purple {
          background: #f1ebfc;
          color: #8059bd;
        }

        .region-stat p {
          margin: 0 0 6px;
          color: #7b8980;
          font-size: 12px;
          font-weight: 500;
        }

        .region-stat h2 {
          margin: 0;
          font-size: 25px;
          font-weight: 750;
          color: #203b2d;
        }

        .regions-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 18px;
        }

        .regions-section-header h2 {
          margin: 0 0 5px;
          font-size: 19px;
          color: #203b2d;
        }

        .regions-section-header p {
          margin: 0;
          font-size: 12px;
          color: #89958c;
        }

        .regions-search {
          display: flex;
          align-items: center;
          gap: 9px;
          background: white;
          border: 1px solid #e3eae4;
          border-radius: 9px;
          padding: 0 13px;
          width: 260px;
          height: 42px;
          color: #8b9b90;
        }

        .regions-search input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 12px;
          color: #294735;
          background: transparent;
        }

        .regions-search input::placeholder {
          color: #a0aaa3;
        }

        .regions-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .region-card {
          background: white;
          border: 1px solid #e8eee9;
          border-radius: 14px;
          padding: 21px;
          box-shadow: 0 3px 12px rgba(20, 60, 40, .035);
          transition: .2s;
          min-width: 0;
        }

        .region-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 9px 24px rgba(20, 60, 40, .08);
          border-color: #c9ddcf;
        }

        .region-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 18px;
        }

        .region-card-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .region-symbol {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 47px;
          height: 47px;
          flex-shrink: 0;
          border-radius: 12px;
        }

        .region-green .region-symbol {
          color: #25814c;
          background: #e8f5eb;
        }

        .region-blue .region-symbol {
          color: #3678c4;
          background: #eaf2fc;
        }

        .region-orange .region-symbol {
          color: #d78335;
          background: #fff2e5;
        }

        .region-purple .region-symbol {
          color: #8059bd;
          background: #f2edfc;
        }

        .region-card-heading h3 {
          margin: 0 0 5px;
          font-size: 16px;
          color: #203c2d;
          font-weight: 700;
        }

        .region-card-heading span {
          font-size: 10px;
          color: #929e95;
          letter-spacing: .5px;
          font-weight: 600;
        }

        .region-actions {
          display: flex;
          gap: 6px;
        }

        .region-actions button {
          width: 32px;
          height: 32px;
          border: 1px solid #e9eee9;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: white;
          transition: .2s;
        }

        .region-edit {
          color: #43835d;
        }

        .region-edit:hover {
          background: #eaf5ed;
        }

        .region-delete {
          color: #d46c6c;
        }

        .region-delete:hover {
          background: #fff0f0;
        }

        .region-area {
          background: #f7faf7;
          border-radius: 9px;
          padding: 13px;
          margin-bottom: 17px;
        }

        .region-info-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #849187;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .6px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .region-area-text {
          color: #3d5948;
          font-size: 12px;
          line-height: 1.6;
          font-weight: 500;
        }

        .region-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .region-rep {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 0;
        }

        .region-rep-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #e8f3eb;
          color: #287448;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 750;
          flex-shrink: 0;
        }

        .region-rep-info span {
          display: block;
          font-size: 10px;
          color: #98a39a;
          margin-bottom: 3px;
        }

        .region-rep-info strong {
          display: block;
          font-size: 12px;
          color: #385341;
          overflow-wrap: anywhere;
        }

        .region-customer-count {
          text-align: right;
          flex-shrink: 0;
        }

        .region-customer-count strong {
          display: block;
          font-size: 20px;
          color: #234b33;
        }

        .region-customer-count span {
          font-size: 10px;
          color: #89968d;
        }

        .region-progress-track {
          height: 6px;
          background: #edf2ee;
          border-radius: 20px;
          overflow: hidden;
        }

        .region-progress-fill {
          height: 100%;
          border-radius: 20px;
          background: linear-gradient(90deg, #26794b, #68b985);
        }

        .region-progress-label {
          display: flex;
          justify-content: space-between;
          margin-top: 7px;
          color: #9aa49d;
          font-size: 10px;
        }

        .regions-empty {
          grid-column: 1 / -1;
          background: white;
          border: 1px dashed #cbd9ce;
          border-radius: 14px;
          padding: 55px 20px;
          text-align: center;
          color: #89968d;
        }

        .regions-empty svg {
          color: #78a486;
          margin-bottom: 12px;
        }

        .regions-empty h3 {
          color: #355642;
          margin: 0 0 7px;
        }

        .regions-empty p {
          font-size: 13px;
          margin: 0;
        }

        .region-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(12, 34, 23, .55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
        }

        .region-modal {
          width: 100%;
          max-width: 490px;
          max-height: 90vh;
          overflow-y: auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,.2);
          padding: 25px;
        }

        .region-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 23px;
        }

        .region-modal-header h2 {
          font-size: 20px;
          color: #214331;
          margin: 0;
        }

        .region-modal-header p {
          font-size: 12px;
          color: #89968d;
          margin: 5px 0 0;
        }

        .region-modal-close {
          width: 34px;
          height: 34px;
          border: none;
          background: #f1f5f1;
          color: #526b59;
          border-radius: 8px;
          cursor: pointer;
        }

        .region-form-group {
          margin-bottom: 17px;
        }

        .region-form-group label {
          display: block;
          color: #405b49;
          font-size: 12px;
          font-weight: 650;
          margin-bottom: 7px;
        }

        .region-form-group input {
          width: 100%;
          box-sizing: border-box;
          height: 43px;
          border: 1px solid #dfe8e1;
          border-radius: 8px;
          padding: 0 12px;
          font-size: 13px;
          color: #254633;
          outline: none;
          background: white;
        }

        .region-form-group input:focus {
          border-color: #419564;
          box-shadow: 0 0 0 3px rgba(65,149,100,.1);
        }

        .region-form-group input::placeholder {
          color: #a2ada5;
        }

        .region-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 24px;
        }

        .region-modal-actions button {
          padding: 11px 17px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 650;
          cursor: pointer;
        }

        .region-cancel {
          background: white;
          border: 1px solid #dfe7e0;
          color: #617067;
        }

        .region-save {
          background: #216a43;
          color: white;
          border: 1px solid #216a43;
        }

        .region-save:hover {
          background: #174d30;
        }

        @media (max-width: 1050px) {
          .regions-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .regions-page {
            padding: 18px 14px 30px;
          }

          .regions-hero {
            padding: 25px 20px;
            align-items: flex-start;
            flex-direction: column;
          }

          .regions-hero h1 {
            font-size: 23px;
          }

          .regions-grid {
            grid-template-columns: 1fr;
          }

          .regions-section-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .regions-search {
            width: 100%;
            box-sizing: border-box;
          }
        }

        @media (max-width: 430px) {
          .regions-stats {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .region-stat {
            padding: 13px 10px;
            gap: 9px;
          }

          .region-stat-icon {
            width: 36px;
            height: 36px;
          }

          .region-stat h2 {
            font-size: 20px;
          }

          .region-stat p {
            font-size: 10px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="regions-hero">
        <div className="regions-hero-content">
          <div className="regions-eyebrow">
            <Navigation size={15} />
            DISTRIBUTION NETWORK
          </div>

          <h1>Regional Management</h1>

          <p>
            Manage your distribution network, monitor customer coverage,
            and organize your sales representatives across different regions.
          </p>
        </div>

        <button className="regions-hero-button" onClick={openAddModal}>
          <Plus size={18} />
          Add New Region
        </button>
      </section>

      {/* Statistics */}
      <section className="regions-stats">

        <div className="region-stat">
          <div className="region-stat-icon green">
            <MapPin size={22} />
          </div>
          <div>
            <p>Total Regions</p>
            <h2>{regions.length}</h2>
          </div>
        </div>

        <div className="region-stat">
          <div className="region-stat-icon blue">
            <Users size={22} />
          </div>
          <div>
            <p>Total Customers</p>
            <h2>{totalCustomers}</h2>
          </div>
        </div>

        <div className="region-stat">
          <div className="region-stat-icon orange">
            <UserRound size={22} />
          </div>
          <div>
            <p>Representatives</p>
            <h2>
              {new Set(regions.map((region) => region.representative.trim().toLowerCase())).size}
            </h2>
          </div>
        </div>

        <div className="region-stat">
          <div className="region-stat-icon purple">
            <Layers size={22} />
          </div>
          <div>
            <p>Avg. Customers / Region</p>
            <h2>{averageCustomers}</h2>
          </div>
        </div>

      </section>

      {/* Region List Header */}
      <div className="regions-section-header">
        <div>
          <h2>Distribution Regions</h2>
          <p>Explore and manage your assigned business territories</p>
        </div>

        <div className="regions-search">
          <Search size={17} />
          <input
            type="text"
            placeholder="Search region, area or representative..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Region Cards */}
      <section className="regions-grid">

        {filteredRegions.length > 0 ? (
          filteredRegions.map((region, index) => {
            const progress = topRegion && topRegion.customers > 0
              ? Math.round((region.customers / topRegion.customers) * 100)
              : 0;

            const initials = region.representative
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <article
                className={`region-card ${colors[index % colors.length]}`}
                key={region.id}
              >

                <div className="region-card-top">
                  <div className="region-card-heading">
                    <div className="region-symbol">
                      <Building2 size={22} />
                    </div>

                    <div>
                      <h3>{region.name}</h3>
                      <span>{region.id}</span>
                    </div>
                  </div>

                  <div className="region-actions">
                    <button
                      className="region-edit"
                      onClick={() => openEditModal(region)}
                      title="Edit region"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      className="region-delete"
                      onClick={() => deleteRegion(region.id)}
                      title="Delete region"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="region-area">
                  <div className="region-info-label">
                    <MapPin size={13} />
                    COVERED AREAS
                  </div>

                  <div className="region-area-text">
                    {region.area}
                  </div>
                </div>

                <div className="region-card-bottom">

                  <div className="region-rep">
                    <div className="region-rep-avatar">
                      {initials}
                    </div>

                    <div className="region-rep-info">
                      <span>SALES REPRESENTATIVE</span>
                      <strong>{region.representative}</strong>
                    </div>
                  </div>

                  <div className="region-customer-count">
                    <strong>{region.customers}</strong>
                    <span>Customers</span>
                  </div>

                </div>

                <div className="region-progress-track">
                  <div
                    className="region-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="region-progress-label">
                  <span>Customer coverage</span>
                  <span>{progress}% of leading region</span>
                </div>

              </article>
            );
          })
        ) : (
          <div className="regions-empty">
            <Map size={38} />
            <h3>No regions found</h3>
            <p>Try another search term or add a new distribution region.</p>
          </div>
        )}

      </section>

      {/* Add / Edit Modal */}
      {showModal && (
        <div
          className="region-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="region-modal">

            <div className="region-modal-header">
              <div>
                <h2>
                  {editingRegion ? "Edit Region" : "Create New Region"}
                </h2>
                <p>
                  Enter the distribution region details below.
                </p>
              </div>

              <button
                className="region-modal-close"
                onClick={() => setShowModal(false)}
                type="button"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="region-form-group">
                <label>Region Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Dhaka North"
                  required
                />
              </div>

              <div className="region-form-group">
                <label>Covered Areas</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="e.g. Uttara, Mirpur, Gulshan"
                  required
                />
              </div>

              <div className="region-form-group">
                <label>Sales Representative</label>
                <input
                  type="text"
                  name="representative"
                  value={formData.representative}
                  onChange={handleInputChange}
                  placeholder="Enter representative name"
                  required
                />
              </div>

              <div className="region-form-group">
                <label>Number of Customers</label>
                <input
                  type="number"
                  name="customers"
                  value={formData.customers}
                  onChange={handleInputChange}
                  placeholder="Enter customer count"
                  min="0"
                  required
                />
              </div>

              <div className="region-modal-actions">
                <button
                  type="button"
                  className="region-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="region-save">
                  {editingRegion ? "Update Region" : "Create Region"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Regions;
