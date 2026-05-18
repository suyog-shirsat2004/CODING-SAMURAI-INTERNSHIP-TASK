import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-rating">
            <span className="rating-stars">{'★'.repeat(Math.round(product.rating.rate))}</span>
            <span className="rating-count">({product.rating.count})</span>
          </div>
          <div className="product-footer">
            <span className="product-price">₹{product.price.toFixed(2)}</span>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
