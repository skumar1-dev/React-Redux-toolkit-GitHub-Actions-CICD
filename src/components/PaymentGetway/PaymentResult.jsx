import React, { useEffect, useState } from 'react'

function PaymentResult() {
    const [status, setStatus] = useState("Pending");
    const [error, setError] = useState(null);

    useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const txId = params.get("txId");
    const status = params.get("status");
    const checksum = params.get("checksum");

    if (!txId || !status || !checksum) {
      setError("Invalid response data");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(
          `https://localhost:5001/api/payment/verify?txId=${txId}&status=${status}&checksum=${checksum}`
        );
        const result = await res.json();
        setStatus(result.valid ? result.status : "Checksum Invalid");
      } catch {
        setError("Failed to verify payment.");
      }
    };

    verifyPayment();
  }, []);

    return (
      <div>
      {status === "Success" ? (
        <h2>✅ Payment Successful!</h2>
      ) : (
        <h2>❌ Payment Failed: {status}</h2>
      )}
    </div>

    )
}

export default PaymentResult