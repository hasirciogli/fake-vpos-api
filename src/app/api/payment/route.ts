import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const paymentsPath = path.resolve("./data/payments.json");

export async function POST(request: NextRequest) {
  const { type, amount, cardDetails, returnUrls } = await request.json();

  if (!type || !amount || !cardDetails || (type == "3d" && !returnUrls)) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const data = JSON.parse(fs.readFileSync(paymentsPath, "utf-8"));

  const paymentId = crypto.getRandomValues(new Uint32Array(1))[0];

  const payment = {
    id: paymentId,
    type,
    amount,
    cardDetails,
    status: type === "3d" ? "pending_3d" : "approved",
    returnUrls,
  };

  data.payments.push(payment);
  fs.writeFileSync(paymentsPath, JSON.stringify(data, null, 2));

  if (type === "3d") {
    // Simulate redirect to 3D Secure page
    const redirectUrl = `${process.env.XHOST}/3d-secure?paymentId=${paymentId}`;
    return NextResponse.json({ status: true, redirectUrl, paymentId });
  }

  return NextResponse.json({ status: true, approved: true, paymentId });
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const data = JSON.parse(fs.readFileSync(paymentsPath, "utf-8"));
  const payment = data.payments.find(
    (p: { id: number }) => p.id === Number(id)
  );

  if (payment) {
    return NextResponse.json(payment);
  } else {
    return NextResponse.json({ message: "Payment not found" }, { status: 404 });
  }
}
