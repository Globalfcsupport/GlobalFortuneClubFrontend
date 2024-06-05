// SlotSearchContext.js
import React, { createContext, useContext, useState } from "react";

const TransactionSearchContext = createContext();

export const useTransactionSearch = () => {
  const context = useContext(TransactionSearchContext);
  if (!context) {
    throw new Error("useSlotSearch must be used within a SlotSearchProvider");
  }
  return context;
};

export const TransactionSearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <TransactionSearchContext.Provider value={{ searchText, handleSearch }}>
      {children}
    </TransactionSearchContext.Provider>
  );
};
