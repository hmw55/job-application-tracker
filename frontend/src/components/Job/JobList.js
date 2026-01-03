import JobItem from "./JobItem";

const JobList = ({ jobs, companies }) => {
    const companyMap = Object.fromEntries(
        companies.map(c => [c.id, c])
    );

    return (
        <div className="list-container">
            <div className="list-header">
                <div>Job ID</div>
                <div>Role</div>
                <div>Company</div>
                <div>Industry</div>
                <div>Actions</div>
            </div>

            {jobs.map(job => (
                <JobItem
                    key={job.id}
                    job={job}
                    company={companyMap[job.company_id]}
                />
            ))}
        </div>
    );
};

export default JobList;