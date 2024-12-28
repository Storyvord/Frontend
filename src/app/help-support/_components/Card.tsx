import React from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  slug: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, slug, description }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 bg-white flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-poppins-medium mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
      <Link href={`/help-support/${slug}`} className=" mt-auto underline text-blue-900">
        Read More
      </Link>
    </div>
  );
};

export default Card;
