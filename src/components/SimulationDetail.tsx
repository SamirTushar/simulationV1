import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSimulations } from '../context/SimulationContext';
import { ImpactedOrder } from '../types/simulation';
import PharmaceuticalDetail from './PharmaceuticalDetail';

type OrderSortField = 'orderId' | 'customerName' | 'orderValue' | 'delayDays' | 'status';
type TabType = 'simulation' | 'recommendations';

interface RecommendationRun {
  id: string;
  createdAt: string;
  selectedOrders: number;
  status: 'In Progress' | 'Completed';
}

interface Recommendation {
  id: string;
  priority: 'Critical' | 'High' | 'Medium';
  action: string;
  expectedImpact: string;
  timeline: string;
  cost: number;
  explanation: string;
}

const SimulationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getSimulation } = useSimulations();
  const simulation = getSimulation(id!);

  // Check if this is a pharmaceutical simulation
  if (simulation && (simulation as any).type === 'pharmaceutical') {
    return <PharmaceuticalDetail />;
  }

  const [activeTab, setActiveTab] = useState<TabType>('simulation');
  const [selectedNode, setSelectedNode] = useState<number>(5);
  const [orderSortField, setOrderSortField] = useState<OrderSortField>('delayDays');
  const [orderSortDirection, setOrderSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [sideDrawerContent, setSideDrawerContent] = useState<{ title: string; content: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recommendationRuns, setRecommendationRuns] = useState<RecommendationRun[]>([
    { id: 'RUN-001', createdAt: '2025-11-05T14:30:00Z', selectedOrders: 3, status: 'Completed' },
    { id: 'RUN-002', createdAt: '2025-11-05T15:45:00Z', selectedOrders: 2, status: 'Completed' },
  ]);

  const itemsPerPage = 10;

  // Mock data for context-sensitive tables
  const mockSuppliers = useMemo(() => [
    { id: 'SUP-001', name: 'Foxconn Manufacturing', location: 'Shanghai, China', impactLevel: 'Critical', ordersAffected: 147, status: 'Disrupted' },
    { id: 'SUP-002', name: 'Delta Electronics', location: 'Taipei, Taiwan', impactLevel: 'High', ordersAffected: 89, status: 'Delayed' },
    { id: 'SUP-003', name: 'Pegatron Corp', location: 'Shanghai, China', impactLevel: 'Medium', ordersAffected: 52, status: 'At Risk' },
  ], []);

  const mockInventory = useMemo(() => [
    { sku: 'LAPTOP-XPS13-001', location: 'Los Angeles DC', currentStock: 120, requiredStock: 500, shortfall: 380, priority: 'Critical' },
    { sku: 'TABLET-IPAD-PRO-128', location: 'San Francisco DC', currentStock: 450, requiredStock: 1200, shortfall: 750, priority: 'Critical' },
    { sku: 'SMARTPHONE-GALAXY-S24', location: 'Seattle DC', currentStock: 200, requiredStock: 800, shortfall: 600, priority: 'High' },
    { sku: 'MONITOR-DELL-27', location: 'Los Angeles DC', currentStock: 300, requiredStock: 600, shortfall: 300, priority: 'Medium' },
  ], []);

  const mockProduction = useMemo(() => [
    { poId: 'PO-2025-10847', facility: 'Foxconn Plant 3', product: 'Laptop XPS 13', quantity: 500, originalDate: '2025-11-01', newDate: '2025-11-22', delayDays: 21, status: 'Delayed' },
    { poId: 'PO-2025-10923', facility: 'Delta Facility 1', product: 'Tablet iPad Pro', quantity: 1200, originalDate: '2025-11-05', newDate: '2025-11-20', delayDays: 15, status: 'Delayed' },
    { poId: 'PO-2025-11034', facility: 'Pegatron Assembly', product: 'Smartphone Galaxy', quantity: 800, originalDate: '2025-11-10', newDate: '2025-11-28', delayDays: 18, status: 'Critical' },
  ], []);

  const mockRecommendations: Record<string, Recommendation[]> = useMemo(() => ({
    'RUN-001': [
      { id: 'REC-001', priority: 'Critical', action: 'Expedite air freight for critical orders', expectedImpact: 'Reduce delay by 7-10 days for 147 orders', timeline: '2-3 days', cost: 450000, explanation: 'Air freight can bypass congested sea routes, providing fastest delivery for time-sensitive orders. This recommendation prioritizes orders with highest revenue impact and customer importance.' },
      { id: 'REC-002', priority: 'High', action: 'Source alternative suppliers in Vietnam and Thailand', expectedImpact: 'Establish backup capacity for 40% of affected SKUs', timeline: '2 weeks', cost: 180000, explanation: 'Diversifying supplier base reduces single-point-of-failure risk. Vietnam and Thailand have established electronics manufacturing capabilities with shorter lead times to West Coast distribution centers.' },
      { id: 'REC-003', priority: 'High', action: 'Negotiate priority production slots with Delta Electronics', expectedImpact: 'Accelerate 89 orders by 5-7 days', timeline: '1 week', cost: 95000, explanation: 'Delta Electronics has indicated capacity for priority handling. Premium payment for expedited slots can reduce queue time significantly while maintaining quality standards.' },
      { id: 'REC-004', priority: 'Medium', action: 'Increase safety stock at West Coast DCs', expectedImpact: 'Buffer against future disruptions for 30 days', timeline: '3-4 weeks', cost: 320000, explanation: 'Increased inventory levels at Los Angeles and San Francisco DCs provide buffer against port disruptions. Analysis shows these locations experience highest frequency of supply chain issues.' },
    ],
    'RUN-002': [
      { id: 'REC-005', priority: 'Critical', action: 'Charter dedicated vessel for high-priority cargo', expectedImpact: 'Bypass port congestion, reduce delay by 12 days', timeline: '5 days', cost: 280000, explanation: 'Chartered vessels can skip congested terminals and access priority berths. Cost analysis shows ROI positive for orders exceeding $5M total value, which applies to this selection.' },
      { id: 'REC-006', priority: 'High', action: 'Reroute through alternate ports (Ningbo, Qingdao)', expectedImpact: 'Reduce average delay by 6 days for 67 orders', timeline: '1 week', cost: 125000, explanation: 'Ningbo and Qingdao ports currently operating at 65% capacity with shorter wait times. Additional trucking costs offset by reduced demurrage and faster throughput.' },
    ],
  }), []);

  if (!simulation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Simulation Not Found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Back to Simulations
          </Link>
        </div>
      </div>
    );
  }

  const handleOrderSort = (field: OrderSortField) => {
    if (orderSortField === field) {
      setOrderSortDirection(orderSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderSortField(field);
      setOrderSortDirection('desc');
    }
  };

  const sortedOrders = [...simulation.impactedOrders].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (orderSortField) {
      case 'orderId':
        aValue = a.orderId;
        bValue = b.orderId;
        break;
      case 'customerName':
        aValue = a.customerName.toLowerCase();
        bValue = b.customerName.toLowerCase();
        break;
      case 'orderValue':
        aValue = a.orderValue;
        bValue = b.orderValue;
        break;
      case 'delayDays':
        aValue = a.delayDays;
        bValue = b.delayDays;
        break;
      case 'status':
        const statusOrder = { Critical: 3, Delayed: 2, 'At Risk': 1 };
        aValue = statusOrder[a.status as keyof typeof statusOrder];
        bValue = statusOrder[b.status as keyof typeof statusOrder];
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return orderSortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return orderSortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Delayed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'At Risk':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const SortIcon = ({ field }: { field: OrderSortField }) => {
    if (orderSortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return orderSortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const handleToggleOrder = (orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const handleSelectAllOrders = () => {
    if (selectedOrders.length === sortedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(sortedOrders.map(order => order.orderId));
    }
  };

  const handleRunRecommendations = () => {
    const newRun: RecommendationRun = {
      id: `RUN-${String(recommendationRuns.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      selectedOrders: selectedOrders.length,
      status: 'In Progress',
    };
    setRecommendationRuns([...recommendationRuns, newRun]);
    setActiveTab('recommendations');
    setSelectedRunId(newRun.id);
  };

  const handleDownloadCSV = () => {
    const headers = ['Order ID', 'Customer', 'SKU', 'Quantity', 'Order Value', 'Original Date', 'New Date', 'Delay Days', 'Status'];
    const rows = sortedOrders.map(order => [
      order.orderId,
      order.customerName,
      order.sku,
      order.quantity,
      order.orderValue,
      order.originalDeliveryDate,
      order.newDeliveryDate,
      order.delayDays,
      order.status,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${simulation.name}-orders.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openExplainDrawer = (title: string, content: string) => {
    setSideDrawerContent({ title, content });
    setSideDrawerOpen(true);
  };

  const getSimulationExplanation = () => {
    return `This simulation models the impact of ${simulation.disruptionType} on your supply chain network.

**Methodology:**
The simulation uses a cascade analysis model that traces impacts through multiple tiers:
1. Initial disruption at source location
2. Supplier delivery delays based on historical patterns
3. Inventory depletion rates at distribution centers
4. Production schedule impacts
5. Customer order fulfillment risks

**Data Sources:**
- Real-time port congestion data
- Historical supplier performance metrics
- Current inventory levels across DC network
- Customer order book with SLA commitments

**Key Assumptions:**
- Normal replenishment lead times: 14-21 days
- Safety stock coverage: 7-10 days
- No mitigation actions taken (baseline scenario)

**Confidence Level:** ${simulation.summary.criticalOrders > 30 ? 'High (85-95%)' : 'Medium (70-85%)'} based on data quality and historical pattern matching.`;
  };

  const getRecommendationExplanation = () => {
    return `**Recommendation Engine:**
Our AI-powered recommendation system analyzes multiple factors to suggest optimal mitigation strategies:

**Factors Analyzed:**
- Order priority and customer tier
- Revenue impact and margin analysis
- Alternative routing options and costs
- Supplier capacity and lead times
- Historical success rates of similar actions

**Optimization Goals:**
1. Minimize revenue at risk
2. Maximize customer satisfaction (SLA compliance)
3. Optimize cost-effectiveness of interventions
4. Balance short-term fixes with long-term resilience

**Prioritization Logic:**
- Critical: Actions required within 24-48 hours
- High: Actions needed within 1 week
- Medium: Strategic improvements over 2-4 weeks

The cost-benefit analysis compares total revenue at risk against implementation costs of all recommendations combined.`;
  };

  const renderContextTable = () => {
    if (selectedNode === 5) {
      // Node 5: Customer Orders - show the full orders table
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Impacted Customer Orders</h2>
              {selectedOrders.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">{selectedOrders.length} orders selected</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {selectedOrders.length > 0 && (
                <button
                  onClick={handleRunRecommendations}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Run Recommendations ({selectedOrders.length})
                </button>
              )}
              <button
                onClick={handleDownloadCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CSV
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input type="checkbox" checked={selectedOrders.length === sortedOrders.length} onChange={handleSelectAllOrders} className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleOrderSort('orderId')}>
                    <div className="flex items-center gap-2">Order ID<SortIcon field="orderId" /></div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleOrderSort('customerName')}>
                    <div className="flex items-center gap-2">Customer<SortIcon field="customerName" /></div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleOrderSort('orderValue')}>
                    <div className="flex items-center justify-end gap-2">Order Value<SortIcon field="orderValue" /></div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Dates</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleOrderSort('delayDays')}>
                    <div className="flex items-center justify-center gap-2">Delay<SortIcon field="delayDays" /></div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleOrderSort('status')}>
                    <div className="flex items-center justify-center gap-2">Status<SortIcon field="status" /></div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" checked={selectedOrders.includes(order.orderId)} onChange={() => handleToggleOrder(order.orderId)} className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{order.quantity.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">{formatCurrency(order.orderValue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="text-gray-600">Orig: {formatDate(order.originalDeliveryDate)}</div>
                      <div className="text-red-600">New: {formatDate(order.newDeliveryDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex px-2 py-1 text-sm font-semibold bg-red-100 text-red-800 rounded">+{order.delayDays} days</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md border ${getStatusColor(order.status)}`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedOrders.length)} of {sortedOrders.length} results
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 border rounded text-sm font-medium ${currentPage === page ? 'bg-orange-600 text-white border-orange-600' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      );
    }

    // Nodes 1-4: Show simpler tables
    const tables = {
      1: {
        title: 'Disruption Details',
        content: (
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-600 w-1/3">Disruption Type</td><td className="px-6 py-4 text-sm text-gray-900">{simulation.disruptionType}</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-600">Location</td><td className="px-6 py-4 text-sm text-gray-900">{simulation.variables.find(v => v.type === 'location')?.value}</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-600">Date</td><td className="px-6 py-4 text-sm text-gray-900">{formatDate(simulation.createdAt)}</td></tr>
              <tr><td className="px-6 py-4 text-sm font-medium text-gray-600">Severity</td><td className="px-6 py-4 text-sm"><span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md border ${getSeverityColor(simulation.variables.find(v => v.type === 'severity')?.value || 'Medium')}`}>{simulation.variables.find(v => v.type === 'severity')?.value || 'Medium'}</span></td></tr>
            </tbody>
          </table>
        )
      },
      2: {
        title: 'Affected Suppliers',
        content: (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Impact Level</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Orders Affected</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockSuppliers.map((sup) => (
                <tr key={sup.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{sup.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{sup.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{sup.location}</td>
                  <td className="px-6 py-4 text-center"><span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md border ${getPriorityColor(sup.impactLevel)}`}>{sup.impactLevel}</span></td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">{sup.ordersAffected}</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">{sup.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      },
      3: {
        title: 'Inventory Shortages',
        content: (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Required Stock</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Shortfall</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Priority</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockInventory.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">{item.currentStock}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">{item.requiredStock}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-red-600">{item.shortfall}</td>
                  <td className="px-6 py-4 text-center"><span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md border ${getPriorityColor(item.priority)}`}>{item.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      },
      4: {
        title: 'Delayed Production Orders',
        content: (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Facility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Original Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">New Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Delay</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockProduction.map((po) => (
                <tr key={po.poId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{po.poId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{po.facility}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{po.product}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">{po.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(po.originalDate)}</td>
                  <td className="px-6 py-4 text-sm text-red-600">{formatDate(po.newDate)}</td>
                  <td className="px-6 py-4 text-center"><span className="inline-flex px-2 py-1 text-sm font-semibold bg-red-100 text-red-800 rounded">+{po.delayDays} days</span></td>
                  <td className="px-6 py-4 text-center"><span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md border ${getStatusColor(po.status)}`}>{po.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    };

    const table = tables[selectedNode as keyof typeof tables];
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">{table.title}</h3>
        </div>
        <div className="overflow-x-auto">{table.content}</div>
      </div>
    );
  };

  const renderRecommendationsTab = () => {
    const selectedRun = recommendationRuns.find(run => run.id === selectedRunId);
    const recommendations = selectedRunId ? mockRecommendations[selectedRunId] || [] : [];

    // Cost-Benefit Analysis
    const totalAtRisk = simulation.summary.totalRevenue;
    const totalRecommendationCost = recommendations.reduce((sum, rec) => sum + rec.cost, 0);
    const potentialSavings = totalAtRisk * 0.75; // Assume 75% recovery
    const netBenefit = potentialSavings - totalRecommendationCost;
    const roi = totalRecommendationCost > 0 ? ((netBenefit / totalRecommendationCost) * 100) : 0;

    return (
      <div className="space-y-6">
        {/* Runs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recommendation Runs</h3>
            <button
              onClick={() => openExplainDrawer('How Recommendations Work', getRecommendationExplanation())}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Explain</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Run ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Selected Orders</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recommendationRuns.map((run) => (
                  <tr
                    key={run.id}
                    className={`hover:bg-gray-50 cursor-pointer ${selectedRunId === run.id ? 'bg-blue-50' : ''}`}
                    onClick={() => run.status === 'Completed' ? setSelectedRunId(run.id) : null}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{run.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDateTime(run.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{run.selectedOrders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {run.status === 'In Progress' ? (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                          In Progress
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                          Completed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {run.status === 'Completed' ? (
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Details
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">Processing...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations Details */}
        {selectedRun && selectedRun.status === 'Completed' && recommendations.length > 0 && (
          <div className="space-y-6">
            {/* Cost-Benefit Analysis */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cost-Benefit Analysis</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="text-sm font-medium text-gray-600">Total Revenue at Risk</span>
                    <span className="text-lg font-bold text-red-600">{formatCurrency(totalAtRisk)}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="text-sm font-medium text-gray-600">Total Recommendation Cost</span>
                    <span className="text-lg font-bold text-orange-600">{formatCurrency(totalRecommendationCost)}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="text-sm font-medium text-gray-600">Potential Savings (75% recovery)</span>
                    <span className="text-lg font-bold text-green-600">{formatCurrency(potentialSavings)}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                  <div className="text-sm font-medium text-gray-600 mb-2">Net Benefit</div>
                  <div className="text-3xl font-bold text-green-600 mb-3">{formatCurrency(netBenefit)}</div>
                  <div className="text-xs text-gray-600">ROI: <span className="font-semibold text-green-700">{roi.toFixed(0)}%</span></div>
                </div>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendations for {selectedRun.id}</h3>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority}
                        </span>
                        <h4 className="text-base font-semibold text-gray-900">{rec.action}</h4>
                        <button
                          onClick={() => openExplainDrawer(rec.action, rec.explanation)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{formatCurrency(rec.cost)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Expected Impact:</span>
                        <p className="text-gray-900 mt-1">{rec.expectedImpact}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Timeline:</span>
                        <p className="text-gray-900 mt-1">{rec.timeline}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!selectedRunId && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-600">Select a completed run above to view recommendations</p>
          </div>
        )}
      </div>
    );
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
            Back to Simulations
          </Link>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">{simulation.name}</h1>
            <p className="mt-2 text-sm text-gray-600">
              Created on {formatDate(simulation.createdAt)}
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Orders Impacted</div>
            <div className="text-3xl font-bold text-gray-900">{simulation.summary.totalOrdersImpacted}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Revenue at Risk</div>
            <div className="text-3xl font-bold text-gray-900">{formatCurrency(simulation.summary.totalRevenue)}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Average Delay</div>
            <div className="text-3xl font-bold text-gray-900">{simulation.summary.averageDelay} days</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200 bg-red-50">
            <div className="text-sm font-medium text-red-600 mb-2">Critical Orders</div>
            <div className="text-3xl font-bold text-red-600">{simulation.summary.criticalOrders}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('simulation')}
              className={`${
                activeTab === 'simulation'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Simulation
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`${
                activeTab === 'recommendations'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Recommendations
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'simulation' ? (
          <>
            {/* Variables */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Simulation Variables</h2>
              <div className="grid grid-cols-3 gap-4">
                {simulation.variables.map((variable, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600">{variable.name}</div>
                    <div className="text-lg font-semibold text-gray-900 mt-1">{variable.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Cascade Events Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Event Cascade Timeline</h2>
                <button
                  onClick={() => openExplainDrawer('Simulation Methodology', getSimulationExplanation())}
                  className="text-orange-600 hover:text-orange-800 flex items-center gap-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">Explain</span>
                </button>
              </div>

              {/* Interactive Nodes */}
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-0">
                  {[
                    {
                      id: 1,
                      label: 'Initial Disruption',
                      count: '(1)',
                      description: `${simulation.disruptionType} at ${simulation.disruptionLocation}`,
                      entities: [simulation.disruptionLocation],
                      severity: 'High',
                      dotColor: 'bg-orange-500'
                    },
                    {
                      id: 2,
                      label: 'Supplier Impact',
                      count: '(3)',
                      description: '3 key suppliers unable to meet delivery schedules',
                      entities: ['Foxconn Manufacturing', 'Delta Electronics', 'Pegatron Corp'],
                      severity: 'High',
                      dotColor: 'bg-orange-500'
                    },
                    {
                      id: 3,
                      label: 'Inventory Shortage',
                      count: '(4)',
                      description: '4 SKUs projected to run low across distribution centers',
                      entities: ['Los Angeles DC', 'San Francisco DC', 'Seattle DC'],
                      severity: 'Critical',
                      dotColor: 'bg-red-500'
                    },
                    {
                      id: 4,
                      label: 'Production Delays',
                      count: '(3)',
                      description: '3 production orders delayed due to component shortages',
                      entities: ['Foxconn Plant 3', 'Delta Facility 1', 'Pegatron Assembly'],
                      severity: 'Critical',
                      dotColor: 'bg-red-500'
                    },
                    {
                      id: 5,
                      label: 'Customer Orders at Risk',
                      count: `(${simulation.impactedOrders.length})`,
                      description: `${simulation.impactedOrders.length} customer orders identified as at-risk`,
                      entities: ['Order Management System', 'Customer Commitments'],
                      severity: 'Critical',
                      dotColor: 'bg-orange-500'
                    },
                  ].map((node, index) => (
                    <div key={node.id} className="relative pl-12 pb-6">
                      <div
                        className={`absolute left-3 w-3 h-3 rounded-full ${node.dotColor} border-2 border-white shadow-sm z-10`}
                      ></div>
                      <div
                        onClick={() => setSelectedNode(node.id)}
                        className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                          selectedNode === node.id
                            ? 'bg-orange-50 border-orange-400 shadow-md'
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {node.label} <span className="text-gray-600">{node.count}</span>
                            </h3>
                            <p className="text-xs text-gray-600 mt-1">{node.description}</p>
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                            node.severity === 'Critical'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {node.severity}
                          </span>
                        </div>
                        <div className="mt-3">
                          <div className="text-xs text-gray-500 mb-1">Affected Entities:</div>
                          <div className="flex flex-wrap gap-1">
                            {node.entities.map((entity, idx) => (
                              <span key={idx} className="inline-flex px-2 py-1 text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded">
                                {entity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Context-Sensitive Table */}
            {renderContextTable()}
          </>
        ) : (
          renderRecommendationsTab()
        )}
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
                {sideDrawerContent.content.split('\n').map((line, idx) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <h4 key={idx} className="font-bold text-gray-900 mt-4 mb-2">{line.replace(/\*\*/g, '')}</h4>;
                  } else if (line.startsWith('- ')) {
                    return <li key={idx} className="text-gray-700 ml-4">{line.substring(2)}</li>;
                  } else if (line.trim() === '') {
                    return <br key={idx} />;
                  } else {
                    return <p key={idx} className="text-gray-700 mb-2">{line}</p>;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationDetail;
