import { useEffect, useState } from "react";

const useFetch = <T>(
  url: string,
): { data: T | null; error: Error | null; loading: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const result: T = await response.json();
        setData(result);
      } catch (error) {
        setError(error as Error);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
