import React, { createContext, useContext, useState, useEffect } from 'react';
import { Simulation } from '../types/simulation';
import simulationsData from '../data/simulations.json';

interface SimulationContextType {
  simulations: Simulation[];
  addSimulation: (simulation: Simulation) => void;
  getSimulation: (id: string) => Simulation | undefined;
  selectedForComparison: string[];
  toggleComparison: (id: string) => void;
  clearComparison: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [simulations, setSimulations] = useState<Simulation[]>(simulationsData as Simulation[]);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);

  const addSimulation = (simulation: Simulation) => {
    setSimulations(prev => [simulation, ...prev]);
  };

  const getSimulation = (id: string) => {
    return simulations.find(sim => sim.id === id);
  };

  const toggleComparison = (id: string) => {
    setSelectedForComparison(prev => {
      if (prev.includes(id)) {
        return prev.filter(simId => simId !== id);
      } else if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const clearComparison = () => {
    setSelectedForComparison([]);
  };

  return (
    <SimulationContext.Provider
      value={{
        simulations,
        addSimulation,
        getSimulation,
        selectedForComparison,
        toggleComparison,
        clearComparison,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulations = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulations must be used within a SimulationProvider');
  }
  return context;
};
