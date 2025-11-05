# Supply Chain Simulation Platform

A comprehensive React TypeScript frontend demo for analyzing supply chain disruptions and their cascading impacts.

## Features

### 1. Simulation List Dashboard
- View all simulations with sortable columns (name, date, status, orders impacted, revenue at risk)
- Quick summary stats showing total simulations, orders impacted, revenue at risk, and critical orders
- Select up to 3 simulations for side-by-side comparison
- Filter and sort by various metrics
- Color-coded disruption types and status badges

### 2. Simulation Detail View
- Interactive cascade event timeline showing how disruptions ripple through the supply chain
- Visual timeline with severity-coded events (Critical, High, Medium, Low)
- Comprehensive metrics dashboard (orders impacted, revenue at risk, average delay, critical orders)
- Sortable impacted orders table with drill-down capabilities
- View affected entities and customer impact

### 3. Create Simulation (V1 - Single Variable)
- Quick simulation creation with single disruption variable
- Select from 6 disruption types:
  - Supplier Delay
  - Port Congestion
  - Weather Event
  - Quality Issue
  - Transportation Strike
  - Customs Delay
- Automatic impact calculation
- 3-second simulation runtime with "Running" status indicator
- Auto-generates realistic mock data

### 4. Create Simulation (V2 - Multi-Variable)
- Advanced simulation builder with multiple parameters
- Configure:
  - Primary and secondary locations
  - Duration (1-90 days)
  - Severity levels (Low, Medium, High, Critical)
  - Affected product categories
- Severity-based impact calculations
- Enhanced cascade event generation
- More comprehensive data generation

### 5. Comparison View
- Side-by-side comparison of 2-3 scenarios
- Visual progress bars showing relative impact
- Compare metrics:
  - Orders impacted
  - Revenue at risk
  - Average delay
  - Critical orders
  - Cascade events count
- Insights section highlighting highest impact scenarios
- Individual drill-down to each simulation

## Pre-loaded Simulations

The application comes with 6 realistic pre-loaded simulations:

1. **Shanghai Port Congestion - Q4 Electronics** (147 orders, $8.75M at risk)
   - 14-day port congestion affecting electronics shipments
   - Major retailers impacted: Best Buy, Amazon, Walmart, Target

2. **Semiconductor Supplier Quality Issue** (89 orders, $12.4M at risk)
   - TSMC 5nm chipset quality failure
   - 21-day production halt affecting smartphone and laptop manufacturers

3. **Hurricane Impact - Gulf Coast Logistics** (203 orders, $6.89M at risk)
   - Category 3 hurricane affecting Houston and New Orleans ports
   - Building materials and furniture retailers affected

4. **European Rail Strike - Automotive Parts** (124 orders, $15.6M at risk)
   - 7-day rail strike across Germany and France
   - BMW, VW, Mercedes production slowdowns

5. **Vietnam Supplier Delay - Apparel Production** (178 orders, $4.25M at risk)
   - Power grid failure affecting garment factories
   - Gap, H&M, Zara summer collections delayed

6. **Customs Delay - UK Post-Brexit Pharmaceutical** (67 orders, $9.8M at risk)
   - New regulatory requirements causing border delays
   - NHS and pharmacy networks affected

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Context API** - State management

## Project Structure

```
supply-chain-sim/
├── src/
│   ├── components/
│   │   ├── SimulationList.tsx       # Main dashboard with sortable table
│   │   ├── SimulationDetail.tsx     # Detail view with cascade visualization
│   │   ├── CreateSimulationV1.tsx   # Single-variable simulation builder
│   │   ├── CreateSimulationV2.tsx   # Multi-variable simulation builder
│   │   └── ComparisonView.tsx       # Side-by-side scenario comparison
│   ├── context/
│   │   └── SimulationContext.tsx    # Global state management
│   ├── data/
│   │   └── simulations.json         # 6 pre-loaded realistic simulations
│   ├── types/
│   │   └── simulation.ts            # TypeScript interfaces
│   ├── App.tsx                      # Main app with routing
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Tailwind imports
├── index.html
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 16+ (note: Vite recommends 20.19+ or 22.12+ but works with 22.7+)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Key Behaviors

### Simulation Creation Flow
1. User fills out simulation form (V1 or V2)
2. Clicks "Run Simulation" button
3. Simulation appears in list with "Running" status
4. After 3 seconds, status changes to "Completed"
5. Full cascade events and impacted orders are generated
6. User is redirected to simulation list

### Comparison Flow
1. User selects checkboxes next to 2-3 simulations
2. "Compare" button appears in header
3. Click compare to view side-by-side analysis
4. Remove simulations or clear all to exit comparison
5. Return to list to modify selection

### Cascade Visualization
- Events displayed in chronological order
- Timeline shows progression of disruption
- Color-coded severity indicators
- Expandable affected entities
- Real-time timestamps

## Data Model

### Simulation
```typescript
{
  id: string
  name: string
  disruptionType: DisruptionType
  createdAt: string (ISO 8601)
  status: 'Running' | 'Completed' | 'Failed'
  variables: SimulationVariable[]
  summary: {
    totalOrdersImpacted: number
    totalRevenue: number
    averageDelay: number
    criticalOrders: number
  }
  cascadeEvents: CascadeEvent[]
  impactedOrders: ImpactedOrder[]
}
```

### Cascade Event
```typescript
{
  id: string
  timestamp: string
  eventType: string
  description: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  affectedEntities: string[]
}
```

### Impacted Order
```typescript
{
  orderId: string
  customerName: string
  sku: string
  quantity: number
  orderValue: number
  originalDeliveryDate: string
  newDeliveryDate: string
  delayDays: number
  status: 'At Risk' | 'Delayed' | 'Critical'
}
```

## Styling

The application uses Tailwind CSS with a modern SaaS design:
- Clean, professional color palette
- Responsive grid layouts
- Interactive hover states
- Color-coded severity indicators
- Smooth transitions and animations
- Card-based UI components

## Client-Side Only

This is a fully client-side application:
- No backend API required
- All data stored in browser memory
- Pre-loaded simulations from JSON file
- New simulations generated client-side
- Resets on page refresh

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Future Enhancements

Potential features for production version:
- Backend API integration
- Persistent storage (database)
- User authentication
- Export to PDF/Excel
- Real-time collaboration
- Advanced analytics
- Machine learning predictions
- Email notifications
- Custom dashboards

## License

MIT

## Author

Built with React, TypeScript, and Tailwind CSS
