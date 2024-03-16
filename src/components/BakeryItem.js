// // // TODO: create a component that displays a single bakery item
import { useState } from "react";

export default function BakeryItem({ item, onClick }) {
  return (
    <div className="bakery-item" onClick={onClick}>
      <h3>{item.name}</h3>
      <img src={item.image}></img>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
    </div>
  );
}
