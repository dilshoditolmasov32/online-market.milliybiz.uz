import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutCustomer } from "../service/customer.service";

export function useLogout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);

      await logoutCustomer();

      localStorage.removeItem("token");
      window.location.href = "/";
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}
