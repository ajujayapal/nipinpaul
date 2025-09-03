import React, { useState } from 'react';
import styles from './ResumeModal.module.css';
import { sendResumeEmail } from '../services/api';

const ResumeModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isThrottle, setIsThrottle] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsThrottle(false);
    setLoading(true);

    try {
      const response = await sendResumeEmail(email);
      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json();
        if (response.status === 429) {
            setIsThrottle(true);
            setStatus(data?.error || 'Too many requests. Please try later.');
        }
        else {
            setStatus(data?.error || 'error');
        }
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        {/*<h2>Request My Resume</h2>*/}
        <p className={styles.titleText}>Please enter a valid email address to receive my resume.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>

        {status === 'success' && <p className={styles.success}>Resume sent successfully!</p>}
        {status && status !== 'success' && (
          <p className={styles.error}>
              {isThrottle ? status : `Something went wrong: ${status}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumeModal;
