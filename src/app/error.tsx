"use client";
// Hooks
import { useEffect } from "react";
// Components
import EmptyState from "@/components/EmptyState";
// Types
import { ErrorProps } from "@/types";

const Error = ({ error }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Somthing went wrong!" />;
};

export default Error;
