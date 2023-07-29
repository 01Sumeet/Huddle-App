import { createContext, useContext, useState } from "react";

export const SelectedMenuContext = createContext({
  selectedMenu: [],
  setSelectedMenu: () => {},
  imgFile: [],
  setImgFile: () => {},
});

export const SelectedMenuContextProvider = (prop) => {
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [imgFile, setImgFile] = useState([]);

  return (
    <SelectedMenuContext.Provider
      value={{ selectedMenu, setSelectedMenu, imgFile, setImgFile }}
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
