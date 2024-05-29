import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";

const Edit = ({ auth, user }) => {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        role: user.role || "admin",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleRoleChange = (e) => {
        setData("role", e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route("user.update", user.id), data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit User
                </h2>
            }
        >
            <Head title="Edit User" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h1 className="text-2xl text-center text-black mt-6">
                            Edit User
                        </h1>
                        <div className="mx-auto flex flex-col items-center justify-center">
                            <div className="w-1/2 mx-auto">
                                <form onSubmit={handleSubmit}>
                                    <label className="form-control w-full max-w-lg">
                                        <div className="label">
                                            <span className="label-text">
                                                What is your name?
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-lg bg-white"
                                            name="name"
                                            value={data.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && (
                                            <span className="text-red-600">
                                                {errors.name}
                                            </span>
                                        )}
                                    </label>
                                    <label className="form-control w-full max-w-lg">
                                        <div className="label">
                                            <span className="label-text">
                                                What is your email?
                                            </span>
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-lg bg-white"
                                            name="email"
                                            value={data.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && (
                                            <span className="text-red-600">
                                                {errors.email}
                                            </span>
                                        )}
                                    </label>
                                    <label className="form-control w-full max-w-lg">
                                        <div className="label">
                                            <span className="label-text">
                                                What is your password?
                                            </span>
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-lg bg-white"
                                            name="password"
                                            value={data.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && (
                                            <span className="text-red-600">
                                                {errors.password}
                                            </span>
                                        )}
                                    </label>
                                    <label className="form-control w-full max-w-lg">
                                        <div className="label">
                                            <span className="label-text">
                                                Confirm your password
                                            </span>
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-lg bg-white"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={handleChange}
                                        />
                                        {errors.password_confirmation && (
                                            <span className="text-red-600">
                                                {errors.password_confirmation}
                                            </span>
                                        )}
                                    </label>
                                    <div className="form-control inline-block pt-4">
                                        <label className="me-2">Admin</label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="admin"
                                            className="radio me-5"
                                            checked={data.role === "admin"}
                                            onChange={handleRoleChange}
                                        />
                                        <label className="me-2">Approver</label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="approver"
                                            className="radio me-5"
                                            checked={data.role === "approver"}
                                            onChange={handleRoleChange}
                                        />
                                    </div>
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

export default Edit;
