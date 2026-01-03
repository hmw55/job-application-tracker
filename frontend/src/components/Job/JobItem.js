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
            <div>{company?.name || "-"}</div>
            <div>{company?.id || "-"}</div>
            <div>{company?.industry || "-"}</div>
            <div>{job.id}</div>
            <div>{job.title}</div>
            <div>
                {job.status ? <span className={`pill ${statusClass}`}>{job.status}</span> : "-"}
            </div>
            <div>
                {job.job_type ? <span className={`pill ${typeClass}`}>{job.job_type.replace("_"," ")}</span> : "-"}
            </div>
            <div>{compensation}</div>
            <div>{job.notes || "-"}</div>
            <div>
                <button className="button" onClick={() => onEdit(job)}>Edit</button>
                <button className="button" onClick={() => onDelete(job.id)} style={{marginLeft:"5px"}}>Delete</button>
            </div>
        </div>
    );
};

export default JobItem;
