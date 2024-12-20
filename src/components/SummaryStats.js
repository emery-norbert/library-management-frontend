import React from "react";

const SummaryStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl font-semibold">{stat.value}</h3>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryStats;