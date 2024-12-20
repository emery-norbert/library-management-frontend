import React from "react";
import { Pie } from "react-chartjs-2";

const TrafficChart = ({ data }) => {
  const chartData = {
    labels: ["Borrowed", "Book Available", "Members"],
    datasets: [
      {
        data: data,
        backgroundColor: ["#4CAF50", "#FFC107", "#03A9F4"],
        hoverBackgroundColor: ["#45A049", "#FFB300", "#0288D1"],
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Traffic</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default TrafficChart;
