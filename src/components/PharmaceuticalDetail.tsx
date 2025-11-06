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

  const toggleRow = (rowId: string) => {
    setExpandedRows(prev => ({ ...prev, [rowId]: !prev[rowId] }));
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
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Mitigation Recommendations</h2>

            <div className="space-y-6">
              {/* Recommendation 1 */}
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Critical Priority</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">Emergency Sourcing from Alternative Suppliers</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">Cost: $185,000</div>
                    <div className="text-xs text-gray-600">Timeline: 2-3 weeks</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Source 25,000 units of Amoxicillin from Alternative Supplier A (India). Unit cost: $3.20 (vs $2.50 normal) = +28% premium. Lead time: 30 days vs 45 days normal.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm font-medium text-gray-900 mb-1">Expected Impact:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Reduces stockout duration by 12 days (from 21.4 to 9.4 days)</li>
                    <li>• Saves $64,000 in lost sales</li>
                    <li>• Covers 15 hospital pharmacies and 28 chain stores</li>
                  </ul>
                </div>
              </div>

              {/* Recommendation 2 */}
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">High Priority</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">Warehouse Inventory Transfer</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">Cost: $12,500</div>
                    <div className="text-xs text-gray-600">Timeline: 3-5 days</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Transfer 5,000 units from WH-South (Atlanta) to WH-West (Los Angeles). Transfer cost: $2.50/unit. Transit time: 3 days by truck.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm font-medium text-gray-900 mb-1">Expected Impact:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Extends WH-West inventory by 14 days (Day 34 → Day 48)</li>
                    <li>• Fulfills 45 high-priority store orders</li>
                    <li>• Maintains service to 15 hospital accounts</li>
                  </ul>
                </div>
              </div>

              {/* Recommendation 3 */}
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium Priority</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">Increase Safety Stock Levels</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">Cost: $320,000</div>
                    <div className="text-xs text-gray-600">Timeline: 4-6 weeks</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Increase safety stock from 15 days to 25 days for critical pharmaceutical SKUs. Target: 8 sole-source medications.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm font-medium text-gray-900 mb-1">Expected Impact:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Buffer against future 21-day disruptions</li>
                    <li>• Reduces risk of FDA shortage reporting requirements</li>
                    <li>• Protects patient care continuity</li>
                  </ul>
                </div>
              </div>

              {/* Recommendation 4 */}
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Strategic</span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">Supplier Diversification Program</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">Cost: $450,000</div>
                    <div className="text-xs text-gray-600">Timeline: 3-6 months</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Qualify and onboard alternative suppliers for 8 sole-source SKUs. Target: Reduce sole-source dependency from 67% to under 30%.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm font-medium text-gray-900 mb-1">Expected Impact:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Long-term resilience improvement</li>
                    <li>• Reduces single-point-of-failure risk</li>
                    <li>• Enables competitive pricing negotiation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Total Investment Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Total Cost (All Recommendations)</div>
                  <div className="text-xl font-bold text-gray-900">$967,500</div>
                </div>
                <div>
                  <div className="text-gray-600">Projected Savings vs. No Action</div>
                  <div className="text-xl font-bold text-green-600">$1,052,500</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600">
                ROI: 108.8% | Payback Period: Immediate (savings exceed costs)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmaceuticalDetail;
