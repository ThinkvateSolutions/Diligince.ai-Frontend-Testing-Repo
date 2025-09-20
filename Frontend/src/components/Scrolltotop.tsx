import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Scrolltotop = () => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === location.pathname) {
      // Same route clicked again (like clicking "Home" on "/")
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      // New route
      prevPath.current = location.pathname;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location]);

  return null;
};

export default Scrolltotop;
