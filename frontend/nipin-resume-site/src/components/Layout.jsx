// src/components/Layout.jsx
import React from 'react';
import Footer from './Footer';
import HeaderBanner from "./HeaderBanner";
// import SkillsExpertiseSidebar from './Skills.jsx';
import Sidebar from "./Sidebar";
import NavigationButtons from './NavigationButtons';
import styles from './Layout.module.css';

const Layout = ({ children, onOpenResumeModal }) => {
  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <HeaderBanner onOpenResumeModal={onOpenResumeModal} />
        </header>

        <div className={styles.navContainer}>
            <NavigationButtons />
        </div>

        <div className={styles.contentArea}>
            <main className={styles.mainContent}>
                {children}
            </main>
            <aside className={styles.rightColumn}>
                <Sidebar />
            </aside>
        </div>


        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <Footer />
            </div>
        </footer>
    </div>
  );
};

export default Layout;
