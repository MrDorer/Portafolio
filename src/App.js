import React from 'react';
import './index.css';
import DashboardStats from './components/DashboardStats';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="overflow-auto app">
      <Sidebar />
      <div className="overflow-auto main-content">
        <DashboardStats />
      </div>
    </div>
  );
}

export default App;
