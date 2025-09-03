// src/components/CertificationSection.jsx
import React, { useEffect, useState } from 'react';
import styles from './CertificationSection.module.css';
import { FiDownload } from 'react-icons/fi';
import { fetchCertifications } from "../services/api.js";

function CertificationSection() {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    fetchCertifications()
      .then((data) => setCertifications(data))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.certificationSection}>
      <h2>Certifications</h2>

        <table>
            <thead>
            <tr>
                <th>Certification Name</th>
                <th>Issuing Organization</th>
                <th>Year</th>
                <th>Download</th>
            </tr>
            </thead>
            <tbody>
           {certifications.map(cert => (
              <tr key={cert.id}>
                <td>{cert.name}</td>
                <td>{cert.issuer}</td>
                <td>
                    <div className={styles.textCenter}>
                        {cert.year}
                    </div>
                </td>
                <td>
                    {cert.certificate_image && (
                      <div className={styles.textCenter}>
                        <a
                        href={cert.certificate_image}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.downloadIcon}
                        title="Download Certificate"
                      >
                        <FiDownload />
                      </a>
                          </div>
                    )}
                </td>
              </tr>
            ))}
            </tbody>
        </table>

      {/*<ul>*/}
      {/*  {certifications.map(cert => (*/}
      {/*    <li key={cert.id} className={styles.certItem}>*/}
      {/*      <span className={styles.title}>{cert.name}</span>*/}
      {/*      <span className={styles.org}>{cert.issuer}</span>*/}
      {/*      <span className={styles.date}>{cert.year}</span>*/}

      {/*      {cert.certificate_image && (*/}
      {/*        <a*/}
      {/*          href={cert.certificate_image}*/}
      {/*          download*/}
      {/*          target="_blank"*/}
      {/*          rel="noopener noreferrer"*/}
      {/*          className={styles.downloadIcon}*/}
      {/*          title="Download Certificate"*/}
      {/*        >*/}
      {/*          <FiDownload />*/}
      {/*        </a>*/}
      {/*      )}*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </div>
  );
}

export default CertificationSection;
