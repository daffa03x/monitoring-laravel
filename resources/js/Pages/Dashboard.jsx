import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import BarChart from "@/Components/BarChart";
import LineChart from "@/Components/LineChart";
import CardSales from "@/Components/CardSales";

const Dashboard = ({ auth }) => {
    const salesData = {
        totalSales: 10000,
        totalOrders: 150,
        pendingOrders: 5,
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <CardSales
                                    totalSales={salesData.totalSales}
                                    totalOrders={salesData.totalOrders}
                                    pendingOrders={salesData.pendingOrders}
                                />
                                <CardSales
                                    totalSales={salesData.totalSales}
                                    totalOrders={salesData.totalOrders}
                                    pendingOrders={salesData.pendingOrders}
                                />
                                <CardSales
                                    totalSales={salesData.totalSales}
                                    totalOrders={salesData.totalOrders}
                                    pendingOrders={salesData.pendingOrders}
                                />
                            </div>
                            <BarChart />
                            <hr className="my-6" />
                            <LineChart />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
