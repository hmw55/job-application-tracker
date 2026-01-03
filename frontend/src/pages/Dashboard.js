import React, { useEffect, useState } from "react";
import { getCompanies } from "../api/companies";
import { getJobs } from "../api/jobs";
import JobForm from "../components/Job/JobForm";
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
    const [editingJob, setEditingJob] = useState(null);

    // Fetch companies and jobs on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [companiesData, jobsData] = await Promise.all([getCompanies(), getJobs()]);
                setCompanies(companiesData);
                setJobs(jobsData);
            } catch (err) {
                setError(err.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Refresh jobs after creating/updating
    const refreshJobs = async () => {
        try {
            const jobsData = await getJobs();
            setJobs(jobsData);
        } catch (err) {
            setError(err.message || "Failed to refresh jobs");
        }
    };

    // Open form for creating a new job
    const handleCreateJob = () => {
        setEditingJob(null);
        setShowForm(true);
    };

    // Open form for editing a job
    const handleEditJob = (job) => {
        setEditingJob(job);
        setShowForm(true);
    };

    // Handle form success
    const handleFormSuccess = async () => {
        await refreshJobs();
        setShowForm(false);
        setEditingJob(null);
    };

    // Toggle dark/light mode
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
                    <button className="button" onClick={handleCreateJob}>
                        Create New Application
                    </button>
                </div>

                {showForm && (
                    <JobForm
                        job={editingJob}
                        companies={companies}
                        onSuccess={handleFormSuccess}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingJob(null);
                        }}
                    />
                )}

                <JobList
                    jobs={jobs}
                    companies={companies}
                    onEdit={handleEditJob}
                    onDelete={async (jobId) => {
                        try {
                            await fetch(`http://127.0.0.1:8000/api/jobs/${jobId}`, { method: "DELETE" });
                            await refreshJobs();
                        } catch (err) {
                            setError(err.message || "Failed to delete job");
                        }
                    }}
                />
            </section>
        </div>
    );
};

export default Dashboard;
