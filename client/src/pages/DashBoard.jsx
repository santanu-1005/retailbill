import React from "react";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  FileText,
  DollarSign,
  Package,
} from "lucide-react";
import { useAppSelector } from "../hooks/redux";
import {
  selectInvoices,
  selectProducts,
  selectCustomers,
  selectTotalRevenue,
  selectRecentInvoices,
  selectLowStockProducts,
  selectAverageOrderValue,
  selectCustomerMap,
} from "../store/selectors";

const Dashboard = () => {
  const invoices = useAppSelector(selectInvoices);
  const products = useAppSelector(selectProducts);
  const customers = useAppSelector(selectCustomers);
  const totalRevenue = useAppSelector(selectTotalRevenue);
  const recentInvoices = useAppSelector(selectRecentInvoices);
  const lowStockProducts = useAppSelector(selectLowStockProducts);
  const averageOrderValue = useAppSelector(selectAverageOrderValue);
  const customerMap = useAppSelector(selectCustomerMap);

  const totalSales = invoices?.length ?? 0;
  const totalCustomers = customers?.length ?? 0;
  const totalProducts = products?.length ?? 0;
  const lowStockCount = lowStockProducts?.length ?? 0;

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Sales",
      value: totalSales.toString(),
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Customers",
      value: totalCustomers.toString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Products",
      value: totalProducts.toString(),
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Dashboard Overview */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Low Stock Alert */}
        {lowStockCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-yellow-600" />
              <h3 className="text-sm font-medium text-yellow-800">
                Low Stock Alert
              </h3>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              {lowStockCount} product{lowStockCount > 1 ? "s" : ""} running low
              on stock (less than 10 units)
            </p>
          </div>
        )}
      </div>

      {/* Recent Sales & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Sales
          </h3>

          {recentInvoices.length > 0 ? (
            <div className="max-h-[320px] overflow-y-auto space-y-3">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {customerMap[invoice.customerId] || "Unknown Customer"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {invoice.invoiceNumber || `INV-${invoice.id}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{invoice.totalAmount?.toFixed(2) || "0.00"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No sales recorded yet</p>
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Products
          </h3>
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.stock} in stock
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Average Order Value */}
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              ₹{averageOrderValue.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Average Order Value</p>
          </div>

          {/* Total Inventory */}
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {products.reduce((sum, p) => sum + p.stock, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Inventory</p>
          </div>

          {/* Orders per Customer */}
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {totalCustomers > 0
                ? (totalSales / totalCustomers).toFixed(1)
                : "0.0"}
            </p>
            <p className="text-sm text-gray-600">Orders per Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
