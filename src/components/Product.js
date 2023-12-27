import { useState, useCallback } from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { RiHeart3Fill, RiEdit2Fill, RiDeleteBin2Fill } from "react-icons/ri";
import { useContext, useRef } from "react";
import AuthContext from "../store/auth-context";

/*components */
import ProductPopup from "./ProductPopup";

/* styles */

import "../styles/ProductPopup.css";
import "../styles/Product.css";

const Product = (props) => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;
  const isLoggedin = authCtx.isLoggedin;
  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const cat = [
    { value: "Make Up", label: "Make Up" },
    { value: "Skin Care", label: "Skin Care" },
    { value: "Fragrance", label: "Fragrance" },
    { value: "Hair", label: "Hair" },
    { value: "Bath and body", label: "Bath and body" },
  ];

  const [buttonPopup, setButtonPopup] = useState(false);
  const [productid, setProductId] = useState(props.id);
  const [toggleHeart, setToggleHeart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [title, setTitle] = useState(props.title);
  const [category, setCategory] = useState(props.category);
  const [brand, setBrand] = useState(props.brand);
  const [price, setPrice] = useState(props.price);
  const [rating, setRating] = useState(props.rating);
  const [natural, setNatural] = useState(props.is_natural);
  const [imgsrc1, setImgsrc1] = useState(props.imgsrc1);

  const changeColor = useCallback(() => {
    setToggleHeart(!toggleHeart);
  }, []);

  const handleOpen = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    setShowForm(true);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };

  const handleChangeRating = (event) => {
    setRating(event.target.value);
  };
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeNatural = (event) => {
    setNatural(event.target.value);
  };

  const addToCartHandler = (event) => {
    fetch("http://localhost:3000/productsPage/addProductToList", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: authCtx.userId,
        productToAdd: productid,
        userProductsListType: "shoppingBag",
      }),
    });
  };

  const addToWishListHandler = (event) => {
    fetch("http://localhost:3000/productsPage/addProductToList", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: authCtx.userId,
        productToAdd: productid,
        userProductsListType: "wishList",
      }),
    });
  };
  const handleDeleteProduct = (productId) => {
    fetch("http://localhost:3000/productsPage/deleteProduct", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: productid,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => props.setProducts(data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (productId) => {
    fetch("http://localhost:3000/productsPage/editProduct", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: productid,
        title: title,
        brand: brand,
        imgsrc1: imgsrc1,
        rating: rating,
        price: price,
        is_natural: natural,
        category: category,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => props.setProducts(data))
      .catch((err) => console.log(err));
    setShowPopup(false);
  };

  return (
    <Container>
      <Card
        style={{ width: "13.5rem", height: "28rem" }}
        className="text-center"
      >
        <div>
          {isLoggedin === "true" && (
            <RiHeart3Fill
              className={toggleHeart ? "heartactive" : "heart"}
              onClick={() => {
                changeColor();
                addToWishListHandler();
              }}
            />
          )}
          {isAdmin === "true" && (
            <RiEdit2Fill className="edit_icon" onClick={handleOpen} />
          )}
          {showPopup && (
            <div className="Edit_popup">
              <div className="Edit_popup-inner">
                <Button
                  variant="outlined"
                  color="secondary"
                  className="close-btn "
                  onClick={handleClose}
                >
                  X
                </Button>
                {showForm && (
                  <form
                    onSubmit={() => {
                      handleSubmit(productid);
                    }}
                  >
                    <div className="detail">
                      <u className="headline">Product Name</u>&nbsp;
                      <input
                        className="input"
                        type="text"
                        value={title}
                        onChange={handleChangeTitle}
                        required
                      />
                    </div>

                    <div className="detail">
                      <u className="headline">Brand</u>&nbsp;{" "}
                      <input
                        className="input"
                        type="text"
                        value={brand}
                        onChange={handleChangeBrand}
                        required
                      />
                    </div>
                    <div className="detail">
                      <u className="headline">Price</u>&nbsp;{" "}
                      <input
                        className="input"
                        type="number"
                        value={price}
                        onChange={handleChangePrice}
                        required
                      />
                    </div>
                    <div className="detail">
                      <u className="headline">Category</u>&nbsp;{" "}
                      <select value={natural} onChange={handleChangeNatural}>
                        {cat.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="detail">
                      <u className="headline">Rating</u>&nbsp;{" "}
                      <input
                        className="input"
                        type="number"
                        value={rating}
                        onChange={handleChangeRating}
                        required
                      />
                    </div>
                    <div className="detail">
                      <u className="headline">Natural</u>&nbsp;{" "}
                      <select value={natural} onChange={handleChangeNatural}>
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button className="detail btn btn-dark" type="submit">
                      Save
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {isAdmin === "true" && (
            <RiDeleteBin2Fill
              className="delete_icon"
              onClick={() => {
                handleDeleteProduct(productid);
              }}
            />
          )}
        </div>
        <Card.Img
          className="product_img"
          // height={180}
          src={props.imgsrc1}
          onClick={(event, props) => setButtonPopup(true)}
        />
        <Card.Body className="product_body">
          <Card.Title className="product_title">{props.title}</Card.Title>

          <Card.Text className="product-price">
            Price : {props.price}&nbsp;₪
          </Card.Text>

          <div className="mt-auto">
            {isLoggedin === "true" && (
              <Button
                className="m-2"
                variant="dark"
                onClick={addToCartHandler}
                quantity={+1}
                style={{
                  backgroundColor: "#a67d85",
                  fontWeight: "400",
                  fontSize: "1.15rem",
                  borderColor: "#a67d85",
                }}
              >
                + Add to cart
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
      <div>
        <ProductPopup
          class="product_details_popup"
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          item={props}
        >
          <div className="ProductInfo">
            <label className="Product_description">
              <u>{props.title}</u>
            </label>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <label className="Product_store">
              <u>brand</u>&nbsp;{props.brand}
              <u>category</u>&nbsp;{category}
              <u>natural</u>&nbsp;{props.is_natural}
            </label>
          </div>
        </ProductPopup>
      </div>
    </Container>
  );
};
export default Product;
