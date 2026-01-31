"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const metrics = [
  { label: "Active Models", value: "47", change: "+12%", trend: "up" },
  { label: "Insights Generated", value: "1,284", change: "+23%", trend: "up" },
  { label: "Data Sources", value: "18", change: "+3", trend: "up" },
  { label: "Processing Speed", value: "2.4s", change: "-18%", trend: "down" },
];

const insights = [
  {
    title: "Revenue Trend Acceleration",
    source: "Sales Analytics",
    metric: "+24.5%",
    trend: "up",
    time: "2h ago",
    priority: "high",
  },
  {
    title: "Customer Churn Risk",
    source: "CRM Intelligence",
    metric: "8.2%",
    trend: "down",
    time: "4h ago",
    priority: "medium",
  },
  {
    title: "Market Sentiment Shift",
    source: "Social Signals",
    metric: "+12.8%",
    trend: "up",
    time: "6h ago",
    priority: "high",
  },
];

function MetricCard({ metric, index }: { metric: typeof metrics[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-zinc-950 border border-zinc-800 rounded-xl p-6"
    >
      <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2">
        {metric.label}
      </div>
      <div className="flex items-end gap-3">
        <div className="text-4xl font-black">{metric.value}</div>
        <div className={`text-sm font-bold mb-1 ${metric.trend === 'up' ? 'text-green-500' : 'text-blue-500'}`}>
          {metric.change}
        </div>
      </div>
    </motion.div>
  );
}

function InsightCard({ insight, index }: { insight: typeof insights[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-zinc-950 border border-zinc-800 hover:border-indigo-500/50 rounded-xl p-6 cursor-pointer transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-lg group-hover:text-indigo-400 transition-colors">
              {insight.title}
            </h3>
            {insight.priority === 'high' && (
              <span className="px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-xs font-bold text-red-400">
                HIGH
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-500">{insight.source}</p>
        </div>
        <div className={`text-3xl font-black ${insight.trend === 'up' ? 'text-green-500' : 'text-blue-500'}`}>
          {insight.metric}
        </div>
      </div>
      
      <div className="h-20 bg-zinc-900 rounded-lg flex items-end gap-1 p-3 mb-4">
        {[35, 45, 40, 65, 55, 80, 70, 85, 75, 90].map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-sm transition-all group-hover:from-indigo-400 group-hover:to-indigo-300"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-600">{insight.time}</span>
        <button className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
          View Details →
        </button>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-8">
            Command Center
          </span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
            <span className="text-white">Intelligence</span>
            <br />
            <span className="text-gradient">Dashboard</span>
          </h2>
        </motion.div>
        
        <div className="flex gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-64 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 h-fit"
          >
            <div className="mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4">
                <span className="text-black font-black text-2xl">X</span>
              </div>
              <div className="text-sm font-bold text-zinc-500 uppercase tracking-wider">
                Workspace
              </div>
            </div>
            
            {["Insights", "Models", "Data", "Analytics", "Settings"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item.toLowerCase())}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 font-bold transition-all ${
                  activeTab === item.toLowerCase()
                    ? "bg-indigo-500 text-white"
                    : "text-zinc-500 hover:text-white hover:bg-zinc-900"
                }`}
              >
                {item}
              </button>
            ))}
          </motion.div>
          
          <div className="flex-1">
            <div className="grid grid-cols-4 gap-4 mb-8">
              {metrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} index={index} />
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center justify-between"
            >
              <h3 className="text-3xl font-black">Recent Intelligence</h3>
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold transition-all hover:scale-105">
                Generate New
              </button>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <InsightCard key={index} insight={insight} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
