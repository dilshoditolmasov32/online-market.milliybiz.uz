import api from "../api/axios";


export const getOrders = (params = {}) => {
  return api.get("customer/orders", { params });

};
