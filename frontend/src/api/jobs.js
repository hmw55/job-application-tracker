const BASE_URL = "http://127.0.0.1:8000/api/jobs";

// Fetch all jobs
export const getJobs = async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
};

// Create a new job
export const createJob = async (jobData) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
    });
    if (!res.ok) throw new Error("Failed to create job");
    return res.json();
};

// Update an existing job
export const updateJob = async (jobId, jobData) => {
    const res = await fetch(`${BASE_URL}/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
    });
    if (!res.ok) throw new Error("Failed to update job");
    return res.json();
};
