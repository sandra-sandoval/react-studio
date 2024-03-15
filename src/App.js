import "./App.css";
import { useEffect, useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // POST REQUEST
  // URL: https://cab.brown.edu/api/?page=fose&route=search&is_ind_study=N&is_canc=N
  // URL PARAMS: page=fose & route = promoted
  //

  const [data, setData] = useState(bakeryData);
  const [cart, setCart] = useState([]);

  // run when this component is first loaded
  const loadData = () => {
    setData([...bakeryData]);
  };

  useEffect(() => {
    console.log("component loaded", data.length);
    loadData();
  }, []); // run once when the component is first loaded if []

  useEffect(() => {
    console.log("cart changed: ", cart.length);
    console.log("data: ", data.length);
  }, [cart, data]); // if there's a value (or more) in here, run this function every time one of those values changes

  const addToCart = (price, name) => {
    console.log("adding to cart:", price);

    setCart((prev_cart) => [...prev_cart, { price, name }]);
  };

  const cartJSX =
    cart.length === 0 ? (
      <p>Cart is empty</p>
    ) : (
      cart.map((item, index) => (
        <p key={index}>
          $ {item.price} {item.name}
        </p>
      ))
    );
  // const total = cart.map
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="App">
      <h1>My Bakery</h1> {/* TODO: personalize your bakery (if you want) */}
      <div id="menu-container">
        {data.map((item, index) => (
          <BakeryItem
            key={index}
            item={item}
            onClick={() => addToCart(item.price, item.name)} // Pass addToCart function as onClick prop
          />
        ))}
      </div>
      <button
        onClick={() => {
          setData((prev_data) =>
            prev_data.filter((item, index) => index % 2 === 0)
          );
        }}
      >
        filter
      </button>
      <button
        onClick={() => {
          console.log("restoring data");
          setData(bakeryData); // original data
        }}
      >
        clear
      </button>
      <div>
        <h2>Cart</h2>
        {cartJSX}
        <p>Total: $ {totalPrice}</p>
      </div>
    </div>
  );
}

export default App;
