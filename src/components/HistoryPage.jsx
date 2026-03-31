import React, { useEffect, useState } from "react";

function HistoryPage() {
    const [history, setHistory] = useState([]);


    const BASE_URL = "https://quantitymeasurementapp-r98c.onrender.com";

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${BASE_URL}/measurements/history`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch history");
            }

            const data = await res.json();

            const sorted = data.data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            setHistory(sorted);
        } catch (err) {
            console.error("Error fetching history:", err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Operation History</h2>

            {history.length === 0 ? (
                <p>No history found</p>
            ) : (
                history.map((item, index) => (
                    <div key={index} className="history-card">
            <span>
              {item.operand1}

                {item.operation === "COMPARISON"
                    ? ` vs ${item.operand2}`
                    : item.operation === "SUBTRACTION"
                        ? ` - ${item.operand2}`
                        : item.operation === "ADDITION"
                            ? ` + ${item.operand2}`
                            : item.operation === "DIVISION"
                                ? ` ÷ ${item.operand2}`
                                : ""}
            </span>

                        <span style={{ float: "right" }}>
              →
                            {item.result === "true"
                                ? "Equal"
                                : item.result === "false"
                                    ? "Not Equal"
                                    : item.result}
                            {" "}
                            <small>({item.operation})</small>
            </span>
                    </div>
                ))
            )}
        </div>
    );
}

export default HistoryPage;