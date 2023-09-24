import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function layout({ children }: Props) {
  return (
    <div className="h-screen flex items-center justify-center">{children}</div>
  );
}
