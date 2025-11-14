import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SimulationProvider } from './context/SimulationContext';
import SideNavBar from './components/SideNavBar';
import SimulationList from './components/SimulationList';
import CreateSimulation from './components/CreateSimulation';
import ComparisonView from './components/ComparisonView';
import PortCongestionDetail from './components/PortCongestionDetail';
import SupplierShutdownDetail from './components/SupplierShutdownDetail';
import PlantShutdownDetail from './components/PlantShutdownDetail';
import DemandDropDetail from './components/DemandDropDetail';

function App() {
  return (
    <SimulationProvider>
      <Router>
        <div style={{ display: 'flex' }}>
          <SideNavBar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<SimulationList />} />
              <Route path="/port-congestion/:id" element={<PortCongestionDetail />} />
              <Route path="/supplier-shutdown/:id" element={<SupplierShutdownDetail />} />
              <Route path="/plant-shutdown/:id" element={<PlantShutdownDetail />} />
              <Route path="/demand-drop/:id" element={<DemandDropDetail />} />
              <Route path="/create" element={<CreateSimulation />} />
              <Route path="/compare" element={<ComparisonView />} />
            </Routes>
          </div>
        </div>
      </Router>
    </SimulationProvider>
  );
}

export default App;
