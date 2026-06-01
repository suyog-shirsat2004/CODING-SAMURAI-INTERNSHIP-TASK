import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h3 className="h5">ShopMart</h3>
            <p className="text-secondary">Your one-stop shop for all your needs. Quality products at affordable prices.</p>
          </div>
          <div className="col-md-4">
            <h4 className="h6">Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/products" className="text-secondary text-decoration-none">Products</Link></li>
              <li className="mb-2"><Link to="/cart" className="text-secondary text-decoration-none">Cart</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="h6">Contact Us</h4>
            <p className="text-secondary mb-1">Email: support@shopmart.com</p>
            <p className="text-secondary">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="text-center text-secondary pt-3 mt-4 border-top border-secondary">
          <p className="mb-0">&copy; 2026 ShopMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
