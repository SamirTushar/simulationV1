# Supply Chain Simulation Demo Guide

## Quick Start

The application is now running at: **http://localhost:5173**

## Demo Flow

### 1. View Pre-loaded Simulations (Home Page)
- **Location**: http://localhost:5173/
- **What to see**:
  - 6 pre-loaded realistic simulations with different disruption types
  - Summary stats at the top showing total impact across all simulations
  - Sortable table with columns for name, disruption type, date, status, orders, revenue
  - Click any column header to sort (arrows indicate current sort direction)
  - Checkboxes to select simulations for comparison (max 3)

### 2. View Simulation Details
- **How to access**: Click any simulation name or "View Details" button
- **Example**: Click "Shanghai Port Congestion - Q4 Electronics"
- **What to see**:
  - Summary cards showing key metrics (orders impacted, revenue at risk, average delay, critical orders)
  - Simulation variables used
  - **Interactive Cascade Timeline**: Shows how the disruption ripples through the supply chain
    - Color-coded by severity (red = critical, orange = high, yellow = medium, green = low)
    - Each event shows timestamp, description, and affected entities
  - **Sortable Orders Table**: Click column headers to sort by order ID, customer, value, delay, or status
    - Shows original vs new delivery dates
    - Status badges (Critical, Delayed, At Risk)

### 3. Create New Simulation (V1)
- **Location**: http://localhost:5173/create-v1
- **How to use**:
  1. Enter a simulation name (e.g., "Test Port Delay - Los Angeles")
  2. Select a disruption type from dropdown
  3. Enter a location (e.g., "Los Angeles, CA")
  4. Click "Run Simulation"
- **What happens**:
  - You're redirected to home page
  - New simulation appears at top with "Running" status
  - After 3 seconds, status changes to "Completed"
  - Click to view full details with auto-generated data

### 4. Create Advanced Simulation (V2)
- **Location**: http://localhost:5173/create-v2
- **How to use**:
  1. Enter simulation name
  2. Select disruption type
  3. Enter primary location
  4. Set duration (days)
  5. Select severity level (Low/Medium/High/Critical) - click the buttons
  6. Optional: Add affected product category
  7. Optional: Add secondary location for ripple effect
  8. Click "Run Advanced Simulation"
- **What's different**:
  - More sophisticated impact calculations based on severity
  - Longer delays for higher severity
  - More orders affected for critical scenarios
  - Secondary location creates additional cascade events

### 5. Compare Simulations
- **How to access**:
  1. Go to home page
  2. Check the boxes next to 2-3 simulations
  3. Click "Compare (N)" button that appears
- **What to see**:
  - Side-by-side view of selected simulations
  - Visual progress bars showing relative impact
  - All metrics compared: orders, revenue, delays, critical orders
  - Variables used in each simulation
  - Cascade event counts
  - Insights section highlighting highest impact scenarios
  - Individual "View Full Details" buttons

## Key Features to Demonstrate

### Interactive Sorting
- Every table has sortable columns
- Click column headers to toggle ascending/descending
- Blue arrows indicate current sort column and direction

### Color-Coded System
- **Disruption Types**: Each has unique color (Port = orange, Quality = red, Weather = purple, etc.)
- **Status**: Completed = green, Running = blue, Failed = red
- **Severity**: Critical = red, High = orange, Medium = yellow, Low = green
- **Order Status**: Critical = red, Delayed = yellow, At Risk = orange

### Client-Side Only
- All functionality works without backend
- Data persists during session but resets on refresh
- New simulations generate realistic mock data instantly

### Realistic Enterprise Data
- Real customer names (Best Buy, Amazon, Walmart, Target, etc.)
- Realistic SKU formats
- Enterprise order values ($50K - $2.7M per order)
- Real-world locations and suppliers
- Plausible delay scenarios

## Testing Checklist

- [ ] View all 6 pre-loaded simulations
- [ ] Sort table by different columns
- [ ] View details of at least 2 different simulations
- [ ] Examine cascade timeline and see color-coded events
- [ ] Sort impacted orders table by different columns
- [ ] Create new V1 simulation and watch status change from Running to Completed
- [ ] Create new V2 simulation with high severity and secondary location
- [ ] Select 2-3 simulations and view comparison
- [ ] Remove a simulation from comparison
- [ ] Navigate between all views using navigation buttons

## Routes Summary

- `/` - Simulation List (Home)
- `/simulation/:id` - Simulation Detail View
- `/create-v1` - Create Simulation V1 (Single Variable)
- `/create-v2` - Create Simulation V2 (Multi-Variable)
- `/compare` - Comparison View (2-3 simulations)

## Technical Notes

- Built with React 18 + TypeScript
- Styled with Tailwind CSS
- Client-side routing with React Router
- Context API for state management
- Responsive design
- No backend required
- All interactions are instant

## Stopping the Server

To stop the development server, press `Ctrl+C` in the terminal where it's running.
