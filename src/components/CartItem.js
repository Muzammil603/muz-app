// src/components/CartItem.js
import React from 'react';

function CartItem({ item, removeFromCart }) {
  return (
    <li>
      {item.name} - ${item.price}
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </li>
  );
}

export default CartItem;