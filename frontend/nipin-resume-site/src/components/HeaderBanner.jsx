import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import styles from './HeaderBanner.module.css';
import typography from '../styles/typography.module.css';
import { fetchProfile } from '../services/api';

export default function HeaderBanner({ onOpenResumeModal }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile().then(data => setProfile(data)).catch(console.error);
  }, []);


  useEffect(() => {
  fetchProfile()
    .then(data => {
      console.log("Profile API response:", data);  // 👈 Add this
      setProfile(data);
    })
    .catch(error => {
      console.error("Error fetching profile:", error);  // 👈 Add this
    });
}, []);


  if (!profile) return <div>Loading...</div>;

  return (
    <div className={styles.banner}>
        {/*<div className={styles.socialLinks}>*/}
        {/*    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">*/}
        {/*        <img src="/linkedin.png" alt="LinkedIn" />*/}
        {/*    </a>*/}
        {/*</div>*/}
      {profile.profile_image && (
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}${profile.profile_image}`}
          alt="Profile"
          className={styles.profileImage}
        />
      )}
      <h1 className={`${styles.name} ${typography.button}`}>{profile.name}</h1>
      <div className={styles.buttons}>
          <Link to="/contact" className={`${styles.button} ${typography.button}`}>Contact Me</Link>
        {/*<button className={`${styles.button} ${typography.button}`}>Contact Me</button>*/}
        <button onClick={onOpenResumeModal} className={`${styles.button} ${typography.button}`}>
            My Resume
        </button>
      </div>
    </div>
  );
}
