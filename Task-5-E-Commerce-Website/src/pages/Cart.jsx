import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      <div className="cart-content">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`} className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </Link>

              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <p className="cart-item-total">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                className="remove-item-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{getCartTotal() > 50 ? 'Free' : '₹5.00'}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{(getCartTotal() + (getCartTotal() > 50 ? 0 : 5)).toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>

          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
