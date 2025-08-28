
import React, { useEffect, useState } from "react";
import AddProductButton from "../components/Product/AddProductButton";
import EmptyState from "../components/Product/EmptyState";
import ProductList from "../components/Product/ProductList";
import { getProducts } from "../service/api";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await getProducts();
        setProducts(response.data)
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-10 text-center">
        <AddProductButton />
      </div>

      <div className="bg-white rounded-lg shadow p-12 text-center mt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Product Catalog
            </h2>
            <p className="text-sm text-gray-500">
              {products.length} products available
            </p>
          </div>

          <ProductList products={products} />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
