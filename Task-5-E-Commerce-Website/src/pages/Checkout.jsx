import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toINR } from '../services/productService';

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
      <div className="text-center py-5">
        <h2 className="fs-1 mb-3">Your cart is empty</h2>
        <p className="text-muted mb-4">Add some products before checking out.</p>
        <Link to="/products" className="btn btn-primary px-4">Continue Shopping</Link>
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
  const shippingINR = shipping === 0 ? 0 : 500;

  return (
    <div className="mx-auto" style={{maxWidth: '1200px'}}>
      <h2 className="fs-1 text-center mb-4">Checkout</h2>

      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-4">
            <div className="card shadow-sm p-4">
              <h3 className="fs-5 pb-3 border-bottom mb-3">Shipping Information</h3>

              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label fw-medium">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                  {errors.firstName && <div className="invalid-feedback d-block">{errors.firstName}</div>}
                </div>

                <div className="col-sm-6">
                  <label className="form-label fw-medium">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                  {errors.lastName && <div className="invalid-feedback d-block">{errors.lastName}</div>}
                </div>

                <div className="col-12">
                  <label className="form-label fw-medium">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                  {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                </div>

                <div className="col-12">
                  <label className="form-label fw-medium">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                  {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                </div>

                <div className="col-12">
                  <label className="form-label fw-medium">Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange}
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
                  {errors.address && <div className="invalid-feedback d-block">{errors.address}</div>}
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange}
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`} />
                  {errors.city && <div className="invalid-feedback d-block">{errors.city}</div>}
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium">State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange}
                    className={`form-control ${errors.state ? 'is-invalid' : ''}`} />
                  {errors.state && <div className="invalid-feedback d-block">{errors.state}</div>}
                </div>

                <div className="col-sm-4">
                  <label className="form-label fw-medium">PIN Code</label>
                  <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="411001"
                    className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`} />
                  {errors.zipCode && <div className="invalid-feedback d-block">{errors.zipCode}</div>}
                </div>
              </div>
            </div>

            <div className="card shadow-sm p-4">
              <h3 className="fs-5 pb-3 border-bottom mb-3">Payment Information</h3>

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-medium">Card Number</label>
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange}
                    placeholder="1234 5678 9012 3456" maxLength="19"
                    className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`} />
                  {errors.cardNumber && <div className="invalid-feedback d-block">{errors.cardNumber}</div>}
                </div>

                <div className="col-sm-6">
                  <label className="form-label fw-medium">Expiry Date</label>
                  <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange}
                    placeholder="MM/YY"
                    className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`} />
                  {errors.expiryDate && <div className="invalid-feedback d-block">{errors.expiryDate}</div>}
                </div>

                <div className="col-sm-6">
                  <label className="form-label fw-medium">CVV</label>
                  <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" maxLength="3"
                    className={`form-control ${errors.cvv ? 'is-invalid' : ''}`} />
                  {errors.cvv && <div className="invalid-feedback d-block">{errors.cvv}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm p-4 sticky-top" style={{top: '100px'}}>
            <h3 className="fs-5 pb-3 border-bottom mb-3">Order Summary</h3>

            <div className="mb-3" style={{maxHeight: '200px', overflowY: 'auto'}}>
              {items.map(item => (
                <div key={item.id} className="d-flex justify-content-between py-2 border-bottom" style={{fontSize: '0.9rem'}}>
                  <span className="text-truncate me-2">{item.title} x {item.quantity}</span>
                  <span className="text-nowrap">₹{toINR(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₹{toINR(getCartTotal()).toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shippingINR.toFixed(2)}`}</span>
            </div>
            <div className="d-flex justify-content-between fs-5 fw-bold pt-3 border-top mt-2 mb-3">
              <span>Total</span>
              <span>₹{toINR(total).toFixed(2)}</span>
            </div>

            <button type="submit" className="btn btn-success btn-lg w-100 fw-semibold" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : `Place Order - ₹${toINR(total).toFixed(2)}`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

