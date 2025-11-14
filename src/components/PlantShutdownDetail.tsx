import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

const PlantShutdownDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedNode, setSelectedNode] = useState<number>(6);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [sideDrawerContent, setSideDrawerContent] = useState<{ title: string; content: string } | null>(null);

  // Plant Shutdown Scenario Data
  const scenarioData = useMemo(() => ({
    name: 'Manufacturing Plant Shutdown - Texas Facility Maintenance',
    createdAt: '2025-11-01T08:00:00Z',
    variables: [
      { name: 'Plant Name', value: 'Plant-Texas-01 (Austin)' },
      { name: 'Shutdown Duration', value: 'Nov 10 - Nov 24, 2025' },
      { name: 'Capacity Available', value: '30% operational' },
      { name: 'Reason', value: 'Annual facility maintenance' },
    ],
    summary: {
      ordersImpacted: 428,
      revenueAtRisk: 42850000,
      productionLinesAffected: 8,
      skusImpacted: 16,
    },
  }), []);

  // Event cascade data
  const cascadeEvents = useMemo(() => [
    {
      id: 1,
      title: 'Initial Disruption',
      description: 'Manufacturing Plant Partial Shutdown - Plant-Texas-01',
      severity: 'High' as const,
      affectedEntities: ['8 production lines', '16 product SKUs'],
      timeframe: 'Day 0',
    },
    {
      id: 2,
      title: 'Production Capacity Reduction',
      description: '70% capacity loss across facility',
      severity: 'High' as const,
      affectedEntities: ['Line A1', 'Line A2', 'Line A3', 'Line A4', 'Line A5', 'Line A6', 'Line A7', 'Line A8'],
      timeframe: 'Days 1-3',
    },
    {
      id: 3,
      title: 'Production Output Gap',
      description: 'Daily output drops from 8,400 units to 2,520 units',
      severity: 'Critical' as const,
      affectedEntities: ['16 finished goods SKUs', 'Consumer electronics products'],
      timeframe: 'Days 2-6',
    },
    {
      id: 4,
      title: 'Order Backlog Accumulation',
      description: 'Unfulfilled orders pile up at 5,880 units/day',
      severity: 'Critical' as const,
      affectedEntities: ['Customer order queue', 'Production scheduling system'],
      timeframe: 'Days 4-10',
    },
    {
      id: 5,
      title: 'FG Inventory Depletion',
      description: 'Distribution centers run low on Texas-produced SKUs',
      severity: 'Critical' as const,
      affectedEntities: ['Cupertino DC', 'Dallas DC', 'Chicago DC', 'Phoenix DC', 'Seattle DC', 'Atlanta DC'],
      timeframe: 'Days 8-14',
    },
    {
      id: 6,
      title: 'Customer Order Impact',
      description: '428 customer orders delayed or require alternate sourcing',
      severity: 'Critical' as const,
      affectedEntities: ['Apple', 'Dell', 'HP', 'Microsoft', 'Best Buy', 'Amazon', 'Walmart', 'Target'],
      timeframe: 'Days 10-18',
    },
  ], []);

  // Table data (using the same data from before)
  const lineStatusData = useMemo(() => [
    { lineId: 'Line A1', productSku: 'PHONE-IP15PRO-256', productName: 'iPhone 15 Pro 256GB', normalCapacity: 1200, availableCapacity: 0, capacityLoss: -1200, shutdownReason: 'Equipment overhaul', restartDate: 'Nov 24, 2025', productsAffected: '1 SKU', alternateLines: 'None (Apple exclusive)' },
    { lineId: 'Line A2', productSku: 'PHONE-IP15PRO-512', productName: 'iPhone 15 Pro 512GB', normalCapacity: 900, availableCapacity: 0, capacityLoss: -900, shutdownReason: 'Equipment overhaul', restartDate: 'Nov 24, 2025', productsAffected: '1 SKU', alternateLines: 'None (Apple exclusive)' },
    { lineId: 'Line A3', productSku: 'LAPTOP-MBP16-M3', productName: 'MacBook Pro 16" M3 Pro', normalCapacity: 650, availableCapacity: 195, capacityLoss: -455, shutdownReason: 'Partial operation', restartDate: 'Nov 24, 2025', productsAffected: '1 SKU', alternateLines: 'Plant-California-02 (limited)' },
    { lineId: 'Line A4', productSku: 'LAPTOP-MBP14-M3', productName: 'MacBook Pro 14" M3', normalCapacity: 750, availableCapacity: 225, capacityLoss: -525, shutdownReason: 'Partial operation', restartDate: 'Nov 24, 2025', productsAffected: '1 SKU', alternateLines: 'Plant-California-02 (limited)' },
    { lineId: 'Line A5', productSku: 'PHONE-IP14-256', productName: 'iPhone 14 256GB', normalCapacity: 1400, availableCapacity: 420, capacityLoss: -980, shutdownReason: 'Partial operation', restartDate: 'Nov 24, 2025', productsAffected: '1 SKU', alternateLines: 'Plant-California-02 (partial)' },
    { lineId: 'Line A6', productSku: 'TABLET-IPAD-PRO', productName: 'iPad Pro 12.9" M2', normalCapacity: 800, availableCapacity: 0, capacityLoss: -800, shutdownReason: 'Cleanroom maintenance', restartDate: 'Nov 24, 2025', productsAffected: '1 SKU', alternateLines: 'None' },
    { lineId: 'Line A7', productSku: 'DESKTOP-MAC-STUDIO', productName: 'Mac Studio M2 Ultra', normalCapacity: 320, availableCapacity: 0, capacityLoss: -320, shutdownReason: 'Assembly line upgrade', restartDate: 'Nov 24, 2025', productsAffected: '1 SKU', alternateLines: 'Plant-California-02 (limited)' },
    { lineId: 'Line A8', productSku: 'LAPTOP-DELL-XPS15', productName: 'Dell XPS 15 9530', normalCapacity: 950, availableCapacity: 285, capacityLoss: -665, shutdownReason: 'Partial operation', restartDate: 'Nov 24, 2025', productsAffected: '1 SKU', alternateLines: 'Plant-Mexico-02' },
    { lineId: 'Line A9', productSku: 'LAPTOP-HP-SPECTRE', productName: 'HP Spectre x360 16"', normalCapacity: 680, availableCapacity: 204, capacityLoss: -476, shutdownReason: 'Partial operation', restartDate: 'Nov 24, 2025', productsAffected: '1 SKU', alternateLines: 'Plant-Mexico-02' },
    { lineId: 'Line A10', productSku: 'DESKTOP-HP-OMEN', productName: 'HP Omen 45L Desktop', normalCapacity: 420, availableCapacity: 126, capacityLoss: -294, shutdownReason: 'Partial operation', restartDate: 'Nov 24, 2025', productsAffected: '1 SKU', alternateLines: 'Plant-Poland-01' },
  ], []);

  const productionGapData = useMemo(() => [
    { productSku: 'PHONE-IP15PRO-256', productName: 'iPhone 15 Pro 256GB', plannedDaily: 1200, actualDaily: 0, dailyGap: -1200, shutdownDays: 14, totalBacklog: 16800, sellingPrice: 1399, revenueImpact: 23503200, recoveryTime: '14 days post-restart' },
    { productSku: 'PHONE-IP15PRO-512', productName: 'iPhone 15 Pro 512GB', plannedDaily: 900, actualDaily: 0, dailyGap: -900, shutdownDays: 14, totalBacklog: 12600, sellingPrice: 1599, revenueImpact: 20148600, recoveryTime: '14 days post-restart' },
    { productSku: 'LAPTOP-MBP16-M3', productName: 'MacBook Pro 16" M3 Pro', plannedDaily: 650, actualDaily: 195, dailyGap: -455, shutdownDays: 14, totalBacklog: 6370, sellingPrice: 2899, revenueImpact: 18466630, recoveryTime: '10 days post-restart' },
    { productSku: 'LAPTOP-MBP14-M3', productName: 'MacBook Pro 14" M3', plannedDaily: 750, actualDaily: 225, dailyGap: -525, shutdownDays: 14, totalBacklog: 7350, sellingPrice: 2299, revenueImpact: 16897650, recoveryTime: '10 days post-restart' },
    { productSku: 'PHONE-IP14-256', productName: 'iPhone 14 256GB', plannedDaily: 1400, actualDaily: 420, dailyGap: -980, shutdownDays: 14, totalBacklog: 13720, sellingPrice: 899, revenueImpact: 12334280, recoveryTime: '10 days post-restart' },
    { productSku: 'TABLET-IPAD-PRO', productName: 'iPad Pro 12.9" M2', plannedDaily: 800, actualDaily: 0, dailyGap: -800, shutdownDays: 14, totalBacklog: 11200, sellingPrice: 1299, revenueImpact: 14548800, recoveryTime: '14 days post-restart' },
    { productSku: 'DESKTOP-MAC-STUDIO', productName: 'Mac Studio M2 Ultra', plannedDaily: 320, actualDaily: 0, dailyGap: -320, shutdownDays: 14, totalBacklog: 4480, sellingPrice: 3999, revenueImpact: 17915520, recoveryTime: '14 days post-restart' },
    { productSku: 'LAPTOP-DELL-XPS15', productName: 'Dell XPS 15 9530', plannedDaily: 950, actualDaily: 285, dailyGap: -665, shutdownDays: 14, totalBacklog: 9310, sellingPrice: 2199, revenueImpact: 20474690, recoveryTime: '10 days post-restart' },
    { productSku: 'LAPTOP-HP-SPECTRE', productName: 'HP Spectre x360 16"', plannedDaily: 680, actualDaily: 204, dailyGap: -476, shutdownDays: 14, totalBacklog: 6664, sellingPrice: 1899, revenueImpact: 12654936, recoveryTime: '10 days post-restart' },
    { productSku: 'DESKTOP-HP-OMEN', productName: 'HP Omen 45L Desktop', plannedDaily: 420, actualDaily: 126, dailyGap: -294, shutdownDays: 14, totalBacklog: 4116, sellingPrice: 2499, revenueImpact: 10285884, recoveryTime: '10 days post-restart' },
  ], []);

  const backlogData = useMemo(() => [
    { date: 'Nov 10, 2025', ordersReceived: 342, ordersFulfilled: 103, dailyBacklog: 239, cumulativeBacklog: 239, backlogValue: 2850000, fulfillmentRate: '30%', priorityOrders: 12, expediteRequests: 3 },
    { date: 'Nov 11, 2025', ordersReceived: 358, ordersFulfilled: 107, dailyBacklog: 251, cumulativeBacklog: 490, backlogValue: 5920000, fulfillmentRate: '30%', priorityOrders: 18, expediteRequests: 7 },
    { date: 'Nov 12, 2025', ordersReceived: 335, ordersFulfilled: 101, dailyBacklog: 234, cumulativeBacklog: 724, backlogValue: 8760000, fulfillmentRate: '30%', priorityOrders: 25, expediteRequests: 12 },
    { date: 'Nov 13, 2025', ordersReceived: 368, ordersFulfilled: 110, dailyBacklog: 258, cumulativeBacklog: 982, backlogValue: 11890000, fulfillmentRate: '30%', priorityOrders: 34, expediteRequests: 18 },
    { date: 'Nov 14, 2025', ordersReceived: 351, ordersFulfilled: 105, dailyBacklog: 246, cumulativeBacklog: 1228, backlogValue: 14880000, fulfillmentRate: '30%', priorityOrders: 42, expediteRequests: 24 },
    { date: 'Nov 15, 2025', ordersReceived: 340, ordersFulfilled: 102, dailyBacklog: 238, cumulativeBacklog: 1466, backlogValue: 17760000, fulfillmentRate: '30%', priorityOrders: 51, expediteRequests: 31 },
    { date: 'Nov 16, 2025', ordersReceived: 362, ordersFulfilled: 109, dailyBacklog: 253, cumulativeBacklog: 1719, backlogValue: 20820000, fulfillmentRate: '30%', priorityOrders: 58, expediteRequests: 38 },
    { date: 'Nov 17, 2025', ordersReceived: 348, ordersFulfilled: 104, dailyBacklog: 244, cumulativeBacklog: 1963, backlogValue: 23780000, fulfillmentRate: '30%', priorityOrders: 67, expediteRequests: 45 },
    { date: 'Nov 18, 2025', ordersReceived: 355, ordersFulfilled: 107, dailyBacklog: 248, cumulativeBacklog: 2211, backlogValue: 26790000, fulfillmentRate: '30%', priorityOrders: 75, expediteRequests: 52 },
    { date: 'Nov 19, 2025', ordersReceived: 365, ordersFulfilled: 110, dailyBacklog: 255, cumulativeBacklog: 2466, backlogValue: 29850000, fulfillmentRate: '30%', priorityOrders: 84, expediteRequests: 60 },
  ], []);

  const inventoryData = useMemo(() => [
    { dcLocation: 'Cupertino DC', sku: 'PHONE-IP15PRO-256', productName: 'iPhone 15 Pro 256GB', currentStock: 850, safetyStock: 1200, dailyDemand: 280, daysOfSupply: 3.0, stockoutDate: 'Nov 16, 2025', normalReplenishment: 'Daily (1,200)', delayedReplenishment: 'Nov 24 (1,200)', ordersPending: 68 },
    { dcLocation: 'Cupertino DC', sku: 'PHONE-IP15PRO-512', productName: 'iPhone 15 Pro 512GB', currentStock: 620, safetyStock: 900, dailyDemand: 220, daysOfSupply: 2.8, stockoutDate: 'Nov 15, 2025', normalReplenishment: 'Daily (900)', delayedReplenishment: 'Nov 24 (900)', ordersPending: 54 },
    { dcLocation: 'Cupertino DC', sku: 'LAPTOP-MBP16-M3', productName: 'MacBook Pro 16" M3 Pro', currentStock: 380, safetyStock: 650, dailyDemand: 160, daysOfSupply: 2.4, stockoutDate: 'Nov 14, 2025', normalReplenishment: 'Daily (650)', delayedReplenishment: 'Nov 24 (195)', ordersPending: 47 },
    { dcLocation: 'Cupertino DC', sku: 'LAPTOP-MBP14-M3', productName: 'MacBook Pro 14" M3', currentStock: 450, safetyStock: 750, dailyDemand: 185, daysOfSupply: 2.4, stockoutDate: 'Nov 14, 2025', normalReplenishment: 'Daily (750)', delayedReplenishment: 'Nov 24 (225)', ordersPending: 52 },
    { dcLocation: 'Cupertino DC', sku: 'PHONE-IP14-256', productName: 'iPhone 14 256GB', currentStock: 980, safetyStock: 1400, dailyDemand: 350, daysOfSupply: 2.8, stockoutDate: 'Nov 15, 2025', normalReplenishment: 'Daily (1,400)', delayedReplenishment: 'Nov 24 (420)', ordersPending: 89 },
    { dcLocation: 'Cupertino DC', sku: 'TABLET-IPAD-PRO', productName: 'iPad Pro 12.9" M2', currentStock: 520, safetyStock: 800, dailyDemand: 200, daysOfSupply: 2.6, stockoutDate: 'Nov 15, 2025', normalReplenishment: 'Daily (800)', delayedReplenishment: 'Nov 24 (0)', ordersPending: 41 },
    { dcLocation: 'Cupertino DC', sku: 'DESKTOP-MAC-STUDIO', productName: 'Mac Studio M2 Ultra', currentStock: 190, safetyStock: 320, dailyDemand: 85, daysOfSupply: 2.2, stockoutDate: 'Nov 13, 2025', normalReplenishment: 'Daily (320)', delayedReplenishment: 'Nov 24 (0)', ordersPending: 28 },
    { dcLocation: 'Dallas DC', sku: 'LAPTOP-DELL-XPS15', productName: 'Dell XPS 15 9530', currentStock: 620, safetyStock: 950, dailyDemand: 240, daysOfSupply: 2.6, stockoutDate: 'Nov 15, 2025', normalReplenishment: 'Daily (950)', delayedReplenishment: 'Nov 24 (285)', ordersPending: 58 },
    { dcLocation: 'Chicago DC', sku: 'LAPTOP-HP-SPECTRE', productName: 'HP Spectre x360 16"', currentStock: 425, safetyStock: 680, dailyDemand: 170, daysOfSupply: 2.5, stockoutDate: 'Nov 14, 2025', normalReplenishment: 'Daily (680)', delayedReplenishment: 'Nov 24 (204)', ordersPending: 38 },
    { dcLocation: 'Phoenix DC', sku: 'DESKTOP-HP-OMEN', productName: 'HP Omen 45L Desktop', currentStock: 280, safetyStock: 420, dailyDemand: 105, daysOfSupply: 2.7, stockoutDate: 'Nov 15, 2025', normalReplenishment: 'Daily (420)', delayedReplenishment: 'Nov 24 (126)', ordersPending: 29 },
  ], []);

  const customerOrdersData = useMemo(() => [
    { orderId: 'ORD-2025-30145', customer: 'Apple Store', productSku: 'PHONE-IP15PRO-256', productName: 'iPhone 15 Pro 256GB', quantity: 1200, orderValue: 1678800, orderDate: 'Nov 2, 2025', originalDelivery: 'Nov 16, 2025', newDelivery: 'Nov 30, 2025', delay: '+14 days', dc: 'Cupertino DC', status: 'At Risk' },
    { orderId: 'ORD-2025-30289', customer: 'Best Buy', productSku: 'PHONE-IP15PRO-512', productName: 'iPhone 15 Pro 512GB', quantity: 850, orderValue: 1359150, orderDate: 'Nov 3, 2025', originalDelivery: 'Nov 17, 2025', newDelivery: 'Dec 1, 2025', delay: '+14 days', dc: 'Cupertino DC', status: 'At Risk' },
    { orderId: 'ORD-2025-30456', customer: 'Verizon', productSku: 'PHONE-IP15PRO-256', productName: 'iPhone 15 Pro 256GB', quantity: 950, orderValue: 1329050, orderDate: 'Nov 4, 2025', originalDelivery: 'Nov 18, 2025', newDelivery: 'Dec 2, 2025', delay: '+14 days', dc: 'Cupertino DC', status: 'At Risk' },
    { orderId: 'ORD-2025-30123', customer: 'Apple Store', productSku: 'LAPTOP-MBP16-M3', productName: 'MacBook Pro 16" M3 Pro', quantity: 380, orderValue: 1101620, orderDate: 'Nov 1, 2025', originalDelivery: 'Nov 15, 2025', newDelivery: 'Nov 29, 2025', delay: '+14 days', dc: 'Cupertino DC', status: 'At Risk' },
    { orderId: 'ORD-2025-29987', customer: 'B&H Photo', productSku: 'LAPTOP-MBP14-M3', productName: 'MacBook Pro 14" M3', quantity: 420, orderValue: 965580, orderDate: 'Oct 30, 2025', originalDelivery: 'Nov 14, 2025', newDelivery: 'Nov 28, 2025', delay: '+14 days', dc: 'Cupertino DC', status: 'At Risk' },
    { orderId: 'ORD-2025-30334', customer: 'AT&T', productSku: 'PHONE-IP14-256', productName: 'iPhone 14 256GB', quantity: 1100, orderValue: 988900, orderDate: 'Nov 5, 2025', originalDelivery: 'Nov 19, 2025', newDelivery: 'Dec 3, 2025', delay: '+14 days', dc: 'Cupertino DC', status: 'At Risk' },
    { orderId: 'ORD-2025-30078', customer: 'Amazon', productSku: 'TABLET-IPAD-PRO', productName: 'iPad Pro 12.9" M2', quantity: 650, orderValue: 844350, orderDate: 'Nov 1, 2025', originalDelivery: 'Nov 15, 2025', newDelivery: 'Nov 29, 2025', delay: '+14 days', dc: 'Cupertino DC', status: 'At Risk' },
    { orderId: 'ORD-2025-30567', customer: 'Apple Store', productSku: 'DESKTOP-MAC-STUDIO', productName: 'Mac Studio M2 Ultra', quantity: 185, orderValue: 739815, orderDate: 'Nov 6, 2025', originalDelivery: 'Nov 20, 2025', newDelivery: 'Dec 4, 2025', delay: '+14 days', dc: 'Cupertino DC', status: 'At Risk' },
    { orderId: 'ORD-2025-30201', customer: 'Dell Direct', productSku: 'LAPTOP-DELL-XPS15', productName: 'Dell XPS 15 9530', quantity: 720, orderValue: 1583280, orderDate: 'Nov 2, 2025', originalDelivery: 'Nov 16, 2025', newDelivery: 'Nov 30, 2025', delay: '+14 days', dc: 'Dallas DC', status: 'At Risk' },
    { orderId: 'ORD-2025-30445', customer: 'Costco', productSku: 'LAPTOP-DELL-XPS15', productName: 'Dell XPS 15 9530', quantity: 580, orderValue: 1275420, orderDate: 'Nov 4, 2025', originalDelivery: 'Nov 18, 2025', newDelivery: 'Dec 2, 2025', delay: '+14 days', dc: 'Dallas DC', status: 'At Risk' },
  ], []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
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
                  <p className="text-base font-semibold text-gray-900">Manufacturing Plant Shutdown</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Plant Location</p>
                  <p className="text-base font-semibold text-gray-900">Austin, Texas</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="text-base font-semibold text-gray-900">Nov 10 - Nov 24, 2025</p>
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
              <h3 className="text-lg font-bold text-gray-900">Production Capacity Reduction - Line Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Normal Capacity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Available Capacity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity Loss</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shutdown Reason</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restart Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alternate Lines</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lineStatusData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.lineId}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.productSku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.productName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(row.normalCapacity)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <span className={row.availableCapacity === 0 ? 'text-red-600 font-medium' : 'text-yellow-600 font-medium'}>
                          {formatNumber(row.availableCapacity)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600 font-medium">{formatNumber(row.capacityLoss)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.shutdownReason}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.restartDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.alternateLines}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer(
                          `${row.lineId} - Production Line Impact`,
                          `This production line normally produces ${formatNumber(row.normalCapacity)} units daily of ${row.productName}. During the maintenance shutdown, capacity has been reduced to ${formatNumber(row.availableCapacity)} units/day (${row.availableCapacity === 0 ? 'complete shutdown' : 'partial operation'}), resulting in a daily capacity loss of ${formatNumber(Math.abs(row.capacityLoss))} units. ${row.alternateLines.includes('None') ? 'No alternate production lines are available for this product.' : `Alternate sourcing available: ${row.alternateLines}`}`
                        )} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={12} />
          </div>
        );

      case 3:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Production Output Gap - Daily Production Analysis</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Planned Daily</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Daily</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Gap</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Backlog</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Impact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovery Time</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productionGapData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.productSku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.productName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(row.plannedDaily)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <span className={row.actualDaily === 0 ? 'text-red-600 font-medium' : 'text-yellow-600 font-medium'}>
                          {formatNumber(row.actualDaily)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600 font-medium">{formatNumber(row.dailyGap)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{formatNumber(row.totalBacklog)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-red-600">{formatCurrency(row.revenueImpact)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.recoveryTime}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer(
                          `${row.productSku} - Production Gap Analysis`,
                          `${row.productName} has a planned daily output of ${formatNumber(row.plannedDaily)} units, but actual production is only ${formatNumber(row.actualDaily)} units/day during the shutdown. This creates a daily gap of ${formatNumber(Math.abs(row.dailyGap))} units. Over ${row.shutdownDays} days, the total backlog accumulates to ${formatNumber(row.totalBacklog)} units, representing ${formatCurrency(row.revenueImpact)} in revenue impact. After production resumes, it will take approximately ${row.recoveryTime} to clear this backlog.`
                        )} />
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
              <h3 className="text-lg font-bold text-gray-900">Order Backlog Accumulation - Work Queue Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Orders Received</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Orders Fulfilled</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Backlog</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cumulative Backlog</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Backlog Value</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fulfillment Rate</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Priority Orders</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {backlogData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(row.ordersReceived)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(row.ordersFulfilled)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600 font-medium">{formatNumber(row.dailyBacklog)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{formatNumber(row.cumulativeBacklog)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-red-600">{formatCurrency(row.backlogValue)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">
                          {row.fulfillmentRate}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{row.priorityOrders}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer(
                          `${row.date} - Order Backlog Analysis`,
                          `On ${row.date}, the facility received ${formatNumber(row.ordersReceived)} new orders but could only fulfill ${formatNumber(row.ordersFulfilled)} orders (${row.fulfillmentRate} fulfillment rate due to reduced capacity). This created a daily backlog of ${formatNumber(row.dailyBacklog)} orders. The cumulative backlog reached ${formatNumber(row.cumulativeBacklog)} orders worth ${formatCurrency(row.backlogValue)}, with ${row.priorityOrders} high-priority orders requiring expedited handling.`
                        )} />
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
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Days of Supply</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stockout Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delayed Replenishment</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Orders Pending</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventoryData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.dcLocation}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.sku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.productName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(row.currentStock)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-600">{formatNumber(row.safetyStock)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          row.daysOfSupply < 3 ? 'bg-red-100 text-red-800' : row.daysOfSupply < 4 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {row.daysOfSupply.toFixed(1)} days
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">{row.stockoutDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.delayedReplenishment}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{row.ordersPending}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer(
                          `${row.dcLocation} - ${row.sku} Inventory Risk`,
                          `${row.dcLocation} currently holds ${formatNumber(row.currentStock)} units of ${row.productName}, which is below the safety stock level of ${formatNumber(row.safetyStock)} units. With daily demand of ${formatNumber(row.dailyDemand)} units, this location has only ${row.daysOfSupply.toFixed(1)} days of supply remaining and will face stockout on ${row.stockoutDate}. Normal daily replenishment has been disrupted, with next delivery scheduled for ${row.delayedReplenishment}. There are ${row.ordersPending} customer orders pending fulfillment from this location.`
                        )} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={12} />
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Order Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Delivery</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Delivery</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delay</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerOrdersData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-orange-600">{row.orderId}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.customer}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.productName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(row.quantity)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatCurrency(row.orderValue)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.originalDelivery}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{row.newDelivery}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center text-red-600 font-medium">{row.delay}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer(
                          `${row.orderId} - Order Delay Analysis`,
                          `Customer ${row.customer} placed order ${row.orderId} on ${row.orderDate} for ${formatNumber(row.quantity)} units of ${row.productName}, valued at ${formatCurrency(row.orderValue)}. Due to the plant shutdown reducing production capacity, this order's delivery has been delayed from ${row.originalDelivery} to ${row.newDelivery} (${row.delay}). The order will be fulfilled from ${row.dc} once production resumes and inventory is replenished. Current status: ${row.status}.`
                        )} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={18} />
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
          <Link to="/" className="text-orange-600 hover:text-orange-800 text-sm font-medium mb-4 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Simulations
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">{scenarioData.name}</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Orders Impacted</div>
            <div className="text-3xl font-bold text-gray-900">{scenarioData.summary.ordersImpacted}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Revenue at Risk</div>
            <div className="text-3xl font-bold text-red-600">{formatCurrency(scenarioData.summary.revenueAtRisk)}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Production Lines Affected</div>
            <div className="text-3xl font-bold text-gray-900">{scenarioData.summary.productionLinesAffected} lines</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200 bg-red-50">
            <div className="text-sm font-medium text-red-600 mb-2">SKUs Impacted</div>
            <div className="text-3xl font-bold text-red-600">{scenarioData.summary.skusImpacted} SKUs</div>
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

export default PlantShutdownDetail;
