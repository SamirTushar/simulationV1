import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pharmaData from '../data/pharma-simulation.json';

interface ExpandedRow {
  [key: string]: boolean;
}

type PageTab = 'impact' | 'recommendations';
type TableTab = 'skus' | 'warehouses' | 'orders';

const PharmaceuticalDetail: React.FC = () => {
  const [pageTab, setPageTab] = useState<PageTab>('impact');
  const [tableTab, setTableTab] = useState<TableTab>('skus');
  const [expandedRows, setExpandedRows] = useState<ExpandedRow>({});
  const [showAllRows, setShowAllRows] = useState(false);
  const [showMitigationModal, setShowMitigationModal] = useState(false);
  const [expandedActions, setExpandedActions] = useState<ExpandedRow>({});

  const toggleRow = (rowId: string) => {
    setExpandedRows(prev => ({ ...prev, [rowId]: !prev[rowId] }));
  };

  const toggleAction = (actionId: string) => {
    setExpandedActions(prev => ({ ...prev, [actionId]: !prev[actionId] }));
  };

  const data = pharmaData as any;

  // Mock affected orders data
  const affectedOrders = [
    {
      orderId: 'ORD-2025-10847',
      storeId: 'ST-1043',
      storeName: 'MedCare Hospital Pharmacy',
      location: 'Los Angeles, CA',
      skuId: 'SKU-001',
      productName: 'Amoxicillin 500mg',
      quantity: 2500,
      orderValue: 6250,
      originalDate: '2025-10-15',
      newDate: '2025-11-05',
      delayDays: 21,
      status: 'Critical',
      explainability: 'Order delayed due to warehouse WH-West stockout on Day 34. Patient impact: 83 prescriptions affected.'
    },
    {
      orderId: 'ORD-2025-10923',
      storeId: 'ST-0892',
      storeName: 'CVS Pharmacy #5421',
      location: 'San Francisco, CA',
      skuId: 'SKU-002',
      productName: 'Ibuprofen 200mg',
      quantity: 5000,
      orderValue: 10000,
      originalDate: '2025-10-18',
      newDate: '2025-11-08',
      delayDays: 21,
      status: 'Critical',
      explainability: 'Partial fulfillment possible (60% from alternative supplier). Remaining 40% delayed until supplier recovery.'
    },
    {
      orderId: 'ORD-2025-11034',
      storeId: 'ST-1256',
      storeName: 'Community Health Pharmacy',
      location: 'Newark, NJ',
      skuId: 'SKU-003',
      productName: 'Metformin 1000mg',
      quantity: 1800,
      orderValue: 5760,
      originalDate: '2025-10-20',
      newDate: '2025-11-10',
      delayDays: 21,
      status: 'Critical',
      explainability: 'Critical diabetes medication. No alternative source. Hospital required to report shortage to FDA.'
    }
  ];

  // Mock detailed order data for Action 1 (Emergency Sourcing)
  const action1Orders = [
    {
      orderId: 'ORD-2847',
      customerName: 'MedCare Hospital Pharmacy',
      location: 'Los Angeles, CA',
      customerType: 'Hospital',
      priority: 'CRITICAL',
      dueDate: 'Oct 28 (Day 43)',
      sku001Quantity: 500,
      sku001Cost: 1600,
      sku003Quantity: 300,
      sku003Cost: 1230,
      totalCost: 2830,
      normalCost: 2210,
      premium: 620,
      deliveryDay: 50,
      daysLate: 7,
      status: 'Will be fulfilled',
      reason: 'Hospital customer (highest priority tier), Critical SKUs (antibiotics), High patient impact (500+ prescriptions/month)'
    },
    {
      orderId: 'ORD-2891',
      customerName: 'University Hospital Pharmacy',
      location: 'Atlanta, GA',
      customerType: 'Hospital',
      priority: 'CRITICAL',
      dueDate: 'Oct 30 (Day 45)',
      sku001Quantity: 800,
      sku001Cost: 2560,
      totalCost: 2560,
      normalCost: 2000,
      premium: 560,
      deliveryDay: 50,
      daysLate: 5,
      status: 'Will be fulfilled'
    },
    {
      orderId: 'ORD-2923',
      customerName: 'CVS Pharmacy #5421',
      location: 'San Francisco, CA',
      customerType: 'Chain',
      priority: 'HIGH',
      dueDate: 'Nov 1 (Day 47)',
      sku001Quantity: 1200,
      sku001Cost: 3840,
      sku003Quantity: 600,
      sku003Cost: 2460,
      totalCost: 6300,
      normalCost: 4920,
      premium: 1380,
      deliveryDay: 50,
      daysLate: 3,
      status: 'Will be fulfilled'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="text-sm text-blue-600 hover:text-blue-800 mb-2 inline-block">
            ← Back to Simulations
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
              <p className="text-sm text-gray-600 mt-1">
                Status: <span className="text-orange-600 font-medium">⚠️ Critical Impact Detected</span> |
                Created: {new Date(data.createdAt).toLocaleDateString()} |
                Duration: 21 days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Page-Level Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setPageTab('impact')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                pageTab === 'impact'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Impact Analysis
            </button>
            <button
              onClick={() => setPageTab('recommendations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                pageTab === 'recommendations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recommendations
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {pageTab === 'impact' && (
          <>
            {/* Impact Summary */}
            <div className="bg-white rounded-lg shadow-lg border-2 border-orange-300 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Impact Summary: Vietnamese Supplier Shutdown</h2>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Orders at Risk</div>
                  <div className="text-2xl font-bold text-gray-900">1,247 orders</div>
                  <div className="text-xs text-gray-500">Critical: 342 | Standard: 905</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Revenue at Risk</div>
                  <div className="text-2xl font-bold text-gray-900">$2,020,000</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Stockout Period</div>
                  <div className="text-2xl font-bold text-gray-900">Days 44-66</div>
                  <div className="text-xs text-gray-500">21.4 days duration</div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-blue-900">Ready to explore mitigation options?</div>
                    <div className="text-xs text-blue-700 mt-1">Configure alternative suppliers, transfers, and prioritization rules</div>
                  </div>
                  <button
                    onClick={() => setShowMitigationModal(true)}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
                  >
                    Create Mitigation Scenario
                  </button>
                </div>
              </div>
            </div>

            {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">💰 Revenue at Risk</div>
            <div className="text-2xl font-bold text-gray-900">
              ${(data.summary.totalRevenue / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Lost sales: ${(data.summary.lostSales / 1000000).toFixed(2)}M
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">📦 SKUs Affected</div>
            <div className="text-2xl font-bold text-gray-900">
              {data.summary.skusAffected} of {data.summary.totalSkus}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round((data.summary.skusAffected / data.summary.totalSkus) * 100)}% of portfolio
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">🏪 Stores Impacted</div>
            <div className="text-2xl font-bold text-gray-900">
              {data.summary.storesAffected} of {data.summary.totalStores}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round((data.summary.storesAffected / data.summary.totalStores) * 100)}% affected
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">⏱️ Peak Stockout</div>
            <div className="text-2xl font-bold text-gray-900">
              {data.summary.peakStockoutDuration} days
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {data.summary.patientsImpacted.toLocaleString()} patients affected
            </div>
          </div>
        </div>

        {/* Impact Timeline */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Impact Timeline</h2>
          <div className="relative">
            <div className="overflow-x-auto pb-4">
              <div className="flex items-center space-x-4 min-w-max">
                {data.timeline.map((event: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        event.phase === 'disruption' ? 'bg-red-500' :
                        event.phase === 'critical' ? 'bg-orange-500' :
                        event.phase === 'recovery' ? 'bg-yellow-500' :
                        event.phase === 'normal' ? 'bg-green-500' :
                        'bg-gray-400'
                      }`} />
                      <div className="mt-2 text-center" style={{ width: '150px' }}>
                        <div className="text-xs font-semibold text-gray-700">Day {event.day}</div>
                        <div className="text-xs text-gray-600">{event.date}</div>
                        <div className="text-xs text-gray-900 mt-1">{event.event}</div>
                      </div>
                    </div>
                    {index < data.timeline.length - 1 && (
                      <div className={`h-0.5 w-16 ${
                        event.phase === 'critical' ? 'bg-red-300' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
            <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>Disruption</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>Assessment</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>Critical</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>Recovery</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>Normal</div>
          </div>
        </div>

        {/* Consolidated Table with Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          {/* Table-Level Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex px-6">
              <button
                onClick={() => { setTableTab('skus'); setShowAllRows(false); }}
                className={`py-4 px-4 border-b-2 font-medium text-sm ${
                  tableTab === 'skus'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Affected SKUs
              </button>
              <button
                onClick={() => { setTableTab('warehouses'); setShowAllRows(false); }}
                className={`py-4 px-4 border-b-2 font-medium text-sm ${
                  tableTab === 'warehouses'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Warehouses
              </button>
              <button
                onClick={() => { setTableTab('orders'); setShowAllRows(false); }}
                className={`py-4 px-4 border-b-2 font-medium text-sm ${
                  tableTab === 'orders'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Affected Orders
              </button>
            </nav>
          </div>

          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {tableTab === 'skus' && 'Top Affected Products'}
                {tableTab === 'warehouses' && 'Warehouse Impact'}
                {tableTab === 'orders' && 'Affected Orders'}
              </h2>
              <button
                onClick={() => setShowAllRows(!showAllRows)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showAllRows ? 'Show Top 3' : `View all ${tableTab} →`}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {tableTab === 'skus' && (
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dependency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stockout Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Impact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                )}
                {tableTab === 'warehouses' && (
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stores Served</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stockout Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Exposure</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                )}
                {tableTab === 'orders' && (
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delay</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                )}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableTab === 'skus' && (showAllRows ? data.affectedSKUs : data.affectedSKUs.slice(0, 3)).map((sku: any) => (
                  <React.Fragment key={sku.skuId}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{sku.productName}</div>
                          <div className="text-sm text-gray-500">{sku.category} | {sku.skuId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          sku.supplierDependency === 100 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {sku.dependencyLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sku.currentStock.toLocaleString()} units
                        <div className="text-xs text-gray-500">{sku.daysOfSupply} days supply</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Day {sku.stockoutDay.toFixed(1)}</div>
                        <div className="text-xs text-gray-500">{sku.stockoutDuration.toFixed(1)} days</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${sku.revenueImpact.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => toggleRow(sku.skuId)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {expandedRows[sku.skuId] ? '▲ Hide' : '▼ Explain'}
                        </button>
                      </td>
                    </tr>
                    {expandedRows[sku.skuId] && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-blue-50">
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900 mb-2">📊 Explainability</div>

                            <div className="mb-3">
                              <div className="font-medium text-gray-700 mb-1">Calculation:</div>
                              <pre className="text-xs text-gray-600 bg-white p-2 rounded whitespace-pre-wrap font-mono">
{sku.explainability.calculation}
                              </pre>
                            </div>

                            <div className="mb-3">
                              <div className="font-medium text-gray-700 mb-1">Why this matters:</div>
                              <p className="text-xs text-gray-600">{sku.explainability.whyMatters}</p>
                            </div>

                            <div>
                              <div className="font-medium text-gray-700 mb-1">Data source:</div>
                              <p className="text-xs text-gray-600">{sku.explainability.dataSource}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}

                {tableTab === 'warehouses' && (showAllRows ? data.warehouseImpact : data.warehouseImpact.slice(0, 2)).map((warehouse: any) => (
                  <React.Fragment key={warehouse.warehouseId}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{warehouse.warehouseId}</div>
                          <div className="text-sm text-gray-500">{warehouse.location}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          🔴 High Risk
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {warehouse.storesServed} stores
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{warehouse.stockoutDate}</div>
                        <div className="text-xs text-gray-500">Day {warehouse.daysUntilStockout.toFixed(1)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${warehouse.revenueExposure.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => toggleRow(warehouse.warehouseId)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {expandedRows[warehouse.warehouseId] ? '▲ Hide' : '▼ Explain'}
                        </button>
                      </td>
                    </tr>
                    {expandedRows[warehouse.warehouseId] && warehouse.explainability && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-blue-50">
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900 mb-2">📊 Explainability</div>

                            <div className="mb-3">
                              <div className="font-medium text-gray-700 mb-1">Why highest risk:</div>
                              <pre className="text-xs text-gray-600 bg-white p-2 rounded whitespace-pre-wrap">
{warehouse.explainability.whyHighestRisk}
                              </pre>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div>
                                <div className="font-medium text-gray-700">Hospital pharmacies</div>
                                <div className="text-gray-600">{warehouse.affectedStores.hospital} affected</div>
                              </div>
                              <div>
                                <div className="font-medium text-gray-700">Chain pharmacies</div>
                                <div className="text-gray-600">{warehouse.affectedStores.chain} affected</div>
                              </div>
                              <div>
                                <div className="font-medium text-gray-700">Independent</div>
                                <div className="text-gray-600">{warehouse.affectedStores.independent} affected</div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}

                {tableTab === 'orders' && (showAllRows ? affectedOrders : affectedOrders.slice(0, 3)).map((order: any) => (
                  <React.Fragment key={order.orderId}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                        <div className="text-xs text-gray-500">{order.storeId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.storeName}</div>
                          <div className="text-sm text-gray-500">{order.location}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.productName}</div>
                        <div className="text-xs text-gray-500">{order.skuId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.quantity.toLocaleString()} units
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.delayDays} days</div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.orderValue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => toggleRow(order.orderId)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {expandedRows[order.orderId] ? '▲ Hide' : '▼ Explain'}
                        </button>
                      </td>
                    </tr>
                    {expandedRows[order.orderId] && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 bg-blue-50">
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900 mb-2">📊 Explainability</div>
                            <p className="text-xs text-gray-600">{order.explainability}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}

        {pageTab === 'recommendations' && (
          <>
            {/* Optimization Results Summary */}
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Optimization Results</h2>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded">
                  <div className="text-sm text-gray-600">Orders Fulfilled</div>
                  <div className="text-2xl font-bold text-green-700">1,089 / 1,247</div>
                  <div className="text-xs text-gray-500">87.3%</div>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <div className="text-sm text-gray-600">Revenue Saved</div>
                  <div className="text-2xl font-bold text-green-700">$1,758,000</div>
                  <div className="text-xs text-gray-500">87% of at-risk revenue</div>
                </div>
                <div className="bg-orange-50 p-4 rounded">
                  <div className="text-sm text-gray-600">Mitigation Cost</div>
                  <div className="text-2xl font-bold text-orange-700">$287,000</div>
                </div>
                <div className="bg-blue-50 p-4 rounded">
                  <div className="text-sm text-gray-600">Net Benefit</div>
                  <div className="text-2xl font-bold text-blue-700">$1,471,000</div>
                  <div className="text-xs text-gray-500">ROI: 5.1x</div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-semibold text-red-900">Orders Unable to Fulfill: 158 (12.7%)</div>
                    <div className="text-xs text-red-700 mt-1">Revenue lost: $262,000 | Reason: Insufficient supply despite all actions</div>
                  </div>
                  <button className="text-xs text-red-700 underline hover:text-red-900">View Details →</button>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recommended Actions</h2>

            <div className="space-y-6">
              {/* Action 1: Emergency Sourcing */}
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">ACTION 1</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">Emergency Sourcing from PharmaCorp India</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">Cost: $95,200</div>
                    <div className="text-xs text-gray-600">Start Date: Day 20 | Delivery: Day 50</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  • SKU-001 (Amoxicillin): 18,500 units<br/>
                  • SKU-003 (Metformin): 12,000 units<br/>
                  • Cost: $95,200 (vs $70,300 normal) = +$24,900 premium<br/>
                  • Orders fulfilled: 412 orders
                </p>
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <div className="text-sm font-medium text-gray-900 mb-1">Impact:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Revenue saved: $687,000</li>
                    <li>• ROI: 7.2x</li>
                    <li>• 187 hospital orders + 142 chain orders + 83 standard orders</li>
                  </ul>
                </div>
                <button
                  onClick={() => toggleAction('action1')}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  {expandedActions['action1'] ? '▲ Hide Order Breakdown' : '▼ View Order Breakdown (412 orders) →'}
                </button>

                {expandedActions['action1'] && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                    <h4 className="font-semibold text-gray-900 mb-3">Order-Level Breakdown</h4>
                    <div className="text-xs text-gray-700 mb-3">
                      <strong>Why this action?</strong><br/>
                      Primary supplier down for 21 days. 412 orders scheduled for fulfillment Days 50-66 would miss delivery dates without action. PharmaCorp India can supply 30,500 units starting Day 20 with 30-day lead time, matching stockout period timing.
                    </div>

                    <div className="space-y-3">
                      {action1Orders.map((order) => (
                        <div key={order.orderId} className="bg-white p-3 rounded border border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-semibold text-gray-900">Order #{order.orderId} | {order.priority}</div>
                              <div className="text-xs text-gray-600">{order.customerName} ({order.location})</div>
                              <div className="text-xs text-gray-500">Due: {order.dueDate}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-gray-900">${order.totalCost.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">Normal: ${order.normalCost.toLocaleString()}</div>
                            </div>
                          </div>

                          <div className="text-xs space-y-1 mb-2">
                            {order.sku001Quantity && (
                              <div className="flex justify-between">
                                <span>SKU-001 (Amoxicillin): {order.sku001Quantity} units</span>
                                <span>${order.sku001Cost.toLocaleString()} (+${Math.round(order.sku001Quantity * 0.70)})</span>
                              </div>
                            )}
                            {order.sku003Quantity && (
                              <div className="flex justify-between">
                                <span>SKU-003 (Metformin): {order.sku003Quantity} units</span>
                                <span>${order.sku003Cost.toLocaleString()} (+${Math.round(order.sku003Quantity * 0.90)})</span>
                              </div>
                            )}
                          </div>

                          <div className="text-xs bg-green-50 p-2 rounded">
                            <strong>✓ {order.status}</strong> (Delivery: Day {order.deliveryDay} - {order.daysLate} days late)
                          </div>

                          {order.reason && (
                            <div className="text-xs text-gray-600 mt-2">
                              <strong>Why prioritized:</strong> {order.reason}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 text-xs text-gray-600 p-3 bg-white rounded">
                      <strong>Showing 3 of 412 orders</strong> | Orders allocated by priority: Hospital (187) → Chain (142) → Standard (83)
                    </div>
                  </div>
                )}
              </div>

              {/* Action 2: Warehouse Transfer */}
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">ACTION 2</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">Warehouse Transfer (WH-South → WH-West)</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">Cost: $1,785</div>
                    <div className="text-xs text-gray-600">Transfer: Day 18 | Arrival: Day 21</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  • SKU-001: 2,100 units from Atlanta to Los Angeles<br/>
                  • Cost: $1,785 transfer fee<br/>
                  • Orders fulfilled: 68 orders (extends LA coverage 6 days)
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm font-medium text-gray-900 mb-1">Impact:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Extends WH-West inventory from Day 34 to Day 40</li>
                    <li>• Maintains service to 15 hospital accounts</li>
                  </ul>
                </div>
              </div>

              {/* Action 3: Expedited Air Freight */}
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">ACTION 3</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">Expedited Air Freight from GenericMeds Thailand</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">Cost: $56,000</div>
                    <div className="text-xs text-gray-600">Ship: Day 15 | Arrival: Day 27 (18 days earlier)</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  • SKU-001: 8,000 units via air freight<br/>
                  • Cost: $56,000 (vs $20,000 sea) = +$36,000 premium<br/>
                  • Orders fulfilled: 187 high-priority hospital orders
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm font-medium text-gray-900 mb-1">Impact:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Arrives 18 days earlier than sea freight</li>
                    <li>• Protects critical hospital accounts</li>
                  </ul>
                </div>
              </div>

              {/* Action 4: Order Resequencing */}
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">ACTION 4</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">Order Resequencing (Prioritization)</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">Cost: $0</div>
                    <div className="text-xs text-gray-600">Just reordering fulfillment</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  • Prioritize: 342 hospital/high-value critical orders<br/>
                  • Delay: 128 standard orders to Days 50-66<br/>
                  • Result: 100% critical order protection
                </p>
                <div className="bg-gray-50 p-3 rounded mb-3">
                  <div className="text-sm font-medium text-gray-900 mb-1">Impact:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Critical orders: 100% on-time (342/342) ✓</li>
                    <li>• Standard orders: Delayed avg 12 days (still fulfilled later)</li>
                    <li>• Revenue protected: $571,000 | Penalties avoided: $125,000</li>
                  </ul>
                </div>
                <button
                  onClick={() => toggleAction('action4')}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  {expandedActions['action4'] ? '▲ Hide Resequencing Details' : '▼ View Resequencing Details →'}
                </button>

                {expandedActions['action4'] && (
                  <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded">
                    <h4 className="font-semibold text-gray-900 mb-3">What is Order Resequencing?</h4>
                    <div className="text-xs text-gray-700 mb-4">
                      <strong>Problem:</strong> Total demand Days 0-50 = 60,000 units. Available inventory = 53,500 units. Shortfall = 6,500 units.
                      Original FIFO would fulfill first 445 orders, leaving 342 critical orders unfulfilled.<br/><br/>
                      <strong>Solution:</strong> Resequence order fulfillment to prioritize critical orders. Delay 128 standard orders to Days 50-66 when new supply arrives.
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-red-50 p-3 rounded border border-red-200">
                        <div className="text-xs font-semibold text-red-900 mb-2">BEFORE (FIFO)</div>
                        <div className="text-xs text-gray-700">
                          Orders 1-445: FULFILLED (mixed priority)<br/>
                          Orders 446-787: UNFULFILLED<br/>
                          <span className="text-red-700">❌ 342 critical orders missed</span>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <div className="text-xs font-semibold text-green-900 mb-2">AFTER (Priority-Based)</div>
                        <div className="text-xs text-gray-700">
                          Tier 1: Critical (342 orders) ✓<br/>
                          Tier 2: High-Value (275 orders) ✓<br/>
                          Tier 3: Standard (630 orders) - Delayed<br/>
                          <span className="text-green-700">✓ Zero critical orders missed</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">🔼 MOVED UP</span>
                            <div className="font-semibold text-sm mt-1">Order #ORD-3104 | MedCare Hospital</div>
                          </div>
                          <div className="text-xs text-gray-600">Position: #512 → #23</div>
                        </div>
                        <div className="text-xs text-gray-700">
                          <strong>Why moved up:</strong> Hospital customer (critical priority), Antibiotics (critical SKU), Contract penalty $6,250 if late, Patient safety impact<br/>
                          <strong>Result:</strong> ✓ Fulfilled on Day 15 (14 days early)
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">🔽 MOVED DOWN</span>
                            <div className="font-semibold text-sm mt-1">Order #ORD-2701 | Family Drug Store (Independent)</div>
                          </div>
                          <div className="text-xs text-gray-600">Position: #234 → #556</div>
                        </div>
                        <div className="text-xs text-gray-700">
                          <strong>Why moved down:</strong> Standard priority customer, Non-critical SKUs (pain relief), 24-day delay acceptable per SLA<br/>
                          <strong>Result:</strong> ⚠️ Delayed 24 days (still fulfilled) | Customer offered 10% discount on next order
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-600 p-3 bg-white rounded">
                      <strong>Priority Algorithm:</strong> Score = (Customer_Weight × 40) + (SKU_Weight × 25) + (Value_Weight × 20) + (Penalty_Weight × 15)
                      <br/>Hospital = 100, Chain = 70, Independent = 40 | Antibiotics = 100, Chronic meds = 85, Pain relief = 50
                    </div>
                  </div>
                )}
              </div>

              {/* Action 5: Expedited Domestic Shipping */}
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">ACTION 5</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">Expedited Domestic Shipping</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">Cost: $3,200</div>
                    <div className="text-xs text-gray-600">2-day express delivery</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  • Orders: 80 hospital orders (2-day delivery)<br/>
                  • Cost: $3,200 premium<br/>
                  • Benefit: Fulfill before local inventory depletes
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Total Mitigation Cost Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <div className="text-gray-600">Emergency Sourcing Premium</div>
                  <div className="text-lg font-bold text-gray-900">$24,900</div>
                </div>
                <div>
                  <div className="text-gray-600">Air Freight Premium</div>
                  <div className="text-lg font-bold text-gray-900">$36,000</div>
                </div>
                <div>
                  <div className="text-gray-600">Warehouse Transfers</div>
                  <div className="text-lg font-bold text-gray-900">$1,785</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Expedited Domestic</div>
                  <div className="text-lg font-bold text-gray-900">$3,200</div>
                </div>
                <div>
                  <div className="text-gray-600">Alternative Supplier Base Cost</div>
                  <div className="text-lg font-bold text-gray-900">$221,115</div>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <div className="text-gray-700 font-semibold">TOTAL COST</div>
                  <div className="text-xl font-bold text-blue-900">$287,000</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Net Benefit</div>
                    <div className="text-xs text-gray-600">Revenue saved: $1,758,000 - Cost: $287,000</div>
                  </div>
                  <div className="text-2xl font-bold text-green-700">$1,471,000</div>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  ROI: 5.1x | Every $1 spent saves $5.10 in revenue
                </div>
              </div>
            </div>
          </div>
          </>
        )}

        {/* Mitigation Configuration Modal */}
        {showMitigationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Create Mitigation Scenario</h2>
                  <button
                    onClick={() => setShowMitigationModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">Configure alternative suppliers, transfers, and prioritization rules</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Section A: Alternative Suppliers */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Alternative Suppliers</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="PharmaCorp India" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Mumbai, India" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lead Time (days)</label>
                        <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="30" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (units/month)</label>
                        <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="25000" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unit Cost Premium (%)</label>
                        <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="28" />
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800">+ Add Another Supplier</button>
                  </div>
                </div>

                {/* Section B: Inventory Transfers */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Warehouse Transfers</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" id="enableTransfers" className="mr-2" defaultChecked />
                      <label htmlFor="enableTransfers" className="text-sm text-gray-700">Allow transfers between warehouses</label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Transit Time (days)</label>
                        <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" defaultValue="3" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost per unit ($)</label>
                        <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded" defaultValue="0.85" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section C: Expedited Shipping */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Expedited Shipping</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" id="enableExpedited" className="mr-2" defaultChecked />
                      <label htmlFor="enableExpedited" className="text-sm text-gray-700">Enable expedited shipping for critical orders</label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Air Freight Premium ($/unit)</label>
                        <input type="number" step="0.1" className="w-full px-3 py-2 border border-gray-300 rounded" defaultValue="4.5" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Budget ($)</label>
                        <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="150000" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section D: Order Prioritization */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Prioritization Rules</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>1. Customer Type (Hospital &gt; Chain &gt; Independent)</span>
                      <span className="text-gray-500">Weight: 40%</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>2. SKU Criticality (Antibiotics &gt; Chronic meds &gt; Pain relief)</span>
                      <span className="text-gray-500">Weight: 25%</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>3. Order Value (High-value first)</span>
                      <span className="text-gray-500">Weight: 20%</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>4. Contract Penalties</span>
                      <span className="text-gray-500">Weight: 15%</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center">
                    <input type="checkbox" id="allowResequencing" className="mr-2" defaultChecked />
                    <label htmlFor="allowResequencing" className="text-sm text-gray-700">Allow system to resequence orders</label>
                  </div>
                </div>

                {/* Section E: Business Constraints */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Constraints</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Partial Fulfillment Minimum (%)</label>
                        <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" defaultValue="70" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Cost Increase (%)</label>
                        <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" defaultValue="35" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target Service Level (%)</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" defaultValue="75" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <strong>Orders to optimize:</strong> 1,247 orders | <strong>Window:</strong> Days 0-125
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowMitigationModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowMitigationModal(false);
                        setPageTab('recommendations');
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Run Optimization →
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">⚠️ Note: Optimization may take 2-3 minutes</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmaceuticalDetail;
