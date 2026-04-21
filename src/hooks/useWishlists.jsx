import { useState, useEffect, useCallback } from "react";

export default function useWishlists(userEmail) {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWishlists = useCallback(async () => {
    if (!userEmail) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/wishlist?userEmail=${userEmail}`);
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      const data = await res.json();
      setWishlists(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchWishlists();
  }, [fetchWishlists]);

  // Return the fetch function as "refetch"
  return { wishlists, loading, error, refetch: fetchWishlists };
}
