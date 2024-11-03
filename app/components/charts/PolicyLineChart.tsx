import React, { useLayoutEffect, useRef, useMemo, useCallback } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import { Policy } from "../policy-list/PolicyCard";
import { useTheme } from "next-themes";

const PolicyLineChart = React.memo(({ policies }: { policies: Policy[] }) => {
  const chartRef = useRef(null);
  const rootRef = useRef<am5.Root>();
  const { theme } = useTheme();

  const transformPolicyData = useMemo(() => {
    const dateCounts: { [key: string]: number } = {};

    policies.forEach((policy) => {
      if (policy.dateIntroduced) {
        const date = new Date(policy.dateIntroduced)
          .toISOString()
          .split("T")[0];

        dateCounts[date] = (dateCounts[date] || 0) + 1;
      }
    });

    return Object.entries(dateCounts)
      .map(([date, count]) => ({
        date: new Date(date).getTime(),
        count,
      }))
      .sort((a, b) => a.date - b.date);
  }, [policies]);

  const createChart = useCallback(
    (root: am5.Root) => {
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
        })
      );

      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 1,
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 80,
            minorGridEnabled: true,
            pan: "zoom",
          }),
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 1,
          renderer: am5xy.AxisRendererY.new(root, {
            pan: "zoom",
            minGridDistance: 60,
            minorGridEnabled: true,
          }),
        })
      );

      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: "Policies",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "count",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.2,
      });

      series.bullets.push((root, series) => {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Circle.new(root, {
            radius: 4,
            stroke: root.interfaceColors.get("background"),
            strokeWidth: 2,
            fill: series.get("fill"),
          }),
        });
      });

      series.data.setAll(transformPolicyData);

      chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          behavior: "zoomXY",
        })
      );

      series.appear(1000);
      chart.appear(1000, 100);

      return chart;
    },
    [transformPolicyData]
  );

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    if (!rootRef.current) {
      rootRef.current = am5.Root.new(chartRef.current);
    }

    const root = rootRef.current;
    root.setThemes([
      theme === "light"
        ? am5themes_Responsive.new(root)
        : am5themes_Dark.new(root),
    ]);

    createChart(root);

    return () => {
      root.dispose();
    };
  }, [theme, createChart]);

  return (
    <div className="mt-28 max-w-7xl mx-auto py-6 px-4">
      <h1 className="font-bold mb-4 text-gray-900 dark:text-gray-100">
        Policy Data Over Time
      </h1>
      <div
        ref={chartRef}
        style={{ width: "100%", height: "500px" }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      />
    </div>
  );
});

PolicyLineChart.displayName = "PolicyLineChart";

export default PolicyLineChart;
