import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);
  if (typeof window === "undefined") {
    return { isAuthenticated: false };
  }

  return { isAuthenticated };
};
