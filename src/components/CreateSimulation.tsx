import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSimulations } from '../context/SimulationContext';
import { Simulation } from '../types/simulation';

type EventType = 'Demand Change' | 'Supply Disruption' | 'Capacity Disruption' | 'Logistics Disruption';
type DisruptionSubtype = 'Supplier Shutdown' | 'Supplier Delay' | 'Port Congestion' | 'Route Disruption';
type NodeType = 'Manufacturing Plant' | 'Warehouse' | 'Production Line';
type ProductHierarchy = 'SKU' | 'Product Group';
type NodeHierarchy = 'Plant' | 'Warehouse' | 'Production Line';
type GeoHierarchy = 'DC/Warehouse' | 'Region';

interface Event {
  id: string;
  type: EventType;
  eventStartDate?: string;
  eventEndDate?: string;
  // Demand Change fields
  productHierarchy?: ProductHierarchy;
  products?: string[];
  demandChange?: string;
  geoHierarchy?: GeoHierarchy;
  nodes?: string[];
  channels?: string[];
  // Supply Disruption fields
  disruptionSubtype?: DisruptionSubtype;
  suppliers?: string[];
  capacityPercent?: number;
  delayDays?: number;
  // Capacity Disruption fields
  nodeHierarchy?: NodeHierarchy;
  selectedNodes?: string[];
  capacityAvailable?: number;
  // Logistics Disruption fields
  locations?: string[];
  transitDelay?: number;
}

