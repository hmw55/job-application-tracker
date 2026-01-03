const BASE_URL = "http://127.0.0.1:8000/api/jobs";

export const getJobs = async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
}