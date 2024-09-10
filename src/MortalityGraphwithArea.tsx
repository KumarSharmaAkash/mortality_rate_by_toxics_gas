import React from 'react';
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Breadcrumb from './components/Breadcrumbs/Breadcrumb';

interface DataPointArea {
  area: number;
  rate: number;
}

interface GraphProps {
  DataForArea: DataPointArea[];
  areaType: string;
}

const MortalityGraphwithArea: React.FC<GraphProps> = ({ DataForArea, areaType }) => {
  const areaTypeColorMap: { [key: string]: string } = {
    square: '#8884d8',
    circle: '#82ca9d',
    triangle: '#ff6347',
  };
  const getColorForAreaType = (type: string): string => {
    return areaTypeColorMap[type] || '#82ca9d'; 
  };

  const formatXAxisTick = (value: number) => value.toFixed(2);

  return (
    <>
      <Breadcrumb pageName="Mortality Rate With Respect To Area" />
      <ResponsiveContainer width="100%" height={450}>
        <LineChart
          data={DataForArea}
          margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="area"
            label={{ value: `Area (meters square)`, position: 'insideBottomRight', offset: -20 }}
            tickFormatter={formatXAxisTick}
          />
          <YAxis
        
            label={{ value: 'Mortality Rate/Area', angle: -90, position: 'insideLeft', offset: -20 }}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="rate"
            stroke={getColorForAreaType(areaType)}
            fill={getColorForAreaType(areaType)}
            fillOpacity={0.3}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke={getColorForAreaType(areaType)}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default MortalityGraphwithArea;
