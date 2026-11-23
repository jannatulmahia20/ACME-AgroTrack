
import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  ShoppingCart,
} from "lucide-react";

function SalesOrders() {
  const sampleCustomers = [
    { id: "CUS-001", name: "Rahman Agro Traders" },
    { id: "CUS-002", name: "Green Valley Store" },
    { id: "CUS-003", name: "Karim Agriculture" },
    { id: "CUS-004", name: "Fresh Crop Enterprise" },
  ];

  const sampleProducts = [
    { id: "PRD-001", name: "ACME Crop Guard", price: 1250 },
    { id: "PRD-002", name: "ACME Green Shield", price: 980 },
    { id: "PRD-003", name: "ACME Root Power", price: 750 },
    { id: "PRD-004", name: "ACME Pest Control", price: 1100 },
  ];

  // Load saved orders from localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem("acme_sales_orders");
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch {
      return [];
    }
  });

  // Automatically save orders whenever they change
  useEffect(() => {
    localStorage.setItem(
      "acme_sales_orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [customerId, setCustomerId] = useState("");
  const [orderStatus, setOrderStatus] = useState("Pending");

  const [orderItems, setOrderItems] = useState([
    { productId: "", quantity: 1 },
  ]);

  const formatCurrency = (amount) =>
    `৳ ${Number(amount || 0).toLocaleString("en-BD")}`;

  const getTotal = (items) =>
    items.reduce((total, item) => {
      const product = sampleProducts.find(
        (p) => p.id === item.productId
      );

      return (
        total +
        (product ? product.price * Number(item.quantity) : 0)
      );
    }, 0);

  const filteredOrders = orders.filter((order) =>
    `${order.id} ${order.customerName} ${order.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const openAddForm = () => {
    setEditingId(null);
    setCustomerId("");
    setOrderStatus("Pending");
    setOrderItems([{ productId: "", quantity: 1 }]);
    setShowForm(true);
  };

  const addOrderItem = () => {
    setOrderItems((current) => [
      ...current,
      { productId: "", quantity: 1 },
    ]);
  };

  const updateOrderItem = (index, field, value) => {
    setOrderItems((current) =>
      current.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const removeOrderItem = (index) => {
    setOrderItems((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const customer = sampleCustomers.find(
      (c) => c.id === customerId
    );

    if (!customer) {
      alert("Please select a customer.");
      return;
    }

    if (
      orderItems.length === 0 ||
      orderItems.some(
        (item) =>
          !item.productId ||
          !Number.isInteger(Number(item.quantity)) ||
          Number(item.quantity) < 1
      )
    ) {
      alert("Please select products and enter valid quantities.");
      return;
    }

    const selectedProductIds = orderItems.map(
      (item) => item.productId
    );

    if (
      new Set(selectedProductIds).size !==
      selectedProductIds.length
    ) {
      alert("Please select each product only once.");
      return;
    }

    const total = getTotal(orderItems);

    if (editingId) {
      setOrders((current) =>
        current.map((order) =>
          order.id === editingId
            ? {
                ...order,
                customerId,
                customerName: customer.name,
                items: orderItems,
                total,
                status: orderStatus,
              }
            : order
        )
      );
    } else {
      const newOrder = {
        id: `ORD-${Date.now()}`,
        customerId,
        customerName: customer.name,
        items: orderItems,
        total,
        status: orderStatus,
        date: new Date().toLocaleDateString("en-GB"),
      };

      setOrders((current) => [...current, newOrder]);
    }

    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (order) => {
    setEditingId(order.id);
    setCustomerId(order.customerId);
    setOrderStatus(order.status);
    setOrderItems(order.items.map((item) => ({ ...item })));
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((current) =>
        current.filter((order) => order.id !== id)
      );
    }
  };

  const getStatusCount = (status) =>
    orders.filter((order) => order.status === status).length;

  return (
    <div className="products-page">

      {/* Page Heading */}
      <div className="products-heading">
        <div>
          <h1>Sales Orders</h1>
          <p>Create and manage customer sales orders.</p>
        </div>

        <button className="add-product-btn" onClick={openAddForm}>
          <Plus size={18} />
          Create Order
        </button>
      </div>

      {/* Summary Cards */}
      <div className="product-summary">
        <div className="product-summary-card">
          <span>Total Orders</span>
          <h2>{orders.length}</h2>
        </div>

        <div className="product-summary-card">
          <span>Pending</span>
          <h2>{getStatusCount("Pending")}</h2>
        </div>

        <div className="product-summary-card">
          <span>Processing</span>
          <h2>{getStatusCount("Processing")}</h2>
        </div>

        <div className="product-summary-card">
          <span>Delivered</span>
          <h2>{getStatusCount("Delivered")}</h2>
        </div>
      </div>

      {/* Orders Table */}
      <div className="products-table-panel">
        <div className="products-table-heading">
          <div>
            <h3>Order List</h3>
            <p>View and manage your sales orders.</p>
          </div>

          <div className="product-search">
            <Search size={17} />
            <input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td className="product-name">
                    {order.customerName}
                  </td>
                  <td>{order.date}</td>
                  <td>{order.items.length}</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>
                    <span
                      className={`stock-status ${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="product-actions">
                      <button
                        onClick={() => handleEdit(order)}
                        aria-label="Edit order"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(order.id)}
                        aria-label="Delete order"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Order Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="product-modal sales-order-modal">

            <div className="modal-heading">
              <div>
                <h2>
                  {editingId ? "Edit Sales Order" : "Create New Order"}
                </h2>
                <p>Enter customer and order details.</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>Select Customer</label>

              <select
                required
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              >
                <option value="">Choose a customer</option>

                {sampleCustomers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>

              <div className="order-items-heading">
                <label>Order Products</label>

                <button
                  type="button"
                  className="add-item-btn"
                  onClick={addOrderItem}
                >
                  <Plus size={15} />
                  Add Product
                </button>
              </div>

              {orderItems.map((item, index) => {
                const product = sampleProducts.find(
                  (p) => p.id === item.productId
                );

                return (
                  <div className="order-item-row" key={index}>
                    <div className="order-item-fields">
                      <label>Product</label>

                      <select
                        required
                        value={item.productId}
                        onChange={(e) =>
                          updateOrderItem(
                            index,
                            "productId",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select product</option>

                        {sampleProducts.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="order-item-fields">
                      <label>Quantity</label>

                      <input
                        required
                        type="number"
                        min="1"
                        step="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateOrderItem(
                            index,
                            "quantity",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="order-item-fields">
                      <label>Unit Price</label>

                      <input
                        readOnly
                        value={
                          product
                            ? formatCurrency(product.price)
                            : ""
                        }
                        placeholder="Auto"
                      />
                    </div>

                    <button
                      type="button"
                      className="remove-item-btn"
                      onClick={() => removeOrderItem(index)}
                      disabled={orderItems.length === 1}
                      aria-label="Remove product"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                );
              })}

              <div className="order-total">
                <span>Order Total</span>
                <strong>
                  {formatCurrency(getTotal(orderItems))}
                </strong>
              </div>

              <label>Order Status</label>

              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingId ? "Update Order" : "Save Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesOrders;
