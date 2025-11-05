import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SimulationProvider } from './context/SimulationContext';
import SimulationList from './components/SimulationList';
import SimulationDetail from './components/SimulationDetail';
import CreateSimulationV1 from './components/CreateSimulationV1';
import CreateSimulationV2 from './components/CreateSimulationV2';
import ComparisonView from './components/ComparisonView';

function App() {
  return (
    <SimulationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SimulationList />} />
          <Route path="/simulation/:id" element={<SimulationDetail />} />
          <Route path="/create-v1" element={<CreateSimulationV1 />} />
          <Route path="/create-v2" element={<CreateSimulationV2 />} />
          <Route path="/compare" element={<ComparisonView />} />
        </Routes>
      </Router>
    </SimulationProvider>
  );
}

export default App;
