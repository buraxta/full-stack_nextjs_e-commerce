import startDb from "@/app/lib/db";
import UserModel from "@/app/models/userModel";
import { NewUserRequest } from "@/app/types";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: Request) => {
  const body = (await req.json()) as NewUserRequest;
  await startDb();
  const newUser = await UserModel.create({
    ...body,
  });

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "001da7257facf6",
      pass: "707c6bd445e1ef",
    },
  });

  transport.sendMail({
    from: "burak@mail.com",
    to: newUser.email,
    subject: "Welcome to the app",
    html: `<h1>Welcome to the app. Please verify your email by clicking on <a href="http://localhost:3000"> this link</a></h1>`,
  });

  return NextResponse.json(newUser);
};
