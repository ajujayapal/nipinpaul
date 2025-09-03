// src/components/Skills.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { fetchSkills } from "../services/api";
import styles from "./SidebarCard.module.css";

const SkillsExpertiseSidebar = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills().then(setSkills).catch(console.error);
  }, []);

  return (
      <ul className={styles.list}>
        {skills.map((item, index) => (
          <li key={index} className={styles.listItem}>
            {item.name}
          </li>
        ))}
      </ul>
    // <div>
    //     <Sidebar title="Skills" items={skills} />
    // </div>
  );
};

export default SkillsExpertiseSidebar;
