import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const [chartData, setChartData] = useState<any>(null);

  const getChart = async () => {
    const URL = `http://${import.meta.env.VITE_PRIVATE_IP}:3000/api/get-order-logs`;

    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_X_API_KEY,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Network response was not ok");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const labels = Array.from({ length: 8 }, (_, i) => (9 + i).toString()); // ["9", "10", ..., "16"]
        const groupedData: { [key: string]: number } = {};

        data.forEach((item: any) => {
          if (item.PRODUCT_NAME) {
            const hour = item.ORDER_TIME.split(":")[0];
            const price = item.PRODUCT_NAME === "たません" ? 200 : 400;
            if (labels.includes(hour)) {
              groupedData[hour] = (groupedData[hour] || 0) + price * item.PRODUCT_QUANTITY;
            }
          }
        });

        const values = labels.map((hour) => groupedData[hour] || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "時間ごとの売り上げ",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getChart();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          layout: {
            padding: 30, // 全方向に30ピクセルの余白を追加
          },
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "時間ごとの売り上げ (円)",
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;