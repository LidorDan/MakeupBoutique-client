import React, { useEffect, useMemo, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import "../styles/UserProductsPages.css";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import SubmitBtn from "../components/SubmitBtn";
import Footer from "../components/Footer";
import TotalPriceHook from "../hooks/TotalPriceHook";
import AuthContext from "../store/auth-context";

export default function ShoppingBagPage() {
  const authCtx = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  var totalPrice = TotalPriceHook(products);

  useEffect(() => {
    fetch("http://localhost:3000/shoppingBag?id=" + authCtx.userId)
      .then((Response) => Response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    fetch("http://localhost:3000/shoppingBag/delete", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: authCtx.userId,
        productToDelete: id,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  };

  const handleIncrement = (id, amount) => {
    fetch("http://localhost:3000/shoppingBag/incrementProductAmount", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: authCtx.userId,
        productToUpdate: id,
        // updateAmount: amount,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  };

  const handleDecrement = (id, amount) => {
    fetch("http://localhost:3000/shoppingBag/decrementProductAmount", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: authCtx.userId,
        productToUpdate: id,
        amount: amount,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  };

  const columns = [
    { field: "_id", hide: true },
    {
      field: "title",
      headerName: "Product Name",
      width: 400,
    },
    {
      field: "imgsrc1",
      headerName: "Photo",
      width: 140,
      renderCell: (params) => {
        return <img className="productImg" src={params.row.imgsrc1} alt="" />;
      },
    },
    { field: "brand", headerName: "Brand", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      renderCell: (params) => (
        <>
          <button
            className="btn_dec"
            onClick={() => handleDecrement(params.row._id, params.row.amount)}
          >
            -
          </button>
          <b>{params.row.amount}</b>
          <button
            className="btn_inc"
            onClick={() => handleIncrement(params.row._id, params.row.amount)}
          >
            +
          </button>
        </>
      ),
    },
    {
      field: "action",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="productDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const rows = useMemo(
    () => products.map((row, index) => ({ ...row, id: row._id })),
    [products]
  );

  return (
    <>
      <NavBar></NavBar>
      <Box
        className="listContainerShoppingBag"
        sx={{ height: 400, width: "100%" }}
      >
        <h4 className="pageTitle">Shopping Bag:</h4>
        <DataGrid
          rowHeight={170}
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[products.length]}
        />
      </Box>
      <div className="total text-center">
        <p>Total price : {totalPrice} ₪</p>
      </div>
      <br></br>
      <SubmitBtn
        total_price={totalPrice}
        products={products}
        setProducts={setProducts}
      ></SubmitBtn>
      <Footer></Footer>
    </>
  );
}
