'use client'

import { useEffect, useState } from 'react';

export default function ThreeDSecure() {
    const [success, setSuccess] = useState(true);
    const [paymentId, setPaymentId] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const _paymentId = urlParams.get('paymentId') as string;
        setPaymentId(_paymentId);
    }, []);

    return (
        <div>
            <h1>3D Secure Authentication</h1>
            <p>Enter the OTP or authentication details here.</p>
            <button onClick={() => setSuccess(true)}>Simulate Success</button>
            <button onClick={() => setSuccess(false)}>Simulate Failure</button>

            <form action={process.env.XHOST + `/api/3d-secure?paymentId=${paymentId}&success=${success ? '1' : '0'}`} method="post">
                <button type='submit'>Handle as TEST</button>
            </form>

        </div>
    );
}
