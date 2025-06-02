'use client';
import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
// Create a single dynamic import for all Recharts components
var RechartsComponents = dynamic(function () {
    return import('recharts').then(function (recharts) {
        var ChartComponent = function (_a) {
            var data = _a.data, isDark = _a.isDark, maxValue = _a.maxValue, CustomTooltip = _a.CustomTooltip;
            var AreaChart = recharts.AreaChart, Area = recharts.Area, XAxis = recharts.XAxis, YAxis = recharts.YAxis, CartesianGrid = recharts.CartesianGrid, Tooltip = recharts.Tooltip, ResponsiveContainer = recharts.ResponsiveContainer;
            return (<ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="formattedDate" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} tickMargin={10}/>
              <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} tickFormatter={function (value) { return Number(value).toLocaleString(); }} domain={[0, maxValue]} width={40}/>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false}/>
              <Tooltip content={function (props) { return <CustomTooltip {...props}/>; }} contentStyle={{
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}/>
              <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorCount)" strokeWidth={2} activeDot={{ r: 6, stroke: '#8884d8', strokeWidth: 2, fill: '#ffffff' }}/>
              <Area type="monotone" dataKey="cumulative" stroke="#82ca9d" fillOpacity={1} fill="url(#colorCumulative)" strokeWidth={2} activeDot={{ r: 6, stroke: '#82ca9d', strokeWidth: 2, fill: '#ffffff' }}/>
            </AreaChart>
          </ResponsiveContainer>);
        };
        return ChartComponent;
    });
}, {
    ssr: false,
    loading: function () { return <Skeleton className="h-[300px] w-full"/>; },
});
var CustomTooltip = function (_a) {
    var _b, _c;
    var active = _a.active, payload = _a.payload, label = _a.label;
    if (!active || !(payload === null || payload === void 0 ? void 0 : payload.length))
        return null;
    // Find the original data point to get the correct date
    var originalDate = (_c = (_b = payload[0]) === null || _b === void 0 ? void 0 : _b.payload) === null || _c === void 0 ? void 0 : _c.date;
    var formattedDate = label;
    if (originalDate) {
        try {
            // Parse the date correctly
            var date = new Date(originalDate + 'T00:00:00');
            formattedDate = format(date, 'MMMM d, yyyy');
        }
        catch (error) {
            console.error('Error formatting tooltip date:', error);
        }
    }
    return (<div className="bg-card p-3 border border-border rounded-md shadow-sm">
      <p className="font-medium text-sm">{formattedDate}</p>
      {payload.map(function (entry, index) { return (<p key={"tooltip-".concat(index)} className="text-sm" style={{ color: entry.color }}>
          {entry.dataKey === 'count' ? 'New Subscribers' : 'Total Subscribers'}:{' '}
          <span className="font-medium">{entry.value.toLocaleString()}</span>
        </p>); })}
    </div>);
};
export function SubscriberGrowthChart(_a) {
    var _this = this;
    var waitlistId = _a.waitlistId, className = _a.className, _b = _a.days, days = _b === void 0 ? 30 : _b;
    var theme = useTheme().theme;
    var _c = useState(false), isMounted = _c[0], setIsMounted = _c[1];
    var _d = useState([]), chartData = _d[0], setChartData = _d[1];
    var _e = useState(true), isLoading = _e[0], setIsLoading = _e[1];
    var _f = useState(null), error = _f[0], setError = _f[1];
    var _g = useState('7d'), selectedPeriod = _g[0], setSelectedPeriod = _g[1];
    var isDark = theme === 'dark';
    useEffect(function () {
        setIsMounted(true);
    }, []);
    useEffect(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        setIsLoading(true);
                        setError(null);
                        return [4 /*yield*/, fetch("/api/waitlists/".concat(waitlistId, "/subscribers/growth?days=").concat(days))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Failed to load growth data');
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        setChartData(Array.isArray(result) ? result : []);
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        console.error('Error fetching growth data:', err_1);
                        setError('Failed to load growth data');
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        if (waitlistId && isMounted) {
            fetchData();
        }
        else if (!waitlistId) {
            setIsLoading(false);
        }
    }, [waitlistId, days, isMounted]);
    if (!isMounted || isLoading) {
        return (<Card className={className}>
        <CardHeader>
          <CardTitle>Subscriber Growth</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <Skeleton className="h-full w-full"/>
        </CardContent>
      </Card>);
    }
    if (error) {
        return (<Card className={className}>
        <CardHeader>
          <CardTitle>Subscriber Growth</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-destructive">
          {error}
        </CardContent>
      </Card>);
    }
    // Debug log the raw data
    // console.log('Raw data from API:', data);
    // Format the data for the chart with proper timezone handling
    var formattedChartData = chartData.map(function (item) {
        try {
            // Keep the original date string as-is for data integrity
            var originalDate = item.date;
            // Parse the date by adding time component to avoid timezone issues
            var date = new Date(originalDate + 'T00:00:00');
            // Verify the date is valid
            if (isNaN(date.getTime())) {
                console.error('Invalid date:', originalDate);
                return __assign(__assign({}, item), { formattedDate: 'Invalid Date' });
            }
            // Format the date as 'MMM d' (e.g., 'May 28')
            var formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });
            // Return the formatted data, keeping original date
            return __assign(__assign({}, item), { date: originalDate, // Keep original date string
                formattedDate: formattedDate });
        }
        catch (error) {
            console.error('Error formatting date:', error, 'for item:', item);
            return __assign(__assign({}, item), { formattedDate: 'Date Error' });
        }
    });
    // console.log('Formatted chart data:', chartData);
    // Calculate the max value for the Y-axis with some padding
    var maxValue = Math.max.apply(Math, __spreadArray(__spreadArray([], chartData.map(function (item) { return item.cumulative; }), false), [10], false)) * 1.1;
    if (chartData.length === 0) {
        return (<Card className={className}>
        <CardHeader>
          <CardTitle>Subscriber Growth</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
          No data available
        </CardContent>
      </Card>);
    }
    return (<Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Subscriber Growth</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] -mt-2">
        <RechartsComponents data={formattedChartData} isDark={isDark} maxValue={maxValue} CustomTooltip={CustomTooltip}/>
      </CardContent>
    </Card>);
}
//# sourceMappingURL=subscriber-growth-chart.jsx.map