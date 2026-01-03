export default function CompanyItem({ company }) {
    return (
        <li>
            {company.id}: {company.name} ({company.industry})
        </li>
    );
}