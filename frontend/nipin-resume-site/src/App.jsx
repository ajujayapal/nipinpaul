// src/App.jsx
import React, { useState }  from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProfileSection from './components/ProfileSection';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';
import CertificationSection from "./components/CertificationSection.jsx";
import ContactForm from './components/ContactForm';
import ResumeModal from './components/ResumeModal';


function App() {

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const openResumeModal = () => setIsResumeModalOpen(true);
  const closeResumeModal = () => setIsResumeModalOpen(false);

  return (
    <Router>
      <Layout onOpenResumeModal={openResumeModal}>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile" element={<ProfileSection />} />
          <Route path="/education" element={<EducationSection />} />
          <Route path="/experience" element={<ExperienceSection />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </Layout>
      <ResumeModal isOpen={isResumeModalOpen} onClose={closeResumeModal} />
    </Router>
  );
}

export default App;
