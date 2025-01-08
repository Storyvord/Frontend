import React from "react";
import LoadingUi from "../LoadingUi";

interface LogisticsData {
  location: string;
  data: string[];
}

interface LogisticsPageProps {
  data: LogisticsData[] | null;
  isPending: boolean;
  isError: boolean;
}

const LogisticsPage: React.FC<LogisticsPageProps> = ({ data, isPending, isError }) => {
  if (isPending) {
    return <LoadingUi isPending={isPending} text="Getting logistics suggestions..." />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-poppins-semibold text-red-600">
          An error occurred while fetching data. Please try again later.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Logistics Details</h2>
      {data?.map((locationData, index) => (
        <div key={index} className="border p-4 rounded shadow-sm">
          <h3 className="text-xl font-bold mb-2">{locationData.location}</h3>
          <ul className="list-disc pl-5">
            {locationData.data.map((item, idx) => (
              <li key={idx} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default LogisticsPage;
