"use client";

import { useEffect } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const navigate = useNavigate();

  return (
    <div className="grid h-screen px-4 place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">500</h1>
        <p className="text-2xl font-bold tracking-tight sm:text-4xl">
          Ops! Sorry
        </p>
        <p className="mt-4 mb-2 text-muted-foreground">Something went wrong.</p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => navigate(-1)}>Go back</Button>
          <Button variant="outline" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
