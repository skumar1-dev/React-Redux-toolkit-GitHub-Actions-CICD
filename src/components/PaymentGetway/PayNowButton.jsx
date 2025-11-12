import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function PayNowButton() {

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);
  const [error, setError] = useState(null);

  const data = [
    {
      fk_formid: 607150,
      fk_cycleid: 45,
      pk_headid: 1,
      amount: 2200,
      multipleFee: 1,
      totalFee: 2200,
    },
  ];

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setResponseMsg(null);

    try {
      const response = await fetch(
        //"http://20.219.165.133/RTU_Mobile_App_API_test/api/ExamForm/PaymentMainExamFormFee/pay-main-exam-form-fee",

        "http://localhost:5049/api/ExamForm/PaymentMainExamFormFee/pay-main-exam-form-fee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === "200") {
        setResponseMsg("Payment processed successfully!");
        // You can do more here with result
      } else {
        throw new Error(`Server error: ${result.Message || "Unknown error"}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <div>
        <Link to='/task/addtask'>
          Add Task sdss
        </Link>

      </div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {responseMsg && (
        <pre
          style={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            marginTop: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
          {responseMsg}
        </pre>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Error: {error}
        </p>
      )}
    </div>
  )
}

export default PayNowButton