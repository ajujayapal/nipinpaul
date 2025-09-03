// src/components/Sidebar.jsx
// import React, {useEffect, useState} from 'react';
// import { fetchSkills } from "../services/api";
import {useState, useEffect} from 'react'
import SidebarCard from './SidebarCard';
import {fetchLanguages, fetchSkills} from "../services/api.js";

const Sidebar = () => {

    const [skills, setSkills] = useState({loading: true, data: []});
    const [languages, setLanguages] = useState({loading: true, data: []});

    useEffect(() => {
        fetchSkills().then((data) => setSkills({
            loading: false,
            data
        })).catch(() => setSkills({
            loading: false,
            data: []
        }))

        fetchLanguages().then((data) => setLanguages({
            loading: false,
            data
        })).catch(() => setLanguages({
            loading: false,
            data: []
        }))
    }, []);

    return (
    <div>
        <SidebarCard
            title="Skills"
            items={skills.data}
            renderItem={(skill) => <span>{skill.name}</span>}
            loading={skills.loading}
        />

        <SidebarCard
            title="Languages"
            items={languages.data}
            renderItem={(language) => <span>{language.name} - {language.proficiency}</span>}
            loading={languages.loading}
        />

    </div>
    );
};

export default Sidebar;

