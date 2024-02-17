import { createContext, useContext } from "react";

const SwipeableContext = createContext(undefined);

export const SwipeableProvider = ({ children, value }) => {
  return (
    <SwipeableContext.Provider value={value}>
      {children}
    </SwipeableContext.Provider>
  );
};

export const useSwipeableContext = () => {
  const context = useContext(SwipeableContext);

  if (context === null) {
    throw new Error(
      "useSwipeableContext must be used within a SwipeableProvider"
    );
  }

  return context;
};
