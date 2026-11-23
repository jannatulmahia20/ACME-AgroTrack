
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
  Map
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
      setRegions(
        regions.map((region) =>
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

      setRegions([...regions, newRegion]);
    }

    setShowModal(false);
  };

  const deleteRegion = (id) => {
    if (window.confirm("Are you sure you want to delete this region?")) {
      setRegions(regions.filter((region) => region.id !== id));
    }
  };

  const totalCustomers = regions.reduce(
    (total, region) => total + region.customers,
    0
  );

  return (
    <div className="products-page">

      <div className="page-header">
        <div>
          <h1>Regions Management</h1>
          <p>Manage distribution regions and assigned representatives</p>
        </div>

        <button className="add-product-btn" onClick={openAddModal}>
          <Plus size={18} />
          Add Region
        </button>
      </div>

      <div className="summary-cards">

        <div className="summary-card">
          <div className="summary-icon">
            <MapPin size={22} />
          </div>
          <div>
            <p>Total Regions</p>
            <h2>{regions.length}</h2>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <Users size={22} />
          </div>
          <div>
            <p>Total Customers</p>
            <h2>{totalCustomers}</h2>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <UserRound size={22} />
          </div>
          <div>
            <p>Representatives</p>
            <h2>{regions.length}</h2>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <Map size={22} />
          </div>
          <div>
            <p>Average Customers</p>
            <h2>
              {regions.length
                ? Math.round(totalCustomers / regions.length)
                : 0}
            </h2>
          </div>
        </div>

      </div>

      <div className="products-table-container">

        <div className="table-toolbar">
          <h3>All Regions</h3>

          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search regions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="products-table">
            <thead>
              <tr>
                <th>Region ID</th>
                <th>Region Name</th>
                <th>Covered Areas</th>
                <th>Representative</th>
                <th>Customers</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRegions.length > 0 ? (
                filteredRegions.map((region) => (
                  <tr key={region.id}>
                    <td>{region.id}</td>
                    <td><strong>{region.name}</strong></td>
                    <td>{region.area}</td>
                    <td>{region.representative}</td>
                    <td>{region.customers}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => openEditModal(region)}
                          title="Edit region"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteRegion(region.id)}
                          title="Delete region"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No regions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="product-modal">

            <div className="modal-header">
              <h2>{editingRegion ? "Edit Region" : "Add New Region"}</h2>

              <button
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Region Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter region name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Covered Areas</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="Enter covered areas"
                  required
                />
              </div>

              <div className="form-group">
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

              <div className="form-group">
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

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingRegion ? "Update Region" : "Save Region"}
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
