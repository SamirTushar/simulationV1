import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

const PerfectStormDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedNode, setSelectedNode] = useState<number>(6);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [sideDrawerContent, setSideDrawerContent] = useState<{ title: string; content: string } | null>(null);

  // Scenario Data
  const scenarioData = useMemo(() => ({
    name: 'Q1 Multi-Event - CNY + Viral Launch + Port Crisis',
    createdAt: '2026-01-20T08:00:00Z',
    variables: [
      { name: 'Total Events', value: '4 simultaneous' },
      { name: 'Event Window', value: 'Jan 20 - Feb 28, 2026' },
      { name: 'Primary Driver', value: 'Demand surge (+85%)' },
      { name: 'Compounding Factors', value: 'Production down 90%, Ports +10d, Suppliers +14d' },
    ],
    summary: {
      ordersImpacted: 892,
      revenueAtRisk: 67340000,
      averageDelay: 30,
      criticalOrders: 284,
    },
  }), []);

  // Event cascade data
  const cascadeEvents = useMemo(() => [
    {
      id: 1,
      title: 'Initial Disruptions',
      description: '4 simultaneous events across supply and demand',
      severity: 'Critical' as const,
      affectedEntities: ['4 plants (90% down)', '3 ports (+10d delay)', '4 suppliers (+14d delay)', 'Premium smartphones (+85% surge)'],
      timeframe: 'Day 0',
    },
    {
      id: 2,
      title: 'Component Supply Crisis',
      description: 'Port congestion delays shipments, supplier CNY delays compound impact',
      severity: 'Critical' as const,
      affectedEntities: ['18 critical components', '22 active shipments', 'Combined delay: 24 days'],
      timeframe: 'Days 1-8',
    },
    {
      id: 3,
      title: 'Production Paralysis',
      description: 'Plants at 10% capacity, but skeleton crews can\'t run without components',
      severity: 'Critical' as const,
      affectedEntities: ['16 production lines stopped', '8 SKUs with zero output', 'Planned 10% becomes 0%'],
      timeframe: 'Days 5-15',
    },
    {
      id: 4,
      title: 'Inventory Depletion Acceleration',
      description: 'Normal 20-day depletion becomes 8 days with +85% demand and zero replenishment',
      severity: 'Critical' as const,
      affectedEntities: ['12 distribution centers', '18 smartphone SKUs', '18.5x normal depletion rate'],
      timeframe: 'Days 8-18',
    },
    {
      id: 5,
      title: 'Panic Buying & Market Distortion',
      description: 'Shortages trigger duplicate orders, retail hoarding, gray market activity',
      severity: 'High' as const,
      affectedEntities: ['E-commerce channels', 'Retail panic orders', 'Gray market', 'Apparent +140% demand'],
      timeframe: 'Days 12-25',
    },
    {
      id: 6,
      title: 'Order Fulfillment Collapse',
      description: '892 orders unfulfillable, $67M revenue at risk, customer satisfaction crisis',
      severity: 'Critical' as const,
      affectedEntities: ['Major retail partners', 'E-commerce platforms', 'Carrier contracts', '3.2x worse than single event'],
      timeframe: 'Days 15-40',
    },
  ], []);

  // Table 1: Multi-Event Overview - Disruption Matrix
  const disruptionMatrixData = useMemo(() => [
    { event: 'Event 1', type: 'Capacity Disruption', timing: 'Jan 28 - Feb 18', severity: 'High', affectedEntities: '4 plants, 16 lines', plannedMitigation: 'Safety stock buffer', actualImpact: '90% capacity loss', interactionEffect: 'Amplifies Event 3 impact' },
    { event: 'Event 2', type: 'Port Congestion', timing: 'Jan 20 - Feb 10', severity: 'Medium', affectedEntities: '3 ports, 22 shipments', plannedMitigation: 'Expedite pre-CNY', actualImpact: '+10 day delay', interactionEffect: 'Compounds with Event 4' },
    { event: 'Event 3', type: 'Demand Surge', timing: 'Feb 1 - Feb 28', severity: 'High', affectedEntities: 'Premium phones, 2 regions', plannedMitigation: 'Flexible allocation', actualImpact: '+85% demand spike', interactionEffect: 'Multiplies Events 1,2,4 impact' },
    { event: 'Event 4', type: 'Supplier Delay', timing: 'Jan 25 - Feb 15', severity: 'Medium', affectedEntities: '4 suppliers, 18 components', plannedMitigation: 'Buffer inventory', actualImpact: '+14 day delay', interactionEffect: 'Compounds with Event 2' },
    { event: 'Combined', type: 'Multi-Event', timing: 'Jan 20 - Feb 28', severity: 'Critical', affectedEntities: 'Entire supply chain', plannedMitigation: 'Insufficient mitigation', actualImpact: '9.2/10 severity', interactionEffect: '3.2x worse than sum of parts' },
  ], []);

  // Table 2: Component Supply Crisis - Shipment Status
  const componentSupplyData = useMemo(() => [
    { shipmentId: 'SHP-2026-1201', supplier: 'Foxconn Manufacturing', component: 'A17 Pro Chipset', originalEta: 'Feb 1', portDelay: '+10d', supplierDelay: '+14d', combinedDelay: '+24d', newEta: 'Feb 25', destinationPlant: 'Plant-Vietnam-03', productionImpact: '21,000 units', poValue: 2100000 },
    { shipmentId: 'SHP-2026-1202', supplier: 'BOE Display', component: 'OLED 6.7" Panel', originalEta: 'Jan 28', portDelay: '+10d', supplierDelay: '+14d', combinedDelay: '+24d', newEta: 'Feb 21', destinationPlant: 'Plant-India-04', productionImpact: '18,500 units', poValue: 1850000 },
    { shipmentId: 'SHP-2026-1203', supplier: 'BYD Electronics', component: 'Battery 5000mAh', originalEta: 'Feb 3', portDelay: '+10d', supplierDelay: '+14d', combinedDelay: '+24d', newEta: 'Feb 27', destinationPlant: 'Plant-Malaysia-01', productionImpact: '24,000 units', poValue: 1680000 },
    { shipmentId: 'SHP-2026-1204', supplier: 'Luxshare Precision', component: 'USB-C Assembly', originalEta: 'Jan 30', portDelay: '+10d', supplierDelay: '+14d', combinedDelay: '+24d', newEta: 'Feb 23', destinationPlant: 'Plant-China-01', productionImpact: '38,000 units', poValue: 570000 },
    { shipmentId: 'SHP-2026-1205', supplier: 'Foxconn Manufacturing', component: 'Camera Module 48MP', originalEta: 'Feb 5', portDelay: '+10d', supplierDelay: '+14d', combinedDelay: '+24d', newEta: 'Mar 1', destinationPlant: 'Plant-Vietnam-03', productionImpact: '16,800 units', poValue: 1344000 },
    { shipmentId: 'SHP-2026-1206', supplier: 'BOE Display', component: 'OLED 6.5" Panel', originalEta: 'Feb 2', portDelay: '+10d', supplierDelay: '+14d', combinedDelay: '+24d', newEta: 'Feb 26', destinationPlant: 'Plant-India-04', productionImpact: '19,200 units', poValue: 1728000 },
    { shipmentId: 'SHP-2026-1207', supplier: 'BYD Electronics', component: 'Fast Charger 65W', originalEta: 'Jan 27', portDelay: '+10d', supplierDelay: '+14d', combinedDelay: '+24d', newEta: 'Feb 20', destinationPlant: 'Plant-Malaysia-01', productionImpact: '28,500 units', poValue: 855000 },
    { shipmentId: 'SHP-2026-1208', supplier: 'Luxshare Precision', component: 'Audio Module', originalEta: 'Feb 4', portDelay: '+10d', supplierDelay: '+14d', combinedDelay: '+24d', newEta: 'Feb 28', destinationPlant: 'Plant-Vietnam-03', productionImpact: '32,000 units', poValue: 640000 },
    { shipmentId: 'SHP-2026-1209', supplier: 'Foxconn Manufacturing', component: 'Mainboard Assembly', originalEta: 'Jan 29', portDelay: '+10d', supplierDelay: '+14d', combinedDelay: '+24d', newEta: 'Feb 22', destinationPlant: 'Plant-India-04', productionImpact: '14,200 units', poValue: 1988000 },
    { shipmentId: 'SHP-2026-1210', supplier: 'BOE Display', component: 'Touch Controller IC', originalEta: 'Feb 6', portDelay: '+10d', supplierDelay: '+14d', combinedDelay: '+24d', newEta: 'Mar 2', destinationPlant: 'Plant-China-01', productionImpact: '27,500 units', poValue: 825000 },
    { shipmentId: 'SHP-2026-1211', supplier: 'BYD Electronics', component: '5G Modem Chipset', originalEta: 'Feb 1', portDelay: '+10d', supplierDelay: '+14d', combinedDelay: '+24d', newEta: 'Feb 25', destinationPlant: 'Plant-Vietnam-03', productionImpact: '22,800 units', poValue: 3192000 },
    { shipmentId: 'SHP-2026-1212', supplier: 'Luxshare Precision', component: 'Antenna Assembly', originalEta: 'Jan 31', portDelay: '+10d', supplierDelay: '+14d', combinedDelay: '+24d', newEta: 'Feb 24', destinationPlant: 'Plant-Malaysia-01', productionImpact: '31,000 units', poValue: 465000 },
  ], []);

  // Table 3: Production Paralysis - Line Status
  const productionParalysisData = useMemo(() => [
    { plant: 'Plant-Vietnam-03', lineId: 'Line V3-A', productSku: 'PHONE-ULTRA-PRO', plannedCapacity: '100%', actualCapacity: '0%', componentShortage: 'A17 Chipset, Camera Module', unitsLostDaily: 2100, backlogAccumulated: 42000, recoveryDate: 'Mar 8', revenueImpact: 42000000 },
    { plant: 'Plant-Vietnam-03', lineId: 'Line V3-B', productSku: 'PHONE-PLUS-MAX', plannedCapacity: '100%', actualCapacity: '0%', componentShortage: 'OLED Panel, Audio Module', unitsLostDaily: 1800, backlogAccumulated: 36000, recoveryDate: 'Mar 10', revenueImpact: 28800000 },
    { plant: 'Plant-India-04', lineId: 'Line I4-A', productSku: 'PHONE-PRO-256', plannedCapacity: '100%', actualCapacity: '0%', componentShortage: 'OLED Panel, Mainboard', unitsLostDaily: 2400, backlogAccumulated: 48000, recoveryDate: 'Mar 6', revenueImpact: 38400000 },
    { plant: 'Plant-India-04', lineId: 'Line I4-B', productSku: 'PHONE-BASE-128', plannedCapacity: '100%', actualCapacity: '0%', componentShortage: 'Display Assembly', unitsLostDaily: 3200, backlogAccumulated: 64000, recoveryDate: 'Mar 5', revenueImpact: 32000000 },
    { plant: 'Plant-Malaysia-01', lineId: 'Line M1-A', productSku: 'PHONE-ULTRA-512', plannedCapacity: '100%', actualCapacity: '0%', componentShortage: 'Battery, Fast Charger', unitsLostDaily: 1600, backlogAccumulated: 32000, recoveryDate: 'Mar 12', revenueImpact: 44800000 },
    { plant: 'Plant-Malaysia-01', lineId: 'Line M1-B', productSku: 'PHONE-PRO-512', plannedCapacity: '100%', actualCapacity: '0%', componentShortage: 'Antenna Assembly', unitsLostDaily: 2000, backlogAccumulated: 40000, recoveryDate: 'Mar 9', revenueImpact: 36000000 },
    { plant: 'Plant-China-01', lineId: 'Line C1-A', productSku: 'PHONE-PLUS-256', plannedCapacity: '100%', actualCapacity: '0%', componentShortage: 'USB-C, Touch Controller', unitsLostDaily: 2800, backlogAccumulated: 56000, recoveryDate: 'Mar 7', revenueImpact: 39200000 },
    { plant: 'Plant-China-01', lineId: 'Line C1-B', productSku: 'PHONE-BASE-256', plannedCapacity: '100%', actualCapacity: '0%', componentShortage: 'Multiple components', unitsLostDaily: 3500, backlogAccumulated: 70000, recoveryDate: 'Mar 11', revenueImpact: 42000000 },
    { plant: 'Plant-Vietnam-03', lineId: 'Line V3-C', productSku: 'PHONE-ULTRA-256', plannedCapacity: '100%', actualCapacity: '0%', componentShortage: '5G Modem, Chipset', unitsLostDaily: 1900, backlogAccumulated: 38000, recoveryDate: 'Mar 8', revenueImpact: 49400000 },
    { plant: 'Plant-India-04', lineId: 'Line I4-C', productSku: 'PHONE-PRO-128', plannedCapacity: '100%', actualCapacity: '0%', componentShortage: 'Display, Battery', unitsLostDaily: 2700, backlogAccumulated: 54000, recoveryDate: 'Mar 6', revenueImpact: 37800000 },
  ], []);

  // Table 4: Inventory Depletion - DC Crisis
  const inventoryDepletionData = useMemo(() => [
    { dcLocation: 'Los Angeles DC', region: 'West Coast', sku: 'PHONE-ULTRA-PRO', currentStock: 180, normalDemand: '500/day', surgedDemand: '925/day (185%)', daysToStockout: 0.2, stockoutDate: 'Feb 9', replenishmentDate: 'Mar 8', ordersAtRisk: 124, revenueAtRisk: 12400000 },
    { dcLocation: 'Chicago DC', region: 'Midwest', sku: 'PHONE-PLUS-MAX', currentStock: 220, normalDemand: '450/day', surgedDemand: '832/day (185%)', daysToStockout: 0.3, stockoutDate: 'Feb 9', replenishmentDate: 'Mar 10', ordersAtRisk: 98, revenueAtRisk: 7840000 },
    { dcLocation: 'New York DC', region: 'Northeast', sku: 'PHONE-PRO-256', currentStock: 340, normalDemand: '680/day', surgedDemand: '1258/day (185%)', daysToStockout: 0.3, stockoutDate: 'Feb 9', replenishmentDate: 'Mar 6', ordersAtRisk: 156, revenueAtRisk: 12480000 },
    { dcLocation: 'Dallas DC', region: 'South Central', sku: 'PHONE-BASE-128', currentStock: 420, normalDemand: '800/day', surgedDemand: '1480/day (185%)', daysToStockout: 0.3, stockoutDate: 'Feb 9', replenishmentDate: 'Mar 5', ordersAtRisk: 189, revenueAtRisk: 9450000 },
    { dcLocation: 'Seattle DC', region: 'Northwest', sku: 'PHONE-ULTRA-512', currentStock: 95, normalDemand: '220/day', surgedDemand: '407/day (185%)', daysToStockout: 0.2, stockoutDate: 'Feb 9', replenishmentDate: 'Mar 12', ordersAtRisk: 67, revenueAtRisk: 9380000 },
    { dcLocation: 'Atlanta DC', region: 'Southeast', sku: 'PHONE-PRO-512', currentStock: 280, normalDemand: '540/day', surgedDemand: '999/day (185%)', daysToStockout: 0.3, stockoutDate: 'Feb 9', replenishmentDate: 'Mar 9', ordersAtRisk: 112, revenueAtRisk: 10080000 },
    { dcLocation: 'Miami DC', region: 'Florida', sku: 'PHONE-PLUS-256', currentStock: 310, normalDemand: '580/day', surgedDemand: '1073/day (185%)', daysToStockout: 0.3, stockoutDate: 'Feb 9', replenishmentDate: 'Mar 7', ordersAtRisk: 134, revenueAtRisk: 9380000 },
    { dcLocation: 'Phoenix DC', region: 'Southwest', sku: 'PHONE-BASE-256', currentStock: 390, normalDemand: '720/day', surgedDemand: '1332/day (185%)', daysToStockout: 0.3, stockoutDate: 'Feb 9', replenishmentDate: 'Mar 11', ordersAtRisk: 178, revenueAtRisk: 10680000 },
    { dcLocation: 'Denver DC', region: 'Mountain', sku: 'PHONE-ULTRA-256', currentStock: 120, normalDemand: '280/day', surgedDemand: '518/day (185%)', daysToStockout: 0.2, stockoutDate: 'Feb 9', replenishmentDate: 'Mar 8', ordersAtRisk: 76, revenueAtRisk: 9880000 },
    { dcLocation: 'Boston DC', region: 'New England', sku: 'PHONE-PRO-128', currentStock: 260, normalDemand: '490/day', surgedDemand: '906/day (185%)', daysToStockout: 0.3, stockoutDate: 'Feb 9', replenishmentDate: 'Mar 6', ordersAtRisk: 102, revenueAtRisk: 7140000 },
  ], []);

  // Table 5: Panic Buying - Sales Channels
  const panicBuyingData = useMemo(() => [
    { channel: 'Amazon.com', normalDemand: '12,000 units/day', panicAmplification: '2.4x', apparentDemand: '28,800 units/day', duplicateOrders: '8,400 suspected', realDemand: '20,400 estimated', inventoryHoarded: '2,800 units', ordersPlaced: 342, ordersFulfilled: 42, cancellationRisk: '87%' },
    { channel: 'Apple Store Online', normalDemand: '8,500 units/day', panicAmplification: '2.6x', apparentDemand: '22,100 units/day', duplicateOrders: '6,200 suspected', realDemand: '15,900 estimated', inventoryHoarded: '1,900 units', ordersPlaced: 248, ordersFulfilled: 28, cancellationRisk: '89%' },
    { channel: 'Best Buy', normalDemand: '6,800 units/day', panicAmplification: '2.2x', apparentDemand: '14,960 units/day', duplicateOrders: '4,800 suspected', realDemand: '10,160 estimated', inventoryHoarded: '1,400 units', ordersPlaced: 189, ordersFulfilled: 24, cancellationRisk: '87%' },
    { channel: 'Walmart', normalDemand: '5,200 units/day', panicAmplification: '2.1x', apparentDemand: '10,920 units/day', duplicateOrders: '3,600 suspected', realDemand: '7,320 estimated', inventoryHoarded: '1,100 units', ordersPlaced: 142, ordersFulfilled: 18, cancellationRisk: '87%' },
    { channel: 'Target', normalDemand: '4,500 units/day', panicAmplification: '2.3x', apparentDemand: '10,350 units/day', duplicateOrders: '3,200 suspected', realDemand: '7,150 estimated', inventoryHoarded: '950 units', ordersPlaced: 124, ordersFulfilled: 16, cancellationRisk: '87%' },
    { channel: 'Carrier Stores (AT&T/Verizon/T-Mobile)', normalDemand: '9,800 units/day', panicAmplification: '2.5x', apparentDemand: '24,500 units/day', duplicateOrders: '7,200 suspected', realDemand: '17,300 estimated', inventoryHoarded: '2,400 units', ordersPlaced: 298, ordersFulfilled: 38, cancellationRisk: '87%' },
    { channel: 'Gray Market / Resellers', normalDemand: '1,200 units/day', panicAmplification: '4.2x', apparentDemand: '5,040 units/day', duplicateOrders: '2,800 suspected', realDemand: '2,240 estimated', inventoryHoarded: '680 units', ordersPlaced: 68, ordersFulfilled: 12, cancellationRisk: '82%' },
    { channel: 'Regional Electronics Chains', normalDemand: '3,200 units/day', panicAmplification: '2.0x', apparentDemand: '6,400 units/day', duplicateOrders: '2,100 suspected', realDemand: '4,300 estimated', inventoryHoarded: '720 units', ordersPlaced: 84, ordersFulfilled: 14, cancellationRisk: '83%' },
  ], []);

  // Table 6: Order Fulfillment Collapse
  const orderFulfillmentData = useMemo(() => [
    { orderId: 'ORD-2026-15847', customer: 'Amazon', productSku: 'PHONE-ULTRA-PRO', quantity: 12000, orderValue: 12000000, orderDate: 'Feb 3', originalDelivery: 'Feb 10', newDelivery: 'Mar 12', delay: 30, dc: 'Los Angeles DC', status: 'At Risk', cancellationPenalty: 600000 },
    { orderId: 'ORD-2026-15912', customer: 'Best Buy', productSku: 'PHONE-PLUS-MAX', quantity: 8500, orderValue: 6800000, orderDate: 'Feb 4', originalDelivery: 'Feb 11', newDelivery: 'Mar 14', delay: 31, dc: 'Chicago DC', status: 'At Risk', cancellationPenalty: 340000 },
    { orderId: 'ORD-2026-16023', customer: 'Apple Store', productSku: 'PHONE-PRO-256', quantity: 15000, orderValue: 12000000, orderDate: 'Feb 5', originalDelivery: 'Feb 12', newDelivery: 'Mar 10', delay: 26, dc: 'New York DC', status: 'At Risk', cancellationPenalty: 600000 },
    { orderId: 'ORD-2026-16134', customer: 'Walmart', productSku: 'PHONE-BASE-128', quantity: 18000, orderValue: 9000000, orderDate: 'Feb 6', originalDelivery: 'Feb 13', newDelivery: 'Mar 9', delay: 24, dc: 'Dallas DC', status: 'At Risk', cancellationPenalty: 450000 },
    { orderId: 'ORD-2026-16245', customer: 'AT&T', productSku: 'PHONE-ULTRA-512', quantity: 6500, orderValue: 9100000, orderDate: 'Feb 7', originalDelivery: 'Feb 14', newDelivery: 'Mar 16', delay: 30, dc: 'Seattle DC', status: 'At Risk', cancellationPenalty: 455000 },
    { orderId: 'ORD-2026-16356', customer: 'Verizon', productSku: 'PHONE-PRO-512', quantity: 9800, orderValue: 8820000, orderDate: 'Feb 8', originalDelivery: 'Feb 15', newDelivery: 'Mar 13', delay: 26, dc: 'Atlanta DC', status: 'At Risk', cancellationPenalty: 441000 },
    { orderId: 'ORD-2026-16467', customer: 'Target', productSku: 'PHONE-PLUS-256', quantity: 11200, orderValue: 7840000, orderDate: 'Feb 9', originalDelivery: 'Feb 16', newDelivery: 'Mar 11', delay: 23, dc: 'Miami DC', status: 'At Risk', cancellationPenalty: 392000 },
    { orderId: 'ORD-2026-16578', customer: 'T-Mobile', productSku: 'PHONE-BASE-256', quantity: 14500, orderValue: 8700000, orderDate: 'Feb 10', originalDelivery: 'Feb 17', newDelivery: 'Mar 15', delay: 26, dc: 'Phoenix DC', status: 'At Risk', cancellationPenalty: 435000 },
    { orderId: 'ORD-2026-16689', customer: 'Costco', productSku: 'PHONE-ULTRA-256', quantity: 7200, orderValue: 9360000, orderDate: 'Feb 11', originalDelivery: 'Feb 18', newDelivery: 'Mar 12', delay: 22, dc: 'Denver DC', status: 'At Risk', cancellationPenalty: 468000 },
    { orderId: 'ORD-2026-16790', customer: 'B&H Photo', productSku: 'PHONE-PRO-128', quantity: 8900, orderValue: 6230000, orderDate: 'Feb 12', originalDelivery: 'Feb 19', newDelivery: 'Mar 10', delay: 19, dc: 'Boston DC', status: 'At Risk', cancellationPenalty: 311500 },
    { orderId: 'ORD-2026-16801', customer: 'Amazon', productSku: 'PHONE-ULTRA-PRO', quantity: 10500, orderValue: 10500000, orderDate: 'Feb 13', originalDelivery: 'Feb 20', newDelivery: 'Mar 16', delay: 24, dc: 'Los Angeles DC', status: 'At Risk', cancellationPenalty: 525000 },
    { orderId: 'ORD-2026-16912', customer: 'Best Buy', productSku: 'PHONE-PLUS-MAX', quantity: 7800, orderValue: 6240000, orderDate: 'Feb 14', originalDelivery: 'Feb 21', newDelivery: 'Mar 18', delay: 25, dc: 'Chicago DC', status: 'At Risk', cancellationPenalty: 312000 },
    { orderId: 'ORD-2026-17023', customer: 'Apple Store', productSku: 'PHONE-PRO-256', quantity: 13200, orderValue: 10560000, orderDate: 'Feb 15', originalDelivery: 'Feb 22', newDelivery: 'Mar 14', delay: 20, dc: 'New York DC', status: 'At Risk', cancellationPenalty: 528000 },
    { orderId: 'ORD-2026-17134', customer: 'Walmart', productSku: 'PHONE-BASE-128', quantity: 16400, orderValue: 8200000, orderDate: 'Feb 16', originalDelivery: 'Feb 23', newDelivery: 'Mar 13', delay: 18, dc: 'Dallas DC', status: 'At Risk', cancellationPenalty: 410000 },
    { orderId: 'ORD-2026-17245', customer: 'AT&T', productSku: 'PHONE-ULTRA-512', quantity: 5900, orderValue: 8260000, orderDate: 'Feb 17', originalDelivery: 'Feb 24', newDelivery: 'Mar 20', delay: 24, dc: 'Seattle DC', status: 'At Risk', cancellationPenalty: 413000 },
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
              <h3 className="text-lg font-bold text-gray-900">Multi-Event Overview - Disruption Matrix</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affected Entities</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planned Mitigation</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Impact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interaction Effect</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {disruptionMatrixData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.event}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.type}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.timing}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          item.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                          item.severity === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.affectedEntities}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.plannedMitigation}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">{item.actualImpact}</td>
                      <td className="px-4 py-3 text-sm text-red-600 font-medium">{item.interactionEffect}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Disruption Event', `${item.event} (${item.type}) occurred during ${item.timing} with ${item.severity} severity. ${item.interactionEffect}`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={5} />
          </div>
        );

      case 2:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Component Supply Crisis - Shipment Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original ETA</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Port Delay</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Delay</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Combined Delay</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New ETA</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Production Impact</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">PO Value</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {componentSupplyData.map((item) => (
                    <tr key={item.shipmentId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.shipmentId}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.supplier}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.component}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.originalEta}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-800 rounded">
                          {item.portDelay}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-800 rounded">
                          {item.supplierDelay}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">
                          {item.combinedDelay}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">{item.newEta}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.destinationPlant}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.productionImpact}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{formatCurrency(item.poValue)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Shipment Delay', `Shipment ${item.shipmentId} carrying ${item.component} from ${item.supplier} experiences compound delays: ${item.portDelay} port congestion + ${item.supplierDelay} CNY closure = ${item.combinedDelay} total delay. This will impact production of ${item.productionImpact} at ${item.destinationPlant}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={22} />
          </div>
        );

      case 3:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Production Paralysis - Manufacturing Line Status</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Line ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product SKU</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Planned Capacity</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Capacity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component Shortage</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Units Lost Daily</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Backlog</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovery Date</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Impact</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productionParalysisData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.plant}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.lineId}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.productSku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-600">{item.plannedCapacity}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">
                          {item.actualCapacity}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.componentShortage}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600 font-medium">{item.unitsLostDaily.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{item.backlogAccumulated.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.recoveryDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-red-600">{formatCurrency(item.revenueImpact)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Production Paralysis', `${item.lineId} at ${item.plant} is completely stopped (${item.actualCapacity} vs planned ${item.plannedCapacity}) due to shortage of ${item.componentShortage}. Losing ${item.unitsLostDaily.toLocaleString()} units daily, with accumulated backlog of ${item.backlogAccumulated.toLocaleString()} units. Revenue impact: ${formatCurrency(item.revenueImpact)}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={16} />
          </div>
        );

      case 4:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Inventory Depletion Acceleration - Distribution Center Crisis</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DC Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Normal Demand</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surged Demand</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Days to Stockout</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stockout Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Replenishment</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Orders at Risk</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue at Risk</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventoryDepletionData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.dcLocation}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.region}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.sku}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">
                          {item.currentStock}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.normalDemand}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">{item.surgedDemand}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-red-600 font-semibold">{item.daysToStockout}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">{item.stockoutDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.replenishmentDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{item.ordersAtRisk}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-red-600">{formatCurrency(item.revenueAtRisk)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Inventory Crisis', `${item.dcLocation} has only ${item.currentStock} units remaining. Normal demand of ${item.normalDemand} has surged to ${item.surgedDemand}. Expected stockout on ${item.stockoutDate}, with replenishment not arriving until ${item.replenishmentDate}. This affects ${item.ordersAtRisk} orders worth ${formatCurrency(item.revenueAtRisk)}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={12} />
          </div>
        );

      case 5:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Panic Buying & Market Distortion - Sales Channel Analysis</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Normal Demand</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Panic Amplification</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apparent Demand</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Duplicate Orders</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Real Demand Est.</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory Hoarded</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Orders Placed</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Orders Fulfilled</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Cancellation Risk</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {panicBuyingData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.channel}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.normalDemand}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-800 rounded">
                          {item.panicAmplification}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-medium">{item.apparentDemand}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.duplicateOrders}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.realDemand}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.inventoryHoarded}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{item.ordersPlaced}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900">{item.ordersFulfilled}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded">
                          {item.cancellationRisk}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Panic Buying', `${item.channel} experiencing ${item.panicAmplification} panic amplification. Normal demand of ${item.normalDemand} appears as ${item.apparentDemand} due to duplicate orders (${item.duplicateOrders}), hoarding (${item.inventoryHoarded}), creating ${item.cancellationRisk} cancellation risk with only ${item.ordersFulfilled} of ${item.ordersPlaced} orders fulfilled.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={8} />
          </div>
        );

      case 6:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Order Fulfillment Collapse - Customer Orders at Risk</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product SKU</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Order Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Delivery</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Delivery</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delay</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DC</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cancellation Penalty</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderFulfillmentData.map((item) => (
                    <tr key={item.orderId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.customer}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.productSku}</td>
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
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-semibold text-red-600">{formatCurrency(item.cancellationPenalty)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <ExplainButton onClick={() => openExplainDrawer('Order Impact', `Order ${item.orderId} from ${item.customer} for ${item.quantity.toLocaleString()} units of ${item.productSku} (valued at ${formatCurrency(item.orderValue)}) is delayed by ${item.delay} days. Original delivery: ${item.originalDelivery}, New delivery: ${item.newDelivery}. Fulfilling from ${item.dc}. Cancellation penalty: ${formatCurrency(item.cancellationPenalty)}.`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalItems={892} />
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
              {cascadeEvents.map((event) => (
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

export default PerfectStormDetail;
