import { useState, useEffect } from "react";
const TotalPriceHook = (products) => {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(0);
    products.map((product) =>
      setTotalPrice(
        (totalPrice) => totalPrice + parseFloat(product.price) * product.amount
      )
    );
  }, [products]);
  return totalPrice;
};
export default TotalPriceHook;
