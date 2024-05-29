import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";

const Create = ({ auth }) => {
    const { data, setData, processing, errors } = useForm({
        license_plate: "",
        type: "passenger",
        owner: "company",
        fuel_capacity: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleRadioChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("vehicle.store"), data);
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
            <Head title="Create Vehicle" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h1 className="text-2xl text-center text-black mt-6">
                            Create Vehicle
                        </h1>
                        <div className="mx-auto flex flex-col items-center justify-center">
                            <div className="w-1/2 mx-auto">
                                <form onSubmit={handleSubmit}>
                                    <label className="form-control w-full max-w-lg">
                                        <div className="label">
                                            <span className="label-text">
                                                What is the license plate?
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-lg bg-white"
                                            name="license_plate"
                                            value={data.license_plate}
                                            onChange={handleChange}
                                        />
                                        {errors.license_plate && (
                                            <span className="text-red-600">
                                                {errors.license_plate}
                                            </span>
                                        )}
                                    </label>

                                    <div className="form-control w-full max-w-lg">
                                        <div className="label">
                                            <span className="label-text">
                                                What is the type?
                                            </span>
                                        </div>
                                        <label className="mb-2">
                                            <input
                                                type="radio"
                                                name="type"
                                                value="passenger"
                                                className="radio me-2"
                                                checked={
                                                    data.type === "passenger"
                                                }
                                                onChange={handleRadioChange}
                                            />
                                            Passenger
                                        </label>
                                        <label className="me-2">
                                            <input
                                                type="radio"
                                                name="type"
                                                value="cargo"
                                                className="radio me-2"
                                                checked={data.type === "cargo"}
                                                onChange={handleRadioChange}
                                            />
                                            Cargo
                                        </label>
                                        {errors.type && (
                                            <span className="text-red-600">
                                                {errors.type}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-control w-full max-w-lg">
                                        <div className="label">
                                            <span className="label-text">
                                                Who is the owner?
                                            </span>
                                        </div>
                                        <label className="mb-2">
                                            <input
                                                type="radio"
                                                name="owner"
                                                value="company"
                                                className="radio me-2"
                                                checked={
                                                    data.owner === "company"
                                                }
                                                onChange={handleRadioChange}
                                            />
                                            Company
                                        </label>
                                        <label className="me-2">
                                            <input
                                                type="radio"
                                                name="owner"
                                                value="cargo"
                                                className="radio me-2"
                                                checked={data.owner === "cargo"}
                                                onChange={handleRadioChange}
                                            />
                                            Cargo
                                        </label>
                                        {errors.owner && (
                                            <span className="text-red-600">
                                                {errors.owner}
                                            </span>
                                        )}
                                    </div>

                                    <label className="form-control w-full max-w-lg">
                                        <div className="label">
                                            <span className="label-text">
                                                What is the fuel capacity?
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-lg bg-white"
                                            name="fuel_capacity"
                                            value={data.fuel_capacity}
                                            onChange={handleChange}
                                        />
                                        {errors.fuel_capacity && (
                                            <span className="text-red-600">
                                                {errors.fuel_capacity}
                                            </span>
                                        )}
                                    </label>

                                    <div>
                                        <button
                                            className="btn btn-info my-4"
                                            disabled={processing}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
