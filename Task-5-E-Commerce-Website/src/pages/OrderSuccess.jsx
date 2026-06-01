import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
  const [show, setShow] = useState(false);
  const [orderNum] = useState(`ORD-${Math.floor(Math.random() * 1000000)}`);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className={`order-success-wrap ${show ? 'visible' : ''}`}>
      <div className="confetti-container">
        {[...Array(30)].map((_, i) => (
          <span key={i} className="confetti" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            background: `hsl(${Math.random() * 360}, 80%, 60%)`,
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }} />
        ))}
      </div>
      <div className="success-card">
        <div className="success-icon-wrap">
          <div className={`success-icon ${show ? 'animate' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
        <h1 className={`success-heading ${show ? 'animate' : ''}`}>Order Placed Successfully!</h1>
        <p className={`success-subtitle ${show ? 'animate' : ''}`}>
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        <div className={`order-number ${show ? 'animate' : ''}`}>
          <span className="label">Order Number</span>
          <span className="value">#{orderNum}</span>
        </div>
        <div className={`success-details ${show ? 'animate' : ''}`}>
          <div className="detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Confirmation sent to your email</span>
          </div>
          <div className="detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Estimated delivery in 5-7 business days</span>
          </div>
        </div>
        <div className={`success-actions ${show ? 'animate' : ''}`}>
          <Link to="/products" className="btn-continue">Continue Shopping</Link>
          <Link to="/" className="btn-home">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
