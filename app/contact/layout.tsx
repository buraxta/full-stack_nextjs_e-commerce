import React from "react";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>Contact Layout</div>
      {children}
    </div>
  );
}
