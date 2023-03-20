import { useEffect, useState } from "react";
import postApi from "../apis/postApi";

const useInitialFetch = <T = unknown>(
  initialData: any,
  url: any,
  dependencies: any,
  params?: any
) => {
  const [data, setData] = useState<T | null>(initialData);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      if (
        Array.isArray(initialData) && Array.isArray(data) ? !data.length : !data
      ) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      try {
        const response = await postApi.get(url, {
          params,
          signal: controller.signal,
        });
        const json = (await response.data) as T;

        setData(json);
      } catch (error) {
        setIsError(true);

        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };

    fetchData();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  return {
    data,
    setData,
    isError,
    isLoading,
    isRefetching,
  };
};

export default useInitialFetch;
