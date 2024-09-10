import React from 'react';
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Breadcrumb from './components/Breadcrumbs/Breadcrumb';

interface DataPointConc {
  conc: number;
  Concentration: number;
}

interface GraphProps {
   dataConc: DataPointConc[];
}

const MortalityGraphChart: React.FC<GraphProps> = ({ dataConc }) => {

  const formatXAxis = (tickItem: number) => {
    return tickItem.toFixed(1);
  };

  return (
    <>
      <Breadcrumb pageName="Mortality Rate With Respect To Concentration Of Toxic Gases " />
      <ResponsiveContainer width="100%" height={450}>
        <LineChart
          data={dataConc}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="conc"
            label={{ value: `Concentration Of Toxic Gases (mg/m³)`, position: 'insideBottomRight', offset: -5 }}
            tickFormatter={formatXAxis} // Apply the formatting function here
          />
          <YAxis
            label={{angle: -90, position: 'insideLeft', offset: -15, value: `Mortality Rate (%)` }}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="Concentration"
            fillOpacity={0.4}
          />
          <Line
            type="monotone"
            dataKey="Concentration"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default MortalityGraphChart;
