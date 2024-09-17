'use client'

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const RRR = () => {
    const params = useSearchParams();
    const to = params.get("to") as string;
    const paymentId = params.get("paymentId") as string;
    const success = params.get("success") as '1' | '0';

    return (
        <form action={to} method="post">
            <input type="hidden" name="paymentId" value={paymentId} />
            <input type="hidden" name="success" value={success} />
            <button onLoad={(e) => {
                e.preventDefault();
                e.currentTarget.click();
            }} type="submit" hidden>Redirect</button>
        </form>
    )
}

export default function Redirector() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <RRR />
            </Suspense>
        </div>
    );
}