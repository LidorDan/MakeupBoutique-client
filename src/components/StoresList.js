import React from "react";
import Store from "./Store";

const StoresList = ({ stores, setStores }) => {
  return (
    <div className="store_page_list-wrap">
      {stores.map((item) => (
        <Store
          id={item._id}
          city={item.city}
          country={item.country}
          lat={item.lat}
          lon={item.lon}
          phone_number={item.phone_number}
          address={item.address}
          setStores={setStores}
        ></Store>
      ))}
    </div>
  );
};

export default StoresList;
