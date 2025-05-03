
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  // Redirect to onboarding on first load
  useEffect(() => {
    navigate("/onboarding");
  }, [navigate]);

  return <div className="min-h-screen bg-background"></div>;
};

export default Index;
