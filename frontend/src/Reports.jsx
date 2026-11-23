
import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  Download,
  CalendarDays,
  CircleDollarSign,
  MapPin
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function Reports() {
  const [period, setPeriod] = useState("Monthly");

  const monthlySales = [
    { name: "Jan", sales: 185000, orders: 32 },
    { name: "Feb", sales: 220000, orders: 38 },
    { name: "Mar", sales: 195000, orders: 35 },
    { name: "Apr", sales: 280000, orders: 45 },
    { name: "May", sales: 245000, orders: 41 },
    { name: "Jun", sales: 310000, orders: 52 },
    { name: "Jul", sales: 275000, orders: 48 },
    { name: "Aug", sales: 350000, orders: 59 },
    { name: "Sep", sales: 320000, orders: 54 },
    { name: "Oct", sales: 390000, orders: 65 },
    { name: "Nov", sales: 485000, orders: 78 },
    { name: "Dec", sales: 420000, orders: 70 }
  ];

  const quarterlySales = [
    { name: "Q1", sales: 600000, orders: 105 },
    { name: "Q2", sales: 835000, orders: 138 },
    { name: "Q3", sales: 945000, orders: 161 },
    { name: "Q4", sales: 1295000, orders: 213 }
  ];

  const weeklySales = [
    { name: "Week 1", sales: 95000, orders: 16 },
    { name: "Week 2", sales: 120000, orders: 21 },
    { name: "Week 3", sales: 145000, orders: 25 },
    { name: "Week 4", sales: 125000, orders: 20 }
  ];

  const salesData =
    period === "Quarterly"
      ? quarterlySales
      : period === "Weekly"
      ? weeklySales
      : monthlySales;

  const orderStatus = [
    { name: "Delivered", value: 145, color: "#16a34a" },
    { name: "Processing", value: 48, color: "#3b82f6" },
    { name: "Pending", value: 35, color: "#f59e0b" },
    { name: "Cancelled", value: 20, color: "#ef4444" }
  ];

  const topProducts = [
    { id: "PRD-001", name: "ACME Crop Guard", category: "Insecticide", units: 320, revenue: 400000 },
    { id: "PRD-002", name: "ACME Green Shield", category: "Fungicide", units: 265, revenue: 259700 },
    { id: "PRD-003", name: "ACME Root Power", category: "Fertilizer", units: 210, revenue: 157500 },
    { id: "PRD-004", name: "ACME Pest Control", category: "Insecticide", units: 185, revenue: 203500 }
  ];

  const regionalData = [
    { region: "Dhaka North", customers: 35, sales: 185000 },
    { region: "Dhaka South", customers: 28, sales: 142000 },
    { region: "Gazipur", customers: 22, sales: 98000 },
    { region: "Chattogram", customers: 31, sales: 160000 }
  ];

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);

  const formatCurrency = (value) =>
    `৳${Number(value).toLocaleString("en-BD")}`;

  const handleExport = () => {
    const rows = [
      ["Product ID", "Product Name", "Category", "Units Sold", "Revenue"],
      ...topProducts.map((product) => [
        product.id,
        product.name,
        product.category,
        product.units,
        product.revenue
      ])
    ];

    const csv = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ACME-AgroTrack-Product-Report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="reports-page">

      <style>{`
        .reports-page {
          padding: 25px;
          color: #1f2937;
          background: #f8fafc;
          min-height: 100%;
        }

        .reports-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .reports-header h1 {
          font-size: 24px;
          margin: 0 0 7px;
          color: #173d2c;
        }

        .reports-header p {
          color: #718096;
          margin: 0;
          font-size: 14px;
        }

        .reports-controls {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .reports-controls select,
        .export-report-btn {
          padding: 10px 14px;
          border: 1px solid #dce5df;
          border-radius: 8px;
          background: white;
          color: #294d39;
          font-size: 13px;
        }

        .export-report-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #176b45;
          color: white;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }

        .report-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 22px;
        }

        .report-stat {
          background: white;
          border: 1px solid #e8eee9;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,.025);
        }

        .report-stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .report-stat-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #eaf5ee;
          color: #176b45;
        }

        .report-stat h2 {
          font-size: 23px;
          margin: 0 0 6px;
          color: #193d2b;
        }

        .report-stat p {
          margin: 0;
          color: #718096;
          font-size: 13px;
        }

        .report-chart-grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 20px;
          margin-bottom: 22px;
        }

        .report-panel {
          background: white;
          border: 1px solid #e8eee9;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,.025);
          min-width: 0;
        }

        .report-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .report-panel-header h3 {
          color: #193d2b;
          font-size: 16px;
          margin: 0 0 5px;
        }

        .report-panel-header p {
          color: #87948b;
          font-size: 12px;
          margin: 0;
        }

        .report-chart {
          width: 100%;
          height: 290px;
        }

        .report-tables-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
        }

        .report-table-wrap {
          overflow-x: auto;
        }

        .report-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 13px;
        }

        .report-table th {
          color: #718096;
          font-weight: 600;
          background: #f8fafc;
          padding: 13px 12px;
          white-space: nowrap;
        }

        .report-table td {
          padding: 14px 12px;
          border-bottom: 1px solid #edf1ee;
          color: #42534a;
          white-space: nowrap;
        }

        .report-table tr:last-child td {
          border-bottom: none;
        }

        .report-table strong {
          color: #234b35;
        }

        .report-section-icon {
          color: #176b45;
          display: inline-flex;
          margin-right: 7px;
          vertical-align: middle;
        }

        @media(max-width: 1000px) {
          .report-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .report-chart-grid,
          .report-tables-grid {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width: 600px) {
          .reports-page {
            padding: 15px;
          }

          .report-stats {
            grid-template-columns: 1fr;
          }

          .report-stat h2 {
            font-size: 21px;
          }
        }
      `}</style>

      {/* Page Header */}
      <div className="reports-header">
        <div>
          <h1>Business Reports</h1>
          <p>Analyze sales, orders, products and regional performance.</p>
        </div>

        <div className="reports-controls">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>

          <button className="export-report-btn" onClick={handleExport}>
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="report-stats">

        <div className="report-stat">
          <div className="report-stat-top">
            <p>Total Sales</p>
            <div className="report-stat-icon">
              <CircleDollarSign size={21} />
            </div>
          </div>
          <h2>{formatCurrency(totalSales)}</h2>
          <p>Selected {period.toLowerCase()} period</p>
        </div>

        <div className="report-stat">
          <div className="report-stat-top">
            <p>Total Orders</p>
            <div className="report-stat-icon">
              <ShoppingCart size={21} />
            </div>
          </div>
          <h2>{totalOrders}</h2>
          <p>Orders in selected period</p>
        </div>

        <div className="report-stat">
          <div className="report-stat-top">
            <p>Products Sold</p>
            <div className="report-stat-icon">
              <Package size={21} />
            </div>
          </div>
          <h2>980</h2>
          <p>Units sold </p>
        </div>

        <div className="report-stat">
          <div className="report-stat-top">
            <p>Active Customers</p>
            <div className="report-stat-icon">
              <Users size={21} />
            </div>
          </div>
          <h2>116</h2>
          <p>Active customer records </p>
        </div>

      </div>

      {/* Charts */}
      <div className="report-chart-grid">

        <div className="report-panel">
          <div className="report-panel-header">
            <div>
              <h3>
                <span className="report-section-icon">
                  <TrendingUp size={17} />
                </span>
                Sales Performance
              </h3>
              <p>Sales revenue for the selected period</p>
            </div>
          </div>

          <div className="report-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Sales"]}
                />
                <Bar
                  dataKey="sales"
                  fill="#238653"
                  radius={[5, 5, 0, 0]}
                  barSize={period === "Monthly" ? 22 : 42}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="report-panel">
          <div className="report-panel-header">
            <div>
              <h3>
                <span className="report-section-icon">
                  <ShoppingCart size={17} />
                </span>
                Order Status
              </h3>
              <p>Distribution of all orders</p>
            </div>
          </div>

          <div className="report-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={90}
                  innerRadius={55}
                  paddingAngle={3}
                >
                  {orderStatus.map((item, index) => (
                    <Cell key={index} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: "11px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Tables */}
      <div className="report-tables-grid">

        <div className="report-panel">
          <div className="report-panel-header">
            <div>
              <h3>
                <span className="report-section-icon">
                  <Package size={17} />
                </span>
                Top Selling Products
              </h3>
              <p>Product sales performance</p>
            </div>
          </div>

          <div className="report-table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Units Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <strong>{product.name}</strong>
                      <br />
                      <small>{product.category}</small>
                    </td>
                    <td>{product.units}</td>
                    <td>{formatCurrency(product.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="report-panel">
          <div className="report-panel-header">
            <div>
              <h3>
                <span className="report-section-icon">
                  <MapPin size={17} />
                </span>
                Regional Performance
              </h3>
              <p>Sales by distribution region</p>
            </div>
          </div>

          <div className="report-table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Customers</th>
                  <th>Sales</th>
                </tr>
              </thead>

              <tbody>
                {regionalData.map((region) => (
                  <tr key={region.region}>
                    <td><strong>{region.region}</strong></td>
                    <td>{region.customers}</td>
                    <td>{formatCurrency(region.sales)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Reports;
