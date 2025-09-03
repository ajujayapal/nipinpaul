// src/components/ProfileSection.jsx
import React, { useEffect, useState } from "react";
import {fetchExperience} from "../services/api";
import styles from "./ExperienceSection.module.css";
// import { GiPill } from "react-icons/gi";
import { IconContext } from "react-icons";
import { LuSyringe } from "react-icons/lu";
// import { CiPill } from "react-icons/ci"

const ExperienceSection = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetchExperience()
      .then((data) => setExperience(data))
      .catch(console.error);
  }, []);

  function convertDateToFullMonthYear(dateString) {
      const dateObject = new Date(dateString);
      const dateOptions = {month: 'long', year: 'numeric'};
      return dateObject.toLocaleDateString('en-US', dateOptions);
  }

  return (
    <section>
      <h2>Experience</h2>
        <ul>
          {experience.map((exp) => (
            <li key={exp.id} className={styles.experienceItem}>
                <div className={styles.jobTitle}>{exp.job_title}</div>
                <div>{exp.company}</div>
                <div>{convertDateToFullMonthYear(exp.start_date)} -
                    {exp.end_date ? " " + convertDateToFullMonthYear(exp.end_date) : " Present"}</div>
                <ul className={`${styles.responsibilities} fa-ul`}>
                {exp["responsibilities"].map((responsibility) => (
                    <li key={responsibility.id} className={styles.responsibilityItem}>
                      <span>
                          <IconContext.Provider value={{size: '10px', className: styles.pillIcon}} >
                                <LuSyringe />
                          </IconContext.Provider>
                      </span>
                      <span>{responsibility.text}</span>
                    </li>
                ))}
                </ul>
            </li>
          ))}
        </ul>
    </section>
  );
};

export default ExperienceSection;
