// SlotSearchContext.js
import React, { createContext, useContext, useState } from "react";

const SlotSearchContext = createContext();

export const useSlotSearch = () => {
  const context = useContext(SlotSearchContext);
  if (!context) {
    throw new Error("useSlotSearch must be used within a SlotSearchProvider");
  }
  return context;
};

export const SlotSearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <SlotSearchContext.Provider value={{ searchText, handleSearch }}>
      {children}
    </SlotSearchContext.Provider>
  );
};
