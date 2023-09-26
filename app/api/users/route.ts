import startDb from "@/app/lib/db";
import EmailVerificationToken from "@/app/models/emailVerificationToken";
import UserModel from "@/app/models/userModel";
import { NewUserRequest } from "@/app/types";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const POST = async (req: Request) => {
  const body = (await req.json()) as NewUserRequest;
  await startDb();
  const newUser = await UserModel.create({
    ...body,
  });

  const token = crypto.randomBytes(32).toString("hex");
  EmailVerificationToken.create({
    user: newUser._id,
    token,
  });

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "001da7257facf6",
      pass: "707c6bd445e1ef",
    },
  });

  const verificationUrl = `http://localhost:3000/verify?token=${token}&userId=${newUser._id}`;

  transport.sendMail({
    from: "burak@mail.com",
    to: newUser.email,
    subject: "Welcome to the app",
    html: `<h1>Welcome to the app. Please verify your email by clicking on <a href="${verificationUrl}"> this link</a></h1>`,
  });

  return NextResponse.json(newUser);
};
