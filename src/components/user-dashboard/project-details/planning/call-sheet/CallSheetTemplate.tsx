import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/assets/logo1.jpeg";
import { useGetCallSheetDetails } from "@/lib/react-query/queriesAndMutations/callsheet";

const CallSheetTemplate = forwardRef<HTMLDivElement, { id: number }>((props, ref) => {
  const [location, setLocation] = useState<[] | undefined>([]);
  const sunrise = "6:30 AM";
  const sunset = "7:30 PM";
  const weather = "Sunny, 25°C";

  const { data } = useGetCallSheetDetails(props.id);

  useEffect(() => {
    setLocation(data?.data?.location?.split(","));
  }, [data]);

  // Generate the Google Maps Embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAnmHDoxexwRcNy63vKd-my62JA6Xy4L7M&q=${encodeURIComponent(location?.at(0) || "")},${encodeURIComponent(location?.at(1) || "")}`;

  return (
    <div
      ref={ref}
      className="p-4 bg-white border-2 box-border"
      style={{ width: "210mm", height: "297mm", margin: "auto" }}
    >
      <div className="flex justify-between mb-4">
        <div className="w-1/3 border p-2 text-sm">
          <table className="w-full border-collapse border text-xs mt-2">
            <tbody>
              <tr>
                <td className="border px-2 py-1">
                  <strong>Breakfast Time:</strong>
                </td>
                <td className="border px-2 py-1">{data?.data?.events?.at(0)?.time}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">
                  <strong>Lunch Time:</strong>
                </td>
                <td className="border px-2 py-1">{data?.data?.events?.at(1)?.time}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">
                  <strong>Dinner Time:</strong>
                </td>
                <td className="border px-2 py-1">{data?.data?.events?.at(2)?.time}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="w-1/5 text-center">
          <Image src={Logo} alt="Logo" className="mx-auto -my-2 size-18" />
          <h1 className="text-md font-normal mb-2">{data?.data?.title}</h1>
          <p className="text-lg font-semibold border-2 border-black rounded-full">
            {data?.data?.calltime}
          </p>
        </div>
        <div className="w-1/3 border p-2">
          <table className="w-full border-collapse border text-sm">
            <tbody>
              <tr>
                <td className="border px-2 py-1">
                  <strong>Sunrise:</strong>
                </td>
                <td className="border px-2 py-1">{sunrise}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">
                  <strong>Sunset:</strong>
                </td>
                <td className="border px-2 py-1">{sunset}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">
                  <strong>Weather:</strong>
                </td>
                <td className="border px-2 py-1">{weather}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="w-1/2 border p-2 h-48">
          <iframe width="100%" height="100%" style={{ border: 0 }} src={mapUrl} allowFullScreen />
        </div>

        <div className="w-1/2 border p-2 text-sm flex flex-col gap-3 pt-4">
          <p>
            <strong>Address: </strong>
            {data?.data?.location}
          </p>
          <p>
            <strong>Nearest Police Station:</strong> {data?.data?.nearest_police_station}
          </p>
          <p>
            <strong>Nearest Fire Station:</strong> {data?.data?.nearest_fire_station}
          </p>
          <p>
            <strong>Nearest Hospital:</strong> {data?.data?.nearest_hospital_address}
          </p>
        </div>
      </div>

      {/* Crew Contact Information */}
      <table className="w-full border-collapse border text-xs mt-8">
        <thead>
          <tr>
            <th className="border px-2 py-1">POSITION</th>
            <th className="border px-2 py-1">NAME</th>
            <th className="border px-2 py-1">PHONE</th>
            <th className="border px-2 py-1">EMAIL</th>
            <th className="border px-2 py-1">CALL TIME</th>
            <th className="border px-2 py-1">REMARKS</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.call_time?.map((item: any) => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.position}</td>
              <td className="border px-2 py-1">{item.name}</td>
              <td className="border px-2 py-1">{item.phone}</td>
              <td className="border px-2 py-1">{item.email}</td>
              <td className="border px-2 py-1">{item.calltime}</td>
              <td className="border px-2 py-1">{item?.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Production Notes */}
      <table className="w-full mb-4 border-collapse border text-xs mt-6">
        <thead>
          <tr>
            <th className="border px-2 py-1">PRODUCTION NOTES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-5 text-center">{data?.data?.production_notes}</td>
          </tr>
        </tbody>
      </table>

      {/* ADDITIONAL Notes */}
      <table className="w-full mb-4 border-collapse border text-xs mt-6">
        <thead>
          <tr>
            <th className="border px-2 py-1">ADDITIONAL NOTES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-5 text-center">{data?.data?.additional_notes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

CallSheetTemplate.displayName = "CallSheetTemplate";

export default CallSheetTemplate;
