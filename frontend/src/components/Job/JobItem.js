const JobItem = ({ job, company }) => {
    return (
        <div className="list-row">
            <div>{job.id}</div>
            <div>{job.title}</div>
            <div>{company?.name || "Unknown"}</div>
            <div>{company?.industry || "-"}</div>
            <div>
                <span className={`status-pill ${job.status || "applied"}`}>
                    {job.status || "Applied"}
                </span>
            </div>
            <div>
                <button className="button">Edit</button>
            </div>
        </div>
    );
};

export default JobItem;
