import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function AreaChartByMonth() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/ordersPage")
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
    Sum:item.Sum
  }));
  return (
    <div style={{ width: 1200, height: 400 }}>
      <ResponsiveContainer >
        <AreaChart
          data={updateMonth}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="Sum" stroke="#a67d85" fill="#a67d85" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartByMonth;
