import { Link } from 'react-router-dom';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <div className="success-message">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been confirmed and will be shipped soon.</p>
        <p className="order-number">Order #ORD-{Math.floor(Math.random() * 1000000)}</p>
        <p>A confirmation email has been sent to your email address.</p>
        <Link to="/products" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
