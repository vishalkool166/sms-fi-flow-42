
import React from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // Navigate to the home page directly instead of onboarding
  return <Navigate to="/" replace />;
};

export default Index;
