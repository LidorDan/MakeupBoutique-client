import React from "react";
import Footer from "../components/Footer";
import AreaChartByMonth from "../components/AreaChartByMonth";
import BarChartByMonth from "../components/BarChartByMonth";
import NavBar from "../components/NavBar";

import "../styles/OrdersPage.css";

function OrdersPage() {
  return (
    <div>
      <NavBar />
      <u>
        <h3>Income for 2022 per month</h3>
      </u>
      <AreaChartByMonth />
      <br></br>
      <u>
        <h3>Income for 2021 per month</h3>
      </u>
      <BarChartByMonth />
      <Footer />
    </div>
  );
}

export default OrdersPage;
