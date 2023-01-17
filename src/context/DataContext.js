import React, {createContext, useState} from 'react';
  
export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [isChild, setIsChild] = useState(false);
  
  const color = "rgba(2, 129, 241, 0.8)"
  const lightColor = "rgba(137, 196, 244, 0.3)"
    

  return (
    <DataContext.Provider
      value={{
        isChild, setIsChild, color, lightColor
      }}>
      {children}
    </DataContext.Provider>
  );
};