// Multi-Select Dropdown Component
interface MultiSelectDropdownProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  label?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selected,
  onChange,
  placeholder = 'Select items',
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const getDisplayText = () => {
    if (selected.length === 0) return placeholder;
    if (selected.length === 1) return selected[0];
    if (selected.length <= 3) return selected.join(', ');
    return `${selected.length} items selected`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left border border-gray-300 rounded bg-white hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent flex justify-between items-center"
      >
        <span className={`text-sm ${selected.length === 0 ? 'text-gray-400' : 'text-gray-900'} truncate`}>
          {getDisplayText()}
        </span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No items found</div>
            ) : (
              filteredOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => toggleOption(option)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CreateSimulation: React.FC = () => {
  const navigate = useNavigate();
  const { addSimulation } = useSimulations();

  const [scenarioName, setScenarioName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [events, setEvents] = useState<Event[]>([{
    id: 'event-1',
    type: 'Demand Change',
    productHierarchy: 'Product Group',
    nodeHierarchy: 'Plant',
    geoHierarchy: 'DC/Warehouse'
  }]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCreating, setIsCreating] = useState(false);

  // Mock data
  const mockData = {
    suppliers: [
      'TSMC Taiwan', 'Foxconn Manufacturing', 'Samsung Electronics', 'BYD Electronics',
      'Delta Electronics', 'Pegatron Corp', 'Luxshare Precision', 'BOE Display',
      'LG Display', 'Micron Technology', 'SK Hynix', 'Corning Glass'
    ],
    plants: [
      'Plant-Texas-01', 'Plant-Mexico-02', 'Plant-Vietnam-03', 'Plant-India-04',
      'Plant-Poland-01', 'Plant-Malaysia-01', 'Plant-California-02', 'Plant-China-01'
    ],
    warehouses: [
      'Los Angeles DC', 'Memphis DC', 'Dallas DC', 'Chicago DC', 'Atlanta DC',
      'Seattle DC', 'Boston DC', 'Phoenix DC', 'Denver DC', 'Miami DC',
      'Portland DC', 'Minneapolis DC'
    ],
    productionLines: {
      'Plant-Texas-01': ['Line A1', 'Line A2', 'Line A3', 'Line A4', 'Line A5'],
      'Plant-Mexico-02': ['Line B1', 'Line B2', 'Line B3'],
      'Plant-Vietnam-03': ['Line C1', 'Line C2', 'Line C3', 'Line C4'],
      'Plant-India-04': ['Line D1', 'Line D2', 'Line D3'],
      'Plant-Poland-01': ['Line E1', 'Line E2', 'Line E3'],
      'Plant-Malaysia-01': ['Line F1', 'Line F2', 'Line F3']
    },
    skus: [
      'PHONE-IP15PRO-256', 'PHONE-IP15PRO-512', 'PHONE-S24U-512', 'PHONE-S24-256',
      'PHONE-PIXEL8PRO', 'PHONE-OP12PRO', 'LAPTOP-MBP16-M3', 'LAPTOP-MBP14-M3',
      'LAPTOP-DELL-XPS15', 'LAPTOP-HP-ELITE-G9', 'LAPTOP-LENOVO-T14', 'LAPTOP-HP-PROBOOK-450',
      'TABLET-IPAD-PRO', 'TABLET-GALAXY-TAB-S9', 'DESKTOP-MAC-STUDIO', 'DESKTOP-DELL-OPTIPLEX',
      'MONITOR-DELL-27', 'MONITOR-LG-32', 'EARBUDS-AIRPODS-PRO', 'EARBUDS-GALAXY-BUDS'
    ],
    productGroups: [
      'Premium Smartphones', 'Business Laptops', 'Consumer Laptops', 'Tablets',
      'Desktop Computers', 'Gaming Devices', 'Monitors', 'Audio Accessories'
    ],
    ports: [
      'Shanghai Port (China)', 'Los Angeles Port (USA)', 'Rotterdam Port (Netherlands)',
      'Singapore Port (Singapore)', 'Ningbo Port (China)', 'Long Beach Port (USA)'
    ],
    shippingRoutes: [
      'Asia-Pacific → North America (Trans-Pacific)',
      'Asia-Pacific → Europe (Suez Canal Route)',
      'Europe → North America (Trans-Atlantic)',
      'Asia → Middle East (Persian Gulf Route)',
      'North America → Latin America (Panama Canal Route)',
      'Europe → Asia (Indian Ocean Route)',
      'Intra-Asia Routes (Southeast Asia Hub)',
      'Mediterranean → Atlantic (Gibraltar Route)'
    ],
    channels: ['Retail', 'E-commerce', 'B2B', 'Distributors'],
    regions: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa']
  };

  const removeEvent = (id: string) => {
    // Don't allow removing the first event
    if (id === 'event-1') return;
    setEvents(events.filter(e => e.id !== id));
  };

  const updateEvent = (id: string, field: string, value: any) => {
    setEvents(prevEvents => prevEvents.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const updateMultipleFields = (id: string, updates: { [key: string]: any }) => {
    setEvents(prevEvents => prevEvents.map(e =>
      e.id === id ? { ...e, ...updates } : e
    ));
  };

  const updateEventArray = (id: string, field: string, value: string, checked: boolean) => {
    setEvents(events.map(e => {
      if (e.id === id) {
        const currentArray = (e as any)[field] || [];
        if (checked) {
          return { ...e, [field]: [...currentArray, value] };
        } else {
          return { ...e, [field]: currentArray.filter((v: string) => v !== value) };
        }
      }
      return e;
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!scenarioName.trim()) {
      newErrors.scenarioName = 'Scenario name is required';
    }
    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    // Validate each event
    events.forEach((event) => {
      if (!event.eventStartDate) {
        newErrors[`${event.id}-eventStartDate`] = 'Event start date is required';
      }
      if (!event.eventEndDate) {
        newErrors[`${event.id}-eventEndDate`] = 'Event end date is required';
      }
      if (event.eventStartDate && event.eventEndDate && new Date(event.eventEndDate) <= new Date(event.eventStartDate)) {
        newErrors[`${event.id}-eventEndDate`] = 'Event end date must be after event start date';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (isDraft: boolean = false) => {
    if (!validate()) {
      return;
    }

    setIsCreating(true);

    const formatDuration = () => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    };

    const newSimulation: Simulation = {
      id: `sim-${Date.now()}`,
      name: scenarioName,
      disruptionType: 'Multi-Event Scenario' as any,
      createdAt: new Date().toISOString(),
      status: isDraft ? 'Draft' : 'In-progress',
      variables: events.map((event, index) => ({
        name: `Event ${index + 1}`,
        value: event.type,
        type: 'event'
      })),
      summary: {
        totalOrdersImpacted: 0,
        totalRevenue: 0,
        averageDelay: 0,
        criticalOrders: 0,
      },
      cascadeEvents: [],
      impactedOrders: [],
      disruptionLocation: 'Multiple Locations',
      duration: formatDuration(),
      createdBy: 'Current User',
      lastRun: new Date().toISOString(),
    };

    addSimulation(newSimulation);
    setIsCreating(false);
    navigate('/');
  };

  const getNodeOptions = (nodeHierarchy?: NodeHierarchy) => {
    if (!nodeHierarchy) return mockData.plants;
    if (nodeHierarchy === 'Plant') return mockData.plants;
    if (nodeHierarchy === 'Warehouse') return mockData.warehouses;
    if (nodeHierarchy === 'Production Line') {
      return Object.entries(mockData.productionLines).flatMap(([plant, lines]) =>
        lines.map(line => `${plant}: ${line}`)
      );
    }
    return mockData.plants;
  };

  const getProductOptions = (productHierarchy?: ProductHierarchy) => {
    if (!productHierarchy) return mockData.productGroups;
    if (productHierarchy === 'SKU') return mockData.skus;
    if (productHierarchy === 'Product Group') return mockData.productGroups;
    return mockData.productGroups;
  };

  const getGeoOptions = (geoHierarchy?: GeoHierarchy) => {
    if (!geoHierarchy) return mockData.warehouses;
    if (geoHierarchy === 'DC/Warehouse') return mockData.warehouses;
    if (geoHierarchy === 'Region') return mockData.regions;
    return mockData.warehouses;
  };

  const getLogisticsLocations = (disruptionSubtype?: DisruptionSubtype) => {
    if (disruptionSubtype === 'Route Disruption') return mockData.shippingRoutes;
    return mockData.ports; // Port Congestion
  };

  const renderEventCard = (event: Event, index: number) => {
    // Check if event dates are outside scenario dates
    const isEventOutsideScenario = () => {
      if (!startDate || !endDate || !event.eventStartDate || !event.eventEndDate) return false;
      const scenarioStart = new Date(startDate);
      const scenarioEnd = new Date(endDate);
      const eventStart = new Date(event.eventStartDate);
      const eventEnd = new Date(event.eventEndDate);
      return eventStart < scenarioStart || eventEnd > scenarioEnd;
    };

    return (
      <div key={event.id} className="border border-gray-300 rounded-lg p-6 bg-white relative">
        {/* Remove Button (top right) */}
        {event.id !== 'event-1' && (
          <button
            type="button"
            onClick={() => removeEvent(event.id)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
            title="Remove Event"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Event Type Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
          <div className="grid grid-cols-2 gap-2">
            {(['Demand Change', 'Supply Disruption', 'Capacity Disruption', 'Logistics Disruption'] as EventType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => updateEvent(event.id, 'type', type)}
                className={`px-4 py-2 text-sm font-medium rounded border transition-colors ${
                  event.type === type
                    ? 'bg-orange-50 text-orange-700 border-orange-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Event Dates */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Start Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                value={event.eventStartDate || ''}
                onChange={(e) => updateEvent(event.id, 'eventStartDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors[`${event.id}-eventStartDate`] && (
                <p className="text-red-600 text-sm mt-1">{errors[`${event.id}-eventStartDate`]}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event End Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                value={event.eventEndDate || ''}
                onChange={(e) => updateEvent(event.id, 'eventEndDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {errors[`${event.id}-eventEndDate`] && (
                <p className="text-red-600 text-sm mt-1">{errors[`${event.id}-eventEndDate`]}</p>
              )}
            </div>
          </div>
          {isEventOutsideScenario() && (
            <p className="text-yellow-600 text-sm mt-2 flex items-start gap-1">
              <svg className="w-4 h-4 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Warning: Event dates are outside the scenario date range
            </p>
          )}
        </div>

        {/* Dynamic Fields */}
        {event.type === 'Demand Change' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Selection</label>
              {/* Hierarchy Tabs */}
              <div className="flex gap-1 mb-2">
                {(['SKU', 'Product Group'] as ProductHierarchy[]).map((hierarchy) => (
                  <button
                    key={hierarchy}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      updateMultipleFields(event.id, { productHierarchy: hierarchy, products: [] });
                    }}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                      (event.productHierarchy || 'Product Group') === hierarchy
                        ? 'bg-gray-200 text-gray-900'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {hierarchy}
                  </button>
                ))}
              </div>
              <MultiSelectDropdown
                options={getProductOptions(event.productHierarchy || 'Product Group')}
                selected={event.products || []}
                onChange={(selected) => updateEvent(event.id, 'products', selected)}
                placeholder={`Select ${event.productHierarchy === 'SKU' ? 'SKUs' : 'Product Groups'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Demand Change %</label>
              <input
                type="number"
                placeholder="e.g., +45 or -65"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={event.demandChange || ''}
                onChange={(e) => updateEvent(event.id, 'demandChange', e.target.value)}
              />
            </div>
            <details className="border border-gray-200 rounded p-3">
              <summary className="text-sm font-medium text-gray-700 cursor-pointer">Node Selection</summary>
              <div className="mt-3 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nodes</label>
                  {/* Geo Hierarchy Tabs */}
                  <div className="flex gap-1 mb-2">
                    {(['DC/Warehouse', 'Region'] as GeoHierarchy[]).map((hierarchy) => (
                      <button
                        key={hierarchy}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          updateMultipleFields(event.id, { geoHierarchy: hierarchy, nodes: [] });
                        }}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                          (event.geoHierarchy || 'DC/Warehouse') === hierarchy
                            ? 'bg-gray-200 text-gray-900'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {hierarchy}
                      </button>
                    ))}
                  </div>
                  <MultiSelectDropdown
                    options={getGeoOptions(event.geoHierarchy || 'DC/Warehouse')}
                    selected={event.nodes || []}
                    onChange={(selected) => updateEvent(event.id, 'nodes', selected)}
                    placeholder={`Select ${event.geoHierarchy === 'Region' ? 'Regions' : 'DC/Warehouses'}`}
                  />
                </div>
                <div>
                  <MultiSelectDropdown
                    label="Channels"
                    options={mockData.channels}
                    selected={event.channels || []}
                    onChange={(selected) => updateEvent(event.id, 'channels', selected)}
                    placeholder="Select channels"
                  />
                </div>
              </div>
            </details>
          </div>
        )}

        {event.type === 'Supply Disruption' && (
          <div className="space-y-4">
            <MultiSelectDropdown
              label="Suppliers"
              options={mockData.suppliers}
              selected={event.suppliers || []}
              onChange={(selected) => updateEvent(event.id, 'suppliers', selected)}
              placeholder="Select suppliers"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity % (0 = complete shutdown)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={event.capacityPercent || 0}
                onChange={(e) => updateEvent(event.id, 'capacityPercent', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">{event.capacityPercent || 0}%</div>
            </div>
          </div>
        )}

        {event.type === 'Capacity Disruption' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Node Selection</label>
              {/* Node Hierarchy Tabs */}
              <div className="flex gap-1 mb-2">
                {(['Plant', 'Warehouse', 'Production Line'] as NodeHierarchy[]).map((hierarchy) => (
                  <button
                    key={hierarchy}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      updateMultipleFields(event.id, { nodeHierarchy: hierarchy, selectedNodes: [] });
                    }}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                      (event.nodeHierarchy || 'Plant') === hierarchy
                        ? 'bg-gray-200 text-gray-900'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {hierarchy}
                  </button>
                ))}
              </div>
              <MultiSelectDropdown
                options={getNodeOptions(event.nodeHierarchy || 'Plant')}
                selected={event.selectedNodes || []}
                onChange={(selected) => updateEvent(event.id, 'selectedNodes', selected)}
                placeholder={`Select ${event.nodeHierarchy || 'Plant'}s`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacity Available %</label>
              <input
                type="range"
                min="0"
                max="100"
                value={event.capacityAvailable || 50}
                onChange={(e) => updateEvent(event.id, 'capacityAvailable', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">{event.capacityAvailable || 50}%</div>
            </div>
          </div>
        )}

        {event.type === 'Logistics Disruption' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Disruption Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                value={event.disruptionSubtype || 'Port Congestion'}
                onChange={(e) => {
                  updateEvent(event.id, 'disruptionSubtype', e.target.value);
                  updateEvent(event.id, 'locations', []); // Clear locations when type changes
                }}
              >
                <option value="Port Congestion">Port Congestion</option>
                <option value="Route Disruption">Route Disruption</option>
              </select>
            </div>
            <MultiSelectDropdown
              label={event.disruptionSubtype === 'Route Disruption' ? 'Shipping Routes' : 'Ports'}
              options={getLogisticsLocations(event.disruptionSubtype)}
              selected={event.locations || []}
              onChange={(selected) => updateEvent(event.id, 'locations', selected)}
              placeholder={event.disruptionSubtype === 'Route Disruption' ? 'Select shipping routes' : 'Select ports'}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transit Delay (Additional Days)</label>
              <input
                type="number"
                min="1"
                placeholder="e.g., 7"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                value={event.transitDelay || ''}
                onChange={(e) => updateEvent(event.id, 'transitDelay', parseInt(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-[47px]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="text-orange-600 hover:text-orange-800 text-sm font-medium mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Scenario List
          </Link>
          <div className="mt-4">
            <h1 className="text-2xl font-semibold text-gray-900">Create New Scenario</h1>
            <p className="mt-1 text-sm text-gray-600">Build what-if scenarios with multiple simultaneous events</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Scenario Basics */}
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Scenario Basics</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scenario Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., Q4 Multi-Region Disruption Analysis"
                />
                {errors.scenarioName && <p className="text-red-600 text-sm mt-1">{errors.scenarioName}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.endDate && <p className="text-red-600 text-sm mt-1">{errors.endDate}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Event Configuration Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Configuration</h2>
            <div className="space-y-4">
              {events.map((event, index) => renderEventCard(event, index))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={isCreating}
              className="px-6 py-2 bg-orange-600 text-white text-sm font-medium rounded hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {isCreating ? 'Creating...' : 'Run Scenario'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSimulation;
