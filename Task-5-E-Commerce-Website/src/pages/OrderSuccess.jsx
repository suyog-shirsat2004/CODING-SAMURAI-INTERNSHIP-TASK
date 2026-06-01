import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="d-flex justify-content-center align-items-center animate-page" style={{minHeight: '60vh'}}>
      <div className="card shadow-sm p-5 text-center" style={{maxWidth: '500px'}}>
        <div className="bg-success text-white d-flex align-items-center justify-content-center rounded-circle mx-auto mb-4" style={{width: '80px', height: '80px', fontSize: '3rem'}}>✓</div>
        <h1 className="fs-3 text-success mb-3">Order Placed Successfully!</h1>
        <p className="text-muted mb-2">Thank you for your purchase. Your order has been confirmed and will be shipped soon.</p>
        <p className="fw-bold fs-5 my-3">Order #ORD-{Math.floor(Math.random() * 1000000)}</p>
        <p className="text-muted mb-4">A confirmation email has been sent to your email address.</p>
        <Link to="/products" className="btn btn-primary px-4">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;

