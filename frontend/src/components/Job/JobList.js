import React from "react";
import JobItem from "./JobItem";

const JobList = ({ jobs, onEdit, onDelete }) => {
    return (
        <div className="list-container">
            <div className="list-header">
                <div>Company</div>
                <div>Industry</div>
                <div>Role</div>
                <div>Pay</div>
                <div>Applied</div>
                <div>Updated</div>
                <div>Status</div>
                <div>Type</div>
                <div>Notes</div>
                <div>Actions</div>
            </div>

            {jobs.map(job => (
                <JobItem
                    key={job.id}
                    job={job}
                    company={job.company}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default JobList;
