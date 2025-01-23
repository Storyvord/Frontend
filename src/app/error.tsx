"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react"; // Importing Lucide React icon
import Link from "next/link";
import Image from "next/image";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center  min-h-screen bg-[#eceff180]">
      <nav className="mb-6 w-full shadow-sm px-6 py-3 bg-white">
        <Link href="/dashboard">
          <Image
            src="/logo.svg"
            width={200}
            height={100}
            alt="logo"
            className="sm:h-12 h-10 w-auto cursor-pointer"
          />
        </Link>
      </nav>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 max-w-md w-full text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Something Went Wrong
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          We are sorry, but something went wrong while loading this page.
        </p>
        <div className="mt-6">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Try Again
          </button>
        </div>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p>
            If the problem persists,{" "}
            <Link href="/help-support" className=" underline text-blue-700 font-poppins-medium">
              please contact support.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
