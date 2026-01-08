import api from "../api/axios";

export const fetchUserProfile = async () => {
  const { data } = await api.get("/customer/get");
  return data?.data;
};

export const logoutCustomer = async () => {
  const response = await api.post("/customer/logout");
  return response.data?.data;
};