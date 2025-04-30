import '../../css/Admin-dashboard/admin-dashboard.css'

function DelDashboard() {
    return (
        <>
            <div className="admin-dash">
                <h1 className="admin-dash-heading">Delivery Dashboard</h1>
                
                <h3 className="admin-dash-heading">Summary</h3>

                <div className="summary-section">
                    <div className="summary-item">
                        <p className="s-name">Cars</p>
                        <p className='s-amount'>100</p>
                    </div>
                    <div className="summary-item">
                        <p className="s-name">Customers</p>
                        <p className='s-amount'>500</p>
                    </div>
                    <div className="summary-item">
                        <p className="s-name">Staff</p>
                        <p className='s-amount'>50</p>
                    </div>
                    <div className="summary-item">
                        <p className="s-name">Total Revenue</p>
                        <p className='s-amount'>Rs.500,000</p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default DelDashboard;