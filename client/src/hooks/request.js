import { useState, useCallback } from "react";

export function useRequest() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function clearError() {
    setError(null);
  }

  const request = useCallback(
    (url, method = "GET", body = null, headers = {}) => {
      let responseOK = true;
      setLoading(true);
      if (body) {
        body = JSON.stringify(body);
        headers["Content-type"] = "application/json";
      }
      return fetch(url, { method, body, headers })
        .then(response => {
          if (!response.ok) {
            responseOK = false;
          }
          return response.json();
        })
        .then(data => {
          if (!responseOK) {
            setError(data.message);
          }
          return data;
        })
        .catch(err => {
          setError(err.message);
          throw err;
        })
        .finally(() => setLoading(false));
    },
    []
  );

  return { isLoading, request, error, clearError };
}
