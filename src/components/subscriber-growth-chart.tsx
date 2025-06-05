'use client';

import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import type { TooltipProps as RechartsTooltipProps } from 'recharts/types/component/Tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Define the type for chart data
interface ChartData {
  formattedDate: string;
  date: string;
  count: number;
  cumulative: number;
}

interface ChartProps {
  data: ChartData[];
  isDark: boolean;
  maxValue: number;
  CustomTooltip: React.ComponentType<RechartsTooltipProps<ValueType, NameType>>;
}

// Create a single dynamic import for all Recharts components
const RechartsComponents = dynamic<ChartProps>(
  () =>
    import('recharts').then((recharts) => {
      const ChartComponent = ({ data, isDark, maxValue, CustomTooltip }: ChartProps) => {
        const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } =
          recharts;

        return (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorCount"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#8884d8"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#8884d8"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient
                  id="colorCumulative"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#82ca9d"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="#82ca9d"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="formattedDate"
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                stroke={isDark ? '#94a3b8' : '#64748b'}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: unknown) => Number(value).toLocaleString()}
                domain={[0, maxValue]}
                width={40}
              />
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                vertical={false}
              />
              <Tooltip
                content={(props: RechartsTooltipProps<ValueType, NameType>) => (
                  <CustomTooltip {...props} />
                )}
                contentStyle={{
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  boxShadow:
                    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorCount)"
                strokeWidth={2}
                activeDot={{ r: 6, stroke: '#8884d8', strokeWidth: 2, fill: '#ffffff' }}
              />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorCumulative)"
                strokeWidth={2}
                activeDot={{ r: 6, stroke: '#82ca9d', strokeWidth: 2, fill: '#ffffff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      };

      return ChartComponent;
    }),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full" />,
  },
);

interface SubscriberGrowthChartProps {
  waitlistId: string;
  className?: string;
  days?: number;
}

const CustomTooltip = ({ active, payload, label }: RechartsTooltipProps<ValueType, NameType>) => {
  if (!active || !payload?.length) return null;

  // Find the original data point to get the correct date
  const originalDate = payload[0]?.payload?.date;
  let formattedDate = label;

  if (originalDate) {
    try {
      // Parse the date correctly
      const date = new Date(originalDate + 'T00:00:00');
      formattedDate = format(date, 'MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting tooltip date:', error);
    }
  }

  return (
    <div className="bg-card p-3 border border-border rounded-md shadow-sm">
      <p className="font-medium text-sm">{formattedDate}</p>
      {payload.map((entry, index) => (
        <p
          key={`tooltip-${index}`}
          className="text-sm"
          style={{ color: entry.color }}
        >
          {entry instanceof Object && entry.dataKey === 'count'
            ? 'New Subscribers'
            : 'Total Subscribers'}
          : <span className="font-medium">{entry.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

export function SubscriberGrowthChart({
  waitlistId,
  className,
  days = 30,
}: SubscriberGrowthChartProps) {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/waitlists/${waitlistId}/subscribers/growth?days=${days}`,
        );

        if (!response.ok) {
          throw new Error('Failed to load growth data');
        }

        const result = await response.json();
        setChartData(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error('Error fetching growth data:', err);
        setError('Failed to load growth data');
      } finally {
        setIsLoading(false);
      }
    };

    if (waitlistId && isMounted) {
      fetchData();
    } else if (!waitlistId) {
      setIsLoading(false);
    }
  }, [waitlistId, days, isMounted]);

  if (!isMounted || isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Subscriber Growth</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Subscriber Growth</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-destructive">
          {error}
        </CardContent>
      </Card>
    );
  }

  // Debug log the raw data
  // console.log('Raw data from API:', data);

  // Format the data for the chart with proper timezone handling
  const formattedChartData = chartData.map((item) => {
    try {
      // Keep the original date string as-is for data integrity
      const originalDate = item.date;

      // Parse the date by adding time component to avoid timezone issues
      const date = new Date(originalDate + 'T00:00:00');

      // Verify the date is valid
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', originalDate);
        return {
          ...item,
          formattedDate: 'Invalid Date',
        };
      }

      // Format the date as 'MMM d' (e.g., 'May 28')
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      // Return the formatted data, keeping original date
      return {
        ...item,
        date: originalDate, // Keep original date string
        formattedDate,
      };
    } catch (error) {
      console.error('Error formatting date:', error, 'for item:', item);
      return {
        ...item,
        formattedDate: 'Date Error',
      };
    }
  });

  // console.log('Formatted chart data:', chartData);

  // Calculate the max value for the Y-axis with some padding
  const maxValue = Math.max(...chartData.map((item) => item.cumulative), 10) * 1.1;

  if (chartData.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Subscriber Growth</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
          No data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Subscriber Growth</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] -mt-2">
        <RechartsComponents
          data={formattedChartData}
          isDark={isDark}
          maxValue={maxValue}
          CustomTooltip={CustomTooltip}
        />
      </CardContent>
    </Card>
  );
}
