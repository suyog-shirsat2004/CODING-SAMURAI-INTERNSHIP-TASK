import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';
import TiltImage from '../components/TiltImage';
import { fetchProductById, toINR } from '../services/productService';

const detailBgColors = [
  'bg-light',
  'bg-info bg-opacity-10',
  'bg-warning bg-opacity-10',
  'bg-success bg-opacity-10',
  'bg-danger bg-opacity-10',
  'bg-primary bg-opacity-10',
  'bg-secondary bg-opacity-10',
  'bg-dark bg-opacity-10'
];

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const loadProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      setError('Failed to load product. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadProduct(); }, [loadProduct]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger d-inline-block">{error}</div>
        <br />
        <button className="btn btn-primary mt-3" onClick={loadProduct}>Retry</button>
      </div>
    );
  }

  if (!product) return <div className="alert alert-danger text-center">Product not found</div>;

  return (
    <div className="mx-auto animate-page" style={{maxWidth: '1000px'}}>
      <Link to="/products" className="text-primary text-decoration-none fw-medium d-inline-block mb-3">← Back to Products</Link>

      <div className="row g-4 bg-light rounded-4 shadow-sm p-4">
        <div className="col-md-6">
          <div className={`${detailBgColors[product.id % detailBgColors.length]} d-flex align-items-center justify-content-center p-4 rounded-3`} style={{minHeight: '400px'}}>
            <TiltImage src={product.image} alt={product.title} containerStyle={{width: '100%', height: '100%', maxHeight: '400px'}} />
          </div>
        </div>

        <div className="col-md-6">
          <h1 className="fs-3 mb-2">{product.title}</h1>
          <p className="text-muted text-capitalize mb-3">{product.category}</p>

          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="text-warning fs-5">{'★'.repeat(Math.round(product.rating.rate))}</span>
            <span className="text-muted">{product.rating.rate} ({product.rating.count} reviews)</span>
          </div>

          <p className="fs-2 fw-bold text-primary mb-3">₹{toINR(product.price).toFixed(2)}</p>

          <p className="text-muted lh-lg mb-4">{product.description}</p>

          <div className="d-flex align-items-center gap-3 mb-4">
            <label className="fw-medium">Quantity:</label>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span className="fw-medium" style={{minWidth: '2rem', textAlign: 'center'}}>{quantity}</span>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <button className="btn btn-primary btn-lg w-100 fw-semibold" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

