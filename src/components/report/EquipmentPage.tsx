"use client";

import React, { useState, useEffect } from "react";
import LoadingUi from "./LoadingUi";
import EquipmentCard, { Equipment } from "./EquipmentCard";
import { Button } from "../ui/button";

type EquipmentRequirements = {
  message: string;
  data: Equipment[];
};
type EquipmentPageProps = {
  equipmentRequirements: EquipmentRequirements;
  isPending: boolean;
  isError: boolean;
  refetch: () => void;
};

const EquipmentPage: React.FC<EquipmentPageProps> = ({
  equipmentRequirements,
  isPending,
  isError,
  refetch,
}) => {
  if (isPending) {
    return <LoadingUi isPending={isPending} text="AI is matching best-fit suppliers..." />;
  }

  if (isError && !isPending) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center pt-8 md:p-6">
        <p className="text-xl font-poppins-semibold text-red-600">
          An error occurred while fetching data. Please try again.
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-center font-poppins-semibold text-2xl text-gray-900">
        {equipmentRequirements?.message}
      </h1>
      <section className="space-y-8">
        {equipmentRequirements?.data.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </section>
    </div>
  );
};

export default EquipmentPage;
