import { useEffect, useState } from "react";
import { fetchUserProfile } from "../service/customer.service";

export function useUserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  return { user, loading, error };
}
