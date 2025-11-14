import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSimulations } from '../context/SimulationContext';

const ComparisonView: React.FC = () => {
  const navigate = useNavigate();
  const { simulations, selectedForComparison, clearComparison, toggleComparison } = useSimulations();

  const selectedSimulations = simulations.filter(sim => selectedForComparison.includes(sim.id));

  if (selectedForComparison.length < 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Simulations Selected</h2>
          <p className="text-gray-600 mb-6">Please select 2-3 simulations to compare</p>
          <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Scenario List
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDisruptionColor = (type: string) => {
    const colors: Record<string, string> = {
      'Port Congestion': 'bg-orange-100 text-orange-800',
      'Supplier Shutdown': 'bg-red-100 text-red-800',
      'Plant Shutdown': 'bg-purple-100 text-purple-800',
      'Demand Drop': 'bg-blue-100 text-blue-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const handleRemove = (id: string) => {
    toggleComparison(id);
    if (selectedForComparison.length <= 2) {
      navigate('/');
    }
  };

  const getMaxValue = (key: keyof typeof selectedSimulations[0]['summary']) => {
    return Math.max(...selectedSimulations.map(sim => sim.summary[key] as number));
  };

  const getPercentageBar = (value: number, maxValue: number) => {
    return maxValue > 0 ? (value / maxValue) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Scenario List
          </Link>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Simulation Comparison</h1>
              <p className="mt-2 text-sm text-gray-600">
                Comparing {selectedSimulations.length} scenarios side-by-side
              </p>
            </div>
            <button
              onClick={clearComparison}
              className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className={`grid ${selectedSimulations.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-6`}>
          {selectedSimulations.map((simulation, index) => (
            <div key={simulation.id} className="bg-white rounded-lg shadow-sm border-2 border-gray-200">
              {/* Card Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <Link
                      to={`/simulation/${simulation.id}`}
                      className="text-lg font-bold text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {simulation.name}
                    </Link>
                  </div>
                  <button
                    onClick={() => handleRemove(simulation.id)}
                    className="ml-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDisruptionColor(simulation.disruptionType)}`}>
                  {simulation.disruptionType}
                </span>
                <div className="text-xs text-gray-500 mt-2">
                  {formatDate(simulation.createdAt)}
                </div>
              </div>

              {/* Metrics */}
              <div className="p-6 space-y-6">
                {/* Orders Impacted */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-medium text-gray-600">Orders Impacted</span>
                    <span className="text-2xl font-bold text-gray-900">{simulation.summary.totalOrdersImpacted}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${getPercentageBar(
                          simulation.summary.totalOrdersImpacted,
                          getMaxValue('totalOrdersImpacted')
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Revenue at Risk */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-medium text-gray-600">Revenue at Risk</span>
                    <span className="text-xl font-bold text-gray-900">{formatCurrency(simulation.summary.totalRevenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${getPercentageBar(
                          simulation.summary.totalRevenue,
                          getMaxValue('totalRevenue')
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Average Delay */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-medium text-gray-600">Average Delay</span>
                    <span className="text-2xl font-bold text-gray-900">{simulation.summary.averageDelay} days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${getPercentageBar(
                          simulation.summary.averageDelay,
                          getMaxValue('averageDelay')
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Critical Orders */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-medium text-gray-600">Critical Orders</span>
                    <span className="text-2xl font-bold text-red-600">{simulation.summary.criticalOrders}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${getPercentageBar(
                          simulation.summary.criticalOrders,
                          getMaxValue('criticalOrders')
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Variables */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Variables</h3>
                  <div className="space-y-2">
                    {simulation.variables.map((variable, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="text-gray-600">{variable.name}:</span>{' '}
                        <span className="font-medium text-gray-900">{variable.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cascade Events Count */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Cascade Events</span>
                    <span className="text-lg font-bold text-gray-900">{simulation.cascadeEvents.length}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <Link
                  to={`/simulation/${simulation.id}`}
                  className="block w-full text-center px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Insights */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Comparison Insights</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Highest Impact</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-sm text-gray-700">Most Orders Impacted:</span>
                  <span className="font-bold text-gray-900">
                    {selectedSimulations.reduce((max, sim) =>
                      sim.summary.totalOrdersImpacted > max.summary.totalOrdersImpacted ? sim : max
                    ).name.split(' - ')[0]}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-gray-700">Highest Revenue at Risk:</span>
                  <span className="font-bold text-gray-900">
                    {selectedSimulations.reduce((max, sim) =>
                      sim.summary.totalRevenue > max.summary.totalRevenue ? sim : max
                    ).name.split(' - ')[0]}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Severity Analysis</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm text-gray-700">Longest Average Delay:</span>
                  <span className="font-bold text-gray-900">
                    {selectedSimulations.reduce((max, sim) =>
                      sim.summary.averageDelay > max.summary.averageDelay ? sim : max
                    ).summary.averageDelay} days
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-sm text-gray-700">Most Critical Orders:</span>
                  <span className="font-bold text-gray-900">
                    {selectedSimulations.reduce((max, sim) =>
                      sim.summary.criticalOrders > max.summary.criticalOrders ? sim : max
                    ).summary.criticalOrders}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
