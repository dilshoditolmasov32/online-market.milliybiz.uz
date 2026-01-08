import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../service/cart.service";
import { fetchCart } from "../store/cart";

const useCart = () => {
  const dispatch = useDispatch();
  const { cart, loading: cartLoading } = useSelector((s) => s.cart);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCart = () => {
    dispatch(fetchCart());
  };

  const addItem = async (productId, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      await addToCart(productId, quantity);
      dispatch(fetchCart());
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateLocalCart = (newItemId, newQty) => {
    const updatedItems = cart.data.items.map((item) =>
      item.id === newItemId ? { ...item, quantity: newQty } : item
    );

    dispatch({
      type: "cart/fetchCart/fulfilled",
      payload: { ...cart, data: { ...cart.data, items: updatedItems } },
    });
  };

  const removeItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
      dispatch(fetchCart());
    } catch (err) {
      console.error(err);
    }
  };

  return {
    cart: cart,
    cartItems: cart?.data?.items || [],
    fullCart: cart?.data,
    getCart,
    addItem,
    loading: loading || cartLoading,
    error,
    updateLocalCart,
    removeItem,
  };
};

export default useCart;
