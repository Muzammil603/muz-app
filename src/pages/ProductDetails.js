import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails({ addToCart }) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch product details from localStorage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const selectedProduct = products.find((product) => product.id === id);
      setProduct(selectedProduct);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {product.accessories && (
        <>
          <h2>Accessories</h2>
          <ul>
            {product.accessories.map((accessory) => (
              <li key={accessory.id}>{accessory.name}</li>
            ))}
          </ul>
        </>
      )}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;