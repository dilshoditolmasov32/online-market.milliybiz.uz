import { useState } from "react";
import { getOrders } from "../service/order.service";

const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      return res;
      console.log(res);
    } catch (err) {
      setError(err);
    }
  };

  return {
    fetchOrders,
    loading,
    error,
  };
};

export default useOrder;
