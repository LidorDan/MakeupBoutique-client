import React from "react";
import Product from "./Product";

const ProductList = ({ products,setProducts}) => {
  return (
    <div className="product_page_list-wrap">
      
        {products.map((item) => (
          <Product
            id={item._id}
            title={item.title}
            price={item.price}
            imgsrc1={item.imgsrc1}
            brand={item.brand}
            category={item.category}
            rating={item.rating}
            is_natural={item.is_natural}
            key={item._id}
            setProducts={setProducts}
          ></Product>
        ))}
      
    </div>
  );
};

export default ProductList;


