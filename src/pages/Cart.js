import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';

function Cart({ cartItems, removeFromCart }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
          ))}
        </ul>
      )}
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;