"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

type ScanEntry = {
  city: string;
  timestamp: string;
};

export default function ScanPage() {
  const { orgId } = useParams();
  const [city, setCity] = useState("");
  const [cityCounts, setCityCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const logAndLoadScans = async () => {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      const userCity = data.city || "Unknown";
      setCity(userCity);

      const scansKey = `scans_${orgId}`;
      const existing: ScanEntry[] = JSON.parse(localStorage.getItem(scansKey) || "[]");

      existing.push({
        city: userCity,
        timestamp: new Date().toISOString(),
      });

      localStorage.setItem(scansKey, JSON.stringify(existing));

      const counts: Record<string, number> = {};
      for (const entry of existing) {
        counts[entry.city] = (counts[entry.city] || 0) + 1;
      }

      setCityCounts(counts);
    };

    logAndLoadScans();
  }, [orgId]);

  const chartData = {
    labels: Object.keys(cityCounts),
    datasets: [
      {
        label: "Scans by City",
        data: Object.values(cityCounts),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "QR Scans by City",
      },
    },
  };

  return (
    <section className="p-6 max-w-3xl w-full">
      <h1 className="text-2xl font-bold mb-4">Thank you for scanning!</h1>
      <p className="mb-6">You&aposre from: <strong>{city || "Loading..."}</strong></p>

      <div className="bg-white shadow-md rounded-lg p-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </section>
  );
}
