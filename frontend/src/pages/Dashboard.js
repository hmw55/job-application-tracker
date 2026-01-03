import React, { useEffect, useState } from "react";
import { getCompanies } from "../api/companies";
import { getJobs } from "../api/jobs";
import CompanyList from "../components/Company/CompanyList";
import JobList from "../components/Job/JobList";
import { Sun, Moon } from "lucide-react";
import "../App.css";

const Dashboard = () => {
    const [companies, setCompanies] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    // Fetch data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const companiesData = await getCompanies();
                const jobsData = await getJobs();
                setCompanies(companiesData);
                setJobs(jobsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Apply Theme
    useEffect(() => {
        document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    if (loading) return <div className="dashboard">Loading dashboard...</div>;
    if (error) return <div className="dashboard error">Error: {error}</div>;

    return (
        <div className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <h1>Job Application Tracker</h1>

                <button
                    className="theme-toggle"
                    onClick={() => setDarkMode(!darkMode)}
                    aria-label="Toggle theme"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </header>

            {/* Companies Section */}
            <section className="dashboard-section">
                <h2>Companies</h2>
                {/* TODO: Add "Add Company" form here later */}
                <CompanyList companies={companies} />
            </section>

            {/* Jobs Section */}
            <section className="dashboard-section">
                <h2>Jobs</h2>
                {/* TODO: Add "Add Jobs" form and dropdowns for status later */}
                <JobList jobs={jobs} companies={companies} />
            </section>
        </div>
    );
};

export default Dashboard;