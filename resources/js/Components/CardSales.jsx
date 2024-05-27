const CardSales = ({ totalSales, totalOrders, pendingOrders }) => {
    return (
        <div className="card w-96 bg-white-300 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Sales Information</h2>
                <p>Total Sales: ${totalSales}</p>
                <p>Total Orders: {totalOrders}</p>
                <p>Pending Orders: {pendingOrders}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-dark">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default CardSales;
