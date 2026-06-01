import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import TiltImage from '../components/TiltImage';
import { toINR } from '../services/productService';

const cartBgColors = [
  'bg-light',
  'bg-info bg-opacity-10',
  'bg-warning bg-opacity-10',
  'bg-success bg-opacity-10',
  'bg-danger bg-opacity-10',
  'bg-primary bg-opacity-10',
  'bg-secondary bg-opacity-10',
  'bg-dark bg-opacity-10'
];

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <h2 className="fs-1 mb-3">Your cart is empty</h2>
        <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn btn-primary px-4">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="animate-page">
      <h2 className="fs-1 mb-4">Shopping Cart</h2>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-3">
            {items.map(item => (
              <div key={item.id} className="card shadow-sm p-3">
                <div className="row align-items-center g-3">
                  <div className="col-auto">
                    <Link to={`/product/${item.id}`} className={`d-block ${cartBgColors[item.id % cartBgColors.length]} rounded p-2`} style={{width: '100px', height: '100px'}}>
                      <TiltImage src={item.image} alt={item.title} containerStyle={{width: '100%', height: '100%'}} />
                    </Link>
                  </div>

                  <div className="col">
                    <Link to={`/product/${item.id}`} className="text-decoration-none text-dark fw-medium">{item.title}</Link>
                    <p className="text-muted small text-capitalize mb-1">{item.category}</p>
                    <p className="fw-semibold text-primary mb-0">₹{toINR(item.price).toFixed(2)}</p>
                  </div>

                  <div className="col-auto">
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span className="fw-medium" style={{minWidth: '2rem', textAlign: 'center'}}>{item.quantity}</span>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>

                  <div className="col-auto">
                    <p className="fw-bold fs-5 mb-0">₹{toINR(item.price * item.quantity).toFixed(2)}</p>
                  </div>

                  <div className="col-auto">
                    <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm p-4 sticky-top" style={{top: '100px'}}>
            <h3 className="fs-5 pb-3 border-bottom mb-3">Order Summary</h3>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₹{toINR(getCartTotal()).toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>{getCartTotal() > 50 ? 'Free' : '₹500.00'}</span>
            </div>
            <div className="d-flex justify-content-between fs-5 fw-bold pt-3 border-top mt-2 mb-3">
              <span>Total</span>
              <span>₹{toINR(getCartTotal() + (getCartTotal() > 50 ? 0 : 5)).toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="btn btn-success btn-lg w-100 fw-semibold mb-2">
              Proceed to Checkout
            </Link>

            <button className="btn btn-outline-danger w-100" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

