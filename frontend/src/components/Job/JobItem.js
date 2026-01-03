export default function JobItem({ job }) {
    return (
        <li>
            {job.id}: {job.title} at {job.company_name || "Unknown Company"}
        </li>
    );
}