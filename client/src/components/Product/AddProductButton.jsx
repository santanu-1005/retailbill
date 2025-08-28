import React from "react";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddProductButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/products/addproduct")}
      className="w-full flex justify-center items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
    >
      <PlusCircle className="w-5 h-5" />
      Add Product
    </button>
  );
};

export default AddProductButton;
