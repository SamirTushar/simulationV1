import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

const SupplierShutdownDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedNode, setSelectedNode] = useState<number>(6);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [sideDrawerContent, setSideDrawerContent] = useState<{ title: string; content: string } | null>(null);

  // Supplier Shutdown Scenario Data
  const scenarioData = useMemo(() => ({
    name: 'Supplier Shutdown - Semiconductor Component Crisis',
    createdAt: '2025-11-13T00:00:00Z',
    variables: [
      { name: 'Supplier Name', value: 'TSMC Taiwan' },
      { name: 'Shutdown Duration', value: 'Nov 5 - Nov 18, 2025' },
      { name: 'Affected Components', value: '18 component types' },
      { name: 'Alternate Suppliers Available', value: '3 (limited capacity)' },
    ],
    summary: {
      ordersImpacted: 312,
      revenueAtRisk: 24680000,
      productionLinesAffected: 14,
      criticalSkus: 22,
    },
  }), []);

  // Event cascade data
  const cascadeEvents = useMemo(() => [
    {
      id: 1,
      title: 'Initial Disruption',
      description: 'Supplier Shutdown - TSMC Taiwan',
      severity: 'Critical' as const,
      affectedEntities: ['18 critical semiconductor components'],
      timeframe: 'Day 0',
    },
    {
      id: 2,
      title: 'Component Supply Halt',
      description: 'All shipments from TSMC suspended',
      severity: 'Critical' as const,
      affectedEntities: ['6 distribution hubs', '28 active POs'],
      timeframe: 'Days 1-3',
    },
    {
      id: 3,
      title: 'Raw Material Shortage',
      description: 'Component inventory depleting at manufacturing plants',
      severity: 'Critical' as const,
      affectedEntities: ['Plant-Texas-01', 'Plant-Mexico-02', 'Plant-Vietnam-03', 'Plant-India-04', 'Plant-Poland-01', 'Plant-Malaysia-01'],
      timeframe: 'Days 4-8',
    },
    {
      id: 4,
      title: 'Production Line Stoppages',
      description: '14 production lines halt or reduce capacity',
      severity: 'Critical' as const,
      affectedEntities: ['14 assembly lines across 6 plants'],
      timeframe: 'Days 6-12',
    },
    {
      id: 5,
      title: 'FG Inventory Depletion',
      description: '22 finished goods SKUs facing stockout',
      severity: 'Critical' as const,
      affectedEntities: ['9 distribution centers nationwide'],
      timeframe: 'Days 10-16',
    },
    {
      id: 6,
      title: 'Customer Order Impact',
      description: '312 customer orders delayed or at risk of cancellation',
      severity: 'Critical' as const,
      affectedEntities: ['Apple', 'Dell', 'HP', 'Lenovo', 'Samsung', 'Microsoft', 'ASUS', 'Acer'],
      timeframe: 'Days 12-20',
    },
  ], []);

  // Table 1: Component Supply Halt - Active Purchase Orders
  const purchaseOrdersData = useMemo(() => [
    { poNumber: 'PO-2025-78901', componentSku: 'TSMC-AP-5501', componentName: 'A17 Pro Chipset', quantity: 25000, poValue: 2500000, shipDate: 'Nov 6, 2025', deliveryDate: 'Nov 13, 2025', receivingPlant: 'Plant-Texas-01', productionDependency: 'iPhone 15 Pro Assembly', criticality: 'High' },
    { poNumber: 'PO-2025-78902', componentSku: 'TSMC-QC-8892', componentName: 'Snapdragon 8 Gen 3', quantity: 18500, poValue: 2220000, shipDate: 'Nov 7, 2025', deliveryDate: 'Nov 14, 2025', receivingPlant: 'Plant-Vietnam-03', productionDependency: 'Galaxy S24 Assembly', criticality: 'High' },
    { poNumber: 'PO-2025-78903', componentSku: 'TSMC-NV-4401', componentName: 'RTX 4090 GPU Die', quantity: 8200, poValue: 4920000, shipDate: 'Nov 8, 2025', deliveryDate: 'Nov 15, 2025', receivingPlant: 'Plant-Malaysia-01', productionDependency: 'Graphics Card Assembly', criticality: 'High' },
    { poNumber: 'PO-2025-78904', componentSku: 'TSMC-MD-7723', componentName: 'Dimensity 9300', quantity: 15000, poValue: 1350000, shipDate: 'Nov 6, 2025', deliveryDate: 'Nov 13, 2025', receivingPlant: 'Plant-India-04', productionDependency: 'OnePlus 12 Assembly', criticality: 'High' },
    { poNumber: 'PO-2025-78905', componentSku: 'TSMC-AM-6634', componentName: 'Ryzen 9 7950X Die', quantity: 12500, poValue: 2500000, shipDate: 'Nov 9, 2025', deliveryDate: 'Nov 16, 2025', receivingPlant: 'Plant-Poland-01', productionDependency: 'Desktop CPU Assembly', criticality: 'High' },
    { poNumber: 'PO-2025-78906', componentSku: 'TSMC-AP-5502', componentName: 'M3 Pro Chipset', quantity: 20000, poValue: 2400000, shipDate: 'Nov 7, 2025', deliveryDate: 'Nov 14, 2025', receivingPlant: 'Plant-Texas-01', productionDependency: 'MacBook Pro Assembly', criticality: 'High' },
    { poNumber: 'PO-2025-78907', componentSku: 'TSMC-NV-4402', componentName: 'RTX 4080 GPU Die', quantity: 10500, poValue: 3150000, shipDate: 'Nov 10, 2025', deliveryDate: 'Nov 17, 2025', receivingPlant: 'Plant-Malaysia-01', productionDependency: 'Graphics Card Assembly', criticality: 'High' },
    { poNumber: 'PO-2025-78908', componentSku: 'TSMC-QC-8893', componentName: 'Snapdragon X Elite', quantity: 9800, poValue: 1470000, shipDate: 'Nov 8, 2025', deliveryDate: 'Nov 15, 2025', receivingPlant: 'Plant-Mexico-02', productionDependency: 'Surface Laptop Assembly', criticality: 'High' },
    { poNumber: 'PO-2025-78909', componentSku: 'TSMC-AP-5503', componentName: 'A16 Bionic', quantity: 22000, poValue: 1980000, shipDate: 'Nov 6, 2025', deliveryDate: 'Nov 13, 2025', receivingPlant: 'Plant-Texas-01', productionDependency: 'iPhone 14 Assembly', criticality: 'Medium' },
    { poNumber: 'PO-2025-78910', componentSku: 'TSMC-MD-7724', componentName: 'Dimensity 8300', quantity: 16500, poValue: 1155000, shipDate: 'Nov 9, 2025', deliveryDate: 'Nov 16, 2025', receivingPlant: 'Plant-India-04', productionDependency: 'Redmi Note Assembly', criticality: 'Medium' },
  ], []);

  // Table 2: Raw Material Shortage
  const componentInventoryData = useMemo(() => [
    { componentSku: 'TSMC-AP-5501', componentName: 'A17 Pro Chipset', plant: 'Plant-Texas-01', currentStock: 3200, safetyStock: 5000, dailyConsumption: 850, daysOfSupply: 3.8, stockoutDate: 'Nov 12, 2025', productionLines: 'Line A1, Line A2', alternateSource: 'None' },
    { componentSku: 'TSMC-QC-8892', componentName: 'Snapdragon 8 Gen 3', plant: 'Plant-Vietnam-03', currentStock: 2800, safetyStock: 4200, dailyConsumption: 920, daysOfSupply: 3.0, stockoutDate: 'Nov 11, 2025', productionLines: 'Line C1, Line C3', alternateSource: 'Samsung (limited)' },
    { componentSku: 'TSMC-NV-4401', componentName: 'RTX 4090 GPU Die', plant: 'Plant-Malaysia-01', currentStock: 1100, safetyStock: 2000, dailyConsumption: 380, daysOfSupply: 2.9, stockoutDate: 'Nov 11, 2025', productionLines: 'Line F1', alternateSource: 'None' },
    { componentSku: 'TSMC-MD-7723', componentName: 'Dimensity 9300', plant: 'Plant-India-04', currentStock: 2400, safetyStock: 3500, dailyConsumption: 750, daysOfSupply: 3.2, stockoutDate: 'Nov 12, 2025', productionLines: 'Line D1, Line D2', alternateSource: 'None' },
    { componentSku: 'TSMC-AM-6634', componentName: 'Ryzen 9 7950X Die', plant: 'Plant-Poland-01', currentStock: 1850, safetyStock: 3000, dailyConsumption: 520, daysOfSupply: 3.6, stockoutDate: 'Nov 12, 2025', productionLines: 'Line E3', alternateSource: 'GlobalFoundries (limited)' },
    { componentSku: 'TSMC-AP-5502', componentName: 'M3 Pro Chipset', plant: 'Plant-Texas-01', currentStock: 2900, safetyStock: 4500, dailyConsumption: 980, daysOfSupply: 3.0, stockoutDate: 'Nov 11, 2025', productionLines: 'Line A3, Line A4', alternateSource: 'None' },
    { componentSku: 'TSMC-NV-4402', componentName: 'RTX 4080 GPU Die', plant: 'Plant-Malaysia-01', currentStock: 1450, safetyStock: 2500, dailyConsumption: 420, daysOfSupply: 3.5, stockoutDate: 'Nov 12, 2025', productionLines: 'Line F2', alternateSource: 'None' },
    { componentSku: 'TSMC-QC-8893', componentName: 'Snapdragon X Elite', plant: 'Plant-Mexico-02', currentStock: 1600, safetyStock: 2400, dailyConsumption: 480, daysOfSupply: 3.3, stockoutDate: 'Nov 12, 2025', productionLines: 'Line B3', alternateSource: 'Samsung (limited)' },
    { componentSku: 'TSMC-AP-5503', componentName: 'A16 Bionic', plant: 'Plant-Texas-01', currentStock: 3800, safetyStock: 5500, dailyConsumption: 1100, daysOfSupply: 3.5, stockoutDate: 'Nov 12, 2025', productionLines: 'Line A5', alternateSource: 'None' },
    { componentSku: 'TSMC-MD-7724', componentName: 'Dimensity 8300', plant: 'Plant-India-04', currentStock: 2650, safetyStock: 4000, dailyConsumption: 820, daysOfSupply: 3.2, stockoutDate: 'Nov 12, 2025', productionLines: 'Line D3', alternateSource: 'None' },
  ], []);

  // Table 3: Production Line Stoppages
  const productionStoppagesData = useMemo(() => [
    { plant: 'Plant-Texas-01', lineId: 'Line A1', productSku: 'PHONE-IP15PRO-256', productName: 'iPhone 15 Pro 256GB', plannedOutput: 1200, actualOutput: 0, outputGap: -1200, missingComponent: 'A17 Pro Chipset', backlog: 16800, recoveryDate: 'Nov 22, 2025', revenueImpact: 16800000 },
    { plant: 'Plant-Texas-01', lineId: 'Line A2', productSku: 'PHONE-IP15PRO-512', productName: 'iPhone 15 Pro 512GB', plannedOutput: 900, actualOutput: 0, outputGap: -900, missingComponent: 'A17 Pro Chipset', backlog: 12600, recoveryDate: 'Nov 22, 2025', revenueImpact: 14580000 },
    { plant: 'Plant-Vietnam-03', lineId: 'Line C1', productSku: 'PHONE-S24U-512', productName: 'Galaxy S24 Ultra 512GB', plannedOutput: 1100, actualOutput: 0, outputGap: -1100, missingComponent: 'Snapdragon 8 Gen 3', backlog: 15400, recoveryDate: 'Nov 23, 2025', revenueImpact: 18480000 },
    { plant: 'Plant-Vietnam-03', lineId: 'Line C3', productSku: 'PHONE-S24-256', productName: 'Galaxy S24 256GB', plannedOutput: 1350, actualOutput: 0, outputGap: -1350, missingComponent: 'Snapdragon 8 Gen 3', backlog: 18900, recoveryDate: 'Nov 23, 2025', revenueImpact: 15120000 },
    { plant: 'Plant-Malaysia-01', lineId: 'Line F1', productSku: 'GPU-RTX4090-24G', productName: 'RTX 4090 24GB', plannedOutput: 450, actualOutput: 0, outputGap: -450, missingComponent: 'RTX 4090 GPU Die', backlog: 6300, recoveryDate: 'Nov 24, 2025', revenueImpact: 11340000 },
    { plant: 'Plant-India-04', lineId: 'Line D1', productSku: 'PHONE-OP12-256', productName: 'OnePlus 12 256GB', plannedOutput: 1000, actualOutput: 0, outputGap: -1000, missingComponent: 'Dimensity 9300', backlog: 14000, recoveryDate: 'Nov 23, 2025', revenueImpact: 8400000 },
    { plant: 'Plant-Poland-01', lineId: 'Line E3', productSku: 'CPU-R9-7950X', productName: 'Ryzen 9 7950X', plannedOutput: 520, actualOutput: 0, outputGap: -520, missingComponent: 'Ryzen 9 7950X Die', backlog: 7280, recoveryDate: 'Nov 22, 2025', revenueImpact: 3640000 },
    { plant: 'Plant-Texas-01', lineId: 'Line A3', productSku: 'LAPTOP-MBP16-M3', productName: 'MacBook Pro 16" M3', plannedOutput: 650, actualOutput: 0, outputGap: -650, missingComponent: 'M3 Pro Chipset', backlog: 9100, recoveryDate: 'Nov 22, 2025', revenueImpact: 22750000 },
    { plant: 'Plant-Malaysia-01', lineId: 'Line F2', productSku: 'GPU-RTX4080-16G', productName: 'RTX 4080 16GB', plannedOutput: 580, actualOutput: 0, outputGap: -580, missingComponent: 'RTX 4080 GPU Die', backlog: 8120, recoveryDate: 'Nov 24, 2025', revenueImpact: 9744000 },
    { plant: 'Plant-Mexico-02', lineId: 'Line B3', productSku: 'LAPTOP-SRF-X-ELITE', productName: 'Surface Laptop X Elite', plannedOutput: 480, actualOutput: 0, outputGap: -480, missingComponent: 'Snapdragon X Elite', backlog: 6720, recoveryDate: 'Nov 23, 2025', revenueImpact: 10080000 },
  ], []);

  // Table 4: FG Inventory Depletion
  const inventoryDepletionData = useMemo(() => [
    { dcLocation: 'Cupertino DC', sku: 'PHONE-IP15PRO-256', productName: 'iPhone 15 Pro 256GB', currentStock: 420, safetyStock: 800, reorderPoint: 1000, stockoutDate: 'Nov 15, 2025', pendingInbound: '1,200 (Nov 22)', ordersAtRisk: 58, customersAffected: 'Apple Store, Best Buy, Verizon' },
    { dcLocation: 'Cupertino DC', sku: 'PHONE-IP15PRO-512', productName: 'iPhone 15 Pro 512GB', currentStock: 285, safetyStock: 600, reorderPoint: 750, stockoutDate: 'Nov 14, 2025', pendingInbound: '900 (Nov 22)', ordersAtRisk: 42, customersAffected: 'Apple Store, AT&T, T-Mobile' },
    { dcLocation: 'Dallas DC', sku: 'PHONE-S24U-512', productName: 'Galaxy S24 Ultra 512GB', currentStock: 380, safetyStock: 700, reorderPoint: 850, stockoutDate: 'Nov 16, 2025', pendingInbound: '1,100 (Nov 23)', ordersAtRisk: 51, customersAffected: 'Samsung Store, Best Buy, Verizon' },
    { dcLocation: 'Dallas DC', sku: 'PHONE-S24-256', productName: 'Galaxy S24 256GB', currentStock: 520, safetyStock: 850, reorderPoint: 1000, stockoutDate: 'Nov 17, 2025', pendingInbound: '1,350 (Nov 23)', ordersAtRisk: 63, customersAffected: 'Samsung Store, Costco, Walmart' },
    { dcLocation: 'Los Angeles DC', sku: 'GPU-RTX4090-24G', productName: 'RTX 4090 24GB', currentStock: 95, safetyStock: 180, reorderPoint: 220, stockoutDate: 'Nov 13, 2025', pendingInbound: '450 (Nov 24)', ordersAtRisk: 38, customersAffected: 'Newegg, Micro Center, B&H' },
    { dcLocation: 'Mumbai DC', sku: 'PHONE-OP12-256', productName: 'OnePlus 12 256GB', currentStock: 340, safetyStock: 600, reorderPoint: 750, stockoutDate: 'Nov 15, 2025', pendingInbound: '1,000 (Nov 23)', ordersAtRisk: 45, customersAffected: 'OnePlus Store, Amazon India' },
    { dcLocation: 'Warsaw DC', sku: 'CPU-R9-7950X', productName: 'Ryzen 9 7950X', currentStock: 125, safetyStock: 250, reorderPoint: 300, stockoutDate: 'Nov 14, 2025', pendingInbound: '520 (Nov 22)', ordersAtRisk: 28, customersAffected: 'AMD Store, Komputronik' },
    { dcLocation: 'Cupertino DC', sku: 'LAPTOP-MBP16-M3', productName: 'MacBook Pro 16" M3', currentStock: 180, safetyStock: 350, reorderPoint: 450, stockoutDate: 'Nov 14, 2025', pendingInbound: '650 (Nov 22)', ordersAtRisk: 49, customersAffected: 'Apple Store, Best Buy' },
    { dcLocation: 'Los Angeles DC', sku: 'GPU-RTX4080-16G', productName: 'RTX 4080 16GB', currentStock: 142, safetyStock: 280, reorderPoint: 350, stockoutDate: 'Nov 14, 2025', pendingInbound: '580 (Nov 24)', ordersAtRisk: 35, customersAffected: 'Newegg, Amazon, Best Buy' },
    { dcLocation: 'Seattle DC', sku: 'LAPTOP-SRF-X-ELITE', productName: 'Surface Laptop X Elite', currentStock: 195, safetyStock: 350, reorderPoint: 420, stockoutDate: 'Nov 15, 2025', pendingInbound: '480 (Nov 23)', ordersAtRisk: 32, customersAffected: 'Microsoft Store, Best Buy' },
  ], []);

  // Table 5: Customer Order Impact
  const customerOrdersData = useMemo(() => [
    { orderId: 'ORD-2025-20145', customer: 'Apple Store', productSku: 'PHONE-IP15PRO-256', productName: 'iPhone 15 Pro 256GB', quantity: 800, orderValue: 1120000, orderDate: 'Oct 25, 2025', originalDelivery: 'Nov 15, 2025', newDelivery: 'Nov 28, 2025', delay: 13, dc: 'Cupertino DC', status: 'At Risk' },
    { orderId: 'ORD-2025-20289', customer: 'Best Buy', productSku: 'PHONE-IP15PRO-512', productName: 'iPhone 15 Pro 512GB', quantity: 650, orderValue: 1105000, orderDate: 'Oct 27, 2025', originalDelivery: 'Nov 16, 2025', newDelivery: 'Nov 29, 2025', delay: 13, dc: 'Cupertino DC', status: 'At Risk' },
    { orderId: 'ORD-2025-20456', customer: 'Verizon', productSku: 'PHONE-S24U-512', productName: 'Galaxy S24 Ultra 512GB', quantity: 950, orderValue: 1425000, orderDate: 'Oct 28, 2025', originalDelivery: 'Nov 17, 2025', newDelivery: 'Nov 30, 2025', delay: 13, dc: 'Dallas DC', status: 'At Risk' },
    { orderId: 'ORD-2025-20123', customer: 'Samsung Store', productSku: 'PHONE-S24-256', productName: 'Galaxy S24 256GB', quantity: 1200, orderValue: 1344000, orderDate: 'Oct 26, 2025', originalDelivery: 'Nov 16, 2025', newDelivery: 'Nov 29, 2025', delay: 13, dc: 'Dallas DC', status: 'At Risk' },
    { orderId: 'ORD-2025-19987', customer: 'Newegg', productSku: 'GPU-RTX4090-24G', productName: 'RTX 4090 24GB', quantity: 320, orderValue: 576000, orderDate: 'Oct 23, 2025', originalDelivery: 'Nov 13, 2025', newDelivery: 'Nov 27, 2025', delay: 14, dc: 'Los Angeles DC', status: 'At Risk' },
    { orderId: 'ORD-2025-20334', customer: 'OnePlus Store', productSku: 'PHONE-OP12-256', productName: 'OnePlus 12 256GB', quantity: 850, orderValue: 510000, orderDate: 'Oct 29, 2025', originalDelivery: 'Nov 15, 2025', newDelivery: 'Nov 28, 2025', delay: 13, dc: 'Mumbai DC', status: 'At Risk' },
    { orderId: 'ORD-2025-20078', customer: 'AMD Store', productSku: 'CPU-R9-7950X', productName: 'Ryzen 9 7950X', quantity: 420, orderValue: 210000, orderDate: 'Oct 24, 2025', originalDelivery: 'Nov 14, 2025', newDelivery: 'Nov 27, 2025', delay: 13, dc: 'Warsaw DC', status: 'At Risk' },
    { orderId: 'ORD-2025-20567', customer: 'Apple Store', productSku: 'LAPTOP-MBP16-M3', productName: 'MacBook Pro 16" M3', quantity: 500, orderValue: 1250000, orderDate: 'Oct 30, 2025', originalDelivery: 'Nov 17, 2025', newDelivery: 'Nov 30, 2025', delay: 13, dc: 'Cupertino DC', status: 'At Risk' },
    { orderId: 'ORD-2025-20201', customer: 'Micro Center', productSku: 'GPU-RTX4080-16G', productName: 'RTX 4080 16GB', quantity: 380, orderValue: 456000, orderDate: 'Oct 26, 2025', originalDelivery: 'Nov 15, 2025', newDelivery: 'Nov 29, 2025', delay: 14, dc: 'Los Angeles DC', status: 'At Risk' },
    { orderId: 'ORD-2025-20445', customer: 'Microsoft Store', productSku: 'LAPTOP-SRF-X-ELITE', productName: 'Surface Laptop X Elite', quantity: 425, orderValue: 637500, orderDate: 'Oct 29, 2025', originalDelivery: 'Nov 16, 2025', newDelivery: 'Nov 29, 2025', delay: 13, dc: 'Seattle DC', status: 'At Risk' },
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
                  <p className="text-base font-semibold text-gray-900">Supplier Shutdown</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Supplier</p>
                  <p className="text-base font-semibold text-gray-900">TSMC Taiwan</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="text-base font-semibold text-gray-900">Nov 5 - Nov 18, 2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Severity</p>
                  <span className="inline-flex px-3 py-1 text-sm font-semibold bg-red-100 text-red-800 rounded">
                    Critical
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
              <h3 className="text-lg font-bold text-gray-900">Component Supply Halt - Active Purchase Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO Number</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component Name</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">PO Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ship Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiving Plant</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Dependency</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Criticality</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchaseOrdersData.map((item) => (
                    <tr key={item.poNumber} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.poNumber}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.componentSku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.componentName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.quantity.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{formatCurrency(item.poValue)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.shipDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">{item.deliveryDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.receivingPlant}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.productionDependency}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          item.criticality === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.criticality}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Purchase Order Suspended', `PO ${item.poNumber} for ${item.quantity.toLocaleString()} units of ${item.componentName} (valued at ${formatCurrency(item.poValue)}) has been suspended due to TSMC shutdown. This component is critical for ${item.productionDependency} at ${item.receivingPlant}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={28} />
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Safety Stock</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Consumption</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Days of Supply</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stockout Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Lines Impacted</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alternate Source</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {componentInventoryData.map((item) => (
                    <tr key={item.componentSku} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.componentSku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.componentName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.plant}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.currentStock.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-600">{item.safetyStock.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-600">{item.dailyConsumption.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          item.daysOfSupply < 3 ? 'bg-red-100 text-red-800' : item.daysOfSupply < 3.5 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.daysOfSupply} days
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">{item.stockoutDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.productionLines}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.alternateSource}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Component Shortage', `${item.componentName} (${item.componentSku}) at ${item.plant} has only ${item.daysOfSupply} days of supply remaining. Current stock: ${item.currentStock.toLocaleString()} units. This will impact ${item.productionLines}. Alternate source: ${item.alternateSource}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={18} />
          </div>
        );

      case 4:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Production Line Stoppages - Manufacturing Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Planned Output</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Output</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Output Gap</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Missing Component</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Backlog</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovery Date</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Impact</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productionStoppagesData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.plant}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.lineId}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.productSku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.productName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.plannedOutput}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600 font-medium">{item.actualOutput}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600 font-bold">{item.outputGap}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.missingComponent}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{item.backlog.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.recoveryDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-red-600">{formatCurrency(item.revenueImpact)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Production Stoppage', `${item.lineId} at ${item.plant} has completely stopped production (${item.actualOutput} units vs planned ${item.plannedOutput} daily) due to missing ${item.missingComponent}. This creates a backlog of ${item.backlog.toLocaleString()} units with estimated revenue impact of ${formatCurrency(item.revenueImpact)}. Recovery expected by ${item.recoveryDate}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={14} />
          </div>
        );

      case 5:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">FG Inventory Depletion - Distribution Center Status</h3>
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
                  {inventoryDepletionData.map((item, idx) => (
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
                        <ExplainButton onClick={() => openExplainDrawer('Inventory Depletion', `${item.dcLocation} has only ${item.currentStock} units of ${item.productName} remaining, critically below the safety stock level of ${item.safetyStock}. Expected stockout on ${item.stockoutDate}. This affects ${item.ordersAtRisk} orders from ${item.customersAffected}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={22} />
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
                        <ExplainButton onClick={() => openExplainDrawer('Order Impact', `Order ${item.orderId} from ${item.customer} for ${item.quantity.toLocaleString()} units of ${item.productName} (valued at ${formatCurrency(item.orderValue)}) is delayed by ${item.delay} days due to TSMC supplier shutdown. Original delivery: ${item.originalDelivery}, New delivery: ${item.newDelivery}. Fulfilling from ${item.dc}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={312} />
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
            Back to Simulations
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
            <div className="text-sm font-medium text-gray-600 mb-2">Production Lines Affected</div>
            <div className="text-3xl font-bold text-gray-900">{scenarioData.summary.productionLinesAffected} lines</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200 bg-red-50">
            <div className="text-sm font-medium text-red-600 mb-2">Critical SKUs</div>
            <div className="text-3xl font-bold text-red-600">{scenarioData.summary.criticalSkus}</div>
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
                        : 'bg-red-500'
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

export default SupplierShutdownDetail;
