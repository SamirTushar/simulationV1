import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

const DemandDropDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedNode, setSelectedNode] = useState<number>(6);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [sideDrawerContent, setSideDrawerContent] = useState<{ title: string; content: string } | null>(null);

  // Demand Drop Scenario Data
  const scenarioData = useMemo(() => ({
    name: 'Demand Drop - Product Line Phase-Out',
    createdAt: '2025-11-08T00:00:00Z',
    variables: [
      { name: 'Product Group', value: 'Previous Gen Laptops (Intel 12th Gen)' },
      { name: 'Demand Change', value: '-65%' },
      { name: 'Duration', value: 'Nov 8, 2025 - Feb 28, 2026' },
      { name: 'Reason', value: 'New model launch (Intel 14th Gen)' },
    ],
    summary: {
      excessInventoryValue: 28450000,
      productionLinesToIdle: 11,
      supplierCommitmentsAtRisk: 14220000,
      workingCapitalImpact: 42670000,
    },
  }), []);

  // Event cascade data
  const cascadeEvents = useMemo(() => [
    {
      id: 1,
      title: 'Initial Disruption',
      description: 'Demand Drop for Previous Gen Laptops - New Model Launch Impact',
      severity: 'High' as const,
      affectedEntities: ['14 laptop SKUs (Intel 12th Gen platform)'],
      timeframe: 'Day 0',
    },
    {
      id: 2,
      title: 'Order Cancellations & Reductions',
      description: 'Retailers cancel/reduce orders, shift to new generation',
      severity: 'High' as const,
      affectedEntities: ['Best Buy', 'Amazon', 'Walmart', 'Costco', 'Target', 'B&H Photo', 'Newegg', '8 more retailers'],
      timeframe: 'Days 1-7',
    },
    {
      id: 3,
      title: 'Excess Inventory Accumulation',
      description: 'Production continues while demand drops, inventory builds rapidly',
      severity: 'Critical' as const,
      affectedEntities: ['Memphis DC', 'Dallas DC', 'Chicago DC', 'Los Angeles DC', 'Atlanta DC', 'Seattle DC', '6 more DCs'],
      timeframe: 'Days 5-15',
    },
    {
      id: 4,
      title: 'Production Overcapacity',
      description: 'Manufacturing lines underutilized, fixed costs spread over fewer units',
      severity: 'Critical' as const,
      affectedEntities: ['Plant-Mexico-02', 'Plant-Poland-01', 'Plant-Vietnam-03', 'Plant-India-04', 'Plant-Malaysia-01'],
      timeframe: 'Days 10-20',
    },
    {
      id: 5,
      title: 'Supplier Contract Exposure',
      description: 'Component commitments exceed new demand, penalties triggered',
      severity: 'Critical' as const,
      affectedEntities: ['Intel Corp', 'Samsung Display', 'Micron', 'Western Digital', 'Broadcom', '9 more suppliers'],
      timeframe: 'Days 15-30',
    },
    {
      id: 6,
      title: 'Financial Impact',
      description: 'Inventory write-downs, carrying costs, expedited clearance sales',
      severity: 'Critical' as const,
      affectedEntities: ['Working capital', 'Gross margins', 'Operating cash flow', 'P&L impact'],
      timeframe: 'Days 20-60',
    },
  ], []);

  // Table data for each event
  const orderCancellationsData = useMemo(() => [
    { customer: 'Best Buy', originalPo: 'PO-2025-BBY-8901', originalQty: 3200, revisedQty: 980, cancellation: -2220, reason: 'Inventory rebalance for new gen', poValueImpact: -2442000, cancellationDate: 'Nov 9, 2025', contractPenalty: 'Waived', negotiationStatus: 'Closed' },
    { customer: 'Amazon', originalPo: 'PO-2025-AMZ-7823', originalQty: 3850, revisedQty: 1270, cancellation: -2580, reason: 'Customer preference shift', poValueImpact: -3096000, cancellationDate: 'Nov 10, 2025', contractPenalty: '$45K', negotiationStatus: 'Negotiating' },
    { customer: 'Walmart', originalPo: 'PO-2025-WMT-6745', originalQty: 2650, revisedQty: 820, cancellation: -1830, reason: 'Markdown concerns', poValueImpact: -2013000, cancellationDate: 'Nov 11, 2025', contractPenalty: 'Waived', negotiationStatus: 'Closed' },
    { customer: 'Costco', originalPo: 'PO-2025-CST-5612', originalQty: 2100, revisedQty: 735, cancellation: -1365, reason: 'New model allocation priority', poValueImpact: -1501500, cancellationDate: 'Nov 9, 2025', contractPenalty: '$28K', negotiationStatus: 'Negotiating' },
    { customer: 'Target', originalPo: 'PO-2025-TGT-9834', originalQty: 1950, revisedQty: 605, cancellation: -1345, reason: 'Holiday assortment change', poValueImpact: -1479500, cancellationDate: 'Nov 12, 2025', contractPenalty: 'Waived', negotiationStatus: 'Closed' },
    { customer: 'B&H Photo', originalPo: 'PO-2025-BHP-4521', originalQty: 1420, revisedQty: 497, cancellation: -923, reason: 'Pro market wants latest gen', poValueImpact: -1015300, cancellationDate: 'Nov 10, 2025', contractPenalty: '$18K', negotiationStatus: 'Closed' },
    { customer: 'Newegg', originalPo: 'PO-2025-NEG-3389', originalQty: 1280, revisedQty: 384, cancellation: -896, reason: 'Customer reviews favor new gen', poValueImpact: -985600, cancellationDate: 'Nov 13, 2025', contractPenalty: '$15K', negotiationStatus: 'Negotiating' },
    { customer: 'Micro Center', originalPo: 'PO-2025-MCT-7156', originalQty: 1050, revisedQty: 368, cancellation: -682, reason: 'Tech enthusiast preference', poValueImpact: -750200, cancellationDate: 'Nov 11, 2025', contractPenalty: 'Waived', negotiationStatus: 'Closed' },
    { customer: 'Office Depot', originalPo: 'PO-2025-OFD-8923', originalQty: 1680, revisedQty: 504, cancellation: -1176, reason: 'Enterprise refresh delayed', poValueImpact: -1293600, cancellationDate: 'Nov 14, 2025', contractPenalty: '$22K', negotiationStatus: 'Negotiating' },
    { customer: 'Staples', originalPo: 'PO-2025-STP-6234', originalQty: 1520, revisedQty: 456, cancellation: -1064, reason: 'B2B customers waiting', poValueImpact: -1170400, cancellationDate: 'Nov 12, 2025', contractPenalty: 'Waived', negotiationStatus: 'Closed' },
  ], []);

  const excessInventoryData = useMemo(() => [
    { dcLocation: 'Memphis DC', sku: 'LAPTOP-HP-ELITE-G9-I7', productName: 'HP EliteBook 840 G9 i7', currentStock: 2850, optimalStock: 820, excessUnits: 2030, excessValue: 2233000, inventoryTurnsBefore: '12x', inventoryTurnsAfter: '3.2x', daysOfSupply: 105, carryingCost: 33495, writeDownRisk: '15-25%' },
    { dcLocation: 'Dallas DC', sku: 'LAPTOP-DELL-LAT-7430', productName: 'Dell Latitude 7430 i7', currentStock: 3200, optimalStock: 920, excessUnits: 2280, excessValue: 2508000, inventoryTurnsBefore: '11x', inventoryTurnsAfter: '2.9x', daysOfSupply: 112, carryingCost: 37620, writeDownRisk: '15-25%' },
    { dcLocation: 'Chicago DC', sku: 'LAPTOP-LENOVO-T14-G3', productName: 'Lenovo ThinkPad T14 G3', currentStock: 2680, optimalStock: 770, excessUnits: 1910, excessValue: 2101000, inventoryTurnsBefore: '10x', inventoryTurnsAfter: '2.7x', daysOfSupply: 119, carryingCost: 31515, writeDownRisk: '20-30%' },
    { dcLocation: 'Los Angeles DC', sku: 'LAPTOP-HP-PROBOOK-450', productName: 'HP ProBook 450 G9 i5', currentStock: 3420, optimalStock: 980, excessUnits: 2440, excessValue: 1952000, inventoryTurnsBefore: '13x', inventoryTurnsAfter: '3.5x', daysOfSupply: 98, carryingCost: 29280, writeDownRisk: '10-20%' },
    { dcLocation: 'Atlanta DC', sku: 'LAPTOP-DELL-INS-3520', productName: 'Dell Inspiron 3520 i7', currentStock: 2950, optimalStock: 845, excessUnits: 2105, excessValue: 1894500, inventoryTurnsBefore: '14x', inventoryTurnsAfter: '3.8x', daysOfSupply: 93, carryingCost: 28418, writeDownRisk: '10-20%' },
    { dcLocation: 'Seattle DC', sku: 'LAPTOP-LENOVO-YOGA-9I', productName: 'Lenovo Yoga 9i G8', currentStock: 1880, optimalStock: 538, excessUnits: 1342, excessValue: 1879800, inventoryTurnsBefore: '9x', inventoryTurnsAfter: '2.4x', daysOfSupply: 131, carryingCost: 28197, writeDownRisk: '25-35%' },
    { dcLocation: 'Boston DC', sku: 'LAPTOP-ASUS-ZENBOOK-14', productName: 'ASUS ZenBook 14 OLED', currentStock: 2120, optimalStock: 608, excessUnits: 1512, excessValue: 1813440, inventoryTurnsBefore: '11x', inventoryTurnsAfter: '2.9x', daysOfSupply: 115, carryingCost: 27202, writeDownRisk: '20-30%' },
    { dcLocation: 'Phoenix DC', sku: 'LAPTOP-ACER-SWIFT-3', productName: 'Acer Swift 3 SF314', currentStock: 2580, optimalStock: 740, excessUnits: 1840, excessValue: 1472000, inventoryTurnsBefore: '15x', inventoryTurnsAfter: '4.1x', daysOfSupply: 86, carryingCost: 22080, writeDownRisk: '10-15%' },
    { dcLocation: 'Denver DC', sku: 'LAPTOP-MSI-PRESTIGE-14', productName: 'MSI Prestige 14 Evo', currentStock: 1650, optimalStock: 473, excessUnits: 1177, excessValue: 1506960, inventoryTurnsBefore: '10x', inventoryTurnsAfter: '2.7x', daysOfSupply: 123, carryingCost: 22604, writeDownRisk: '25-30%' },
    { dcLocation: 'Miami DC', sku: 'LAPTOP-LG-GRAM-17', productName: 'LG Gram 17" i7', currentStock: 1420, optimalStock: 407, excessUnits: 1013, excessValue: 1367940, inventoryTurnsBefore: '9x', inventoryTurnsAfter: '2.4x', daysOfSupply: 138, carryingCost: 20519, writeDownRisk: '30-35%' },
  ], []);

  const productionOvercapacityData = useMemo(() => [
    { plant: 'Plant-Mexico-02', lineId: 'Line B1', productSku: 'LAPTOP-HP-ELITE-G9-I7', productName: 'HP EliteBook 840 G9 i7', capacity: 850, plannedProduction: 850, actualProduction: 298, utilization: '35%', idleCapacity: -552, fixedCost: 68000, variableCost: 186500, unitCostIncrease: '+85%', actionRequired: 'Retool or idle' },
    { plant: 'Plant-Mexico-02', lineId: 'Line B2', productSku: 'LAPTOP-DELL-LAT-7430', productName: 'Dell Latitude 7430 i7', capacity: 920, plannedProduction: 920, actualProduction: 322, utilization: '35%', idleCapacity: -598, fixedCost: 73600, variableCost: 223600, unitCostIncrease: '+85%', actionRequired: 'Retool or idle' },
    { plant: 'Plant-Poland-01', lineId: 'Line E6', productSku: 'LAPTOP-LENOVO-T14-G3', productName: 'Lenovo ThinkPad T14 G3', capacity: 770, plannedProduction: 770, actualProduction: 270, utilization: '35%', idleCapacity: -500, fixedCost: 61600, variableCost: 189000, unitCostIncrease: '+85%', actionRequired: 'Retool or idle' },
    { plant: 'Plant-Vietnam-03', lineId: 'Line C5', productSku: 'LAPTOP-HP-PROBOOK-450', productName: 'HP ProBook 450 G9 i5', capacity: 980, plannedProduction: 980, actualProduction: 343, utilization: '35%', idleCapacity: -637, fixedCost: 78400, variableCost: 171500, unitCostIncrease: '+85%', actionRequired: 'Convert to new gen' },
    { plant: 'Plant-India-04', lineId: 'Line D4', productSku: 'LAPTOP-DELL-INS-3520', productName: 'Dell Inspiron 3520 i7', capacity: 845, plannedProduction: 845, actualProduction: 296, utilization: '35%', idleCapacity: -549, fixedCost: 67600, variableCost: 148000, unitCostIncrease: '+85%', actionRequired: 'Convert to new gen' },
    { plant: 'Plant-Malaysia-01', lineId: 'Line F4', productSku: 'LAPTOP-LENOVO-YOGA-9I', productName: 'Lenovo Yoga 9i G8', capacity: 538, plannedProduction: 538, actualProduction: 188, utilization: '35%', idleCapacity: -350, fixedCost: 43040, variableCost: 141000, unitCostIncrease: '+85%', actionRequired: 'Retool or idle' },
    { plant: 'Plant-Poland-01', lineId: 'Line E7', productSku: 'LAPTOP-ASUS-ZENBOOK-14', productName: 'ASUS ZenBook 14 OLED', capacity: 608, plannedProduction: 608, actualProduction: 213, utilization: '35%', idleCapacity: -395, fixedCost: 48640, variableCost: 127800, unitCostIncrease: '+85%', actionRequired: 'Retool or idle' },
    { plant: 'Plant-Vietnam-03', lineId: 'Line C6', productSku: 'LAPTOP-ACER-SWIFT-3', productName: 'Acer Swift 3 SF314', capacity: 740, plannedProduction: 740, actualProduction: 259, utilization: '35%', idleCapacity: -481, fixedCost: 59200, variableCost: 103600, unitCostIncrease: '+85%', actionRequired: 'Convert to new gen' },
    { plant: 'Plant-Malaysia-01', lineId: 'Line F5', productSku: 'LAPTOP-MSI-PRESTIGE-14', productName: 'MSI Prestige 14 Evo', capacity: 473, plannedProduction: 473, actualProduction: 166, utilization: '35%', idleCapacity: -307, fixedCost: 37840, variableCost: 133440, unitCostIncrease: '+85%', actionRequired: 'Retool or idle' },
    { plant: 'Plant-India-04', lineId: 'Line D5', productSku: 'LAPTOP-LG-GRAM-17', productName: 'LG Gram 17" i7', capacity: 407, plannedProduction: 407, actualProduction: 142, utilization: '35%', idleCapacity: -265, fixedCost: 32560, variableCost: 121080, unitCostIncrease: '+85%', actionRequired: 'Idle pending' },
  ], []);

  const supplierContractData = useMemo(() => [
    { supplier: 'Intel Corp', component: 'Core i7-1255U CPU', contractType: 'Take-or-pay', committedQty: 28000, requiredQty: 9800, excessCommitment: -18200, contractValue: 3640000, penaltyRate: '25%', penaltyExposure: 910000, renegotiationStatus: 'In progress', alternateUse: 'New gen transition' },
    { supplier: 'Intel Corp', component: 'Core i5-1235U CPU', contractType: 'Take-or-pay', committedQty: 32000, requiredQty: 11200, excessCommitment: -20800, contractValue: 3328000, penaltyRate: '25%', penaltyExposure: 832000, renegotiationStatus: 'In progress', alternateUse: 'New gen transition' },
    { supplier: 'Samsung Display', component: '14" FHD Panel', contractType: 'Fixed commitment', committedQty: 24500, requiredQty: 8575, excessCommitment: -15925, contractValue: 2388750, penaltyRate: '15%', penaltyExposure: 358313, renegotiationStatus: 'Stalled', alternateUse: 'Limited options' },
    { supplier: 'BOE Display', component: '15.6" FHD Panel', contractType: 'Fixed commitment', committedQty: 31200, requiredQty: 10920, excessCommitment: -20280, contractValue: 2184000, penaltyRate: '15%', penaltyExposure: 327600, renegotiationStatus: 'Agreed to modify', alternateUse: 'None' },
    { supplier: 'Micron', component: 'DDR4 16GB Module', contractType: 'Take-or-pay', committedQty: 35000, requiredQty: 12250, excessCommitment: -22750, contractValue: 1592500, penaltyRate: '20%', penaltyExposure: 318500, renegotiationStatus: 'In progress', alternateUse: 'Resell possible' },
    { supplier: 'Samsung Memory', component: 'DDR4 8GB Module', contractType: 'Take-or-pay', committedQty: 42000, requiredQty: 14700, excessCommitment: -27300, contractValue: 1365000, penaltyRate: '20%', penaltyExposure: 273000, renegotiationStatus: 'Agreed to modify', alternateUse: 'New gen compatible' },
    { supplier: 'Western Digital', component: '512GB SSD', contractType: 'Volume commitment', committedQty: 38500, requiredQty: 13475, excessCommitment: -25025, contractValue: 1926250, penaltyRate: '10%', penaltyExposure: 192625, renegotiationStatus: 'Closed - modified', alternateUse: 'New gen compatible' },
    { supplier: 'SK Hynix', component: '256GB SSD', contractType: 'Volume commitment', committedQty: 29000, requiredQty: 10150, excessCommitment: -18850, contractValue: 1044000, penaltyRate: '10%', penaltyExposure: 104400, renegotiationStatus: 'In progress', alternateUse: 'Limited use' },
    { supplier: 'Chicony', component: 'HD Webcam Module', contractType: 'Fixed commitment', committedQty: 33600, requiredQty: 11760, excessCommitment: -21840, contractValue: 504000, penaltyRate: '12%', penaltyExposure: 60480, renegotiationStatus: 'Agreed to modify', alternateUse: 'New gen compatible' },
    { supplier: 'Sunon', component: 'Cooling Fan Assembly', contractType: 'Fixed commitment', committedQty: 35400, requiredQty: 12390, excessCommitment: -23010, contractValue: 354000, penaltyRate: '12%', penaltyExposure: 42480, renegotiationStatus: 'Closed - modified', alternateUse: 'Cross-model use' },
  ], []);

  const financialImpactData = useMemo(() => [
    { impactCategory: 'Revenue', lineItem: 'Product Sales', baseline: 42600000, scenarioImpact: 14910000, variance: -27690000, cumulative: -110760000, mitigationActions: 'Clearance sales, bundling', recoveryTimeline: '6-9 months' },
    { impactCategory: 'Cost of Goods', lineItem: 'Direct Materials', baseline: 25560000, scenarioImpact: 8946000, variance: -16614000, cumulative: -66456000, mitigationActions: 'Supplier renegotiation', recoveryTimeline: 'Immediate' },
    { impactCategory: 'Cost of Goods', lineItem: 'Direct Labor', baseline: 6390000, scenarioImpact: 5751000, variance: -639000, cumulative: -2556000, mitigationActions: 'Workforce redeployment', recoveryTimeline: '2-3 months' },
    { impactCategory: 'Cost of Goods', lineItem: 'Manufacturing Overhead', baseline: 8520000, scenarioImpact: 8094000, variance: -426000, cumulative: -1704000, mitigationActions: 'Line conversion', recoveryTimeline: '3-4 months' },
    { impactCategory: 'Gross Margin', lineItem: 'Gross Profit', baseline: 2130000, scenarioImpact: -7881000, variance: -10011000, cumulative: -40044000, mitigationActions: 'Price protection, markdown', recoveryTimeline: '6-9 months' },
    { impactCategory: 'Operating Expense', lineItem: 'Supplier Penalties', baseline: 0, scenarioImpact: 765000, variance: 765000, cumulative: 3060000, mitigationActions: 'Negotiate settlements', recoveryTimeline: '2-4 months' },
    { impactCategory: 'Operating Expense', lineItem: 'Inventory Carrying Cost', baseline: 340000, scenarioImpact: 1580000, variance: 1240000, cumulative: 4960000, mitigationActions: 'Accelerate clearance', recoveryTimeline: '4-6 months' },
    { impactCategory: 'Operating Expense', lineItem: 'Markdown/Write-down', baseline: 280000, scenarioImpact: 3420000, variance: 3140000, cumulative: 12560000, mitigationActions: 'Strategic pricing', recoveryTimeline: '3-5 months' },
    { impactCategory: 'Working Capital', lineItem: 'Inventory (Balance Sheet)', baseline: 38200000, scenarioImpact: 66650000, variance: 28450000, cumulative: 0, mitigationActions: 'Sell-through programs', recoveryTimeline: '6-9 months' },
    { impactCategory: 'Working Capital', lineItem: 'Accounts Payable', baseline: 18400000, scenarioImpact: 24620000, variance: 6220000, cumulative: 0, mitigationActions: 'Payment term extension', recoveryTimeline: '3-4 months' },
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
                  <p className="text-base font-semibold text-gray-900">Demand Drop</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Product Group</p>
                  <p className="text-base font-semibold text-gray-900">Previous Gen Laptops (Intel 12th Gen)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Demand Change</p>
                  <p className="text-base font-semibold text-red-600">-65%</p>
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
              <h3 className="text-lg font-bold text-gray-900">Order Cancellations & Reductions - Customer Order Changes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original PO</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Original Qty</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revised Qty</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cancellation</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">PO Value Impact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Penalty</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderCancellationsData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.customer}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.originalPo}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(item.originalQty)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(item.revisedQty)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600 font-medium">{formatNumber(item.cancellation)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.reason}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-red-600">{formatCurrency(item.poValueImpact)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.contractPenalty}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          item.negotiationStatus === 'Closed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.negotiationStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer(
                          `${item.customer} - Order Cancellation`,
                          `${item.customer} reduced their purchase order ${item.originalPo} from ${formatNumber(item.originalQty)} units to ${formatNumber(item.revisedQty)} units, cancelling ${formatNumber(Math.abs(item.cancellation))} units. Reason: ${item.reason}. This resulted in a ${formatCurrency(Math.abs(item.poValueImpact))} revenue impact. Contract penalty: ${item.contractPenalty}. Negotiation status: ${item.negotiationStatus}.`
                        )} />
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
              <h3 className="text-lg font-bold text-gray-900">Excess Inventory Accumulation - Distribution Center Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DC Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Optimal Stock</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Excess Units</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Excess Value</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory Turns</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Days of Supply</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Write-Down Risk</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {excessInventoryData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.dcLocation}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.sku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.productName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(item.currentStock)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-600">{formatNumber(item.optimalStock)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600 font-medium">{formatNumber(item.excessUnits)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-red-600">{formatCurrency(item.excessValue)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                        <span className="text-gray-600">{item.inventoryTurnsBefore}</span>
                        <span className="text-gray-400 mx-1">→</span>
                        <span className="text-red-600 font-medium">{item.inventoryTurnsAfter}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          item.daysOfSupply > 120 ? 'bg-red-100 text-red-800' : item.daysOfSupply > 100 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.daysOfSupply} days
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">{item.writeDownRisk}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer(
                          `${item.dcLocation} - Excess Inventory`,
                          `${item.dcLocation} holds ${formatNumber(item.currentStock)} units of ${item.productName}, but optimal stock for the new demand level is only ${formatNumber(item.optimalStock)} units. This creates excess inventory of ${formatNumber(item.excessUnits)} units valued at ${formatCurrency(item.excessValue)}. Inventory turns have dropped from ${item.inventoryTurnsBefore} to ${item.inventoryTurnsAfter}, with current days of supply at ${item.daysOfSupply} days. Write-down risk: ${item.writeDownRisk}. Monthly carrying cost: ${formatCurrency(item.carryingCost)}.`
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
              <h3 className="text-lg font-bold text-gray-900">Production Overcapacity - Manufacturing Line Utilization</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Production</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Idle Capacity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Fixed Cost (Daily)</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost Increase</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Required</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productionOvercapacityData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.plant}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.lineId}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.productName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(item.capacity)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(item.actualProduction)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">
                          {item.utilization}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600 font-medium">{formatNumber(item.idleCapacity)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatCurrency(item.fixedCost)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">
                          {item.unitCostIncrease}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.actionRequired}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer(
                          `${item.lineId} - Overcapacity Impact`,
                          `${item.lineId} at ${item.plant} has a daily capacity of ${formatNumber(item.capacity)} units but is only producing ${formatNumber(item.actualProduction)} units (${item.utilization} utilization), resulting in ${formatNumber(Math.abs(item.idleCapacity))} units of idle capacity. With fixed costs of ${formatCurrency(item.fixedCost)}/day spread over fewer units, unit costs have increased by ${item.unitCostIncrease}. Action required: ${item.actionRequired}.`
                        )} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={11} />
          </div>
        );

      case 5:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Supplier Contract Exposure - Component Commitment Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Type</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Committed Qty</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Required Qty</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Excess</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Value</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Penalty Exposure</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renegotiation</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alternate Use</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {supplierContractData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.supplier}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.component}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.contractType}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(item.committedQty)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatNumber(item.requiredQty)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600 font-medium">{formatNumber(item.excessCommitment)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatCurrency(item.contractValue)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-red-600">{formatCurrency(item.penaltyExposure)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          item.renegotiationStatus.includes('Closed') || item.renegotiationStatus.includes('Agreed') ? 'bg-green-100 text-green-800' :
                          item.renegotiationStatus.includes('Stalled') ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.renegotiationStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.alternateUse}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer(
                          `${item.supplier} - Contract Exposure`,
                          `Contract with ${item.supplier} for ${item.component} (${item.contractType}): committed to ${formatNumber(item.committedQty)} units but only need ${formatNumber(item.requiredQty)} units based on new demand, creating excess of ${formatNumber(Math.abs(item.excessCommitment))} units. Contract value: ${formatCurrency(item.contractValue)}. Penalty exposure (${item.penaltyRate}): ${formatCurrency(item.penaltyExposure)}. Renegotiation status: ${item.renegotiationStatus}. Alternate use: ${item.alternateUse}.`
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

      case 6:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Financial Impact - P&L and Balance Sheet Effect</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line Item</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Baseline (Monthly)</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Scenario Impact</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cumulative (4 Mo)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mitigation Actions</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovery Timeline</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {financialImpactData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.impactCategory}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.lineItem}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatCurrency(item.baseline)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{formatCurrency(item.scenarioImpact)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <span className={item.variance < 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                          {formatCurrency(item.variance)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <span className={item.cumulative < 0 ? 'text-red-600 font-semibold' : item.cumulative > 0 ? 'text-green-600 font-semibold' : 'text-gray-600'}>
                          {item.cumulative === 0 ? 'N/A' : formatCurrency(item.cumulative)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.mitigationActions}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.recoveryTimeline}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer(
                          `${item.impactCategory} - ${item.lineItem}`,
                          `${item.lineItem} baseline: ${formatCurrency(item.baseline)}/month. Under the demand drop scenario, this changes to ${formatCurrency(item.scenarioImpact)}/month, creating a variance of ${formatCurrency(item.variance)} ${item.variance < 0 ? '(decrease)' : '(increase)'}. ${item.cumulative !== 0 ? `Cumulative 4-month impact: ${formatCurrency(item.cumulative)}.` : ''} Mitigation: ${item.mitigationActions}. Expected recovery: ${item.recoveryTimeline}.`
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
            Back to Scenario List
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">{scenarioData.name}</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Excess Inventory Value</div>
            <div className="text-3xl font-bold text-red-600">{formatCurrency(scenarioData.summary.excessInventoryValue)}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Production Lines to Idle</div>
            <div className="text-3xl font-bold text-gray-900">{scenarioData.summary.productionLinesToIdle} lines</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Supplier Commitments at Risk</div>
            <div className="text-3xl font-bold text-gray-900">{formatCurrency(scenarioData.summary.supplierCommitmentsAtRisk)}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200 bg-red-50">
            <div className="text-sm font-medium text-red-600 mb-2">Working Capital Impact</div>
            <div className="text-3xl font-bold text-red-600">{formatCurrency(scenarioData.summary.workingCapitalImpact)}</div>
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

export default DemandDropDetail;
