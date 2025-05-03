
import React from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // Navigate to the dashboard page directly
  return <Navigate to="/" replace />;
};

export default Index;
