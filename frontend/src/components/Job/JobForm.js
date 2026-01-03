import React, { useState } from "react";
import { createJob, updateJob } from "../../api/jobs";

const STATUS_OPTIONS = ["saved", "applied", "interview", "offer", "rejected", "withdrawn"];
const JOB_TYPE_OPTIONS = [
    "full_time", "part_time", "internship", "contract",
    "temporary", "remote", "hybrid", "on_site"
];
const COMP_TYPE_OPTIONS = ["salary", "hourly"];

const JobForm = ({ job = null, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        company_name: job?.company?.name || "",
        industry: job?.company?.industry || "",
        title: job?.title || "",
        status: job?.status || "",
        job_type: job?.job_type || "",
        compensation_type: job?.compensation_type || "",
        compensation_amount: job?.compensation_amount || "",
        applied_date: job?.applied_date || "",
        last_updated: job?.last_updated || "",
        notes: job?.notes || "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let companyId = job?.company_id;

            // Create company if it doesn't exist
            if (!companyId && formData.company_name) {
                const res = await fetch("http://127.0.0.1:8000/api/companies", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        name: formData.company_name, 
                        industry: formData.industry 
                    })
                });

                if (!res.ok) throw new Error("Failed to create company");
                const newCompany = await res.json();
                companyId = newCompany.id;
            }

            const jobPayload = { ...formData, company_id: companyId };

            if (job) {
                await updateJob(job.id, jobPayload);
            } else {
                await createJob(jobPayload);
            }

            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="job-form" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}

            {/* Row 1: Company + Industry + Title */}
            <div className="form-row">
                <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="input"
                    required
                />
                <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="Industry"
                    className="input"
                />
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className="input"
                    required
                />
            </div>

            {/* Row 2: Status, Job Type, Compensation */}
            <div className="form-row">
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="select"
                    required
                >
                    <option value="">Select Status</option>
                    {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                </select>

                <select
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleChange}
                    className="select"
                >
                    <option value="">Select Type</option>
                    {JOB_TYPE_OPTIONS.map(t => (
                        <option key={t} value={t}>{t.replace("_", " ").toUpperCase()}</option>
                    ))}
                </select>

                <select
                    name="compensation_type"
                    value={formData.compensation_type}
                    onChange={handleChange}
                    className="select"
                >
                    <option value="">Compensation Type</option>
                    {COMP_TYPE_OPTIONS.map(c => (
                        <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                </select>

                <input
                    type="number"
                    name="compensation_amount"
                    value={formData.compensation_amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    className="input"
                />
            </div>

            {/* Row 3: Applied Date, Last Updated, Notes */}
            <div className="form-row">
                <div>
                    <label>Applied Date</label>
                    <input
                        type="date"
                        name="applied_date"
                        value={formData.applied_date}
                        onChange={handleChange}
                        className="input"
                    />
                </div>

                <div>
                    <label>Last Updated</label>
                    <input
                        type="date"
                        name="last_updated"
                        value={formData.last_updated}
                        onChange={handleChange}
                        className="input"
                    />
                </div>

                <div>
                    <label>Notes</label>
                    <input
                        type="text"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Notes"
                        className="input"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="form-row" style={{ justifyContent: "flex-end" }}>
                {onCancel && (
                    <button type="button" className="button" onClick={onCancel}>
                        Cancel
                    </button>
                )}
                <button type="submit" className="button" disabled={loading}>
                    {job ? "Update Job" : "Create Job"}
                </button>
            </div>
        </form>
    );
};

export default JobForm;
