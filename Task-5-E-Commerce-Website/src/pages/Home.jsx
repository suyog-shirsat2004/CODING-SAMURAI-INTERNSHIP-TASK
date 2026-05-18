import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { fetchProducts } from '../services/productService';
import '../styles/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.slice(0, 8));
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopMart</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <Link to="/products" className="cta-button">Shop Now</Link>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link to="/products" className="view-all-btn">View All Products</Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🚚 Free Shipping</h3>
          <p>On orders over ₹50</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure Payment</h3>
          <p>100% secure checkout</p>
        </div>
        <div className="feature-card">
          <h3>↩️ Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
