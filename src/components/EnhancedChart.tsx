
import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export interface EnhancedChartProps {
  data: any[];
  type: 'area' | 'line' | 'bar' | 'composed' | 'stacked' | 'pie';
  lines: { dataKey: string; stroke: string; fill: string; fillOpacity: number }[];
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  stacked?: boolean; // Added this optional property
}

const EnhancedChart: React.FC<EnhancedChartProps> = ({
  data,
  type,
  lines,
  height = 300,
  showLegend = false,
  showGrid = false,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  stacked = false
}) => {
  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
          {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} />}
          {showYAxis && <YAxis tickLine={false} axisLine={false} />}
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          {lines.map((line, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              fill={line.fill}
              fillOpacity={line.fillOpacity}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
          {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} />}
          {showYAxis && <YAxis tickLine={false} axisLine={false} />}
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
          {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} />}
          {showYAxis && <YAxis tickLine={false} axisLine={false} />}
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          {lines.map((line, index) => (
            <Bar
              key={index}
              dataKey={line.dataKey}
              fill={line.fill}
              fillOpacity={line.fillOpacity}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'stacked') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
          {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} />}
          {showYAxis && <YAxis tickLine={false} axisLine={false} />}
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          {lines.map((line, index) => (
            <Bar
              key={index}
              dataKey={line.dataKey}
              fill={line.fill}
              fillOpacity={line.fillOpacity}
              stackId="a"
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey={lines[0].dataKey}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={lines[index % lines.length].fill} />
            ))}
          </Pie>
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} />}
        {showYAxis && <YAxis tickLine={false} axisLine={false} />}
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        {lines.map((line, index) => {
          if (index === 0) {
            return (
              <Area
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                fill={line.fill}
                fillOpacity={line.fillOpacity}
              />
            );
          }
          return (
            <Line key={index} type="monotone" dataKey={line.dataKey} stroke={line.stroke} />
          );
        })}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default EnhancedChart;
