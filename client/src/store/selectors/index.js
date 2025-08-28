
import { createSelector } from '@reduxjs/toolkit';

// Product selectors
export const selectProducts = (state) => state.products.items;
export const selectProductsSearchTerm = (state) => state.products.searchTerm;
export const selectProductsCategoryFilter = (state) => state.products.categoryFilter;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectProductsSearchTerm, selectProductsCategoryFilter],
  (products, searchTerm, categoryFilter) => {
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !categoryFilter || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }
);

export const selectProductCategories = createSelector(
  [selectProducts],
  (products) => [...new Set(products.map(p => p.category))]
);

export const selectLowStockProducts = createSelector(
  [selectProducts],
  (products) => products.filter(p => p.stock < 10)
);

// Cart selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartTax = createSelector(
  [selectCartTotal],
  (total) => total * 0.18
);

export const selectCartGrandTotal = createSelector(
  [selectCartTotal, selectCartTax],
  (total, tax) => total + tax
);

// Customer selectors
export const selectCustomers = (state) => state.customers.items;
export const selectSelectedCustomer = (state) => state.customers.selectedCustomer;
export const selectCustomerMap = createSelector(
  [selectCustomers],
  (customers) => {
    const map = {};
    customers.forEach((c) => {
      map[c.id] = c.name;
    });
    return map;
  }
);

// Invoice selectors
export const selectInvoices = (state) => state.invoices.items;

export const selectTotalRevenue = createSelector(
  [selectInvoices],
  (invoices) => invoices.reduce((sum, invoice) => sum + invoice.total, 0)
);

export const selectRecentInvoices = createSelector(
  [selectInvoices],
  (invoices) => invoices.slice(-5).reverse()
);

export const selectAverageOrderValue = createSelector(
  [selectTotalRevenue, selectInvoices],
  (revenue, invoices) =>
    invoices.length > 0 ? revenue / invoices.length : 0
);

// User Selectors
export const selectUser = (state) => state.auth.user ;
