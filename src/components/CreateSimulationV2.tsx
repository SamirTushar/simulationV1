import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSimulations } from '../context/SimulationContext';
import { Simulation, DisruptionType, SimulationVariable } from '../types/simulation';

const CreateSimulationV2: React.FC = () => {
  const navigate = useNavigate();
  const { addSimulation } = useSimulations();

  const [simulationName, setSimulationName] = useState('');
  const [disruptionType, setDisruptionType] = useState<DisruptionType>('Supplier Delay');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('7');
  const [severity, setSeverity] = useState('Medium');
  const [affectedProduct, setAffectedProduct] = useState('');
  const [secondaryLocation, setSecondaryLocation] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const disruptionTypes: DisruptionType[] = [
    'Supplier Delay',
    'Port Congestion',
    'Weather Event',
    'Quality Issue',
    'Transportation Strike',
    'Customs Delay',
  ];

  const severityLevels = ['Low', 'Medium', 'High', 'Critical'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    const variables: SimulationVariable[] = [
      {
        name: 'Primary Location',
        value: location,
        type: 'location',
      },
      {
        name: 'Duration',
        value: `${duration} days`,
        type: 'duration',
      },
      {
        name: 'Severity',
        value: severity,
        type: 'severity',
      },
    ];

    if (affectedProduct) {
      variables.push({
        name: 'Affected Product',
        value: affectedProduct,
        type: 'product',
      });
    }

    if (secondaryLocation) {
      variables.push({
        name: 'Secondary Location',
        value: secondaryLocation,
        type: 'location',
      });
    }

    const newSimulation: Simulation = {
      id: `sim-${Date.now()}`,
      name: simulationName,
      disruptionType,
      createdAt: new Date().toISOString(),
      status: 'Running',
      variables,
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
      const severityMultiplier = getSeverityMultiplier(severity);
      const durationDays = parseInt(duration);
      const mockOrders = generateMockOrders(disruptionType, severityMultiplier, durationDays);
      const mockEvents = generateMockEvents(disruptionType, variables, severity);

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

  const getSeverityMultiplier = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 0.5;
      case 'Medium':
        return 1;
      case 'High':
        return 1.5;
      case 'Critical':
        return 2;
      default:
        return 1;
    }
  };

  const generateMockOrders = (type: DisruptionType, severityMultiplier: number, durationDays: number) => {
    const customers = [
      'Best Buy',
      'Amazon',
      'Walmart',
      'Target',
      'Costco',
      'Home Depot',
      'Apple Store',
      'Samsung Direct',
      'IKEA',
      'Wayfair',
    ];
    const skus = [
      'PRODUCT-A-001',
      'PRODUCT-B-002',
      'PRODUCT-C-003',
      'PRODUCT-D-004',
      'PRODUCT-E-005',
    ];
    const statuses: ('Critical' | 'Delayed' | 'At Risk')[] = ['Critical', 'Delayed', 'At Risk'];

    const baseOrderCount = 60;
    const orderCount = Math.floor(baseOrderCount * severityMultiplier) + Math.floor(Math.random() * 20);
    const orders = [];

    for (let i = 0; i < orderCount; i++) {
      const baseDelay = Math.floor(durationDays * 1.2); // Delay is typically 120% of disruption duration
      const delayDays = Math.floor(baseDelay * severityMultiplier) + Math.floor(Math.random() * 10);
      const originalDate = new Date();
      originalDate.setDate(originalDate.getDate() + Math.floor(Math.random() * 30) + 10);
      const newDate = new Date(originalDate);
      newDate.setDate(newDate.getDate() + delayDays);

      // Higher severity = more critical orders
      const criticalThreshold = severityMultiplier > 1.5 ? 0.4 : severityMultiplier > 1 ? 0.25 : 0.15;
      const random = Math.random();
      let status: 'Critical' | 'Delayed' | 'At Risk';
      if (random < criticalThreshold) {
        status = 'Critical';
      } else if (random < 0.6) {
        status = 'Delayed';
      } else {
        status = 'At Risk';
      }

      orders.push({
        orderId: `ORD-2025-${10000 + i}`,
        customerName: customers[Math.floor(Math.random() * customers.length)],
        sku: skus[Math.floor(Math.random() * skus.length)],
        quantity: Math.floor(Math.random() * 1500) + 200,
        orderValue: Math.floor(Math.random() * 700000) + 100000,
        originalDeliveryDate: originalDate.toISOString(),
        newDeliveryDate: newDate.toISOString(),
        delayDays,
        status,
      });
    }

    return orders;
  };

  const generateMockEvents = (
    type: DisruptionType,
    variables: SimulationVariable[],
    severity: string
  ) => {
    const now = new Date();
    const primaryLocation = variables.find(v => v.name === 'Primary Location')?.value || 'Unknown';
    const events = [
      {
        id: `ce-${Date.now()}-1`,
        timestamp: now.toISOString(),
        eventType: 'Initial Disruption',
        description: `${type} detected at ${primaryLocation} with ${severity.toLowerCase()} severity`,
        severity: (severity === 'Critical' || severity === 'High' ? 'Critical' : 'High') as const,
        affectedEntities: [primaryLocation],
      },
      {
        id: `ce-${Date.now()}-2`,
        timestamp: new Date(now.getTime() + 3600000).toISOString(),
        eventType: 'Supply Chain Assessment',
        description: 'Analyzing impact across supply chain network',
        severity: 'Medium' as const,
        affectedEntities: ['Supply Chain Network'],
      },
      {
        id: `ce-${Date.now()}-3`,
        timestamp: new Date(now.getTime() + 7200000).toISOString(),
        eventType: 'Supplier Impact',
        description: 'Multiple suppliers and distribution centers affected',
        severity: (severity === 'Critical' ? 'Critical' : 'High') as const,
        affectedEntities: ['Supplier Network', 'Distribution Centers'],
      },
      {
        id: `ce-${Date.now()}-4`,
        timestamp: new Date(now.getTime() + 10800000).toISOString(),
        eventType: 'Order Fulfillment Risk',
        description: 'Customer orders identified as at-risk due to disruption',
        severity: 'Critical' as const,
        affectedEntities: ['Order Management System', 'Customer Commitments'],
      },
    ];

    // Add secondary location event if provided
    const secondaryLocation = variables.find(v => v.name === 'Secondary Location')?.value;
    if (secondaryLocation) {
      events.push({
        id: `ce-${Date.now()}-5`,
        timestamp: new Date(now.getTime() + 14400000).toISOString(),
        eventType: 'Ripple Effect',
        description: `Disruption spreading to ${secondaryLocation}`,
        severity: 'High' as const,
        affectedEntities: [secondaryLocation],
      });
    }

    return events;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Simulations
          </Link>
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Create New Simulation (V2)</h1>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-semibold rounded-full">
                Advanced
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Multi-variable simulation builder with advanced parameters for comprehensive analysis
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Basic Information Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>

                {/* Simulation Name */}
                <div className="mb-4">
                  <label htmlFor="simulationName" className="block text-sm font-medium text-gray-700 mb-2">
                    Simulation Name *
                  </label>
                  <input
                    type="text"
                    id="simulationName"
                    value={simulationName}
                    onChange={(e) => setSimulationName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Multi-Region Q4 Impact Analysis"
                  />
                </div>

                {/* Disruption Type */}
                <div>
                  <label htmlFor="disruptionType" className="block text-sm font-medium text-gray-700 mb-2">
                    Disruption Type *
                  </label>
                  <select
                    id="disruptionType"
                    value={disruptionType}
                    onChange={(e) => setDisruptionType(e.target.value as DisruptionType)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {disruptionTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Primary Parameters Section */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Primary Parameters</h2>

                <div className="grid grid-cols-2 gap-4">
                  {/* Primary Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Shanghai, China"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (days) *
                    </label>
                    <input
                      type="number"
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                      min="1"
                      max="90"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="7"
                    />
                  </div>
                </div>

                {/* Severity */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Severity Level *
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {severityLevels.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSeverity(level)}
                        className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                          severity === level
                            ? level === 'Critical'
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : level === 'High'
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : level === 'Medium'
                              ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                              : 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Parameters Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Parameters (Optional)</h2>

                <div className="space-y-4">
                  {/* Affected Product */}
                  <div>
                    <label htmlFor="affectedProduct" className="block text-sm font-medium text-gray-700 mb-2">
                      Affected Product/Category
                    </label>
                    <input
                      type="text"
                      id="affectedProduct"
                      value={affectedProduct}
                      onChange={(e) => setAffectedProduct(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Electronics, Semiconductors, Automotive Parts"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Specify product categories affected by this disruption
                    </p>
                  </div>

                  {/* Secondary Location */}
                  <div>
                    <label htmlFor="secondaryLocation" className="block text-sm font-medium text-gray-700 mb-2">
                      Secondary Affected Location
                    </label>
                    <input
                      type="text"
                      id="secondaryLocation"
                      value={secondaryLocation}
                      onChange={(e) => setSecondaryLocation(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Los Angeles Port, Rotterdam"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Add a secondary location for ripple effect analysis
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-indigo-800">
                    <p className="font-medium mb-1">V2 Advanced Features</p>
                    <ul className="list-disc list-inside space-y-1 text-indigo-700">
                      <li>Multi-variable impact modeling with severity-based calculations</li>
                      <li>Duration-adjusted delay predictions</li>
                      <li>Secondary location ripple effect analysis</li>
                      <li>Product category-specific impact assessment</li>
                      <li>Enhanced cascade event generation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Running Advanced Simulation...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Run Advanced Simulation
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
      </div>
    </div>
  );
};

export default CreateSimulationV2;
