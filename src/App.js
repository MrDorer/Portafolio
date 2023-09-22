import React from 'react';
import './index.css';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <DashboardHeader />
        <DashboardStats />
      </div>
    </div>
  );
}

export default App;
