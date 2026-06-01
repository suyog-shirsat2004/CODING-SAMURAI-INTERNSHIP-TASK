import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toINR } from '../services/productService';

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
    <div className="card shadow-sm h-100">
      <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
        <div className="bg-white d-flex align-items-center justify-content-center p-4" style={{height: '200px'}}>
          <img src={product.image} alt={product.title} className="img-fluid" style={{maxHeight: '100%', objectFit: 'contain'}} />
        </div>
        <div className="card-body d-flex flex-column">
          <h3 className="card-title fs-6 fw-normal" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>{product.title}</h3>
          <p className="text-muted small text-capitalize mb-2">{product.category}</p>
          <div className="mb-2">
            <span className="text-warning">{'★'.repeat(Math.round(product.rating.rate))}</span>
            <span className="text-muted small ms-1">({product.rating.count})</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
            <span className="fs-5 fw-bold text-primary">₹{toINR(product.price).toFixed(2)}</span>
            <button className="btn btn-primary btn-sm" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

