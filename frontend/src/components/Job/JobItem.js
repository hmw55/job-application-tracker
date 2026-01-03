import React from "react";

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    if (isNaN(date)) return "—";
    return `${(date.getMonth()+1).toString().padStart(2,"0")}/${date.getDate().toString().padStart(2,"0")}/${date.getFullYear().toString().slice(2)}`;
};

const JobItem = ({ job, company, onEdit }) => {
    const statusClass = job.status ? job.status.toLowerCase() : "saved";
    const typeClass = job.job_type ? job.job_type.toLowerCase() : "";

    // Updated pay formatting
    const pay = job.compensation_amount
        ? job.compensation_type === "hourly"
            ? `$${job.compensation_amount.toLocaleString()}/hr`
            : `$${job.compensation_amount.toLocaleString()}/yr`
        : "—";

    return (
        <div className="list-row">
            <div>{company?.name || "—"}</div>
            <div>{company?.industry || "—"}</div>
            <div>{job.title || "—"}</div>
            <div className="pay-cell" title={pay}>{pay}</div>
            <div>{formatDate(job.applied_date)}</div>
            <div>{formatDate(job.last_updated)}</div>
            <div><span className={`pill ${statusClass}`}>{job.status || "Saved"}</span></div>
            <div><span className={`pill type-pill ${typeClass}`}>{job.job_type ? job.job_type.replace("_", " ") : "—"}</span></div>
            <div className="notes-cell" title={job.notes}>{job.notes || "—"}</div>
            <div>
                <button className="button edit-btn" onClick={() => onEdit(job)}>Edit</button>
            </div>
        </div>
    );
};

export default JobItem;
