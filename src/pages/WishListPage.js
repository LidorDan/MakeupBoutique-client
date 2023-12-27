import React, { useEffect, useMemo, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import "../styles/UserProductsPages.css";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Footer from "../components/Footer";
import AuthContext from "../store/auth-context";

export default function WishListPage() {
  const authCtx = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/wishList?id=" + authCtx.userId)
      .then((Response) => Response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    fetch("http://localhost:3000/wishList/delete", {
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

  const addToCartHandler = (id) => {
    fetch("http://localhost:3000/productsPage/addProductToList", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: authCtx.userId,
        productToAdd: id,
        userProductsListType: "shoppingBag",
      }),
    });
  };

  const columns = [
    { field: "_id", hide: true },
    { field: "title", headerName: "Product Name", width: 400 },

    {
      field: "imgsrc1",
      headerName: "Photo",
      width: 140,
      renderCell: (params) => {
        return <img className="productImg" src={params.row.imgsrc1} alt="" />;
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
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
    {
      field: ".",
      headerName: "Add to cart",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <ShoppingCartIcon
              className="productDelete"
              onClick={() => addToCartHandler(params.row._id)}
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
      <Box className="listContainer" sx={{ height: 400, width: "100%" }}>
        <h4 className="pageTitle">Wish List:</h4>
        <DataGrid
          rowHeight={170}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[products.length]}
        />
      </Box>
      <Footer></Footer>
    </>
  );
}
