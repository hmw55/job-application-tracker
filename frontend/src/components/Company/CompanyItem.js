const CompanyItem = ({ company }) => {
    return (
        <div className="list-row">
            <div>{company.id}</div>
            <div>{company.name}</div>
            <div>{company.industry}</div>
            <div>
                <button className="button">Edit</button>
            </div>
        </div>
    );
};

export default CompanyItem;