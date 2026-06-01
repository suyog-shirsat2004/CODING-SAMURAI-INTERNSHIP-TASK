import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="navbar navbar-expand navbar-light shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fs-4">ShopMart</Link>
        <div className="navbar-nav ms-auto align-items-center gap-2">
          <NavLink to="/" className="nav-link" end>Home</NavLink>
          <NavLink to="/products" className="nav-link">Products</NavLink>
          <NavLink to="/cart" className="nav-link position-relative">
            Cart
            {cartCount > 0 && (
              <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle" style={{fontSize: '0.65rem'}}>
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

