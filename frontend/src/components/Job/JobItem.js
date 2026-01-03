import React from "react";

const JobItem = ({ job, company, onEdit, onDelete }) => {
    // Choose pill color based on status
    const statusClass = job.status ? job.status.toLowerCase() : "";
    const typeClass = job.job_type ? job.job_type.toLowerCase() : "";

    const compensation =
        job.compensation_amount
            ? job.compensation_type === "hourly"
                ? `$${job.compensation_amount}/hr`
                : `$${job.compensation_amount}`
            : "-";

    return (
        <div className="list-row">
            <div>{company?.name || "—"}</div>
            <div>{company?.id || "—"}</div>
            <div>{company?.industry || "—"}</div>
            <div>{job.id}</div>
            <div>{job.title}</div>
            <div><span className={`pill ${job.status}`}>{job.status}</span></div>
            <div>{job.job_type ? job.job_type.replace("_", " ") : "—"}</div>
            <div>
            {job.compensation_type && job.compensation_amount
                ? job.compensation_type === "salary"
                ? `$${job.compensation_amount.toLocaleString()}/yr`
                : `$${job.compensation_amount.toLocaleString()}/hr`
                : "—"}
            </div>
            <div>{job.notes || "—"}</div>
            <div>{job.applied_date || "—"}</div>
            <div>{job.last_updated || "—"}</div>
            <div>
            <button className="button" onClick={() => onEdit(job)}>Edit</button>
            </div>
        </div>
    );
};

export default JobItem;
