import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface RegisterModalProps {
  onClose: () => void;
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    setIsLoading(true);
    // Simulate registration processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Generate a dynamic QR code based on user's registration details
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=ff0099&data=${encodeURIComponent(
    `Name: ${formData.name}, Phone: ${formData.phone}, Email: ${formData.email}`
  )}`;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-card">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <form className="register-form" onSubmit={handleSubmit} dir="rtl">
            <h2 className="modal-title">הרשמה לאירוע</h2>
            <p className="modal-subtitle">הירשמו לקבלת כרטיס כניסה וברקוד לאירוע</p>

            <div className="input-group">
              <label htmlFor="fullName">שם מלא</label>
              <input
                type="text"
                id="fullName"
                required
                placeholder="עינב בובליל"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone">מספר טלפון</label>
              <input
                type="tel"
                id="phone"
                required
                placeholder="050-0000000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">מייל</label>
              <input
                type="email"
                id="email"
                required
                placeholder="einavBooblil@bigFashion.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'דואגים לך...' : 'הרשמה וקבלת כרטיס'}
            </button>
          </form>
        ) : (
          <div className="success-container" dir="rtl">
            <CheckCircle className="success-icon" size={60} />
            <h2 className="modal-title success-title">נרשמת בהצלחה!</h2>
            
            <div className="qr-wrapper">
              <img src={qrCodeUrl} alt="QR Code Ticket" className="qr-image" />
            </div>

            <p className="success-message">נתראה בקרוב!</p>
            <p className="success-submessage">אל תשכחו להציג את הברקוד בכניסה לאירוע.</p>
          </div>
        )}
      </div>
    </div>
  );
}
