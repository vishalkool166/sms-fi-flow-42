
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedApp');
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      // First time visitor
      localStorage.setItem('hasVisitedApp', 'true');
    }
  }, []);

  // Redirect first time users to landing page, otherwise to home
  return isFirstVisit ? <Navigate to="/landing" replace /> : <Navigate to="/" replace />;
};

export default Index;
