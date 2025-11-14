import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSimulations } from '../context/SimulationContext';
import { Simulation } from '../types/simulation';

type SortField = 'name' | 'createdAt' | 'totalOrdersImpacted' | 'totalRevenue' | 'status';
type SortDirection = 'asc' | 'desc';

const SimulationList: React.FC = () => {
  const { simulations, selectedForComparison, toggleComparison } = useSimulations();
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedSimulations = [...simulations].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortField) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      case 'totalOrdersImpacted':
        aValue = a.summary.totalOrdersImpacted;
        bValue = b.summary.totalOrdersImpacted;
        break;
      case 'totalRevenue':
        aValue = a.summary.totalRevenue;
        bValue = b.summary.totalRevenue;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(simulations.map(sim => sim.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'Running':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'In-progress':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      case 'Draft':
        return 'bg-gray-50 text-gray-600 border border-gray-200';
      case 'Archived':
        return 'bg-gray-50 text-gray-500 border border-gray-200';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  const getDisruptionColor = (type: string) => {
    const colors: Record<string, string> = {
      'Port Congestion': 'bg-orange-50 text-orange-700 border border-orange-200',
      'Supplier Shutdown': 'bg-red-50 text-red-700 border border-red-200',
      'Plant Shutdown': 'bg-purple-50 text-purple-700 border border-purple-200',
      'Demand Drop': 'bg-blue-50 text-blue-700 border border-blue-200',
    };
    return colors[type] || 'bg-gray-50 text-gray-700 border border-gray-200';
  };

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

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return formatDate(dateString);
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const getDetailRoute = (simulation: Simulation) => {
    const routes: Record<string, string> = {
      'Port Congestion': `/port-congestion/${simulation.id}`,
      'Supplier Shutdown': `/supplier-shutdown/${simulation.id}`,
      'Plant Shutdown': `/plant-shutdown/${simulation.id}`,
      'Demand Drop': `/demand-drop/${simulation.id}`,
    };
    return routes[simulation.disruptionType] || `/simulation/${simulation.id}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-6">
        {/* Header with New Scenario Button */}
        <div className="mb-6 flex justify-end">
          <Link
            to="/create"
            className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Scenario
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === simulations.length && simulations.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Scenario Name
                      <SortIcon field="name" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scenario Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center gap-2">
                      Created
                      <SortIcon field="createdAt" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('totalOrdersImpacted')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Orders Impacted
                      <SortIcon field="totalOrdersImpacted" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('totalRevenue')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Revenue at Risk
                      <SortIcon field="totalRevenue" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-2">
                      Status
                      <SortIcon field="status" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedSimulations.map((simulation) => (
                  <tr
                    key={simulation.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(simulation.id)}
                        onChange={(e) => handleSelectRow(simulation.id, e.target.checked)}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      {simulation.status === 'In-progress' ? (
                        <span className="text-sm font-medium text-gray-500 cursor-not-allowed">
                          {simulation.name}
                        </span>
                      ) : (
                        <Link
                          to={getDetailRoute(simulation)}
                          className="text-sm font-medium text-gray-900 hover:text-orange-600 hover:underline"
                        >
                          {simulation.name}
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getDisruptionColor(simulation.disruptionType)}`}>
                        {simulation.disruptionType}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {(simulation as any).disruptionLocation || '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {(simulation as any).duration || '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(simulation.createdAt)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {simulation.summary.totalOrdersImpacted.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {simulation.summary.criticalOrders} critical
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      {formatCurrency(simulation.summary.totalRevenue)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(simulation.status)}`}>
                        {simulation.status}
                      </span>
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

export default SimulationList;
