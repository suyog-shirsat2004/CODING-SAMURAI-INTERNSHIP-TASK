import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products before checking out.</p>
        <Link to="/products" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 16);
      formattedValue = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    if (name === 'expiryDate') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      if (digits.length > 2) {
        formattedValue = digits.slice(0, 2) + '/' + digits.slice(2);
      } else {
        formattedValue = digits;
      }
    }

    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    if (name === 'zipCode') {
      formattedValue = value.replace(/\D/g, '').slice(0, 6);
    }

    if (name === 'phone') {
      formattedValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5,6}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Enter valid 6-digit PIN code';
    }
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Enter 16-digit card number';
    }
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{1,2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Use MM/YY format (e.g. 03/27)';
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    clearCart();
    setIsSubmitting(false);
    navigate('/order-success');
  };

  const shipping = getCartTotal() > 50 ? 0 : 5;
  const total = getCartTotal() + shipping;

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="checkout-content">
          <div className="checkout-section">
            <h3>Shipping Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={errors.state ? 'error' : ''}
                />
                {errors.state && <span className="error-text">{errors.state}</span>}
              </div>

              <div className="form-group">
                <label>PIN Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="411001"
                  className={errors.zipCode ? 'error' : ''}
                />
                {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h3>Payment Information</h3>

            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className={errors.cardNumber ? 'error' : ''}
              />
              {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className={errors.expiryDate ? 'error' : ''}
                />
                {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="3"
                  className={errors.cvv ? 'error' : ''}
                />
                {errors.cvv && <span className="error-text">{errors.cvv}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {items.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.title} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button type="submit" className="place-order-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : `Place Order - ₹${total.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
