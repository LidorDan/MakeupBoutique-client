// import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";

// import "../styles/Product.css";

// const AddNewProduct = ( prod ) => {
//   const addProduct = () => {
//     fetch("http://localhost:3000/productsPage/addProduct", {
//       method: "post",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title: prod.title,
//         brand: prod.brand,
//         imgsrc1: prod.imgsrc1,
//         rating: prod.rating,
//         price: prod.price,
//         is_natural: prod.is_natural,
//         category: prod.category,
//       }),
//     })
//       .then((Response) => Response.json())
//       // .then((data) => setProducts(data))
//       .catch((err) => console.log(err));
//   };

//   const [title, setTitle] = useState(prod.title);
//   const [category, setCategory] = useState(prod.category);
//   const [brand, setBrand] = useState(prod.brand);
//   const [price, setPrice] = useState(prod.price);
//   const [rating, setRating] = useState(prod.rating);
//   const [natural, setNatural] = useState(prod.is_natural);
//   const [imgsrc1, setImgsrc1] = useState(prod.imgsrc1);

//   const [showForm, setShowForm] = useState(true);
//   const [showPopup, setShowPopup] = useState(false);

//   const handleOpen = () => {
//     setShowPopup(true);
//   };

//   const handleClose = () => {
//     setShowPopup(false);
//     setShowForm(false);
//   };
//   return (
//     {showPopup && (

//     <div className="Edit_popup">
//       <div className="Edit_popup-inner">
//         <Button
//           variant="outlined"
//           color="secondary"
//           className="close-btn "
//           onClick={handleClose}
//         >
//           X
//         </Button>
//         {showForm && (
          // <form onSubmit={addProduct}>
          //   <div className="payment_form_controls text-center">
          //     <br></br>
          //     <lable for="city">City</lable>
          //     <br></br>
          //     <input type="text" id="city" name="city"></input>
          //     <br></br>

          //     <lable for="country">Country</lable>
          //     <br></br>
          //     <input type="text" id="country" name="country"></input>
          //     <br></br>

          //     <lable for="address">Address</lable>
          //     <br></br>
          //     <input type="text" id="address" name="address"></input>
          //     <br></br>

          //     <label for="latitude">Latitude:</label>
          //     <br></br>
          //     <input type="text" id="latitude" name="latitude"></input>
          //     <br></br>

          //     <lable for="longitude">Longitude</lable>
          //     <br></br>
          //     <input type="text" id="longitude" name="longitude"></input>
          //     <br></br>
          //     <br></br>

          //     <lable for="phone_number">Phone Number</lable>
          //     <br></br>
          //     <input type="text" id="phone_number" name="phone_number"></input>
          //     <br></br>
          //     <br></br>

          //     <button
          //       type="submit"
          //       class="btn"
          //       className="payment_form_actions btn btn-dark mb"
          //     >
          //       Submit
          //     </button>
          //   </div>
          // </form>
//         )}
//       </div>
//     </div>
//     )}
//   );
// };

// export default AddNewProduct;
