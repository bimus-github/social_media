"use client"; // This is a client component 👈🏽

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/"); // Replace '/' with the desired home page route
    }, 3000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(redirectTimer); // Clear the timer when the component unmounts
  }, [router]);
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
