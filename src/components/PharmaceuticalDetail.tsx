import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pharmaData from '../data/pharma-simulation.json';

interface ExpandedRow {
  [key: string]: boolean;
}

const PharmaceuticalDetail: React.FC = () => {
  const [expandedSKUs, setExpandedSKUs] = useState<ExpandedRow>({});
  const [expandedWarehouses, setExpandedWarehouses] = useState<ExpandedRow>({});
  const [showAllSKUs, setShowAllSKUs] = useState(false);

  const toggleSKU = (skuId: string) => {
    setExpandedSKUs(prev => ({ ...prev, [skuId]: !prev[skuId] }));
  };

  const toggleWarehouse = (warehouseId: string) => {
    setExpandedWarehouses(prev => ({ ...prev, [warehouseId]: !prev[warehouseId] }));
  };

  const data = pharmaData as any;

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

        {/* Top Affected Products Table */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Top Affected Products</h2>
              <button
                onClick={() => setShowAllSKUs(!showAllSKUs)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showAllSKUs ? 'Show Top 3' : 'View all SKUs →'}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dependency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stockout Day</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Impact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(showAllSKUs ? data.affectedSKUs : data.affectedSKUs.slice(0, 3)).map((sku: any) => (
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
                          onClick={() => toggleSKU(sku.skuId)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {expandedSKUs[sku.skuId] ? '▲ Hide' : '▼ Explain'}
                        </button>
                      </td>
                    </tr>
                    {expandedSKUs[sku.skuId] && (
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
              </tbody>
            </table>
          </div>
        </div>

        {/* Affected Locations Table */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Affected Warehouses</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stores Served</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stockout Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Exposure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.warehouseImpact.map((warehouse: any) => (
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
                          onClick={() => toggleWarehouse(warehouse.warehouseId)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {expandedWarehouses[warehouse.warehouseId] ? '▲ Hide' : '▼ Explain'}
                        </button>
                      </td>
                    </tr>
                    {expandedWarehouses[warehouse.warehouseId] && warehouse.explainability && (
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
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Affected Stores */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top Affected Stores</h2>
            <p className="text-sm text-gray-600 mt-1">By revenue impact</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKUs Affected</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue at Risk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Impact</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.topAffectedStores.map((store: any) => (
                  <tr key={store.storeId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{store.name}</div>
                        <div className="text-sm text-gray-500">{store.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        store.type === 'Hospital' ? 'bg-purple-100 text-purple-800' :
                        store.type === 'Chain' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {store.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {store.skusAffected} SKUs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${store.revenueAtRisk.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {store.patientImpact.toLocaleString()} patients/month
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmaceuticalDetail;
