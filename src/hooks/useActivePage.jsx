import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useActivePage = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  return [activePage, setActivePage];
};

export default useActivePage;
