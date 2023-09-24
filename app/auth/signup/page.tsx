"use client";
import React from "react";
import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function SignUp() {
  const formErrors: string[] = [];

  return (
    <AuthFormContainer title="Create New Account">
      <Input name="name" label="Name" crossOrigin="anonymous" />
      <Input name="email" label="Email" crossOrigin="anonymous" />
      <Input
        name="password"
        label="Password"
        type="password"
        crossOrigin="anonymous"
      />
      <Button type="submit" className="w-full">
        Sign up
      </Button>
      <div className="">
        {formErrors.map((err) => {
          return (
            <div key={err} className="space-x-1 flex items-center text-red-500">
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}
