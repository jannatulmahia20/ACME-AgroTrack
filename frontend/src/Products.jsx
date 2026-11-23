
import { useState } from "react";
import { Package, Search, Plus, Pencil, Trash2, X } from "lucide-react";

function Products() {
  const [products, setProducts] = useState([
    { id: "PRD-001", name: "ACME Crop Guard", category: "Insecticide", price: 1250, stock: 150 },
    { id: "PRD-002", name: "ACME Green Shield", category: "Fungicide", price: 980, stock: 85 },
    { id: "PRD-003", name: "ACME Root Power", category: "Fertilizer", price: 750, stock: 12 },
    { id: "PRD-004", name: "ACME Pest Control", category: "Insecticide", price: 1100, stock: 0 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Insecticide",
    price: "",
    stock: "",
  });

  const getStatus = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 20) return "Low Stock";
    return "In Stock";
  };

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category} ${product.id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ name: "", category: "Insecticide", price: "", stock: "" });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const price = Number(formData.price);
    const stock = Number(formData.stock);

    if (!formData.name.trim() || !Number.isFinite(price) || price <= 0 ||
        !Number.isInteger(stock) || stock < 0) {
      alert("Enter a valid name, positive price and non-negative whole-number stock.");
      return;
    }

    if (editingId) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingId
            ? { ...product, ...formData, name: formData.name.trim(), price, stock }
            : product
        )
      );
    } else {
      const newProduct = {
        id: `PRD-${String(Date.now()).slice(-6)}`,
        ...formData,
        name: formData.name.trim(),
        price,
        stock,
      };

      setProducts((current) => [...current, newProduct]);
    }

    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((current) => current.filter((product) => product.id !== id));
    }
  };

  return (
    <div className="products-page">
      <div className="products-heading">
        <div>
          <h1>Products</h1>
          <p>Manage your products and monitor stock availability.</p>
        </div>

        <button className="add-product-btn" onClick={openAddForm}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="product-summary">
        <div className="product-summary-card">
          <span>Total Products</span>
          <h2>{products.length}</h2>
        </div>
        <div className="product-summary-card">
          <span>In Stock</span>
          <h2>{products.filter((p) => getStatus(p.stock) === "In Stock").length}</h2>
        </div>
        <div className="product-summary-card">
          <span>Low Stock</span>
          <h2>{products.filter((p) => getStatus(p.stock) === "Low Stock").length}</h2>
        </div>
        <div className="product-summary-card">
          <span>Out of Stock</span>
          <h2>{products.filter((p) => getStatus(p.stock) === "Out of Stock").length}</h2>
        </div>
      </div>

      <div className="products-table-panel">
        <div className="products-table-heading">
          <div>
            <h3>Product List</h3>
            <p>View and manage your product inventory.</p>
          </div>

          <div className="product-search">
            <Search size={17} />
            <input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {
                const status = getStatus(product.stock);

                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td className="product-name">{product.name}</td>
                    <td>{product.category}</td>
                    <td>৳ {product.price.toLocaleString("en-BD")}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={`stock-status ${status.toLowerCase().replaceAll(" ", "-")}`}>
                        {status}
                      </span>
                    </td>
                    <td>
                      <div className="product-actions">
                        <button onClick={() => handleEdit(product)} aria-label="Edit product">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} aria-label="Delete product">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "30px" }}>
                    No products found.
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
                <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
                <p>Enter the product information below.</p>
              </div>
              <button className="close-modal" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Product Name</label>
              <input
                required
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option>Insecticide</option>
                <option>Fungicide</option>
                <option>Herbicide</option>
                <option>Fertilizer</option>
                <option>Other</option>
              </select>

              <label>Price (BDT)</label>
              <input
                required
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />

              <label>Stock Quantity</label>
              <input
                required
                type="number"
                min="0"
                step="1"
                placeholder="Enter available stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  {editingId ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
