import React, { createContext, useState } from "react";

// Create a context object using the createContext function.
// This context object will hold the data that you want to share across your application.
// export const DataContext = createContext(null);
export const DataContext = createContext({ account: {}, setAccount: () => {} });
// export const DataContext = createContext({ account: {}, setAccount: () => {} });


// Component
const DataProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  // const [ account, setAccount ] = useState({ name: '', username: '' });
  return (
    <DataContext.Provider value={{ account: account || {}, setAccount }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;
