
import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Minus,
  Package,
  AlertTriangle,
  X,
  Boxes,
} from "lucide-react";

function Inventory() {
  const initialProducts = [
    {
      id: "PRD-001",
      name: "ACME Crop Guard",
      category: "Insecticide",
      stock: 150,
      price: 1250,
      reorderLevel: 20,
    },
    {
      id: "PRD-002",
      name: "ACME Green Shield",
      category: "Fungicide",
      stock: 85,
      price: 980,
      reorderLevel: 20,
    },
    {
      id: "PRD-003",
      name: "ACME Root Power",
      category: "Fertilizer",
      stock: 12,
      price: 750,
      reorderLevel: 20,
    },
    {
      id: "PRD-004",
      name: "ACME Pest Control",
      category: "Insecticide",
      stock: 0,
      price: 1100,
      reorderLevel: 20,
    },
  ];

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("acme_inventory");
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [transactionType, setTransactionType] = useState("Stock In");
  const [quantity, setQuantity] = useState(1);
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("acme_inventory_transactions");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("acme_inventory", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(
      "acme_inventory_transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const formatCurrency = (amount) =>
    `৳ ${Number(amount || 0).toLocaleString("en-BD")}`;

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.stock),
    0
  );

  const lowStock = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= product.reorderLevel
  ).length;

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;

  const stockValue = products.reduce(
    (sum, product) =>
      sum + product.stock * product.price,
    0
  );

  const getStockStatus = (product) => {
    if (product.stock === 0) return "Out of Stock";
    if (product.stock <= product.reorderLevel) return "Low Stock";
    return "In Stock";
  };

  const filteredProducts = products.filter((product) =>
    `${product.id} ${product.name} ${product.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const openTransaction = (product, type) => {
    setSelectedProduct(product);
    setTransactionType(type);
    setQuantity(1);
    setShowModal(true);
  };

  const handleTransaction = (e) => {
    e.preventDefault();

    const amount = Number(quantity);

    if (!selectedProduct || !Number.isInteger(amount) || amount < 1) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (
      transactionType === "Stock Out" &&
      amount > selectedProduct.stock
    ) {
      alert("Not enough stock available.");
      return;
    }

    setProducts((current) =>
      current.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              stock:
                transactionType === "Stock In"
                  ? product.stock + amount
                  : product.stock - amount,
            }
          : product
      )
    );

    const newTransaction = {
      id: `TXN-${Date.now()}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      type: transactionType,
      quantity: amount,
      date: new Date().toLocaleString("en-GB"),
    };

    setTransactions((current) => [
      newTransaction,
      ...current,
    ]);

    setShowModal(false);
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <div className="products-page">
      {/* Page Heading */}
      <div className="products-heading">
        <div>
          <h1>Inventory Management</h1>
          <p>Monitor product stock and manage inventory transactions.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="product-summary">
        <div className="product-summary-card">
          <span>Total Products</span>
          <h2>{totalProducts}</h2>
        </div>

        <div className="product-summary-card">
          <span>Total Stock Units</span>
          <h2>{totalStock.toLocaleString("en-BD")}</h2>
        </div>

        <div className="product-summary-card">
          <span>Low Stock</span>
          <h2>{lowStock}</h2>
        </div>

        <div className="product-summary-card">
          <span>Out of Stock</span>
          <h2>{outOfStock}</h2>
        </div>
      </div>

      {/* Stock Value */}
      <div className="products-table-panel inventory-value-panel">
        <div>
          <span>Total Inventory Value</span>
          <h2>{formatCurrency(stockValue)}</h2>
          <p>Calculated using current stock × unit price.</p>
        </div>
        <Boxes size={38} />
      </div>

      {/* Product Stock Table */}
      <div className="products-table-panel">
        <div className="products-table-heading">
          <div>
            <h3>Stock Overview</h3>
            <p>View and update available product quantities.</p>
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
                <th>Available Stock</th>
                <th>Reorder Level</th>
                <th>Status</th>
                <th>Stock Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td className="product-name">{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>{product.reorderLevel}</td>
                  <td>
                    <span
                      className={`stock-status ${
                        getStockStatus(product)
                          .toLowerCase()
                          .replaceAll(" ", "-")
                      }`}
                    >
                      {getStockStatus(product)}
                    </span>
                  </td>
                  <td>
                    <div className="product-actions inventory-actions">
                      <button
                        title="Stock In"
                        onClick={() =>
                          openTransaction(product, "Stock In")
                        }
                      >
                        <Plus size={16} />
                      </button>

                      <button
                        title="Stock Out"
                        onClick={() =>
                          openTransaction(product, "Stock Out")
                        }
                        disabled={product.stock === 0}
                      >
                        <Minus size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

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

      {/* Recent Transactions */}
      <div className="products-table-panel">
        <div className="products-table-heading">
          <div>
            <h3>Recent Stock Transactions</h3>
            <p>History of stock-in and stock-out activities.</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Product</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td className="product-name">
                    {transaction.productName}
                  </td>
                  <td>
                    <span
                      className={`stock-status ${
                        transaction.type === "Stock In"
                          ? "delivered"
                          : "cancelled"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td>{transaction.quantity}</td>
                  <td>{transaction.date}</td>
                </tr>
              ))}

              {transactions.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "30px" }}>
                    No transactions recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Transaction Modal */}
      {showModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="product-modal">
            <div className="modal-heading">
              <div>
                <h2>{transactionType}</h2>
                <p>{selectedProduct.name}</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleTransaction}>
              <label>Product ID</label>
              <input value={selectedProduct.id} readOnly />

              <label>Current Available Stock</label>
              <input value={selectedProduct.stock} readOnly />

              <label>Transaction Quantity</label>
              <input
                type="number"
                min="1"
                step="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  Confirm {transactionType}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
