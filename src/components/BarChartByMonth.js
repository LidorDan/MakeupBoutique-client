import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function BarChartByMonth() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/ordersPage/totalPriceLastYear")
      .then((Response) => Response.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const updateMonth = data.map((item) => ({
    month: months[item._id.month - 1],
    Sum: item.Sum,
  }));
  return (
    <div>
      <BarChart
        width={1200}
        height={400}
        data={updateMonth}
        margin={{
          top: 25,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar  dataKey="Sum" fill="#a67d85" />
      </BarChart>
    </div>
  );
}

export default BarChartByMonth;
