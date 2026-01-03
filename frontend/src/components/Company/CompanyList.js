import CompanyItem from "./CompanyItem";

export default function CompanyList({ companies } ) {
    return (
        <ul>
            {companies.map((c) => (
                <CompanyItem key={c.id} company={c} />
            ))}
        </ul>
    );
} 