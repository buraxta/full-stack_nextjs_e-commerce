"use client";
import React, { useEffect } from "react";
import { useRouter, notFound } from "next/navigation";

interface Props {
  searchParams: { token: string; userId: string };
}

export default function page(props: Props) {
  const { token, userId } = props.searchParams;
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, userId }),
    }).then(async (res) => {
      const apiRes = await res.json();

      const { error, message } = apiRes as { error: string; message: string };

      if (res.ok) {
        router.replace("/");
      }

      if (!res.ok && error) {
        console.log(error);
      }
    });
  }, [token, userId]);

  if (!token || !userId) {
    return notFound();
  }

  return (
    <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
      Please wait...
      <p>We are verifying your email</p>
    </div>
  );
}
