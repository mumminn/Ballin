import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type StatPieProps = {
  win: number;
  loss: number;
  draw: number;
  className?: string;
};

const COLORS = {
  win:  "#789D90",
  loss: "#FBE8A8",
  draw: "#E9E9E9",
};

export default function StatPie({ win, loss, draw, className }: StatPieProps) {
  const data = useMemo(
    () =>
      [
        { key: "win",  value: win,  color: COLORS.win },
        { key: "loss", value: loss, color: COLORS.loss },
        { key: "draw", value: draw, color: COLORS.draw },
      ].filter(d => d.value > 0),
    [win, loss, draw]
  );

  const renderLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value, name } = props;
    if (!value) return null;

    const RAD = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + r * Math.cos(-midAngle * RAD);
    const y = cy + r * Math.sin(-midAngle * RAD);

    const text =
      name === "win"  ? `${value}승` :
      name === "loss" ? `${value}패` :
                        `${value}무`;

    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-black text-[18px] font-extrabold"
      >
        {text}
      </text>
    );
  };

  if (data.length === 0) {
    return <div className={`flex items-center justify-center h-[300px] ${className ?? ""}`}>데이터 없음</div>;
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={350}
        className="
        [&_.recharts-sector]:outline-none
        [&_.recharts-sector:focus]:outline-none
        [&_.recharts-sector:focus-visible]:outline-none
      "
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="key"
            startAngle={90}
            endAngle={-270}
            outerRadius={120}
            strokeWidth={3}
            labelLine={false}
            stroke="none"
            label={renderLabel}
          >
            {data.map((d) => (
              <Cell key={d.key} fill={d.color} name={d.key} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}