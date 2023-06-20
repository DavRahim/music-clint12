
import { RouterProvider } from 'react-router-dom';
import Route from './Route/Route';
import AuthProvider from './components/Providers/AuthProvider';
import './App.css'

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createContext, useState } from 'react';

const queryClient = new QueryClient();

export const ThemeContext = createContext(null);


function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>{
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <div className='App' id={theme}>
            <RouterProvider router={Route} />
          </div>
        </ThemeContext.Provider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App
