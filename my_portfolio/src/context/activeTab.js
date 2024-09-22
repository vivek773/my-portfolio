import React, { useState, createContext } from "react";

// Create the context with a default value
export const ActiveTabContext = createContext();

// Create a provider component
export const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState({ id: 0, name: "Home" });

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};