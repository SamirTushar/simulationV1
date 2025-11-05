import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSimulations } from '../context/SimulationContext';
import { Simulation, DisruptionType } from '../types/simulation';

const CreateSimulationV1: React.FC = () => {
  const navigate = useNavigate();
  const { addSimulation } = useSimulations();

  const [simulationName, setSimulationName] = useState('');
  const [disruptionType, setDisruptionType] = useState<DisruptionType>('Supplier Delay');
  const [location, setLocation] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const disruptionTypes: DisruptionType[] = [
    'Supplier Delay',
    'Port Congestion',
    'Weather Event',
    'Quality Issue',
    'Transportation Strike',
    'Customs Delay',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    const newSimulation: Simulation = {
      id: `sim-${Date.now()}`,
      name: simulationName,
      disruptionType,
      createdAt: new Date().toISOString(),
      status: 'Running',
      variables: [
        {
          name: 'Location',
          value: location,
          type: 'location',
        },
      ],
      summary: {
        totalOrdersImpacted: 0,
        totalRevenue: 0,
        averageDelay: 0,
        criticalOrders: 0,
      },
      cascadeEvents: [],
      impactedOrders: [],
    };

    // Simulate the running status for 3 seconds
    setTimeout(() => {
      // Generate mock data after 3 seconds
      const mockOrders = generateMockOrders(disruptionType);
      const mockEvents = generateMockEvents(disruptionType, location);

      const completedSimulation: Simulation = {
        ...newSimulation,
        status: 'Completed',
        summary: {
          totalOrdersImpacted: mockOrders.length,
          totalRevenue: mockOrders.reduce((sum, order) => sum + order.orderValue, 0),
          averageDelay: Math.round(
            mockOrders.reduce((sum, order) => sum + order.delayDays, 0) / mockOrders.length
          ),
          criticalOrders: mockOrders.filter(order => order.status === 'Critical').length,
        },
        cascadeEvents: mockEvents,
        impactedOrders: mockOrders,
      };

      addSimulation(completedSimulation);
      setIsCreating(false);
      navigate(`/simulation/${completedSimulation.id}`);
    }, 3000);

    // Add the running simulation immediately
    addSimulation(newSimulation);
    navigate('/');
  };

  const generateMockOrders = (type: DisruptionType) => {
    const customers = ['Best Buy', 'Amazon', 'Walmart', 'Target', 'Costco', 'Home Depot'];
    const skus = ['PRODUCT-001', 'PRODUCT-002', 'PRODUCT-003', 'PRODUCT-004'];
    const statuses: ('Critical' | 'Delayed' | 'At Risk')[] = ['Critical', 'Delayed', 'At Risk'];

    const orderCount = Math.floor(Math.random() * 30) + 50; // 50-80 orders
    const orders = [];

    for (let i = 0; i < orderCount; i++) {
      const delayDays = Math.floor(Math.random() * 20) + 5; // 5-25 days
      const originalDate = new Date();
      originalDate.setDate(originalDate.getDate() + Math.floor(Math.random() * 30) + 10);
      const newDate = new Date(originalDate);
      newDate.setDate(newDate.getDate() + delayDays);

      orders.push({
        orderId: `ORD-2025-${10000 + i}`,
        customerName: customers[Math.floor(Math.random() * customers.length)],
        sku: skus[Math.floor(Math.random() * skus.length)],
        quantity: Math.floor(Math.random() * 1000) + 100,
        orderValue: Math.floor(Math.random() * 500000) + 50000,
        originalDeliveryDate: originalDate.toISOString(),
        newDeliveryDate: newDate.toISOString(),
        delayDays,
        status: statuses[Math.floor(Math.random() * statuses.length)],
      });
    }

    return orders;
  };

  const generateMockEvents = (type: DisruptionType, location: string) => {
    const now = new Date();
    return [
      {
        id: `ce-${Date.now()}-1`,
        timestamp: now.toISOString(),
        eventType: 'Initial Disruption',
        description: `${type} detected at ${location}`,
        severity: 'High' as const,
        affectedEntities: [location],
      },
      {
        id: `ce-${Date.now()}-2`,
        timestamp: new Date(now.getTime() + 3600000).toISOString(),
        eventType: 'Supply Chain Impact',
        description: 'Multiple suppliers affected by the disruption',
        severity: 'High' as const,
        affectedEntities: ['Supplier Network'],
      },
      {
        id: `ce-${Date.now()}-3`,
        timestamp: new Date(now.getTime() + 7200000).toISOString(),
        eventType: 'Customer Orders at Risk',
        description: 'Customer orders identified as at-risk',
        severity: 'Critical' as const,
        affectedEntities: ['Order Management System'],
      },
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Simulations
          </Link>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">Create New Simulation (V1)</h1>
            <p className="mt-2 text-sm text-gray-600">
              Single-variable simulation builder for quick disruption analysis
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Simulation Name */}
              <div>
                <label htmlFor="simulationName" className="block text-sm font-medium text-gray-700 mb-2">
                  Simulation Name
                </label>
                <input
                  type="text"
                  id="simulationName"
                  value={simulationName}
                  onChange={(e) => setSimulationName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Q4 Holiday Supply Chain Test"
                />
              </div>

              {/* Disruption Type */}
              <div>
                <label htmlFor="disruptionType" className="block text-sm font-medium text-gray-700 mb-2">
                  Disruption Type
                </label>
                <select
                  id="disruptionType"
                  value={disruptionType}
                  onChange={(e) => setDisruptionType(e.target.value as DisruptionType)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {disruptionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Shanghai, China"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Specify the geographic location where the disruption occurs
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">V1 Simulation Features</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>Single disruption variable analysis</li>
                      <li>Automated impact calculation</li>
                      <li>3-second simulation runtime</li>
                      <li>Auto-generated cascade events</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Simulation...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Run Simulation
                    </>
                  )}
                </button>
                <Link
                  to="/"
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Try V2 */}
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need more control?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Try the V2 simulation builder for multi-variable analysis with custom parameters including duration, severity, and multiple affected locations.
              </p>
              <Link
                to="/create-v2"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try V2 Builder
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSimulationV1;
