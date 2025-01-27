"use client";

import React from "react";
import LoadingUi from "./LoadingUi";
import { Button } from "../ui/button";
import SupplierCard from "./SupplierCard";

export type Supplier = {
  name: string;
  type: string;
  pros: string[];
  cons: string[];
  notes: string;
  contact_info: {
    email: string;
    phone: string;
  };
  cost_estimate: string;
  sustainability_rating: number;
};

type SuppliersData = {
  [location: string]: Supplier[];
};

type Props = { report: SuppliersData; isPending: boolean; isError: boolean };

const SuppliersPage = ({ report, isPending, isError }: Props) => {
  if (isPending) {
    return <LoadingUi isPending={isPending} text="Fetching supplier data..." />;
  }

  if (isError && !isPending) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center pt-8 md:p-6">
        <p className="text-xl font-poppins-semibold text-red-600">
          An error occurred while fetching data. Please try again.
        </p>
        {/* <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button> */}
      </div>
    );
  }

  const suppliersData: SuppliersData = report || {};

  return (
    <div className="p-2 md:-p-4 mt-3">
      <h1 className="mb-6 font-poppins-semibold text-2xl text-gray-900">Recommended Suppliers</h1>
      <section className="space-y-8">
        {Object.keys(suppliersData).map((location) => (
          <div key={location} className="p-3 md:p-6 border border-gray-200 rounded-lg shadow-md">
            <h2 className="mb-4 font-poppins-semibold text-lg md:text-xl text-center text-gray-900 capitalize">
              Location: {location}
            </h2>
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {suppliersData[location].map((supplier, index) => (
                <SupplierCard key={`${location}-${index}`} supplier={supplier} />
              ))}
            </main>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SuppliersPage;
