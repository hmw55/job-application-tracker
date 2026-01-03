import CompanyItem from "./CompanyItem";

const CompanyList = ({ companies }) => {
    return (
        <div className="list-container">
            <div className="list-header">
                <div>ID</div>
                <div>Name</div>
                <div>Industry</div>
                <div>Actions</div>
            </div>

            {companies.map(company => (
                <CompanyItem key={company.id} company={company} />
            ))}
        </div>
    );
}; 

export default CompanyList;