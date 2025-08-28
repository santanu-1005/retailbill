import React from "react";
import { Package } from "lucide-react";
import AddProductButton from "./AddProductButton";

const EmptyState = () => (
  <>
    <div className="bg-white rounded-lg shadow p-10 text-center mb-6">
      <AddProductButton />
    </div>

    <div className="bg-white rounded-lg shadow p-12 text-center">
      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No products found
      </h3>
      <p className="text-gray-500">
        Try adjusting your search or filter criteria.
      </p>
    </div>
  </>
);

export default EmptyState;
