// import { createContext, useContext, useState } from 'react';

// const DataContext = createContext();

// export const DataProvider = ({ children }) => {
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     return (
//         <DataContext.Provider value={{ isCollapsed, setIsCollapsed }}>
//             {children}
//         </DataContext.Provider>
//     );
// };
// export const useDataContext = () => {
//     // Use useContext hook to get the context
//     const context = useContext(DataContext);

//     // Throw an error if the hook is used outside of a DataProvider
//     if (!context) {
//         throw new Error('useDataContext must be used within a DataProvider');
//     }

//     // Return the context
//     return context;
// };