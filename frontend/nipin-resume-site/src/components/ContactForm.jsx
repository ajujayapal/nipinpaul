// src/components/ContactForm.jsx
import React, { useState } from 'react';
import {sendContactMessage} from "../services/api";
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
        await sendContactMessage(formData);
        setStatus({ loading: false, success: 'Message sent successfully!', error: null });
        setFormData({ name: '', email: '', message: '' });

    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message });
    }
  };

  return (
    <section className={styles.contactSection}>
      <h2 className={styles.heading}>Contact Me</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className={styles.textarea}
        />
        <input
          type="text"
          name="website"
          className={styles.hidden}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
        <button type="submit" className={styles.button} disabled={status.loading}>
          {status.loading ? 'Sending...' : 'Send Message'}
        </button>
        {status.success && <p className={styles.success}>{status.success}</p>}
        {status.error && <p className={styles.error}>{status.error}</p>}
      </form>
    </section>
  );
};

export default ContactForm;
