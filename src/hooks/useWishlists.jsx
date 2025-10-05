import { useState, useEffect } from "react";

export default function useWishlists(userEmail) {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userEmail) {
      console.log("useWishlists: userEmail not ready yet");
      return;
    }

    console.log("useWishlists: fetching wishlist for", userEmail);

    const fetchWishlists = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/wishlist?userEmail=${userEmail}`);

        if (!res.ok) throw new Error("Failed to fetch wishlist");
        const data = await res.json();
        setWishlists(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlists();
  }, [userEmail]);

  return { wishlists, loading, error };
}
