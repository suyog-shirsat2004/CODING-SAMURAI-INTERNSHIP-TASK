import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h1>ShopMart</h1>
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/products" className="navbar-link">Products</Link>
          <Link to="/cart" className="navbar-link cart-link">
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
