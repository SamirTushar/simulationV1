export type SimulationStatus = 'Running' | 'Completed' | 'Failed';

export type DisruptionType =
  | 'Supplier Delay'
  | 'Port Congestion'
  | 'Weather Event'
  | 'Quality Issue'
  | 'Transportation Strike'
  | 'Customs Delay';

export interface ImpactedOrder {
  orderId: string;
  customerName: string;
  sku: string;
  quantity: number;
  orderValue: number;
  originalDeliveryDate: string;
  newDeliveryDate: string;
  delayDays: number;
  status: 'At Risk' | 'Delayed' | 'Critical';
}

export interface CascadeEvent {
  id: string;
  timestamp: string;
  eventType: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  affectedEntities: string[];
}

export interface SimulationVariable {
  name: string;
  value: string | number;
  type: 'supplier' | 'location' | 'duration' | 'severity' | 'product';
}

export interface Simulation {
  id: string;
  name: string;
  disruptionType: DisruptionType;
  createdAt: string;
  status: SimulationStatus;
  variables: SimulationVariable[];
  summary: {
    totalOrdersImpacted: number;
    totalRevenue: number;
    averageDelay: number;
    criticalOrders: number;
  };
  cascadeEvents: CascadeEvent[];
  impactedOrders: ImpactedOrder[];
}
