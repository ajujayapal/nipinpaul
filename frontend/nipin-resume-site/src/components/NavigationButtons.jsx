// src/components/NavigationButtons.jsx
import React from "react";
import { Link } from 'react-router-dom';
import styles from './NavigationButtons.module.css';

const NavigationButtons = () => (
  <nav>
    <Link to="/profile" className={styles.navButton}>Profile</Link>
    <Link to="/education" className={styles.navButton}>Education</Link>
    <Link to="/experience" className={styles.navButton}>Experience</Link>
    {/*<Link to="/contact" className={styles.navButton}>Contact</Link>*/}
  </nav>
);

export default NavigationButtons;
