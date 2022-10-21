import React from 'react';
import Home from './pages';
import Providers from './Providers';
import './App.css';

const App = () => {

  return (
    <Providers>
      <div className="bg-neutral-900 h-screen w-screen flex justify-center items-center">
        <Home />
      </div>
    </Providers>
  );
}

export default App
