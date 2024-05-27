import React from "react";
import { Chart } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register the required components from Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = (props) => {
    const data = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
        ],
        datasets: [
            {
                label: "Dataset 1",
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "Dataset 2",
                data: [28, 48, 40, 19, 86, 27, 90],
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "Dataset 3",
                data: [18, 48, 77, 9, 100, 27, 40],
                borderColor: "rgba(255, 159, 64, 1)",
                backgroundColor: "rgba(255, 159, 64, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Sample Line Chart with Three Datasets",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Month",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Value",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Line Chart Example</h2>
            <Chart type="line" data={data} options={options} {...props} />
        </div>
    );
};

export default LineChart;
