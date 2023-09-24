"use client";
import React from "react";
import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .required("Password is required"),
});

export default function SignUp() {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(errors);

  const formErrors: string[] = [];

  const { name, email, password } = values;

  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
      <Input
        name="name"
        label="Name"
        crossOrigin="anonymous"
        onChange={handleChange}
        value={name}
      />
      <Input
        name="email"
        label="Email"
        crossOrigin="anonymous"
        onChange={handleChange}
        value={email}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        crossOrigin="anonymous"
        onChange={handleChange}
        value={password}
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
