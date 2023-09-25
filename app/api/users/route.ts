import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const value = await req.json();
  console.log(value);

  return NextResponse.json({ hello: "world" });
};
