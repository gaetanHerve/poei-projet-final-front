import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTest from './components/PageTest';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="pagetest" element={<PageTest/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
