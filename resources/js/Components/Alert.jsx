import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

const Alert = () => {
    const { flash } = usePage().props ?? {};
    const successMessage = flash?.success ?? null;
    const errorMessage = flash?.error ?? null;

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(!!(successMessage || errorMessage));
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [successMessage, errorMessage]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className="toast toast-top toast-end">
            <div
                className={`alert alert-${successMessage ? "info" : "danger"}`}
            >
                <span>{successMessage ? successMessage : errorMessage}</span>
            </div>
        </div>
    );
};

export default Alert;
