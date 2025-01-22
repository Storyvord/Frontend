import React from "react";

const DisplayAllEvent = () => {
  return (
    <div className="border bg-white rounded-3xl h-full p-4 w-full">
      <div className="sticky top-0 bg-white z-10 px-4 rounded-t-3xl">
        <h3 className="font-poppins-semibold text-lg">Up next</h3>
      </div>
      {/* Scrollable section */}
      <section className="overflow-y-auto max-h-96 p-2 space-y-4">
        <div className="border-l-4 border-red-500 pl-3">
          <h4 className="font-poppins-medium">
            Major Project Meeting - Literature survey new idea discussion
          </h4>
          <p className="text-sm text-gray-600">10 : 30 AM - 12 : 30 PM</p>
        </div>
        <div className="border-l-4 border-yellow-500 pl-3">
          <h4 className="font-poppins-medium">
            Major Project Meeting - Literature survey new idea discussion
          </h4>
          <p className="text-sm text-gray-600">10 : 30 AM - 12 : 30 PM</p>
        </div>
        <div className="border-l-4 border-green-500 pl-3">
          <h4 className="font-poppins-medium">
            Major Project Meeting - Literature survey new idea discussion
          </h4>
          <p className="text-sm text-gray-600">10 : 30 AM - 12 : 30 PM</p>
        </div>
        <div className="border-l-4 border-steel-500 pl-3">
          <h4 className="font-poppins-medium">
            Major Project Meeting - Literature survey new idea discussion
          </h4>
          <p className="text-sm text-gray-600">10 : 30 AM - 12 : 30 PM</p>
        </div>
      </section>
    </div>
  );
};

export default DisplayAllEvent;
