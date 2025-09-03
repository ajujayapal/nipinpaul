// src/components/ProfileSection.jsx
import React, { useEffect, useState } from "react";
import { fetchEducation } from "../services/api";
import CertificationSection from "./CertificationSection";
import styles from "./EducationSection.module.css";

const EducationSection = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetchEducation()
      .then((data) => setEducation(data))
      .catch(console.error);
  }, []);


  return (
    <div>
      <section>
      <h2>Education</h2>
        <ul>
          {education.map((edu) => (
            <li key={edu.id} className={styles.educationItem}>
              <div className={styles.degree}>{edu.degree}</div>
              <div>{edu.institution} <span>({edu.year || "In Progress"})</span></div>
            </li>
          ))}
        </ul>
        </section>

      <section>
        <CertificationSection />
      </section>

    </div>
  );
};

export default EducationSection;
