// src/components/ProfileSection.jsx
import React, { useEffect, useState } from "react";
import { fetchProfile } from "../services/api";
import typography from '../styles/typography.module.css';
import styles from "./ProfileSection.module.css";

const ProfileSection = () => {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    fetchProfile()
      .then((data) => setSummary(data.summary))
      .catch(console.error);
  }, []);

  return (
    <section className={typography.body}>
      <h2>Profile Summary</h2>
      <p className={styles.profileText}>{summary}</p>
    </section>
  );
};

export default ProfileSection;
