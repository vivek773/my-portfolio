import { useState, createContext, useContext } from "react";

export const LoaderContext = createContext(null);

export const LoaderProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};
export const useLoader = () => useContext(LoaderContext);
