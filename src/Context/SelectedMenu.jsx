import { createContext, useContext, useState } from "react";

export const SelectedMenuContext = createContext({
  selectedMenu: [],
  setSelectedMenu: () => {},
});

export const SelectedMenuContextProvider = (prop) => {
  const [selectedMenu, setSelectedMenu] = useState([]);

  return (
    <SelectedMenuContext.Provider
      value={{ selectedMenu, setSelectedMenu }}
      {...prop}
    ></SelectedMenuContext.Provider>
  );
};

export const useSelectedMenu = () => {
  const querrySelectedMenu = useContext(SelectedMenuContext);
  return {
    ...querrySelectedMenu,
  };
};
