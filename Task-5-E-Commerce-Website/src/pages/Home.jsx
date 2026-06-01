import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { fetchProducts } from '../services/productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data.slice(0, 8));
    } catch (err) {
      setError('Failed to load products. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger d-inline-block">{error}</div>
        <br />
        <button className="btn btn-primary mt-3" onClick={loadProducts}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-primary bg-gradient text-white text-center p-5 rounded-4 mb-5">
        <div className="py-4">
          <h1 className="display-4 fw-bold">Welcome to ShopMart</h1>
          <p className="fs-5 opacity-75 mb-4">Discover amazing products at unbeatable prices</p>
          <Link to="/products" className="btn btn-light btn-lg text-primary fw-semibold px-4">Shop Now</Link>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-center fs-1 mb-4">Featured Products</h2>
        <div className="row g-4">
          {products.map(product => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/products" className="btn btn-primary px-4">View All Products</Link>
        </div>
      </section>

      <section className="row g-4 mt-4">
        <div className="col-md-4">
          <div className="card shadow-sm text-center h-100 p-4">
            <div className="card-body">
              <h3 className="h5">🚚 Free Shipping</h3>
              <p className="card-text text-muted">On orders over ₹50</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm text-center h-100 p-4">
            <div className="card-body">
              <h3 className="h5">🔒 Secure Payment</h3>
              <p className="card-text text-muted">100% secure checkout</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm text-center h-100 p-4">
            <div className="card-body">
              <h3 className="h5">↩️ Easy Returns</h3>
              <p className="card-text text-muted">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
