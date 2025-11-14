import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

const PerfectStormDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedNode, setSelectedNode] = useState<number>(6);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [sideDrawerContent, setSideDrawerContent] = useState<{ title: string; content: string } | null>(null);

  // Scenario Data
  const scenarioData = useMemo(() => ({
    name: 'Q1 Perfect Storm - CNY + Viral Launch + Port Crisis',
    createdAt: '2026-01-20T08:00:00Z',
    variables: [
      { name: 'Total Events', value: '4 simultaneous' },
      { name: 'Event Window', value: 'Jan 20 - Feb 28, 2026' },
      { name: 'Primary Driver', value: 'Demand surge (+85%)' },
      { name: 'Compounding Factors', value: 'Production down 90%, Ports delayed +10d, Suppliers delayed +14d' },
      { name: 'Recovery Timeline', value: 'March 15, 2026' },
    ],
    summary: {
      ordersImpacted: 892,
      revenueAtRisk: 67340000,
      averageDelay: 30,
      criticalOrders: 284,
      disruptionScore: '9.2/10 (Severe)',
    },
  }), []);

  // Event cascade data
  const cascadeEvents = useMemo(() => [
    {
      id: 1,
      title: 'Initial Disruptions (Multi-Event Trigger)',
      description: '4 simultaneous events across supply and demand',
      severity: 'Critical' as const,
      affectedEntities: ['4 plants (90% down)', '3 ports (+10d delay)', '4 suppliers (+14d delay)', 'Premium smartphones (+85% surge)'],
      timeframe: 'Day 0',
    },
    {
      id: 2,
      title: 'Component Supply Crisis (Events 2+4 Compound)',
      description: 'Port congestion delays shipments, supplier CNY delays compound impact',
      severity: 'Critical' as const,
      affectedEntities: ['18 critical components', '22 active shipments', 'Normal 14-day delay + 10-day port delay = 24-day total delay'],
      timeframe: 'Days 1-8',
    },
    {
      id: 3,
      title: 'Production Paralysis (Events 1+2+4 Compound)',
      description: 'Plants at 10% capacity, but skeleton crews can\'t run without components',
      severity: 'Critical' as const,
      affectedEntities: ['16 production lines stopped', '8 SKUs with zero output', 'Planned 10% becomes 0%'],
      timeframe: 'Days 5-15',
    },
    {
      id: 4,
      title: 'Inventory Depletion Acceleration (All Events Compound)',
      description: 'Normal 20-day depletion becomes 8 days with +85% demand and zero replenishment',
      severity: 'Critical' as const,
      affectedEntities: ['12 distribution centers', '18 smartphone SKUs', '18.5x normal depletion rate'],
      timeframe: 'Days 8-18',
    },
    {
      id: 5,
      title: 'Panic Buying & Market Distortion (Demand Event Amplifies)',
      description: 'Shortages trigger duplicate orders, retail hoarding, gray market activity',
      severity: 'High' as const,
      affectedEntities: ['E-commerce channels', 'Retail panic orders', 'Gray market', 'Actual +85% becomes apparent +140%'],
      timeframe: 'Days 12-25',
    },
    {
      id: 6,
      title: 'Order Fulfillment Collapse (All Events Converge)',
      description: '892 orders unfulfillable, $67M revenue at risk, customer satisfaction crisis',
      severity: 'Critical' as const,
      affectedEntities: ['Major retail partners', 'E-commerce platforms', 'Carrier contracts', '3.2x worse than any single event'],
      timeframe: 'Days 15-40',
    },
  ], []);

  // Table 1: Multi-Event Overview - Disruption Matrix
  const disruptionMatrixData = useMemo(() => [
    { event: 'Event 1', type: 'Capacity Disruption', timing: 'Jan 28 - Feb 18', severity: 'High', affectedEntities: '4 plants, 16 lines', plannedMitigation: 'Safety stock buffer', actualImpact: '90% capacity loss', interactionEffect: 'Amplifies Event 3 impact' },
    { event: 'Event 2', type: 'Port Congestion', timing: 'Jan 20 - Feb 10', severity: 'Medium', affectedEntities: '3 ports, 22 shipments', plannedMitigation: 'Expedite pre-CNY', actualImpact: '+10 day delay', interactionEffect: 'Compounds with Event 4' },
    { event: 'Event 3', type: 'Demand Surge', timing: 'Feb 1 - Feb 28', severity: 'High', affectedEntities: 'Premium phones, 2 regions', plannedMitigation: 'Flexible allocation', actualImpact: '+85% demand spike', interactionEffect: 'Multiplies Events 1,2,4 impact' },
    { event: 'Event 4', type: 'Supplier Delay', timing: 'Jan 25 - Feb 15', severity: 'Medium', affectedEntities: '4 suppliers, 18 components', plannedMitigation: 'Buffer inventory', actualImpact: '+14 day delay', interactionEffect: 'Compounds with Event 2' },
    { event: 'Combined', type: 'Perfect Storm', timing: 'Jan 20 - Feb 28', severity: 'Critical', affectedEntities: 'Entire supply chain', plannedMitigation: 'Insufficient mitigation', actualImpact: '9.2/10 severity', interactionEffect: '3.2x worse than sum of parts' },
  ], []);

  // Table 2: Component Supply Crisis - Shipment Status
  const componentSupplyData = useMemo(() => [
    { shipmentId: 'SHP-2026-1201', supplier: 'Foxconn Manufacturing', component: 'A17 Pro Chipset', originalEta: 'Feb 1, 2026', portDelay: '+10 days', supplierDelay: '+14 days', combinedDelay: '+24 days', newEta: 'Feb 25, 2026', destinationPlant: 'Plant-Vietnam-03', productionImpact: '21,000 units lost', poValue: 2100000 },
    { shipmentId: 'SHP-2026-1202', supplier: 'BOE Display', component: 'OLED 6.7" Panel', originalEta: 'Jan 28, 2026', portDelay: '+10 days', supplierDelay: '+14 days', combinedDelay: '+24 days', newEta: 'Feb 21, 2026', destinationPlant: 'Plant-India-04', productionImpact: '18,500 units lost', poValue: 1850000 },
    { shipmentId: 'SHP-2026-1203', supplier: 'BYD Electronics', component: 'Battery 5000mAh', originalEta: 'Feb 3, 2026', portDelay: '+10 days', supplierDelay: '+14 days', combinedDelay: '+24 days', newEta: 'Feb 27, 2026', destinationPlant: 'Plant-Malaysia-01', productionImpact: '24,000 units lost', poValue: 1680000 },
    { shipmentId: 'SHP-2026-1204', supplier: 'Luxshare Precision', component: 'USB-C Assembly', originalEta: 'Jan 30, 2026', portDelay: '+10 days', supplierDelay: '+14 days', combinedDelay: '+24 days', newEta: 'Feb 23, 2026', destinationPlant: 'Plant-China-01', productionImpact: '38,000 units lost', poValue: 570000 },
    { shipmentId: 'SHP-2026-1205', supplier: 'Foxconn Manufacturing', component: 'Camera Module 48MP', originalEta: 'Feb 5, 2026', portDelay: '+10 days', supplierDelay: '+14 days', combinedDelay: '+24 days', newEta: 'Mar 1, 2026', destinationPlant: 'Plant-Vietnam-03', productionImpact: '16,800 units lost', poValue: 1344000 },
    { shipmentId: 'SHP-2026-1206', supplier: 'BOE Display', component: 'OLED 6.5" Panel', originalEta: 'Feb 2, 2026', portDelay: '+10 days', supplierDelay: '+14 days', combinedDelay: '+24 days', newEta: 'Feb 26, 2026', destinationPlant: 'Plant-India-04', productionImpact: '19,200 units lost', poValue: 1728000 },
    { shipmentId: 'SHP-2026-1207', supplier: 'BYD Electronics', component: 'Fast Charger 65W', originalEta: 'Jan 27, 2026', portDelay: '+10 days', supplierDelay: '+14 days', combinedDelay: '+24 days', newEta: 'Feb 20, 2026', destinationPlant: 'Plant-Malaysia-01', productionImpact: '28,500 units lost', poValue: 855000 },
    { shipmentId: 'SHP-2026-1208', supplier: 'Luxshare Precision', component: 'Audio Module', originalEta: 'Feb 4, 2026', portDelay: '+10 days', supplierDelay: '+14 days', combinedDelay: '+24 days', newEta: 'Feb 28, 2026', destinationPlant: 'Plant-Vietnam-03', productionImpact: '32,000 units lost', poValue: 640000 },
    { shipmentId: 'SHP-2026-1209', supplier: 'Foxconn Manufacturing', component: 'Mainboard Assembly', originalEta: 'Jan 29, 2026', portDelay: '+10 days', supplierDelay: '+14 days', combinedDelay: '+24 days', newEta: 'Feb 22, 2026', destinationPlant: 'Plant-India-04', productionImpact: '14,500 units lost', poValue: 2175000 },
    { shipmentId: 'SHP-2026-1210', supplier: 'BOE Display', component: 'Touch Digitizer', originalEta: 'Feb 6, 2026', portDelay: '+10 days', supplierDelay: '+14 days', combinedDelay: '+24 days', newEta: 'Mar 2, 2026', destinationPlant: 'Plant-Malaysia-01', productionImpact: '22,400 units lost', poValue: 1120000 },
    { shipmentId: 'SHP-2026-1211', supplier: 'BYD Electronics', component: 'Power Management IC', originalEta: 'Feb 1, 2026', portDelay: '+10 days', supplierDelay: '+14 days', combinedDelay: '+24 days', newEta: 'Feb 25, 2026', destinationPlant: 'Plant-China-01', productionImpact: '26,000 units lost', poValue: 1560000 },
    { shipmentId: 'SHP-2026-1212', supplier: 'Luxshare Precision', component: 'Antenna Module', originalEta: 'Jan 31, 2026', portDelay: '+10 days', supplierDelay: '+14 days', combinedDelay: '+24 days', newEta: 'Feb 24, 2026', destinationPlant: 'Plant-Vietnam-03', productionImpact: '29,000 units lost', poValue: 435000 },
  ], []);

  // Table 3: Production Paralysis - Line Status During Crisis
  const productionParalysisData = useMemo(() => [
    { plant: 'Plant-Vietnam-03', lineId: 'Line C1', productSku: 'PHONE-S24U-512', productName: 'Galaxy S24 Ultra 512GB', plannedCapacity: '110 (10%)', actualOutput: 0, outputLoss: -110, reason: 'No components', componentsMissing: 'A17 Pro, Camera, Mainboard', backlogAccumulating: '3,080 units/day', recoveryDate: 'Mar 5, 2026' },
    { plant: 'Plant-Vietnam-03', lineId: 'Line C2', productSku: 'PHONE-S24-256', productName: 'Galaxy S24 256GB', plannedCapacity: '135 (10%)', actualOutput: 0, outputLoss: -135, reason: 'No components', componentsMissing: 'OLED Panel, Battery', backlogAccumulating: '3,780 units/day', recoveryDate: 'Mar 5, 2026' },
    { plant: 'Plant-India-04', lineId: 'Line D1', productSku: 'PHONE-PIXEL8PRO', productName: 'Pixel 8 Pro 256GB', plannedCapacity: '85 (10%)', actualOutput: 0, outputLoss: -85, reason: 'No components', componentsMissing: 'Display, Mainboard', backlogAccumulating: '2,380 units/day', recoveryDate: 'Mar 8, 2026' },
    { plant: 'Plant-India-04', lineId: 'Line D2', productSku: 'PHONE-OP12PRO', productName: 'OnePlus 12 Pro 512GB', plannedCapacity: '75 (10%)', actualOutput: 0, outputLoss: -75, reason: 'No components', componentsMissing: 'OLED Panel, Battery', backlogAccumulating: '2,100 units/day', recoveryDate: 'Mar 8, 2026' },
    { plant: 'Plant-Malaysia-01', lineId: 'Line F1', productSku: 'PHONE-XIAOMI14U', productName: 'Xiaomi 14 Ultra', plannedCapacity: '62 (10%)', actualOutput: 0, outputLoss: -62, reason: 'No components', componentsMissing: 'Battery, Charger, Touch', backlogAccumulating: '1,736 units/day', recoveryDate: 'Mar 6, 2026' },
    { plant: 'Plant-Malaysia-01', lineId: 'Line F2', productSku: 'PHONE-VIVO-X100', productName: 'Vivo X100 Pro', plannedCapacity: '58 (10%)', actualOutput: 0, outputLoss: -58, reason: 'No components', componentsMissing: 'Display, Battery', backlogAccumulating: '1,624 units/day', recoveryDate: 'Mar 6, 2026' },
    { plant: 'Plant-China-01', lineId: 'Line G1', productSku: 'PHONE-OPPO-FIND', productName: 'Oppo Find X6 Pro', plannedCapacity: '92 (10%)', actualOutput: 0, outputLoss: -92, reason: 'No components', componentsMissing: 'USB-C, Power IC', backlogAccumulating: '2,576 units/day', recoveryDate: 'Mar 10, 2026' },
    { plant: 'Plant-China-01', lineId: 'Line G2', productSku: 'PHONE-REALME-GT', productName: 'Realme GT 5 Pro', plannedCapacity: '78 (10%)', actualOutput: 0, outputLoss: -78, reason: 'No components', componentsMissing: 'Antenna, USB-C', backlogAccumulating: '2,184 units/day', recoveryDate: 'Mar 10, 2026' },
    { plant: 'Plant-Vietnam-03', lineId: 'Line C3', productSku: 'PHONE-HONOR-90', productName: 'Honor 90 Pro', plannedCapacity: '68 (10%)', actualOutput: 0, outputLoss: -68, reason: 'No components', componentsMissing: 'Camera, Audio', backlogAccumulating: '1,904 units/day', recoveryDate: 'Mar 5, 2026' },
    { plant: 'Plant-India-04', lineId: 'Line D3', productSku: 'PHONE-MOTO-EDGE', productName: 'Motorola Edge 50 Pro', plannedCapacity: '64 (10%)', actualOutput: 0, outputLoss: -64, reason: 'No components', componentsMissing: 'Display, Mainboard', backlogAccumulating: '1,792 units/day', recoveryDate: 'Mar 8, 2026' },
  ], []);

  // Table 4: Inventory Depletion Acceleration - DC Crisis Status
  const inventoryDepletionData = useMemo(() => [
    { dcLocation: 'Los Angeles DC', sku: 'PHONE-IP15PRO-256', productName: 'iPhone 15 Pro 256GB', stockFeb1: 2850, baselineDailyDemand: 280, surgeDailyDemand: 518, daysToStockoutNormal: 10.2, daysToStockoutActual: 5.5, stockoutDate: 'Feb 7, 2026', demandUnfulfilled: 4626, panicOrders: '+240%' },
    { dcLocation: 'Los Angeles DC', sku: 'PHONE-S24U-512', productName: 'Galaxy S24 Ultra 512GB', stockFeb1: 2420, baselineDailyDemand: 240, surgeDailyDemand: 444, daysToStockoutNormal: 10.1, daysToStockoutActual: 5.5, stockoutDate: 'Feb 7, 2026', demandUnfulfilled: 3996, panicOrders: '+220%' },
    { dcLocation: 'Dallas DC', sku: 'PHONE-S24-256', productName: 'Galaxy S24 256GB', stockFeb1: 3180, baselineDailyDemand: 260, surgeDailyDemand: 481, daysToStockoutNormal: 12.2, daysToStockoutActual: 6.6, stockoutDate: 'Feb 8, 2026', demandUnfulfilled: 4329, panicOrders: '+230%' },
    { dcLocation: 'Chicago DC', sku: 'PHONE-PIXEL8PRO', productName: 'Pixel 8 Pro 256GB', stockFeb1: 1620, baselineDailyDemand: 180, surgeDailyDemand: 333, daysToStockoutNormal: 9.0, daysToStockoutActual: 4.9, stockoutDate: 'Feb 6, 2026', demandUnfulfilled: 2997, panicOrders: '+250%' },
    { dcLocation: 'Atlanta DC', sku: 'PHONE-OP12PRO', productName: 'OnePlus 12 Pro 512GB', stockFeb1: 1880, baselineDailyDemand: 160, surgeDailyDemand: 296, daysToStockoutNormal: 11.8, daysToStockoutActual: 6.4, stockoutDate: 'Feb 8, 2026', demandUnfulfilled: 2664, panicOrders: '+210%' },
    { dcLocation: 'Seattle DC', sku: 'PHONE-XIAOMI14U', productName: 'Xiaomi 14 Ultra', stockFeb1: 1340, baselineDailyDemand: 120, surgeDailyDemand: 222, daysToStockoutNormal: 11.2, daysToStockoutActual: 6.0, stockoutDate: 'Feb 7, 2026', demandUnfulfilled: 1998, panicOrders: '+200%' },
    { dcLocation: 'Boston DC', sku: 'PHONE-VIVO-X100', productName: 'Vivo X100 Pro', stockFeb1: 1520, baselineDailyDemand: 135, surgeDailyDemand: 250, daysToStockoutNormal: 11.3, daysToStockoutActual: 6.1, stockoutDate: 'Feb 7, 2026', demandUnfulfilled: 2250, panicOrders: '+215%' },
    { dcLocation: 'Phoenix DC', sku: 'PHONE-OPPO-FIND', productName: 'Oppo Find X6 Pro', stockFeb1: 1180, baselineDailyDemand: 110, surgeDailyDemand: 204, daysToStockoutNormal: 10.7, daysToStockoutActual: 5.8, stockoutDate: 'Feb 7, 2026', demandUnfulfilled: 1836, panicOrders: '+205%' },
    { dcLocation: 'Denver DC', sku: 'PHONE-REALME-GT', productName: 'Realme GT 5 Pro', stockFeb1: 980, baselineDailyDemand: 95, surgeDailyDemand: 176, daysToStockoutNormal: 10.3, daysToStockoutActual: 5.6, stockoutDate: 'Feb 7, 2026', demandUnfulfilled: 1584, panicOrders: '+225%' },
    { dcLocation: 'Miami DC', sku: 'PHONE-HONOR-90', productName: 'Honor 90 Pro', stockFeb1: 1420, baselineDailyDemand: 125, surgeDailyDemand: 231, daysToStockoutNormal: 11.4, daysToStockoutActual: 6.1, stockoutDate: 'Feb 7, 2026', demandUnfulfilled: 2079, panicOrders: '+218%' },
  ], []);

  // Table 5: Panic Buying & Market Distortion
  const panicBuyingData = useMemo(() => [
    { channel: 'E-commerce', region: 'North America', baselineOrders: 12400, surgeOrders: 22940, panicOrders: 29822, amplificationFactor: '2.40x', duplicateOrders: '6,882 (+30%)', grayMarketActivity: 'High', priceInflation: '+45% above MSRP', customerSentiment: 'Frustrated - seeking alternatives' },
    { channel: 'Retail', region: 'North America', baselineOrders: 18600, surgeOrders: 34410, panicOrders: 41292, amplificationFactor: '2.22x', duplicateOrders: '6,882 (+20%)', grayMarketActivity: 'Medium', priceInflation: '+25% above MSRP', customerSentiment: 'Angry - empty shelves' },
    { channel: 'E-commerce', region: 'Europe', baselineOrders: 9800, surgeOrders: 18130, panicOrders: 24174, amplificationFactor: '2.47x', duplicateOrders: '6,044 (+33%)', grayMarketActivity: 'Very High', priceInflation: '+60% above MSRP', customerSentiment: 'Critical - mass complaints' },
    { channel: 'Retail', region: 'Europe', baselineOrders: 14200, surgeOrders: 26270, panicOrders: 30510, amplificationFactor: '2.15x', duplicateOrders: '4,240 (+16%)', grayMarketActivity: 'Medium', priceInflation: '+30% above MSRP', customerSentiment: 'Negative - switching brands' },
    { channel: 'B2B', region: 'North America', baselineOrders: 5600, surgeOrders: 10360, panicOrders: 11396, amplificationFactor: '2.03x', duplicateOrders: '1,036 (+10%)', grayMarketActivity: 'Low', priceInflation: 'MSRP', customerSentiment: 'Concerned - contract risk' },
    { channel: 'B2B', region: 'Europe', baselineOrders: 4200, surgeOrders: 7770, panicOrders: 8547, amplificationFactor: '2.04x', duplicateOrders: '777 (+10%)', grayMarketActivity: 'Low', priceInflation: 'MSRP', customerSentiment: 'Escalating - SLA penalties' },
    { channel: 'Distributors', region: 'North America', baselineOrders: 8400, surgeOrders: 15540, panicOrders: 20202, amplificationFactor: '2.40x', duplicateOrders: '4,662 (+30%)', grayMarketActivity: 'High', priceInflation: '+40% above MSRP', customerSentiment: 'Hoarding - market manipulation' },
    { channel: 'Distributors', region: 'Europe', baselineOrders: 6800, surgeOrders: 12580, panicOrders: 15725, amplificationFactor: '2.31x', duplicateOrders: '3,145 (+25%)', grayMarketActivity: 'High', priceInflation: '+50% above MSRP', customerSentiment: 'Opportunistic pricing' },
  ], []);

  // Table 6: Order Fulfillment Collapse
  const orderFulfillmentData = useMemo(() => [
    { orderId: 'ORD-2026-50234', customer: 'Best Buy', productSku: 'PHONE-S24U-512', productName: 'Galaxy S24 Ultra 512GB', quantity: 2400, orderValue: 3600000, orderDate: 'Jan 25, 2026', promisedDelivery: 'Feb 8, 2026', actualStatus: 'Backorder', delayDays: 35, eventImpactChain: 'E4→E2→E1→E3', mitigationAttempted: 'Air freight (failed - CNY)' },
    { orderId: 'ORD-2026-50567', customer: 'Amazon', productSku: 'PHONE-IP15PRO-256', productName: 'iPhone 15 Pro 256GB', quantity: 3100, orderValue: 4339000, orderDate: 'Jan 28, 2026', promisedDelivery: 'Feb 11, 2026', actualStatus: 'Backorder', delayDays: 32, eventImpactChain: 'E3→E1→E2→E4', mitigationAttempted: 'DC reallocation (insufficient)' },
    { orderId: 'ORD-2026-50891', customer: 'Walmart', productSku: 'PHONE-S24-256', productName: 'Galaxy S24 256GB', quantity: 2850, orderValue: 3192000, orderDate: 'Feb 1, 2026', promisedDelivery: 'Feb 15, 2026', actualStatus: 'Partial ship', delayDays: 28, eventImpactChain: 'E3→E1 (compound)', mitigationAttempted: '40% fulfilled, rest delayed' },
    { orderId: 'ORD-2026-50123', customer: 'Target', productSku: 'PHONE-PIXEL8PRO', productName: 'Pixel 8 Pro 256GB', quantity: 1980, orderValue: 1980000, orderDate: 'Jan 30, 2026', promisedDelivery: 'Feb 13, 2026', actualStatus: 'Cancelled', delayDays: 0, eventImpactChain: 'E1→E2→E4→E3', mitigationAttempted: 'Customer cancelled' },
    { orderId: 'ORD-2026-51045', customer: 'Verizon', productSku: 'PHONE-OP12PRO', productName: 'OnePlus 12 Pro 512GB', quantity: 2200, orderValue: 2420000, orderDate: 'Feb 3, 2026', promisedDelivery: 'Feb 17, 2026', actualStatus: 'Backorder', delayDays: 30, eventImpactChain: 'E3→E1→E4', mitigationAttempted: 'Expedite (waiting components)' },
    { orderId: 'ORD-2026-50678', customer: 'AT&T', productSku: 'PHONE-XIAOMI14U', productName: 'Xiaomi 14 Ultra', quantity: 1680, orderValue: 1848000, orderDate: 'Jan 27, 2026', promisedDelivery: 'Feb 10, 2026', actualStatus: 'Backorder', delayDays: 33, eventImpactChain: 'E2→E4→E1→E3', mitigationAttempted: 'Priority allocation (insufficient)' },
    { orderId: 'ORD-2026-50912', customer: 'T-Mobile', productSku: 'PHONE-VIVO-X100', productName: 'Vivo X100 Pro', quantity: 1920, orderValue: 2304000, orderDate: 'Feb 2, 2026', promisedDelivery: 'Feb 16, 2026', actualStatus: 'Partial ship', delayDays: 29, eventImpactChain: 'E3→E1 (demand outpaces)', mitigationAttempted: '35% fulfilled' },
    { orderId: 'ORD-2026-51234', customer: 'Apple Store', productSku: 'PHONE-IP15PRO-512', productName: 'iPhone 15 Pro 512GB', quantity: 2650, orderValue: 4240500, orderDate: 'Feb 5, 2026', promisedDelivery: 'Feb 19, 2026', actualStatus: 'Backorder', delayDays: 26, eventImpactChain: 'E3→E1→E2', mitigationAttempted: 'Store transfer (empty)' },
    { orderId: 'ORD-2026-50456', customer: 'Samsung Store', productSku: 'PHONE-S24U-512', productName: 'Galaxy S24 Ultra 512GB', quantity: 2380, orderValue: 3570000, orderDate: 'Jan 29, 2026', promisedDelivery: 'Feb 12, 2026', actualStatus: 'Backorder', delayDays: 31, eventImpactChain: 'E1→E4→E2→E3', mitigationAttempted: 'Factory direct (CNY closed)' },
    { orderId: 'ORD-2026-50789', customer: 'Costco', productSku: 'PHONE-OPPO-FIND', productName: 'Oppo Find X6 Pro', quantity: 1580, orderValue: 1738000, orderDate: 'Feb 1, 2026', promisedDelivery: 'Feb 15, 2026', actualStatus: 'Backorder', delayDays: 28, eventImpactChain: 'E3→E1→E4', mitigationAttempted: 'Bulk allocation (failed)' },
    { orderId: 'ORD-2026-51123', customer: 'B&H Photo', productSku: 'PHONE-REALME-GT', productName: 'Realme GT 5 Pro', quantity: 1420, orderValue: 1278000, orderDate: 'Feb 4, 2026', promisedDelivery: 'Feb 18, 2026', actualStatus: 'Cancelled', delayDays: 0, eventImpactChain: 'E3→E1 (no supply)', mitigationAttempted: 'Customer found alternative' },
    { orderId: 'ORD-2026-50345', customer: 'Newegg', productSku: 'PHONE-HONOR-90', productName: 'Honor 90 Pro', quantity: 1650, orderValue: 1485000, orderDate: 'Jan 31, 2026', promisedDelivery: 'Feb 14, 2026', actualStatus: 'Backorder', delayDays: 30, eventImpactChain: 'E1→E2→E4→E3', mitigationAttempted: 'Negotiating with customer' },
    { orderId: 'ORD-2026-51567', customer: 'Microsoft Store', productSku: 'PHONE-PIXEL8PRO', productName: 'Pixel 8 Pro 256GB', quantity: 1280, orderValue: 1280000, orderDate: 'Feb 6, 2026', promisedDelivery: 'Feb 20, 2026', actualStatus: 'Backorder', delayDays: 24, eventImpactChain: 'E3→E1 (viral demand)', mitigationAttempted: 'Waitlist created' },
    { orderId: 'ORD-2026-50901', customer: 'Dell Direct', productSku: 'PHONE-S24-256', productName: 'Galaxy S24 256GB', quantity: 2120, orderValue: 2374400, orderDate: 'Feb 2, 2026', promisedDelivery: 'Feb 16, 2026', actualStatus: 'Partial ship', delayDays: 27, eventImpactChain: 'E3→E1→E2', mitigationAttempted: '45% fulfilled' },
    { orderId: 'ORD-2026-51234', customer: 'HP Direct', productSku: 'PHONE-OP12PRO', productName: 'OnePlus 12 Pro 512GB', quantity: 1850, orderValue: 2035000, orderDate: 'Feb 5, 2026', promisedDelivery: 'Feb 19, 2026', actualStatus: 'Backorder', delayDays: 25, eventImpactChain: 'E3→E1→E4', mitigationAttempted: 'Corporate escalation' },
  ], []);

  const handleOpenDrawer = (title: string, content: string) => {
    setSideDrawerContent({ title, content });
    setSideDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setSideDrawerOpen(false);
  };

  const getSeverityColor = (severity: 'High' | 'Critical' | 'Medium') => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-50 text-red-700 border border-red-200';
      case 'High':
        return 'bg-orange-50 text-orange-700 border border-orange-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
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

  return (
    <div className="min-h-screen bg-gray-50 ml-[47px]">
      <div className="px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="text-orange-600 hover:text-orange-800 text-sm font-medium mb-4 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Scenario List
          </Link>
          <div className="mt-4">
            <h1 className="text-2xl font-semibold text-gray-900">{scenarioData.name}</h1>
            <p className="mt-1 text-sm text-gray-600">Created on {formatDate(scenarioData.createdAt)}</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Orders Impacted</div>
            <div className="text-2xl font-semibold text-gray-900">{scenarioData.summary.ordersImpacted.toLocaleString()}</div>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Revenue at Risk</div>
            <div className="text-2xl font-semibold text-gray-900">{formatCurrency(scenarioData.summary.revenueAtRisk)}</div>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Critical Orders</div>
            <div className="text-2xl font-semibold text-gray-900">{scenarioData.summary.criticalOrders.toLocaleString()}</div>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Disruption Score</div>
            <div className="text-2xl font-semibold text-red-600">{scenarioData.summary.disruptionScore}</div>
          </div>
        </div>

        {/* Simulation Variables */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Simulation Variables</h2>
          <div className="grid grid-cols-5 gap-4">
            {scenarioData.variables.map((variable, index) => (
              <div key={index} className="border-l-2 border-orange-500 pl-3">
                <div className="text-xs text-gray-500 mb-1">{variable.name}</div>
                <div className="text-sm font-medium text-gray-900">{variable.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Cascade Timeline */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Cascade Timeline</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

            {/* Timeline events */}
            <div className="space-y-6">
              {cascadeEvents.map((event) => (
                <div
                  key={event.id}
                  className={`relative pl-16 pb-6 cursor-pointer transition-all ${
                    selectedNode === event.id ? 'opacity-100' : 'opacity-60'
                  }`}
                  onClick={() => setSelectedNode(event.id)}
                >
                  {/* Node circle */}
                  <div
                    className={`absolute left-6 top-1.5 w-5 h-5 rounded-full border-2 ${
                      selectedNode === event.id
                        ? 'bg-orange-500 border-orange-500'
                        : 'bg-white border-gray-300'
                    }`}
                  ></div>

                  {/* Event content */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">{event.timeframe}</div>
                        <h3 className="text-sm font-semibold text-gray-900">{event.title}</h3>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getSeverityColor(event.severity)}`}>
                        {event.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {event.affectedEntities.map((entity, idx) => (
                        <span key={idx} className="inline-flex px-2 py-1 text-xs bg-white border border-gray-200 rounded">
                          {entity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table 1: Disruption Matrix */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Multi-Event Overview - Disruption Matrix</h2>
            <button
              onClick={() => handleOpenDrawer('Disruption Matrix', 'This table shows how each event interacts and compounds with others, creating a perfect storm scenario where the combined impact is 3.2x worse than the sum of individual events.')}
              className="text-gray-400 hover:text-orange-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timing</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Affected Entities</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Planned Mitigation</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actual Impact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interaction Effect</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {disruptionMatrixData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{row.event}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.timing}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getSeverityColor(row.severity as 'High' | 'Critical' | 'Medium')}`}>
                        {row.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.affectedEntities}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.plannedMitigation}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{row.actualImpact}</td>
                    <td className="px-4 py-3 text-sm text-orange-600">{row.interactionEffect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Component Supply Crisis */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Component Supply Crisis - Shipment Status</h2>
            <button
              onClick={() => handleOpenDrawer('Component Supply Crisis', 'Port delays compound with supplier delays. Normal 14-day supplier delay + 10-day port delay = 24-day total delay, causing massive production impact.')}
              className="text-gray-400 hover:text-orange-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shipment ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Component</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Original ETA</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Port Delay</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier Delay</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Combined Delay</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">New ETA</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination Plant</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Production Impact</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">PO Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {componentSupplyData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-mono">{row.shipmentId}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.supplier}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.component}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.originalEta}</td>
                    <td className="px-4 py-3 text-sm text-orange-600">{row.portDelay}</td>
                    <td className="px-4 py-3 text-sm text-orange-600">{row.supplierDelay}</td>
                    <td className="px-4 py-3 text-sm text-red-600 font-medium">{row.combinedDelay}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.newEta}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.destinationPlant}</td>
                    <td className="px-4 py-3 text-sm text-red-600">{row.productionImpact}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">{formatCurrency(row.poValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 3: Production Paralysis */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Production Paralysis - Line Status During Crisis</h2>
            <button
              onClick={() => handleOpenDrawer('Production Paralysis', 'Plants planned for 10% capacity during CNY, but without components from delayed shipments, actual output becomes 0%. Cannot produce even the skeleton crew 10% because critical components are missing.')}
              className="text-gray-400 hover:text-orange-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plant</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Line ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product SKU</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Planned Capacity (CNY)</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actual Output</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Output Loss</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Components Missing</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Backlog Accumulating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recovery Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productionParalysisData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{row.plant}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-mono">{row.lineId}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-mono">{row.productSku}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.productName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.plannedCapacity}</td>
                    <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">{row.actualOutput}</td>
                    <td className="px-4 py-3 text-sm text-right text-red-600">{row.outputLoss}</td>
                    <td className="px-4 py-3 text-sm text-orange-600">{row.reason}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.componentsMissing}</td>
                    <td className="px-4 py-3 text-sm text-red-600">{row.backlogAccumulating}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.recoveryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 4: Inventory Depletion */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Inventory Depletion Acceleration - DC Crisis Status</h2>
            <button
              onClick={() => handleOpenDrawer('Inventory Depletion', 'Normal 20-day supply depletes in just 8 days due to 85% demand surge with zero replenishment. Depletion rate: 1.85x demand × 0.1x supply = 18.5x normal rate.')}
              className="text-gray-400 hover:text-orange-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">DC Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stock (Feb 1)</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Baseline Daily Demand</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Surge Daily Demand (+85%)</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Days to Stockout (Normal)</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Days to Stockout (Actual)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stockout Date</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Demand Unfulfilled</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Panic Orders</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventoryDepletionData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{row.dcLocation}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-mono">{row.sku}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.productName}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">{row.stockFeb1.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">{row.baselineDailyDemand}</td>
                    <td className="px-4 py-3 text-sm text-right text-orange-600 font-medium">{row.surgeDailyDemand}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">{row.daysToStockoutNormal} days</td>
                    <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">{row.daysToStockoutActual} days</td>
                    <td className="px-4 py-3 text-sm text-red-600">{row.stockoutDate}</td>
                    <td className="px-4 py-3 text-sm text-right text-red-600">{row.demandUnfulfilled.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-orange-600 font-medium">{row.panicOrders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 5: Panic Buying */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Panic Buying & Market Distortion - Demand Amplification</h2>
            <button
              onClick={() => handleOpenDrawer('Panic Buying', 'Customers see shortages and place duplicate orders. Retailers hoard inventory. Gray market becomes active. Actual +85% demand becomes apparent +140% demand due to panic buying behavior.')}
              className="text-gray-400 hover:text-orange-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Baseline Orders (Weekly)</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Surge Orders (+85%)</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Panic Orders (Actual)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amplification Factor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duplicate Orders</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gray Market Activity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price Inflation</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer Sentiment</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {panicBuyingData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{row.channel}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.region}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">{row.baselineOrders.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-right text-orange-600">{row.surgeOrders.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">{row.panicOrders.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-red-600 font-medium">{row.amplificationFactor}</td>
                    <td className="px-4 py-3 text-sm text-orange-600">{row.duplicateOrders}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        row.grayMarketActivity === 'Very High' ? 'bg-red-50 text-red-700 border border-red-200' :
                        row.grayMarketActivity === 'High' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                        row.grayMarketActivity === 'Medium' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                        'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}>
                        {row.grayMarketActivity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-red-600 font-medium">{row.priceInflation}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.customerSentiment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 6: Order Fulfillment Collapse */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Order Fulfillment Collapse - Customer Impact</h2>
            <button
              onClick={() => handleOpenDrawer('Order Fulfillment Collapse', '892 customer orders unfulfillable, $67M revenue at risk. Each order shows exact event chain that caused failure (E4→E2→E1→E3). Revenue impact is 3.2x worse than any single event alone due to compounding effects.')}
              className="text-gray-400 hover:text-orange-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product SKU</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Order Value</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Promised Delivery</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actual Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Delay (Days)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event Impact Chain</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mitigation Attempted</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderFulfillmentData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-mono">{row.orderId}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-mono">{row.productSku}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.productName}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">{row.quantity.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">{formatCurrency(row.orderValue)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.orderDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.promisedDelivery}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        row.actualStatus === 'Backorder' ? 'bg-red-50 text-red-700 border border-red-200' :
                        row.actualStatus === 'Partial ship' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                        'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}>
                        {row.actualStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">{row.delayDays > 0 ? `+${row.delayDays}` : '-'}</td>
                    <td className="px-4 py-3 text-sm text-orange-600 font-mono">{row.eventImpactChain}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{row.mitigationAttempted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Side Drawer */}
      {sideDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleCloseDrawer}></div>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">{sideDrawerContent?.title}</h2>
                    <button
                      onClick={handleCloseDrawer}
                      className="ml-3 text-gray-400 hover:text-gray-500"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <p className="text-sm text-gray-700">{sideDrawerContent?.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfectStormDetail;
