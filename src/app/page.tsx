'use client'
import { useState } from 'react';

export default function Home() {
  const [type, setType] = useState('nonsecure');
  const [amount, setAmount] = useState('');
  const [cardDetails, setCardDetails] = useState('');
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type, amount, cardDetails })
    });

    const data = await response.json();

    if (response.ok) {
      setPaymentId(data.paymentId);
      setStatus('Payment processed successfully');
    } else {
      setStatus(`Error: ${data.message}`);
    }
  };

  return (
    <div>
      <h1>Payment Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Payment Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="nonsecure">Non-Secure</option>
            <option value="3d">3D Secure</option>
          </select>
        </label>
        <br />
        <label>
          Amount:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <br />
        <label>
          Card Details:
          <input
            type="text"
            value={cardDetails}
            onChange={(e) => setCardDetails(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Payment</button>
      </form>
      {status && <p>{status}</p>}
      {paymentId && <p>Payment ID: {paymentId}</p>}
    </div>
  );
}
