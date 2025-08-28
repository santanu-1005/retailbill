import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Authentication endpoints
const authUrl = "/auth";

export const signin = (formData) => API.post(`${authUrl}/signin`, formData); //Sign in

export const signup = (formData) => API.post(`${authUrl}/signup`, formData); //Sign up

// Product endpoints
const productUrl = "/products"

export const createProduct = (formData) => API.post(`${productUrl}/register`, formData); // Add Product

export const getProducts = () => API.get(productUrl);

// Customer endpoints
const customerUrl = "/customers"

export const createCustomer = (formData) => API.post(`${customerUrl}/register`, formData); // Create Customers

export const getCustomers = (userId) => API.get(`${customerUrl}/u/${userId}`);

// Invoice endpoints
const invoiceUrl = "/invoices"

export const createInvoice = (formData) => API.post(`${invoiceUrl}/create`, formData);

export const getInvoices = (userId) => API.get(`${invoiceUrl}/u/${userId}`);
