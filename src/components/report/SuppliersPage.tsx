"use client";

import React from "react";
import LoadingUi from "./LoadingUi";
import { Button } from "../ui/button";
import SupplierCard from "./SupplierCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";

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

type Props = {
  report: SuppliersData;
  isPending: boolean;
  isError: boolean;
  handleRegenerateAiWork: (reportName: "supplier") => Promise<void>;
};

const SuppliersPage = ({ report, isPending, isError, handleRegenerateAiWork }: Props) => {
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

  if (typeof report === "string") {
    return (
      <div className="p-4 bg-yellow-50 grid place-content-center gap-4 border border-yellow-400 text-yellow-700 rounded-md mt-10 w-fit mx-auto">
        <p className="text-center font-poppins-semibold w-fit">
          Unable to display data. Please check the report format.
        </p>
        <Button
          onClick={() => handleRegenerateAiWork("supplier")}
          className="font-poppins-medium text-sm"
          size="sm"
          variant="outline"
        >
          Re-Generate
        </Button>
      </div>
    );
  }

  return (
    <div className="p-2 md:-p-4 mt-3 relative">
      <Popover>
        <PopoverTrigger className=" absolute right-0">
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent className=" w-fit">
          <Button
            onClick={() => handleRegenerateAiWork("supplier")}
            className="font-poppins-medium text-sm"
            size="sm"
            variant="outline"
          >
            Re-Generate
          </Button>
        </PopoverContent>
      </Popover>
      <h1 className="mb-6 font-poppins-semibold text-2xl text-gray-900">Recommended Suppliers</h1>
      <section className="space-y-8">
        {Object.keys(report).map((location) => (
          <div key={location} className="p-3 md:p-6 border border-gray-200 rounded-lg shadow-md">
            <h2 className="mb-4 font-poppins-semibold text-lg md:text-xl text-center text-gray-900 capitalize">
              Location: {location}
            </h2>
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {report[location].map((supplier, index) => (
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
