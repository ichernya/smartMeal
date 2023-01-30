import {createContext, useContext} from 'react';

export const UtilsContext = createContext();

export const useUtils = () => {
  return useContext(UtilsContext);
};
