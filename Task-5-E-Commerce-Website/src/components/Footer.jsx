import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white pt-5 pb-3 mt-auto border-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h3 className="h5 fw-bold text-primary">ShopMart</h3>
            <p className="text-muted">Your one-stop shop for all your needs. Quality products at affordable prices.</p>
          </div>
          <div className="col-md-4">
            <h4 className="h6 fw-semibold">Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-muted text-decoration-none hover-primary">Home</Link></li>
              <li className="mb-2"><Link to="/products" className="text-muted text-decoration-none hover-primary">Products</Link></li>
              <li className="mb-2"><Link to="/cart" className="text-muted text-decoration-none hover-primary">Cart</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="h6 fw-semibold">Contact Us</h4>
            <p className="text-muted mb-1">Email: suyogmarket2004@gmail.com</p>
            <p className="text-muted">Phone: 7719984503</p>
          </div>
        </div>
        <div className="text-center text-muted pt-3 mt-4 border-top">
          <p className="mb-0">&copy; 2026 ShopMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

