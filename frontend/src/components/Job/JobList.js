import React from "react";
import JobItem from "./JobItem";

const JobList = ({ jobs, onEdit, onDelete }) => {
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
                <div>Applied Date</div>
                <div>Last Updated</div>
                <div>Actions</div>
            </div>

            {jobs.map(job => (
                <JobItem
                    key={job.id}
                    job={job}
                    company={job.company} // now directly nested
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default JobList;
