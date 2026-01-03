import JobItem from "./JobItem";

export default function JobList({ jobs }) {
    return (
        <ul>
            {jobs.map((job) => (
                <JobItem key={job.id} job={job} />
            ))} 
        </ul>
    );
}