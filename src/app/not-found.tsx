import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
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

      <div className="text-center">
        <Image
          src="/page-not-found.svg"
          height={300}
          width={400}
          alt="Page not found illustration"
          className="mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 sm:text-lg mb-6">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          href="/dashboard"
          className="px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
