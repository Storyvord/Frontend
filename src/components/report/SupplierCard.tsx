"use client";

import React from "react";
import { Supplier } from "./SuppliersPage";

type SupplierCardProps = {
  supplier: Supplier;
};

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  return (
    <div className="p-4 border border-gray-300 bg-white rounded-md shadow-sm">
      <h3 className="mb-2 font-poppins-semibold text-md text-gray-800">
        {supplier?.name || "No Name Provided"}
      </h3>
      <p className="mb-2 text-gray-800">
        <strong>Type:</strong> {supplier?.type || "N/A"}
      </p>
      <ul className="mb-4">
        <li>
          <strong className="text-gray-800">Pros:</strong>
          <ul className="list-disc list-inside ml-4">
            {supplier?.pros?.length > 0 ? (
              supplier.pros.map((pro, idx) => <li key={idx}>{pro}</li>)
            ) : (
              <li>No pros available</li>
            )}
          </ul>
        </li>
        <li>
          <strong className="text-gray-800">Cons:</strong>
          <ul className="list-disc list-inside ml-4">
            {supplier?.cons?.length > 0 ? (
              supplier.cons.map((con, idx) => <li key={idx}>{con}</li>)
            ) : (
              <li>No cons available</li>
            )}
          </ul>
        </li>
      </ul>
      <p className="mb-2 text-gray-800">
        <strong>Notes:</strong> {supplier?.notes || "No notes provided"}
      </p>
      <p className="mb-2 text-gray-800">
        <strong>Cost Estimate:</strong> {supplier?.cost_estimate || "N/A"}
      </p>
      <p className="mb-2 text-gray-800">
        <strong>Sustainability Rating:</strong>{" "}
        {supplier?.sustainability_rating
          ? `${supplier.sustainability_rating}/5`
          : "No rating available"}
      </p>
      <p className="mb-2 text-gray-800">
        <strong>Contact Info:</strong>
        <br />
        Email:{" "}
        <a
          href={`mailto:${supplier?.contact_info?.email || ""}`}
          className="text-blue-500 hover:underline"
        >
          {supplier?.contact_info?.email || "No email available"}
        </a>
        <br />
        Phone:{" "}
        <a
          href={`tel:${supplier?.contact_info?.phone || ""}`}
          className="text-blue-500 hover:underline"
        >
          {supplier?.contact_info?.phone || "No phone available"}
        </a>
      </p>
    </div>
  );
};

export default SupplierCard;
