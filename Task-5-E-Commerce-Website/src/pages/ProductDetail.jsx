import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';
import { fetchProductById } from '../services/productService';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

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
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail">
      <Link to="/products" className="back-link">← Back to Products</Link>

      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-detail-category">{product.category}</p>

          <div className="product-detail-rating">
            <span className="stars">{'★'.repeat(Math.round(product.rating.rate))}</span>
            <span className="rating-text">{product.rating.rate} ({product.rating.count} reviews)</span>
          </div>

          <p className="product-detail-price">₹{product.price.toFixed(2)}</p>

          <p className="product-detail-description">{product.description}</p>

          <div className="quantity-selector">
            <label>Quantity:</label>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <button className="add-to-cart-large" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
