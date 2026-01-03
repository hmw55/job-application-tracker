import React from "react";
import JobItem from "./JobItem";

const JobList = ({ jobs, companies, onEdit, onDelete }) => {
    // Map for fast lookup
    const companyMap = Object.fromEntries(companies.map(c => [c.id, c]));

    return (
        <div className="list-container">
            <div className="list-header">
                <div>Company</div>
                <div>Company ID</div>
                <div>Industry</div>
                <div>Job ID</div>
                <div>Role</div>
                <div>Status</div>
                <div>Type</div>
                <div>Compensation</div>
                <div>Notes</div>
                <div>Actions</div>
            </div>

            {jobs.map(job => {
                const company = companyMap[job.company_id];
                return (
                    <JobItem 
                        key={job.id} 
                        job={job} 
                        company={company} 
                        onEdit={onEdit} 
                        onDelete={onDelete} 
                    />
                );
            })}
        </div>
    );
};

export default JobList;
