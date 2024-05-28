import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Create = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User
                </h2>
            }
        >
            <Head title="Create User" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h1 className="text-2xl text-center text-black mt-6">
                            Create User
                        </h1>
                        <div className="mx-auto flex flex-col items-center justify-center">
                            <div className="w-1/2 mx-auto">
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
                                    />
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
                                    />
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
                                    />
                                </label>
                                <div>
                                    <label>Admin</label>
                                    <input
                                        type="radio"
                                        name="radio-1"
                                        className="radio"
                                        checked
                                    />
                                </div>
                                <div>
                                    <label>Approver</label>
                                    <input
                                        type="radio"
                                        name="radio-1"
                                        className="radio"
                                    />
                                </div>
                                <button className="btn btn-info">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
