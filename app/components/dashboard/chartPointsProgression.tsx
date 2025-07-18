import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
  Cell,
} from "recharts";

const data = [
  {
    name: "Sep, 2024",
    points: 45000,
  },
  {
    name: "Oct, 2024",
    points: 45000 * 3,
  },
  {
    name: "Nov, 2024",
    points: 45000 * 5,
  },
  {
    name: "Dec, 2024",
    points: 45000 * 8,
  },
  {
    name: "Jan, 2025",
    points: 45000 * 10,
  },
  {
    name: "Feb, 2025",
    points: 45000 * 14,
  },
];

interface ChartPointsProgressionProps {
  data: { name: string; points: number }[]; // Define the correct type for 'data'
}

export default class ChartPointsProgression extends PureComponent<ChartPointsProgressionProps> {
  renderDot = (props: any) => {
    const { cx, cy, stroke, payload, r } = props;

    return (
      <Dot
        cx={cx}
        cy={cy}
        r={r * 4.5}
        fill="#FF284C"
        stroke="#008000"
        strokeWidth={10}
      />
    );
  };

  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer
        width="100%"
        height="100%"
        aspect={3}
        className="my-5"
      >
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 50, left: 50, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF284C" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#FF284C" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="cursorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF0000" />
              <stop offset="100%" stopColor="#0000FF" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tickFormatter={(value) => `${value}\n`}
            tick={{ dy: 12 }}
          />
          <CartesianGrid strokeWidth={0} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              opacity: 0.8,
              border: "3px solid #FF284C",
              borderRadius: 10,
            }}
            labelStyle={{ color: "red" }}
            itemStyle={{ color: "black", fontStyle: "bold" }}
            formatter={(value) => `${value.toLocaleString("en-us")}`}
            wrapperStyle={{ zIndex: 100 }} // to make sure the tooltip is on top of other elements.
            cursor={{ stroke: "white", strokeWidth: 30, opacity: 0.3 }} // Increase cursor line thickness
          />
          <Area
            type="monotone"
            dataKey="points"
            stroke="#FF284C"
            color="white"
            strokeWidth={3}
            strokeDashoffset={5}
            fillOpacity={1}
            fill="url(#colorAmount)"
            dot
            // dot={this.renderDot}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
