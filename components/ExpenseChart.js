import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useMemo } from "react";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const ExpenseChart = ({ transactions }) => {
  const chartData = useMemo(() => {
    const categories = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#57FF33"],
        },
      ],
    };
  }, [transactions]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "300px", height: "300px" }}>
        <h3 style={{ textAlign: "center" }}>Expense Breakdown</h3>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart;
