import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from AdminPanel component
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;