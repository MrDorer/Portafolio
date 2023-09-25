import React, { useState } from 'react';
import './index.css';
import DashboardStats from './components/DashboardStats';
import Sidebar from './components/Sidebar';
import Inicio from './components/Inicio';

function App() {
  const [currentPage, setCurrentPage] = useState('inicio');

  return (
    <div className="overflow-auto app">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="overflow-auto main-content">
        {currentPage === 'inicio' ? <Inicio currentPage={currentPage} setCurrentPage={setCurrentPage}/> : <DashboardStats />}
      </div>
    </div>
  );
}

export default App;

