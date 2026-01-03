import { useEffect, useState } from "react";
import { getCompanies } from "../api/companies";
import { getJobs } from "../api/jobs";
import CompanyList from "../components/Company/CompanyList";
import JobList from "../components/Job/JobList";

export default function Dashboard() {
    const [companies, setCompanies] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const[companiesData, jobsData] = await Promise.all([getCompanies(), getJobs()]);
                setCompanies(companiesData);
                setJobs(jobsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p>Loading dashboard...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <section>
                <h2>Companies</h2>
                <CompanyList companies={companies} />
            </section>

            <section>
                <h2>Jobs</h2>
                <JobList jobs={jobs} />
            </section>
        </div>
    );
}