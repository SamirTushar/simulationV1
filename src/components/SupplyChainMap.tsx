import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line
} from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface Location {
  name: string;
  coordinates: [number, number];
  type: 'disruption' | 'supplier' | 'dc';
}

interface SupplyChainMapProps {
  disruptionLocation: string;
  simulation: any;
}

const SupplyChainMap: React.FC<SupplyChainMapProps> = ({ disruptionLocation, simulation }) => {
  // Define locations based on the simulation
  const locations: Location[] = [
    // Disruption point
    { name: 'Shanghai Port (Disruption)', coordinates: [121.47, 31.23], type: 'disruption' },

    // Suppliers
    { name: 'Foxconn Manufacturing', coordinates: [121.47, 31.23], type: 'supplier' },
    { name: 'Delta Electronics (Taiwan)', coordinates: [121.56, 25.03], type: 'supplier' },
    { name: 'Pegatron Corp', coordinates: [121.47, 31.23], type: 'supplier' },

    // Company DCs
    { name: 'Los Angeles DC', coordinates: [-118.24, 34.05], type: 'dc' },
    { name: 'San Francisco DC', coordinates: [-122.42, 37.77], type: 'dc' },
    { name: 'Seattle DC', coordinates: [-122.33, 47.61], type: 'dc' },
  ];

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'disruption':
        return '#DC2626'; // red-600
      case 'supplier':
        return '#EA580C'; // orange-600
      case 'dc':
        return '#2563EB'; // blue-600
      default:
        return '#6B7280'; // gray-500
    }
  };

  const getMarkerSize = (type: string) => {
    return type === 'disruption' ? 8 : 6;
  };

  // Create connections from disruption to suppliers, and suppliers to DCs
  const connections = [
    // Disruption to suppliers
    ...locations.filter(l => l.type === 'supplier').map(supplier => ({
      from: locations.find(l => l.type === 'disruption')!.coordinates,
      to: supplier.coordinates
    })),
    // Suppliers to DCs
    ...locations.filter(l => l.type === 'supplier').flatMap(supplier =>
      locations.filter(l => l.type === 'dc').map(dc => ({
        from: supplier.coordinates,
        to: dc.coordinates
      }))
    ),
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-lg font-bold text-gray-900">Supply Chain Network Map</h2>
        <p className="text-sm text-gray-600 mt-1">
          Visualizing disruption impact across global supply chain nodes
        </p>
      </div>

      <div className="p-4 bg-gray-50">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 140,
            center: [0, 20]
          }}
          style={{
            width: '100%',
            height: 'auto'
          }}
          className="bg-white rounded-lg shadow-inner"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#F3F4F6"
                  stroke="#E5E7EB"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: '#E5E7EB' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Draw connection lines */}
          {connections.map((conn, i) => (
            <Line
              key={`line-${i}`}
              from={conn.from}
              to={conn.to}
              stroke="#F97316"
              strokeWidth={1}
              strokeLinecap="round"
              strokeOpacity={0.3}
              strokeDasharray="4,4"
            />
          ))}

          {/* Draw markers */}
          {locations.map((location, i) => (
            <Marker key={`marker-${i}`} coordinates={location.coordinates}>
              <g className="cursor-pointer">
                <circle
                  r={getMarkerSize(location.type)}
                  fill={getMarkerColor(location.type)}
                  stroke="white"
                  strokeWidth={2}
                  className="drop-shadow-lg"
                />
                {location.type === 'disruption' && (
                  <>
                    <circle
                      r={12}
                      fill={getMarkerColor(location.type)}
                      opacity={0.2}
                      className="animate-ping"
                    />
                    <circle
                      r={16}
                      fill={getMarkerColor(location.type)}
                      opacity={0.1}
                      className="animate-pulse"
                    />
                  </>
                )}
              </g>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="px-6 py-4 bg-gradient-to-r from-white to-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600 ring-2 ring-red-200"></div>
            <span className="text-gray-700 font-medium">Disruption Epicenter</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-600 ring-2 ring-orange-200"></div>
            <span className="text-gray-700 font-medium">Affected Suppliers (3)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600 ring-2 ring-blue-200"></div>
            <span className="text-gray-700 font-medium">Company DCs (3)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 border-t-2 border-dashed border-orange-400 opacity-50"></div>
            <span className="text-gray-700 font-medium">Impact Flow</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainMap;
