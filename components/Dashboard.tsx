"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "00:00", val: 400 },
  { name: "04:00", val: 600 },
  { name: "08:00", val: 1200 },
  { name: "12:00", val: 800 },
  { name: "16:00", val: 1500 },
  { name: "20:00", val: 1100 },
];

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 p-10 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] backdrop-blur-xl">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1 block">
              Telemetry
            </span>
            <h3 className="text-2xl font-bold tracking-tight">
              Throughput Flux
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block">
              Average confidence
            </span>
            <span className="text-xl font-bold font-mono">99.21%</span>
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#222"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#444"
                fontSize={10}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#000",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                }}
                itemStyle={{
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              />
              <Area
                type="monotone"
                dataKey="val"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorVal)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-10">
        <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-[2rem]">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">
            Cluster Health
          </h4>
          <div className="space-y-4">
            {[
              {
                label: "Neural-v4",
                status: "Optimal",
                color: "bg-emerald-500",
              },
              {
                label: "Data-Ingest",
                status: "Stable",
                color: "bg-indigo-500",
              },
              { label: "Model-Recal", status: "Wait", color: "bg-amber-500" },
            ].map((node) => (
              <div
                key={node.label}
                className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0 last:pb-0"
              >
                <span className="text-xs font-mono font-bold text-zinc-300">
                  {node.label}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">
                    {node.status}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${node.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-[2rem]">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-4">
            Core Suggestion
          </span>
          <p className="text-sm text-zinc-300 leading-relaxed mb-6">
            Redistribute processing cycles to the Eastern node cluster to reduce
            ingestion latency by an estimated 14%.
          </p>
          <button className="w-full py-3 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-indigo-400 transition-colors">
            Authorize Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
