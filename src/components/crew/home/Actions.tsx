import Image from "next/image";
import React from "react";

const Actions = () => {
  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="text-xl font-poppins-medium flex items-center gap-2 mb-4">
        <Image src="/icons/action.svg" alt="Action Icon" width={20} height={20} />
        Actions
      </h2>
      <div>
        <ul className="relative border-l border-gray-300 pl-6 space-y-6">
          <li className="relative">
            <div className="absolute -left-[30px] top-0 w-3 h-3 bg-gray-500 rounded-full"></div>
            <h4 className="font-poppins-medium text-sm">Submitted a bug.</h4>
            <p className="text-xs text-gray-500">12 hours ago</p>
          </li>
          <li className="relative">
            <div className="absolute -left-[30px] top-0 w-3 h-3 bg-gray-500 rounded-full"></div>
            <h4 className="font-poppins-medium text-sm">Modified A data in Page X.</h4>
            <p className="text-xs text-gray-500">Today, 11:59 AM</p>
          </li>
          <li className="relative">
            <div className="absolute -left-[30px] top-0 w-3 h-3 bg-gray-500 rounded-full"></div>
            <h4 className="font-poppins-medium text-sm">Deleted a page in Project X.</h4>
            <p className="text-xs text-gray-500">Feb 2, 2024</p>
          </li>
          <li className="relative">
            <div className="absolute -left-[30px] top-0 w-3 h-3 bg-gray-500 rounded-full"></div>
            <h4 className="font-poppins-medium text-sm">Released a new version.</h4>
            <p className="text-xs text-gray-500">59 minutes ago</p>
          </li>
          <li className="relative">
            <div className="absolute -left-[30px] top-0 w-3 h-3 bg-gray-500 rounded-full"></div>
            <h4 className="font-poppins-medium text-sm">Changed the style.</h4>
            <p className="text-xs text-gray-500">Just now</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Actions;
