import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const paymentsPath = path.resolve("./data/payments.json");

export async function POST(request: NextRequest) {
  const paymentId = request.nextUrl.searchParams.get("paymentId");
  const success = request.nextUrl.searchParams.get("success") === "1";

  if (!paymentId) {
    return NextResponse.json(
      { message: "Payment ID not provided" },
      { status: 400 }
    );
  }

  const data = JSON.parse(fs.readFileSync(paymentsPath, "utf-8"));
  const payment = data.payments.find(
    (p: { id: number }) => p.id == Number(paymentId)
  );

  if (payment) {
    payment.status = success ? "completed" : "failed";
    fs.writeFileSync(paymentsPath, JSON.stringify(data, null, 2));

    return NextResponse.redirect(
      process.env.XHOST +
        `/redirector?to=${
          success ? payment.okUrl : payment.failUrl
        }&paymentId=${paymentId}&success=${success ? "1" : "0"}`
    );
  } else {
    return NextResponse.json({ message: "Payment not found" }, { status: 404 });
  }
}
