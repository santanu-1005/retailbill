
import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import {
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../store/slices/cartSlice";
import {
  selectCartItems,
  selectCartTotal,
  selectCartTax,
  selectCartGrandTotal,
} from "../store/selectors";

import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import EmptyCart from "../components/Cart/EmptyCart";
import CartHeader from "../components/Cart/CartHeader";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartTotal);
  const tax = useAppSelector(selectCartTax);
  const total = useAppSelector(selectCartGrandTotal);

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateCartQuantity({ productId, quantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="space-y-6">
      <CartHeader onClearCart={handleClearCart} />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        <CartSummary subtotal={subtotal} tax={tax} total={total} />
      </div>
    </div>
  );
};

export default CartPage;
