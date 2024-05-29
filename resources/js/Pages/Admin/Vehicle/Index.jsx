import Alert from "@/Components/Alert";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Index = ({ auth, currentPage, totalPages, perPage, data, total }) => {
    const [itemsPerPage, setItemsPerPage] = useState(perPage);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setItemsPerPage(perPage);
    }, [perPage]);

    useEffect(() => {
        const storedSearch = localStorage.getItem("search_vehicle");
        if (storedSearch) {
            setSearch(storedSearch);
        }
    }, []);

    const handlePerPageChange = (e) => {
        const perPage = parseInt(e.target.value);
        setItemsPerPage(perPage);
        router.get(route("vehicle.index"), { perPage, page: 1 });
    };

    const handlePageChange = (page) => {
        page = parseInt(page);
        const storedSearch = localStorage.getItem("search_vehicle");
        router.get(route("vehicle.index"), {
            page,
            perPage: itemsPerPage,
            search: storedSearch,
        });
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        localStorage.setItem("search_vehicle", value);
    };

    const handleSearchSubmit = () => {
        router.get(route("vehicle.index"), {
            page: 1,
            perPage: itemsPerPage,
            search,
        });
    };

    const handleDelete = (id) => {
        router.delete(`/vehicle/${id}/delete`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Vehicle
                </h2>
            }
        >
            <Head title="Vehicle" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-black">
                            <Alert />
                            <div className="mb-4 flex justify-between">
                                <div>
                                    <h1 className="text-2xl">Data Vehicle</h1>
                                </div>
                                <div>
                                    <Link
                                        href="/vehicle/create"
                                        className="btn btn-sm btn-success text-white"
                                    >
                                        Add Vehicle
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-between mb-3">
                                <div>
                                    <select
                                        id="perPage"
                                        className="border border-gray-300 rounded px-3 pb-2 pr-8 focus:outline-none focus:border-blue-500"
                                        value={itemsPerPage}
                                        onChange={handlePerPageChange}
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={handleSearchChange}
                                        className="mr-2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        placeholder="Search Here"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSearchSubmit}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table min-w-full">
                                    {/* head */}
                                    <thead>
                                        <tr className="text-black">
                                            <th>#</th>
                                            <th>License Plate</th>
                                            <th>Type</th>
                                            <th>Owner</th>
                                            <th>Fuel Capacity</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr
                                                className="hover:bg-slate-200"
                                                key={index}
                                            >
                                                <th>{index + 1}</th>
                                                <td>{item.license_plate}</td>
                                                <td>{item.type}</td>
                                                <td>{item.owner}</td>
                                                <td>{item.fuel_capacity}</td>
                                                <td>
                                                    <Link
                                                        href={`/vehicle/${item.id}/edit`}
                                                        className="text-warning me-5"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                        className="text-red-500"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td
                                                className="text-black"
                                                colSpan={5}
                                            >
                                                Total Data : {total}
                                            </td>
                                            <td className="text-end pt-6">
                                                <div className="join bg-white shadow-md rounded-lg">
                                                    <button
                                                        onClick={() =>
                                                            handlePageChange(
                                                                parseInt(
                                                                    currentPage
                                                                ) - 1
                                                            )
                                                        }
                                                        disabled={
                                                            currentPage <= 1
                                                        }
                                                        className="join-item btn bg-white hover:bg-gray-200 border-0 text-black"
                                                    >
                                                        «
                                                    </button>

                                                    <button className="join-item btn bg-white hover:bg-gray-200 border-0 text-black">
                                                        Page {currentPage}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handlePageChange(
                                                                parseInt(
                                                                    currentPage
                                                                ) + 1
                                                            )
                                                        }
                                                        disabled={
                                                            currentPage >=
                                                            totalPages
                                                        }
                                                        className="join-item btn bg-white hover:bg-gray-200 border-0 text-black"
                                                    >
                                                        »
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
