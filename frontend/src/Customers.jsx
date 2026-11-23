
import { useState } from "react";
import { Search, Plus, Pencil, Trash2, X, Users } from "lucide-react";

function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: "CUS-001",
      name: "Rahman Agro Traders",
      type: "Distributor",
      phone: "01712345678",
      location: "Dhaka",
    },
    {
      id: "CUS-002",
      name: "Green Valley Store",
      type: "Dealer",
      phone: "01812345678",
      location: "Gazipur",
    },
    {
      id: "CUS-003",
      name: "Karim Agriculture",
      type: "Retailer",
      phone: "01912345678",
      location: "Cumilla",
    },
    {
      id: "CUS-004",
      name: "Fresh Crop Enterprise",
      type: "Distributor",
      phone: "01612345678",
      location: "Chattogram",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "Dealer",
    phone: "",
    location: "",
  });

  const filteredCustomers = customers.filter((customer) =>
    `${customer.id} ${customer.name} ${customer.phone} ${customer.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ name: "", type: "Dealer", phone: "", location: "" });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.location.trim()) {
      alert("Please complete all fields.");
      return;
    }

    if (editingId) {
      setCustomers((current) =>
        current.map((customer) =>
          customer.id === editingId
            ? { ...customer, ...formData, name: formData.name.trim() }
            : customer
        )
      );
    } else {
      const newCustomer = {
        id: `CUS-${String(Date.now()).slice(-6)}`,
        ...formData,
        name: formData.name.trim(),
      };

      setCustomers((current) => [...current, newCustomer]);
    }

    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setFormData({
      name: customer.name,
      type: customer.type,
      phone: customer.phone,
      location: customer.location,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers((current) => current.filter((customer) => customer.id !== id));
    }
  };

  return (
    <div className="products-page">
      <div className="products-heading">
        <div>
          <h1>Customers</h1>
          <p>Manage dealers, distributors and retailers.</p>
        </div>

        <button className="add-product-btn" onClick={openAddForm}>
          <Plus size={18} /> Add Customer
        </button>
      </div>

      <div className="product-summary">
        <div className="product-summary-card">
          <span>Total Customers</span>
          <h2>{customers.length}</h2>
        </div>
        <div className="product-summary-card">
          <span>Distributors</span>
          <h2>{customers.filter((c) => c.type === "Distributor").length}</h2>
        </div>
        <div className="product-summary-card">
          <span>Dealers</span>
          <h2>{customers.filter((c) => c.type === "Dealer").length}</h2>
        </div>
        <div className="product-summary-card">
          <span>Retailers</span>
          <h2>{customers.filter((c) => c.type === "Retailer").length}</h2>
        </div>
      </div>

      <div className="products-table-panel">
        <div className="products-table-heading">
          <div>
            <h3>Customer List</h3>
            <p>View and manage your customer information.</p>
          </div>

          <div className="product-search">
            <Search size={17} />
            <input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Type</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td className="product-name">{customer.name}</td>
                  <td>{customer.type}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.location}</td>
                  <td>
                    <div className="product-actions">
                      <button onClick={() => handleEdit(customer)} aria-label="Edit customer">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(customer.id)} aria-label="Delete customer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px" }}>
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="product-modal">
            <div className="modal-heading">
              <div>
                <h2>{editingId ? "Edit Customer" : "Add New Customer"}</h2>
                <p>Enter the customer information below.</p>
              </div>

              <button className="close-modal" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Customer Name</label>
              <input
                required
                placeholder="Enter customer name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <label>Customer Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option>Dealer</option>
                <option>Distributor</option>
                <option>Retailer</option>
              </select>

              <label>Phone Number</label>
              <input
                required
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <label>Location</label>
              <input
                required
                placeholder="Enter city or district"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingId ? "Update Customer" : "Save Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;
