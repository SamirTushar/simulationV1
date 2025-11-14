import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSimulations } from '../context/SimulationContext';
import { Simulation, SimulationVariable } from '../types/simulation';

type ScenarioType = 'Demand Change' | 'Supplier Shutdown' | 'Port Congestion' | 'Manufacturing Plant Shutdown';
type SelectionType = 'SKU' | 'Product Group';

interface MasterData {
  skus: Array<{ id: string; name: string }>;
  productGroups: Array<{ id: string; name: string }>;
  suppliers: Array<{ id: string; name: string }>;
  ports: Array<{ id: string; name: string }>;
  plants: Array<{ id: string; name: string }>;
}

const CreateSimulationV2: React.FC = () => {
  const navigate = useNavigate();
  const { addSimulation } = useSimulations();

  // Step 1: Scenario Name and Type
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioType, setScenarioType] = useState<ScenarioType>('Demand Change');

  // Step 2: Dynamic Fields
  // Demand Change fields
  const [selectionType, setSelectionType] = useState<SelectionType>('SKU');
  const [selectedSKU, setSelectedSKU] = useState('');
  const [selectedProductGroup, setSelectedProductGroup] = useState('');
  const [demandChangePercent, setDemandChangePercent] = useState('');

  // Supplier Shutdown fields
  const [selectedSupplier, setSelectedSupplier] = useState('');

  // Port Congestion fields
  const [selectedPort, setSelectedPort] = useState('');
  const [transitDelay, setTransitDelay] = useState('');

  // Manufacturing Plant Shutdown fields
  const [selectedPlant, setSelectedPlant] = useState('');
  const [capacityAvailable, setCapacityAvailable] = useState('');

  // Common fields
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [isCreating, setIsCreating] = useState(false);
  const [masterData, setMasterData] = useState<MasterData>({
    skus: [],
    productGroups: [],
    suppliers: [],
    ports: [],
    plants: [],
  });

  // Fetch master data from API
  useEffect(() => {
    // TODO: Replace with actual API calls
    // For now, using mock data
    setMasterData({
      skus: [
        { id: 'SKU-001', name: 'Laptop XPS 13' },
        { id: 'SKU-002', name: 'Tablet iPad Pro' },
        { id: 'SKU-003', name: 'Smartphone Galaxy S24' },
        { id: 'SKU-004', name: 'Monitor Dell 27"' },
        { id: 'SKU-005', name: 'Keyboard Logitech MX' },
      ],
      productGroups: [
        { id: 'PG-001', name: 'Electronics' },
        { id: 'PG-002', name: 'Computer Hardware' },
        { id: 'PG-003', name: 'Mobile Devices' },
        { id: 'PG-004', name: 'Accessories' },
      ],
      suppliers: [
        { id: 'SUP-001', name: 'Foxconn Manufacturing' },
        { id: 'SUP-002', name: 'Delta Electronics' },
        { id: 'SUP-003', name: 'Pegatron Corp' },
        { id: 'SUP-004', name: 'Quanta Computer' },
      ],
      ports: [
        { id: 'PORT-001', name: 'Shanghai Port, China' },
        { id: 'PORT-002', name: 'Los Angeles Port, USA' },
        { id: 'PORT-003', name: 'Rotterdam Port, Netherlands' },
        { id: 'PORT-004', name: 'Singapore Port' },
      ],
      plants: [
        { id: 'PLANT-001', name: 'Foxconn Plant 3 - Shanghai' },
        { id: 'PLANT-002', name: 'Delta Facility 1 - Taipei' },
        { id: 'PLANT-003', name: 'Pegatron Assembly - Suzhou' },
        { id: 'PLANT-004', name: 'Samsung Factory - Vietnam' },
      ],
    });
  }, []);

  // Reset form fields when scenario type changes
  useEffect(() => {
    setSelectionType('SKU');
    setSelectedSKU('');
    setSelectedProductGroup('');
    setDemandChangePercent('');
    setSelectedSupplier('');
    setSelectedPort('');
    setTransitDelay('');
    setSelectedPlant('');
    setCapacityAvailable('');
    setStartDate('');
    setEndDate('');
    // Don't reset scenario name when changing type
  }, [scenarioType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // Build variables based on scenario type
    const variables: SimulationVariable[] = [
      {
        name: 'Scenario Type',
        value: scenarioType,
        type: 'scenario',
      },
      {
        name: 'Start Date',
        value: startDate,
        type: 'date',
      },
      {
        name: 'End Date',
        value: endDate,
        type: 'date',
      },
    ];

    // Use user-provided scenario name
    const simulationName = scenarioName;

    switch (scenarioType) {
      case 'Demand Change':
        const target = selectionType === 'SKU' ? selectedSKU : selectedProductGroup;
        const targetName = selectionType === 'SKU'
          ? masterData.skus.find(s => s.id === target)?.name
          : masterData.productGroups.find(p => p.id === target)?.name;

        variables.push(
          { name: 'Selection Type', value: selectionType, type: 'selection' },
          { name: selectionType === 'SKU' ? 'SKU' : 'Product Group', value: targetName || '', type: 'product' },
          { name: 'Demand Change', value: `${demandChangePercent}%`, type: 'percentage' }
        );
        break;

      case 'Supplier Shutdown':
        const supplierName = masterData.suppliers.find(s => s.id === selectedSupplier)?.name;
        variables.push(
          { name: 'Supplier', value: supplierName || '', type: 'supplier' }
        );
        break;

      case 'Port Congestion':
        const portName = masterData.ports.find(p => p.id === selectedPort)?.name;
        variables.push(
          { name: 'Port/Location', value: portName || '', type: 'location' },
          { name: 'Transit Delay', value: `${transitDelay} days`, type: 'duration' }
        );
        break;

      case 'Manufacturing Plant Shutdown':
        const plantName = masterData.plants.find(p => p.id === selectedPlant)?.name;
        variables.push(
          { name: 'Manufacturing Plant', value: plantName || '', type: 'plant' },
          { name: 'Capacity Available', value: `${capacityAvailable}%`, type: 'percentage' }
        );
        break;
    }

    // Format date range for duration
    const formatDuration = () => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    };

    const newSimulation: Simulation = {
      id: `sim-${Date.now()}`,
      name: simulationName,
      disruptionType: scenarioType as any,
      createdAt: new Date().toISOString(),
      status: 'In-progress',
      variables,
      summary: {
        totalOrdersImpacted: 0,
        totalRevenue: 0,
        averageDelay: 0,
        criticalOrders: 0,
      },
      cascadeEvents: [],
      impactedOrders: [],
      disruptionLocation: variables.find(v => v.type === 'location' || v.type === 'supplier' || v.type === 'plant')?.value || 'Various Locations',
      duration: formatDuration(),
      createdBy: 'Current User',
      lastRun: new Date().toISOString(),
    };

    // Add the in-progress simulation and navigate back to list
    addSimulation(newSimulation);
    setIsCreating(false);
    navigate('/');
  };

  const generateMockOrders = (type: ScenarioType) => {
    const customers = [
      'Best Buy',
      'Amazon',
      'Walmart',
      'Target',
      'Costco',
      'Home Depot',
      'Apple Store',
      'Samsung Direct',
    ];
    const skus = ['LAPTOP-XPS13-001', 'TABLET-IPAD-PRO-128', 'SMARTPHONE-GALAXY-S24', 'MONITOR-DELL-27'];
    const statuses: ('Critical' | 'Delayed' | 'At Risk')[] = ['Critical', 'Delayed', 'At Risk'];

    const orderCount = Math.floor(Math.random() * 40) + 60;
    const orders = [];

    for (let i = 0; i < orderCount; i++) {
      const delayDays = Math.floor(Math.random() * 20) + 5;
      const originalDate = new Date();
      originalDate.setDate(originalDate.getDate() + Math.floor(Math.random() * 30) + 10);
      const newDate = new Date(originalDate);
      newDate.setDate(newDate.getDate() + delayDays);

      const random = Math.random();
      let status: 'Critical' | 'Delayed' | 'At Risk';
      if (random < 0.3) {
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

  const generateMockEvents = (type: ScenarioType, variables: SimulationVariable[]) => {
    const now = new Date();
    const events = [
      {
        id: `ce-${Date.now()}-1`,
        timestamp: now.toISOString(),
        eventType: 'Initial Disruption',
        description: `${type} scenario initiated`,
        severity: 'High' as const,
        affectedEntities: ['Supply Chain Network'],
      },
      {
        id: `ce-${Date.now()}-2`,
        timestamp: new Date(now.getTime() + 3600000).toISOString(),
        eventType: 'Impact Assessment',
        description: 'Analyzing supply chain network impact',
        severity: 'Medium' as const,
        affectedEntities: ['Analysis System'],
      },
      {
        id: `ce-${Date.now()}-3`,
        timestamp: new Date(now.getTime() + 7200000).toISOString(),
        eventType: 'Order Impact',
        description: 'Customer orders identified as at-risk',
        severity: 'Critical' as const,
        affectedEntities: ['Order Management'],
      },
    ];

    return events;
  };

  const renderDynamicFields = () => {
    switch (scenarioType) {
      case 'Demand Change':
        return (
          <div className="space-y-4">
            {/* Selection Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selection Type *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="selectionType"
                    value="SKU"
                    checked={selectionType === 'SKU'}
                    onChange={(e) => setSelectionType(e.target.value as SelectionType)}
                    className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">SKU</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="selectionType"
                    value="Product Group"
                    checked={selectionType === 'Product Group'}
                    onChange={(e) => setSelectionType(e.target.value as SelectionType)}
                    className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Product Group</span>
                </label>
              </div>
            </div>

            {/* Select SKU/Product Group */}
            <div>
              <label htmlFor="selection" className="block text-sm font-medium text-gray-700 mb-2">
                Select {selectionType} *
              </label>
              <select
                id="selection"
                value={selectionType === 'SKU' ? selectedSKU : selectedProductGroup}
                onChange={(e) => selectionType === 'SKU' ? setSelectedSKU(e.target.value) : setSelectedProductGroup(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">-- Select {selectionType} --</option>
                {selectionType === 'SKU'
                  ? masterData.skus.map(sku => (
                      <option key={sku.id} value={sku.id}>{sku.name}</option>
                    ))
                  : masterData.productGroups.map(group => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))
                }
              </select>
            </div>

            {/* Demand Change % */}
            <div>
              <label htmlFor="demandChange" className="block text-sm font-medium text-gray-700 mb-2">
                Demand Change % *
              </label>
              <input
                type="number"
                id="demandChange"
                value={demandChangePercent}
                onChange={(e) => setDemandChangePercent(e.target.value)}
                required
                placeholder="e.g., 20 or -15"
                className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter positive values for increase or negative values for decrease
              </p>
            </div>
          </div>
        );

      case 'Supplier Shutdown':
        return (
          <div className="space-y-4">
            {/* Select Supplier */}
            <div>
              <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-2">
                Select Supplier *
              </label>
              <select
                id="supplier"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">-- Select Supplier --</option>
                {masterData.suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 'Port Congestion':
        return (
          <div className="space-y-4">
            {/* Select Port */}
            <div>
              <label htmlFor="port" className="block text-sm font-medium text-gray-700 mb-2">
                Select Port/Location *
              </label>
              <select
                id="port"
                value={selectedPort}
                onChange={(e) => setSelectedPort(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">-- Select Port/Location --</option>
                {masterData.ports.map(port => (
                  <option key={port.id} value={port.id}>{port.name}</option>
                ))}
              </select>
            </div>

            {/* Transit Delay */}
            <div>
              <label htmlFor="transitDelay" className="block text-sm font-medium text-gray-700 mb-2">
                Transit Delay (additional days) *
              </label>
              <input
                type="number"
                id="transitDelay"
                value={transitDelay}
                onChange={(e) => setTransitDelay(e.target.value)}
                required
                min="1"
                placeholder="e.g., 7"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter positive integers only
              </p>
            </div>
          </div>
        );

      case 'Manufacturing Plant Shutdown':
        return (
          <div className="space-y-4">
            {/* Select Plant */}
            <div>
              <label htmlFor="plant" className="block text-sm font-medium text-gray-700 mb-2">
                Select Plant *
              </label>
              <select
                id="plant"
                value={selectedPlant}
                onChange={(e) => setSelectedPlant(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">-- Select Plant --</option>
                {masterData.plants.map(plant => (
                  <option key={plant.id} value={plant.id}>{plant.name}</option>
                ))}
              </select>
            </div>

            {/* Capacity Available */}
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                Capacity Available % *
              </label>
              <input
                type="number"
                id="capacity"
                value={capacityAvailable}
                onChange={(e) => setCapacityAvailable(e.target.value)}
                required
                min="0"
                max="100"
                placeholder="e.g., 0 (complete shutdown) or 50 (half capacity)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                0 = complete shutdown, 50 = half capacity, 100 = full capacity
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="text-orange-600 hover:text-orange-800 text-sm font-medium mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Scenario List
          </Link>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">Create Scenario</h1>
            <p className="mt-2 text-sm text-gray-600">
              Build a scenario to simulate supply chain impacts
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Step 1: Scenario Name and Type Selection */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Scenario Name & Type</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="scenarioName" className="block text-sm font-medium text-gray-700 mb-2">
                      Scenario Name *
                    </label>
                    <input
                      type="text"
                      id="scenarioName"
                      value={scenarioName}
                      onChange={(e) => setScenarioName(e.target.value)}
                      required
                      placeholder="e.g., Q4 Holiday Season Supply Chain Impact"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="scenarioType" className="block text-sm font-medium text-gray-700 mb-2">
                      Scenario Type *
                    </label>
                    <select
                      id="scenarioType"
                      value={scenarioType}
                      onChange={(e) => setScenarioType(e.target.value as ScenarioType)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="Demand Change">Demand Change</option>
                      <option value="Supplier Shutdown">Supplier Shutdown</option>
                      <option value="Port Congestion">Port Congestion</option>
                      <option value="Manufacturing Plant Shutdown">Manufacturing Plant Shutdown</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Dynamic Input Fields */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Scenario Parameters</h2>
                </div>

                {renderDynamicFields()}

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Action Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Running Simulation...
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
      </div>
    </div>
  );
};

export default CreateSimulationV2;
