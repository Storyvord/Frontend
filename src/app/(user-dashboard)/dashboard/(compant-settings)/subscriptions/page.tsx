"use client";

import React from "react";

const SubscriptionPackages = () => {
  const packages = [
    {
      name: "Indie Package (Essential)",
      description: "For independent filmmakers taking their first steps.",
      price: "Free",
      features: [
        "Project Management Tools",
        "AI Assistance",
        "1 User",
        "3 Projects Limit",
        "Real Human Producer (additional cost)",
      ],
    },
    {
      name: "Studio Package (Professional)",
      description: "For growing studios ready to scale and manage global projects.",
      price: "$7,600 Annually",
      features: [
        "Everything from Indie Package",
        "Marketplace Access (Crew and Suppliers)",
        "3 Users",
        "20 Projects Limit",
        "Unlimited Support from Real Human Producers",
        "Access to Mobile App",
      ],
    },
    {
      name: "Oscar Package (Enterprise)",
      description: "For high-end productions and studios creating cinematic masterpieces.",
      price: "$47,900 Annually",
      features: [
        "Everything from Studio Package",
        "Advanced Creative Tools",
        "Departmental Tools for specialized teams (e.g., Camera, Costume, Props, Art, etc.)",
        "20 Users",
        "100 Projects Limit",
        "Dedicated Account Manager with Real Human Producer Support",
      ],
    },
  ];

  return (
    <div className=" py-10 px-4 md:px-6 lg:px-8 font-poppins">
      <h2 className="text-3xl font-poppins-bold text-center mb-8">Subscription Packages</h2>
      {/* <div className="flex items-center justify-center h-[300px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        <div className="text-center">
          <h3 className="text-2xl font-poppins-semibold text-gray-700 mb-2">Coming Soon</h3>
          <p className="text-gray-500 text-lg">
            Our subscription packages are launching soon. Stay tuned for updates!
          </p>
          <div className="mt-4">
            <button className="bg-green-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-green-700 transition duration-300">
              Notify Me
            </button>
          </div>
        </div>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="border flex flex-col justify-between rounded-lg p-6 relative shadow-sm hover:shadow-md transition duration-300 bg-white"
          >
            <h3 className="text-xl font-poppins-semibold mb-2">{pkg.name}</h3>
            <p className="text-gray-600 mb-4">{pkg.description}</p>
            <ul className="text-gray-700 mb-4 list-disc list-inside space-y-1">
              {pkg.features.map((feature, i) => (
                <li key={i} className="ml-2">
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-lg font-poppins-semibold mt-auto">Price: {pkg.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPackages;
