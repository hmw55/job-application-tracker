import React, { useEffect, useState } from "react";
import { getCompanies } from "../api/companies";
import { getJobs } from "../api/jobs";
import JobForm from "../components/Job/JobForm";
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
    const [showForm, setShowForm] = useState(false);

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

    const handleFormSuccess = async () => {
        try {
            const jobsData = await getJobs();
            setJobs(jobsData);
            setShowForm(false); // close form after success
        } catch (err) {
            setError(err.message || "Failed to refresh jobs");
        }
    };


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
         
            {/* Jobs Section */}
            <section className="dashboard-section">
                <div className="section-header">
                    <h2>Applications</h2>
                    <button className="button" onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Close Form" : "Create New Application"}
                    </button>                    
                </div>

                {showForm && (
                    <JobForm
                        companies={companies}
                        onSuccess={handleFormSuccess}
                        onCancel={() => setShowForm(false)}
                    />
                )}

                <JobList jobs={jobs} companies={companies} />
            </section>
        </div>
    );
};

export default Dashboard;