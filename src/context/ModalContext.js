import { useState, createContext, useContext } from "react";

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState({
    open: false,
    type: "",
  });

  const openModal = (payload) => setIsModal({
    open: true,
    type: payload,
  });

  const closeModal = () => setIsModal({
    open: false,
    type: "",
  });

  return (
    <ModalContext.Provider value={{ isModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => useContext(ModalContext);
