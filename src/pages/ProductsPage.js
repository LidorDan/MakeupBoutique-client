import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "react-bootstrap";
import { useContext, useRef } from "react";
import AuthContext from "../store/auth-context";

/*components */
import ProductList from "../components/ProductList";
import NavBar from "../components/NavBar";
import FilterPanel from "../components/FilterPanel";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

/* styles */
import "../styles/ProductsPage.css";
import "../styles/Product.css";

import { useLocation } from "react-router";

const ProductsPage = (prod) => {
  const [products, setProducts] = useState([]);
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.isAdmin;
  const options = [
    { value: "yes", label: "yes" },
    { value: "no", label: "no" },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/productsPage")
      .then((Response) => Response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const addProduct = (event) => {
    fetch("http://localhost:3000/productsPage/addProduct", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        brand: brand,
        imgsrc1: imgsrc1,
        rating: rating,
        price: price,
        category: category,
        is_natural: natural,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
    setShowPopup(false);
  };
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedNatural, setSelectedNatural] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 245]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;
  const location = useLocation();

  const [title, setTitle] = useState(prod.title);
  const [category, setCategory] = useState(prod.category);
  const [brand, setBrand] = useState(prod.brand);
  const [price, setPrice] = useState(prod.price);
  const [rating, setRating] = useState(prod.rating);
  const [natural, setNatural] = useState(prod.is_natural);
  const [imgsrc1, setImgsrc1] = useState("/Images/newProductLogo.jpg");

  const [showForm, setShowForm] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

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

  // if (location.state) {
  useEffect(() => {
    if (location.state) {
      const { from } = location.state;
      setSelectedCategories([...selectedCategories, from]);
    }
  }, []);
  const handleNaturalChange = (event, is_natural) => {
    setCurrentPage(1);
    if (event.target.checked) {
      setSelectedNatural([...selectedNatural, is_natural]);
    } else {
      setSelectedNatural(selectedNatural.filter((n) => n !== is_natural));
    }
  };

  const handleCategoryChange = (event, category) => {
    setCurrentPage(1);
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const onSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const anms = () => {
    let filtered = products;

    if (selectedCategories.length === 0 || selectedCategories.includes("All")) {
      filtered = products;
    } else {
      filtered = filtered.filter((product) => {
        return selectedCategories.some((category) =>
          product.category.includes(category)
        );
      });
    }

    if (selectedNatural.length === 0) {
      filtered = filtered;
    } else {
      filtered = filtered.filter((product) => {
        return selectedNatural.some((is_natural) =>
          product.is_natural.includes(is_natural)
        );
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((product) => {
        return product.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    return filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  };
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = anms().slice(firstProductIndex, lastProductIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <NavBar />
      <div className="product_page">
        <div className="searchBar-wrap">
          <SearchIcon className="searchBar-icon" />
          <input
            type="text"
            placeholder="Search.."
            value={searchQuery}
            onChange={onSearchChange}
          />

          <div>
            {" "}
            {isAdmin === "true" && (
              <Button
                variant="dark"
                onClick={handleOpen}
                style={{
                  backgroundColor: "#a67d85",
                  fontWeight: "400",
                  fontSize: "1.1rem",
                  borderColor: "#a67d85",
                  width: "11.9rem",
                  marginLeft: "1.5rem",
                  float: "right",
                  marginRight: "1.5rem",
                }}
              >
                Add new product
              </Button>
            )}
            {showPopup && (
              <div className="Edit_popup">
                <div className="Edit_popup-inner">
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="close-btn "
                    onClick={handleClose}
                    style={{ marginTop: "0" }}
                  >
                    X
                  </Button>

                  {showForm && (
                    <form
                      onSubmit={() => {
                        addProduct();
                      }}
                    >
                      <div className="detail">
                        <u className="product_details">Product Name</u>&nbsp;
                        <input
                          className="input"
                          type="text"
                          value={title}
                          onChange={handleChangeTitle}
                          required
                        />
                      </div>

                      <div className="detail">
                        <u className="product_details">Brand</u>&nbsp;
                        <input
                          className="input"
                          type="text"
                          value={brand}
                          onChange={handleChangeBrand}
                          required
                        />
                      </div>
                      <div className="detail">
                        <u className="product_details">Price</u>&nbsp;{" "}
                        <input
                          className="input"
                          type="text"
                          value={price}
                          onChange={handleChangePrice}
                          required
                        />
                      </div>
                      <div className="detail">
                        <u className="product_details">Category</u>&nbsp;{" "}
                        <input
                          className="input"
                          type="text"
                          value={category}
                          onChange={handleChangeCategory}
                          required
                        />
                      </div>
                      <div className="detail">
                        <u className="product_details">Rating</u>&nbsp;{" "}
                        <input
                          className="input"
                          type="text"
                          value={rating}
                          onChange={handleChangeRating}
                          required
                        />
                      </div>
                      <div className="detail">
                        <u className="product_details">Natural</u>&nbsp;{" "}
                        <input
                          className="input"
                          type="text"
                          value={natural}
                          onChange={handleChangeNatural}
                          required
                        />
                      </div>

                      <button className="submit-btn btn btn-dark" type="submit">
                        Save
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="product_page_panelList-wrap">
          <div className="product_page_panel-wrap">
            <FilterPanel
              selectedNatural={selectedNatural}
              onNaturalChange={handleNaturalChange}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              value={priceRange}
              setPriceRange={setPriceRange}
              priceRange={priceRange}
            />
          </div>
          <div className="product_page_panelList-wrap">
            <ProductList products={currentProducts} setProducts={setProducts} />
          </div>
        </div>
        <div className="pagination-block">
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={anms().length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ProductsPage;
