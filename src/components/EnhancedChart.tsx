
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
  Legend,
  ReferenceLine,
  ComposedChart
} from 'recharts';

interface EnhancedChartProps {
  data: Array<any>;
  type: 'line' | 'area' | 'bar' | 'composed' | 'stacked';
  height?: number | string;
  lines?: Array<{
    dataKey: string;
    stroke: string;
    strokeWidth?: number;
    fill?: string;
    fillOpacity?: number;
  }>;
  xAxisKey?: string;
  showGrid?: boolean;
  renderTooltip?: (props: any) => React.ReactNode;
  yAxisFormatter?: (value: number) => string;
  className?: string;
}

const EnhancedChart: React.FC<EnhancedChartProps> = ({
  data,
  type,
  height = '100%',
  lines = [{ dataKey: 'value', stroke: '#10B981', strokeWidth: 2 }],
  xAxisKey = 'name',
  showGrid = true,
  renderTooltip,
  yAxisFormatter = (value) => `₹${value}`,
  className = ''
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={yAxisFormatter}
            />
            <Tooltip content={renderTooltip} />
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                strokeWidth={line.strokeWidth || 2}
                dot={{ fill: line.stroke, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={yAxisFormatter}
            />
            <Tooltip content={renderTooltip} />
            {lines.map((line, index) => (
              <Area
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                fill={line.fill || line.stroke}
                fillOpacity={line.fillOpacity || 0.2}
                strokeWidth={line.strokeWidth || 2}
              />
            ))}
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />}
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={yAxisFormatter}
            />
            <Tooltip content={renderTooltip} />
            {lines.map((line, index) => (
              <Bar
                key={index}
                dataKey={line.dataKey}
                fill={line.fill || line.stroke}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );
      case 'composed':
        return (
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />}
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={yAxisFormatter}
            />
            <Tooltip content={renderTooltip} />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            {lines.map((line, index) => {
              if (index === 0) {
                return (
                  <Bar
                    key={index}
                    dataKey={line.dataKey}
                    fill={line.fill || line.stroke}
                    radius={[4, 4, 0, 0]}
                  />
                );
              } else {
                return (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={line.dataKey}
                    stroke={line.stroke}
                    strokeWidth={line.strokeWidth || 2}
                    dot={{ fill: line.stroke, strokeWidth: 2 }}
                  />
                );
              }
            })}
          </ComposedChart>
        );
      case 'stacked':
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />}
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={yAxisFormatter}
            />
            <Tooltip content={renderTooltip} />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            {lines.map((line, index) => (
              <Bar
                key={index}
                dataKey={line.dataKey}
                fill={line.fill || line.stroke}
                stackId="a"
                radius={index === 0 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        );
      default:
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
            <XAxis dataKey={xAxisKey} />
            <YAxis tickFormatter={yAxisFormatter} />
            <Tooltip />
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                strokeWidth={line.strokeWidth || 2}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className={`chart-container ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default EnhancedChart;
