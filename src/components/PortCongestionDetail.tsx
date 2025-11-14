import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

const PortCongestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedNode, setSelectedNode] = useState<number>(6);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [sideDrawerContent, setSideDrawerContent] = useState<{ title: string; content: string } | null>(null);

  // Port Congestion Scenario Data
  const scenarioData = useMemo(() => ({
    name: 'Shanghai Port Congestion - Electronics Supply Chain Impact',
    createdAt: '2025-11-13T00:00:00Z',
    variables: [
      { name: 'Port Location', value: 'Shanghai, China' },
      { name: 'Congestion Duration', value: 'Nov 1 - Nov 20, 2025' },
      { name: 'Transit Delay Added', value: '+12 days' },
      { name: 'Affected Lanes', value: '8 active routes' },
    ],
    summary: {
      ordersImpacted: 247,
      revenueAtRisk: 18450000,
      averageDelay: 14,
      criticalOrders: 58,
    },
  }), []);

  // Event cascade data
  const cascadeEvents = useMemo(() => [
    {
      id: 1,
      title: 'Initial Disruption',
      description: 'Port Congestion at Shanghai, China',
      severity: 'High' as const,
      affectedEntities: ['8 inbound shipping routes'],
      timeframe: 'Day 0',
    },
    {
      id: 2,
      title: 'Transit Delays',
      description: '15 shipments delayed in transit',
      severity: 'High' as const,
      affectedEntities: ['Foxconn Manufacturing', 'Delta Electronics', 'Pegatron Corp', 'BYD Electronics', 'Luxshare Precision'],
      timeframe: 'Days 1-5',
    },
    {
      id: 3,
      title: 'Raw Material Shortage',
      description: '12 production plants facing component shortages',
      severity: 'Critical' as const,
      affectedEntities: ['Plant-Texas-01', 'Plant-Mexico-02', 'Plant-Vietnam-03', 'Plant-India-04', 'Plant-Poland-01'],
      timeframe: 'Days 6-10',
    },
    {
      id: 4,
      title: 'Production Delays',
      description: '8 production lines reducing output',
      severity: 'Critical' as const,
      affectedEntities: ['Assembly Line A3', 'Assembly Line B7', 'Assembly Line C2', 'Assembly Line D5'],
      timeframe: 'Days 8-14',
    },
    {
      id: 5,
      title: 'FG Inventory Shortage',
      description: '18 SKUs projected to stockout',
      severity: 'Critical' as const,
      affectedEntities: ['Los Angeles DC', 'Memphis DC', 'Chicago DC', 'Dallas DC', 'Atlanta DC', 'Seattle DC'],
      timeframe: 'Days 12-18',
    },
    {
      id: 6,
      title: 'Customer Order Impact',
      description: '247 customer orders at risk of delay/cancellation',
      severity: 'Critical' as const,
      affectedEntities: ['Best Buy', 'B&H Photo', 'Walmart', 'Target', 'Amazon', 'Newegg', 'Micro Center'],
      timeframe: 'Days 14-22',
    },
  ], []);

  // Table 1: Transit Delays - Shipments in Transit
  const transitDelaysData = useMemo(() => [
    { id: 'SHP-2025-8901', supplier: 'Foxconn Manufacturing', componentType: 'PCB Assembly', quantity: 15000, originalEta: 'Nov 8, 2025', newEta: 'Nov 20, 2025', delay: 12, destinationPlant: 'Plant-Texas-01', poValue: 450000 },
    { id: 'SHP-2025-8902', supplier: 'Delta Electronics', componentType: 'Power Supply Unit', quantity: 8500, originalEta: 'Nov 7, 2025', newEta: 'Nov 19, 2025', delay: 12, destinationPlant: 'Plant-Mexico-02', poValue: 340000 },
    { id: 'SHP-2025-8903', supplier: 'Pegatron Corp', componentType: 'Display Panel', quantity: 12000, originalEta: 'Nov 9, 2025', newEta: 'Nov 21, 2025', delay: 12, destinationPlant: 'Plant-Vietnam-03', poValue: 960000 },
    { id: 'SHP-2025-8904', supplier: 'BYD Electronics', componentType: 'Battery Pack', quantity: 6200, originalEta: 'Nov 6, 2025', newEta: 'Nov 18, 2025', delay: 12, destinationPlant: 'Plant-Texas-01', poValue: 558000 },
    { id: 'SHP-2025-8905', supplier: 'Luxshare Precision', componentType: 'USB-C Connector', quantity: 45000, originalEta: 'Nov 10, 2025', newEta: 'Nov 22, 2025', delay: 12, destinationPlant: 'Plant-India-04', poValue: 135000 },
    { id: 'SHP-2025-8906', supplier: 'Foxconn Manufacturing', componentType: 'Camera Module', quantity: 18000, originalEta: 'Nov 8, 2025', newEta: 'Nov 20, 2025', delay: 12, destinationPlant: 'Plant-Poland-01', poValue: 720000 },
    { id: 'SHP-2025-8907', supplier: 'Delta Electronics', componentType: 'Cooling Fan', quantity: 22000, originalEta: 'Nov 7, 2025', newEta: 'Nov 19, 2025', delay: 12, destinationPlant: 'Plant-Mexico-02', poValue: 132000 },
    { id: 'SHP-2025-8908', supplier: 'Pegatron Corp', componentType: 'Touch Sensor', quantity: 9500, originalEta: 'Nov 11, 2025', newEta: 'Nov 23, 2025', delay: 12, destinationPlant: 'Plant-Vietnam-03', poValue: 285000 },
    { id: 'SHP-2025-8909', supplier: 'BYD Electronics', componentType: 'OLED Screen', quantity: 5800, originalEta: 'Nov 9, 2025', newEta: 'Nov 21, 2025', delay: 12, destinationPlant: 'Plant-Texas-01', poValue: 812000 },
    { id: 'SHP-2025-8910', supplier: 'Luxshare Precision', componentType: 'Audio Jack', quantity: 38000, originalEta: 'Nov 8, 2025', newEta: 'Nov 20, 2025', delay: 12, destinationPlant: 'Plant-India-04', poValue: 76000 },
  ], []);

  // Table 2: Raw Material Shortage
  const rawMaterialData = useMemo(() => [
    { sku: 'CMP-PCB-8891', name: 'PCB Assembly', currentStock: 4200, safetyStock: 5000, daysOfSupply: 3.5, stockoutDate: 'Nov 14, 2025', affectedPlants: 'Plant-Texas-01', productionLines: 'Line A3, Line A5', dailyConsumption: 1200 },
    { sku: 'CMP-PSU-2247', name: 'Power Supply Unit', currentStock: 2100, safetyStock: 3000, daysOfSupply: 2.8, stockoutDate: 'Nov 13, 2025', affectedPlants: 'Plant-Mexico-02', productionLines: 'Line B7', dailyConsumption: 750 },
    { sku: 'CMP-DSP-5512', name: 'Display Panel', currentStock: 3800, safetyStock: 4500, daysOfSupply: 4.2, stockoutDate: 'Nov 15, 2025', affectedPlants: 'Plant-Vietnam-03', productionLines: 'Line C2, Line C4', dailyConsumption: 900 },
    { sku: 'CMP-BAT-7723', name: 'Battery Pack', currentStock: 1850, safetyStock: 2500, daysOfSupply: 2.5, stockoutDate: 'Nov 13, 2025', affectedPlants: 'Plant-Texas-01', productionLines: 'Line A3', dailyConsumption: 740 },
    { sku: 'CMP-USB-3389', name: 'USB-C Connector', currentStock: 12500, safetyStock: 15000, daysOfSupply: 3.1, stockoutDate: 'Nov 14, 2025', affectedPlants: 'Plant-India-04', productionLines: 'Line D5, Line D6', dailyConsumption: 4000 },
    { sku: 'CMP-CAM-6641', name: 'Camera Module', currentStock: 5200, safetyStock: 6000, daysOfSupply: 3.8, stockoutDate: 'Nov 15, 2025', affectedPlants: 'Plant-Poland-01', productionLines: 'Line E1, Line E2', dailyConsumption: 1370 },
    { sku: 'CMP-FAN-1123', name: 'Cooling Fan', currentStock: 7800, safetyStock: 9000, daysOfSupply: 4.5, stockoutDate: 'Nov 16, 2025', affectedPlants: 'Plant-Mexico-02', productionLines: 'Line B7, Line B9', dailyConsumption: 1730 },
    { sku: 'CMP-TCH-9945', name: 'Touch Sensor', currentStock: 2900, safetyStock: 3500, daysOfSupply: 3.2, stockoutDate: 'Nov 14, 2025', affectedPlants: 'Plant-Vietnam-03', productionLines: 'Line C2', dailyConsumption: 900 },
    { sku: 'CMP-OLD-4456', name: 'OLED Screen', currentStock: 1600, safetyStock: 2200, daysOfSupply: 2.2, stockoutDate: 'Nov 12, 2025', affectedPlants: 'Plant-Texas-01', productionLines: 'Line A5', dailyConsumption: 725 },
    { sku: 'CMP-AUD-7782', name: 'Audio Jack', currentStock: 11200, safetyStock: 13000, daysOfSupply: 3.4, stockoutDate: 'Nov 14, 2025', affectedPlants: 'Plant-India-04', productionLines: 'Line D5', dailyConsumption: 3300 },
  ], []);

  // Table 3: Production Delays
  const productionDelaysData = useMemo(() => [
    { plant: 'Plant-Texas-01', lineId: 'Line A3', productSku: 'LAPTOP-XPS13-001', plannedOutput: 800, actualOutput: 320, outputGap: -480, componentShortage: 'PCB Assembly, Battery Pack', backlog: 5760, recoveryDate: 'Nov 24, 2025', revenueImpact: 3456000 },
    { plant: 'Plant-Texas-01', lineId: 'Line A5', productSku: 'TABLET-PRO-M2', plannedOutput: 600, actualOutput: 180, outputGap: -420, componentShortage: 'OLED Screen', backlog: 5040, recoveryDate: 'Nov 23, 2025', revenueImpact: 2520000 },
    { plant: 'Plant-Mexico-02', lineId: 'Line B7', productSku: 'MONITOR-4K-27', plannedOutput: 450, actualOutput: 135, outputGap: -315, componentShortage: 'Power Supply Unit, Cooling Fan', backlog: 3780, recoveryDate: 'Nov 22, 2025', revenueImpact: 1512000 },
    { plant: 'Plant-Mexico-02', lineId: 'Line B9', productSku: 'DESKTOP-ULTRA-R9', plannedOutput: 320, actualOutput: 96, outputGap: -224, componentShortage: 'Transformer', backlog: 2688, recoveryDate: 'Nov 22, 2025', revenueImpact: 1881600 },
    { plant: 'Plant-Vietnam-03', lineId: 'Line C2', productSku: 'SMARTPHONE-Z8', plannedOutput: 1200, actualOutput: 360, outputGap: -840, componentShortage: 'Display Panel, Touch Sensor', backlog: 10080, recoveryDate: 'Nov 24, 2025', revenueImpact: 5040000 },
    { plant: 'Plant-Vietnam-03', lineId: 'Line C4', productSku: 'SMARTWATCH-FIT', plannedOutput: 950, actualOutput: 285, outputGap: -665, componentShortage: 'Display Panel', backlog: 7980, recoveryDate: 'Nov 23, 2025', revenueImpact: 1596000 },
    { plant: 'Plant-India-04', lineId: 'Line D5', productSku: 'EARBUDS-NOISE-X', plannedOutput: 1800, actualOutput: 540, outputGap: -1260, componentShortage: 'USB-C Connector, Audio Jack', backlog: 15120, recoveryDate: 'Nov 25, 2025', revenueImpact: 1512000 },
    { plant: 'Plant-Poland-01', lineId: 'Line E1', productSku: 'CAMERA-PRO-4K', plannedOutput: 280, actualOutput: 84, outputGap: -196, componentShortage: 'Camera Module, Mainboard', backlog: 2352, recoveryDate: 'Nov 23, 2025', revenueImpact: 1882000 },
  ], []);

  // Table 4: FG Inventory Shortage
  const inventoryShortageData = useMemo(() => [
    { dcLocation: 'Los Angeles DC', sku: 'LAPTOP-XPS13-001', productName: 'Premium Laptop 13"', currentStock: 180, safetyStock: 250, reorderPoint: 300, stockoutDate: 'Nov 16, 2025', pendingInbound: '480 (Nov 24)', ordersAtRisk: 38, customersAffected: 'Best Buy, Costco, Amazon' },
    { dcLocation: 'Memphis DC', sku: 'TABLET-PRO-M2', productName: 'Professional Tablet', currentStock: 95, safetyStock: 150, reorderPoint: 200, stockoutDate: 'Nov 15, 2025', pendingInbound: '420 (Nov 23)', ordersAtRisk: 27, customersAffected: 'Walmart, Target' },
    { dcLocation: 'Chicago DC', sku: 'MONITOR-4K-27', productName: '4K Monitor 27"', currentStock: 62, safetyStock: 100, reorderPoint: 120, stockoutDate: 'Nov 14, 2025', pendingInbound: '315 (Nov 22)', ordersAtRisk: 19, customersAffected: 'B&H Photo, Newegg' },
    { dcLocation: 'Dallas DC', sku: 'DESKTOP-ULTRA-R9', productName: 'Ultra Desktop PC', currentStock: 48, safetyStock: 80, reorderPoint: 100, stockoutDate: 'Nov 14, 2025', pendingInbound: '224 (Nov 22)', ordersAtRisk: 16, customersAffected: 'Micro Center, Best Buy' },
    { dcLocation: 'Atlanta DC', sku: 'SMARTPHONE-Z8', productName: 'Flagship Smartphone', currentStock: 210, safetyStock: 350, reorderPoint: 400, stockoutDate: 'Nov 17, 2025', pendingInbound: '840 (Nov 24)', ordersAtRisk: 52, customersAffected: 'Verizon, AT&T, T-Mobile' },
    { dcLocation: 'Seattle DC', sku: 'SMARTWATCH-FIT', productName: 'Fitness Smartwatch', currentStock: 142, safetyStock: 220, reorderPoint: 280, stockoutDate: 'Nov 16, 2025', pendingInbound: '665 (Nov 23)', ordersAtRisk: 31, customersAffected: 'Amazon, REI' },
    { dcLocation: 'Boston DC', sku: 'EARBUDS-NOISE-X', productName: 'Noise Cancel Earbuds', currentStock: 285, safetyStock: 450, reorderPoint: 550, stockoutDate: 'Nov 17, 2025', pendingInbound: '1,260 (Nov 25)', ordersAtRisk: 43, customersAffected: 'Target, Best Buy' },
    { dcLocation: 'Phoenix DC', sku: 'CAMERA-PRO-4K', productName: 'Pro 4K Camera', currentStock: 38, safetyStock: 70, reorderPoint: 90, stockoutDate: 'Nov 13, 2025', pendingInbound: '196 (Nov 23)', ordersAtRisk: 21, customersAffected: 'B&H Photo, Adorama' },
  ], []);

  // Table 5: Customer Order Impact
  const customerOrdersData = useMemo(() => [
    { orderId: 'ORD-2025-10847', customer: 'Best Buy', productSku: 'LAPTOP-XPS13-001', productName: 'Premium Laptop 13"', quantity: 500, orderValue: 650000, orderDate: 'Oct 28, 2025', originalDelivery: 'Nov 15, 2025', newDelivery: 'Nov 27, 2025', delay: 12, dc: 'Los Angeles DC', status: 'At Risk' },
    { orderId: 'ORD-2025-11445', customer: 'Walmart', productSku: 'TABLET-PRO-M2', productName: 'Professional Tablet', quantity: 320, orderValue: 320000, orderDate: 'Oct 30, 2025', originalDelivery: 'Nov 16, 2025', newDelivery: 'Nov 28, 2025', delay: 12, dc: 'Memphis DC', status: 'At Risk' },
    { orderId: 'ORD-2025-12056', customer: 'B&H Photo', productSku: 'MONITOR-4K-27', productName: '4K Monitor 27"', quantity: 180, orderValue: 72000, orderDate: 'Nov 1, 2025', originalDelivery: 'Nov 17, 2025', newDelivery: 'Nov 29, 2025', delay: 12, dc: 'Chicago DC', status: 'At Risk' },
    { orderId: 'ORD-2025-11389', customer: 'Micro Center', productSku: 'DESKTOP-ULTRA-R9', productName: 'Ultra Desktop PC', quantity: 125, orderValue: 312500, orderDate: 'Oct 29, 2025', originalDelivery: 'Nov 15, 2025', newDelivery: 'Nov 27, 2025', delay: 12, dc: 'Dallas DC', status: 'At Risk' },
    { orderId: 'ORD-2025-11789', customer: 'AT&T', productSku: 'SMARTPHONE-Z8', productName: 'Flagship Smartphone', quantity: 850, orderValue: 850000, orderDate: 'Nov 2, 2025', originalDelivery: 'Nov 18, 2025', newDelivery: 'Nov 30, 2025', delay: 12, dc: 'Atlanta DC', status: 'At Risk' },
    { orderId: 'ORD-2025-11034', customer: 'Amazon', productSku: 'SMARTWATCH-FIT', productName: 'Fitness Smartwatch', quantity: 600, orderValue: 240000, orderDate: 'Oct 31, 2025', originalDelivery: 'Nov 16, 2025', newDelivery: 'Nov 28, 2025', delay: 12, dc: 'Seattle DC', status: 'At Risk' },
    { orderId: 'ORD-2025-11945', customer: 'Target', productSku: 'EARBUDS-NOISE-X', productName: 'Noise Cancel Earbuds', quantity: 750, orderValue: 187500, orderDate: 'Nov 3, 2025', originalDelivery: 'Nov 19, 2025', newDelivery: 'Dec 1, 2025', delay: 12, dc: 'Boston DC', status: 'At Risk' },
    { orderId: 'ORD-2025-10623', customer: 'Adorama', productSku: 'CAMERA-PRO-4K', productName: 'Pro 4K Camera', quantity: 95, orderValue: 237500, orderDate: 'Oct 27, 2025', originalDelivery: 'Nov 14, 2025', newDelivery: 'Nov 26, 2025', delay: 12, dc: 'Phoenix DC', status: 'At Risk' },
    { orderId: 'ORD-2025-11256', customer: 'Costco', productSku: 'LAPTOP-XPS13-001', productName: 'Premium Laptop 13"', quantity: 420, orderValue: 546000, orderDate: 'Oct 29, 2025', originalDelivery: 'Nov 16, 2025', newDelivery: 'Nov 28, 2025', delay: 12, dc: 'Los Angeles DC', status: 'At Risk' },
    { orderId: 'ORD-2025-11567', customer: 'T-Mobile', productSku: 'SMARTPHONE-Z8', productName: 'Flagship Smartphone', quantity: 680, orderValue: 680000, orderDate: 'Nov 1, 2025', originalDelivery: 'Nov 17, 2025', newDelivery: 'Nov 29, 2025', delay: 12, dc: 'Atlanta DC', status: 'At Risk' },
  ], []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const openExplainDrawer = (title: string, content: string) => {
    setSideDrawerContent({ title, content });
    setSideDrawerOpen(true);
  };

  const ExplainButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="text-orange-600 hover:text-orange-800 transition-colors"
      title="Explain"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
  );

  const Pagination = ({ totalItems, itemsPerPage = 10 }: { totalItems: number; itemsPerPage?: number }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = 1;

    return (
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(itemsPerPage, totalItems)}</span> of{' '}
          <span className="font-medium">{totalItems}</span> results
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled
            className="px-3 py-1 text-sm border border-gray-300 rounded bg-white text-gray-400 cursor-not-allowed"
          >
            Previous
          </button>
          {[...Array(Math.min(5, totalPages))].map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 text-sm border rounded ${
                idx === 0
                  ? 'border-orange-500 bg-orange-50 text-orange-600 font-medium'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {idx + 1}
            </button>
          ))}
          {totalPages > 5 && <span className="text-gray-500">...</span>}
          <button
            className="px-3 py-1 text-sm border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const renderContextTable = () => {
    switch (selectedNode) {
      case 1:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Initial Disruption Details</h3>
            </div>
            <div className="px-6 py-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Disruption Type</p>
                  <p className="text-base font-semibold text-gray-900">Port Congestion</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="text-base font-semibold text-gray-900">Shanghai, China</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="text-base font-semibold text-gray-900">Nov 1 - Nov 20, 2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Severity</p>
                  <span className="inline-flex px-3 py-1 text-sm font-semibold bg-orange-100 text-orange-800 rounded">
                    High
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Transit Delays - Shipments in Transit</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component Type</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original ETA</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New ETA</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delay</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">PO Value</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transitDelaysData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.supplier}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.componentType}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.quantity.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.originalEta}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">{item.newEta}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">
                          +{item.delay} days
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.destinationPlant}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{formatCurrency(item.poValue)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Shipment Delay', `Shipment ${item.id} carrying ${item.componentType} from ${item.supplier} is delayed by ${item.delay} days due to port congestion at Shanghai. This will impact production at ${item.destinationPlant}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={15} />
          </div>
        );

      case 3:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Raw Material Shortage - Component Inventory Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component Name</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Safety Stock</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Days of Supply</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stockout Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affected Plants</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Lines</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Consumption</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rawMaterialData.map((item) => (
                    <tr key={item.sku} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.sku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.currentStock.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-600">{item.safetyStock.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          item.daysOfSupply < 3 ? 'bg-red-100 text-red-800' : item.daysOfSupply < 4 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.daysOfSupply} days
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">{item.stockoutDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.affectedPlants}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.productionLines}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.dailyConsumption.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Component Shortage', `${item.name} (${item.sku}) is running low with only ${item.daysOfSupply} days of supply remaining. Current stock: ${item.currentStock.toLocaleString()} units. This will impact ${item.productionLines} at ${item.affectedPlants}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={12} />
          </div>
        );

      case 4:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Production Delays - Manufacturing Line Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product SKU</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Planned Output</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Output</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Output Gap</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component Shortage</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Backlog</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovery Date</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Impact</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productionDelaysData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.plant}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.lineId}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.productSku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.plannedOutput}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.actualOutput}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600 font-medium">{item.outputGap}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.componentShortage}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{item.backlog.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.recoveryDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-red-600">{formatCurrency(item.revenueImpact)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Production Delay', `${item.lineId} at ${item.plant} is producing ${item.actualOutput} units daily instead of planned ${item.plannedOutput} due to shortage of ${item.componentShortage}. This creates a backlog of ${item.backlog.toLocaleString()} units with estimated revenue impact of ${formatCurrency(item.revenueImpact)}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={8} />
          </div>
        );

      case 5:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">FG Inventory Shortage - Distribution Center Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DC Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Safety Stock</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Point</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stockout Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Inbound</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Orders at Risk</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customers Affected</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventoryShortageData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.dcLocation}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.sku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.productName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          item.currentStock < item.safetyStock ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.currentStock}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-600">{item.safetyStock}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-600">{item.reorderPoint}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">{item.stockoutDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.pendingInbound}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{item.ordersAtRisk}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.customersAffected}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Inventory Shortage', `${item.dcLocation} has only ${item.currentStock} units of ${item.productName} remaining, below the safety stock level of ${item.safetyStock}. Expected stockout on ${item.stockoutDate}. This affects ${item.ordersAtRisk} orders from ${item.customersAffected}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={18} />
          </div>
        );

      case 6:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Customer Order Impact - Orders at Risk</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Order Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Delivery</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Delivery</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delay</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DC</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerOrdersData.map((item) => (
                    <tr key={item.orderId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.customer}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.productSku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.productName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.quantity.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{formatCurrency(item.orderValue)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.orderDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.originalDelivery}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">{item.newDelivery}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">
                          +{item.delay} days
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.dc}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-800 rounded">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Order Impact', `Order ${item.orderId} from ${item.customer} for ${item.quantity.toLocaleString()} units of ${item.productName} (valued at ${formatCurrency(item.orderValue)}) is delayed by ${item.delay} days. Original delivery: ${item.originalDelivery}, New delivery: ${item.newDelivery}. Fulfilling from ${item.dc}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={247} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="text-orange-600 hover:text-orange-800 text-sm font-medium mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Scenario List
          </Link>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">{scenarioData.name}</h1>
            <p className="mt-2 text-sm text-gray-600">
              Created on {formatDate(scenarioData.createdAt)}
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Orders Impacted</div>
            <div className="text-3xl font-bold text-gray-900">{scenarioData.summary.ordersImpacted}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Revenue at Risk</div>
            <div className="text-3xl font-bold text-gray-900">{formatCurrency(scenarioData.summary.revenueAtRisk)}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Average Delay</div>
            <div className="text-3xl font-bold text-gray-900">{scenarioData.summary.averageDelay} days</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200 bg-red-50">
            <div className="text-sm font-medium text-red-600 mb-2">Critical Orders</div>
            <div className="text-3xl font-bold text-red-600">{scenarioData.summary.criticalOrders}</div>
          </div>
        </div>

        {/* Simulation Variables */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Simulation Variables</h2>
          <div className="grid grid-cols-4 gap-4">
            {scenarioData.variables.map((variable, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600">{variable.name}</div>
                <div className="text-lg font-semibold text-gray-900 mt-1">{variable.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Cascade Timeline */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Event Cascade Timeline</h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-0">
              {cascadeEvents.map((event, index) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedNode(event.id)}
                  className={`relative pl-12 pr-4 py-4 cursor-pointer transition-all ${
                    selectedNode === event.id
                      ? 'bg-orange-50 border-l-4 border-orange-500 ml-0'
                      : 'hover:bg-gray-50 border-l-4 border-transparent ml-0'
                  }`}
                >
                  <div
                    className={`absolute left-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${
                      selectedNode === event.id
                        ? 'bg-orange-500'
                        : event.severity === 'Critical'
                        ? 'bg-red-500'
                        : 'bg-orange-400'
                    }`}
                  >
                    <span className="text-white text-xs font-bold">{event.id}</span>
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`text-sm font-bold ${selectedNode === event.id ? 'text-orange-600' : 'text-gray-900'}`}>
                          {event.title}
                        </h3>
                        <span className="text-xs text-gray-500">{event.timeframe}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {event.affectedEntities.slice(0, 3).map((entity, idx) => (
                          <span key={idx} className="inline-flex px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                            {entity}
                          </span>
                        ))}
                        {event.affectedEntities.length > 3 && (
                          <span className="inline-flex px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                            +{event.affectedEntities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Context Table */}
        {renderContextTable()}
      </div>

      {/* Side Drawer */}
      {sideDrawerOpen && sideDrawerContent && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSideDrawerOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-bold text-gray-900">{sideDrawerContent.title}</h3>
              <button
                onClick={() => setSideDrawerOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700">{sideDrawerContent.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortCongestionDetail;
