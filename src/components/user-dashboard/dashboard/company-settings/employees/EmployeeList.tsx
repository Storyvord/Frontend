"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Tabs from "@/components/Tabs";
import { BiMessageDetail } from "react-icons/bi";
import { cn } from "@/lib/utils";

const headers = ["First Name", "Last Name", "Email", "Status", "Message"];
type ProfileData = {
  id: number;
  firstName: string;
  lastName: string;
  employee_email: string;
  status: string;
  invited_user: { id: number };
};
type Profile = {
  accepted: ProfileData[];
  pending: ProfileData[];
  rejected: ProfileData[];
};

type Props = {
  data: Profile;
  isLoading?: boolean;
};
const tabs = ["Accepted", "Pending", "Rejected"];
const EmployeeList = ({ data, isLoading }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleRedirectToMessagePage = (id: number, firstName: string, lastName: string) => {
    router.push(`/dashboard/message/?receiverId=${id}&name=${firstName}%20${lastName}`);
  };

  // Function to get the current list based on active tab
  const getCurrentList = () => {
    switch (activeTab) {
      case "Accepted":
        return data?.accepted || [];
      case "Pending":
        return data?.pending || [];
      case "Rejected":
        return data?.rejected || [];
      default:
        return [];
    }
  };

  // Get the current list of profiles based on active tab
  const currentList = getCurrentList();

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      {isLoading && <p className="w-full text-center">Loading...</p>}
      {!isLoading && currentList.length === 0 && (
        <p className="w-full text-center text-gray-500 mt-8">No staff found</p>
      )}
      {currentList.length > 0 && (
        <Table className="mt-4 bg-white p-2 border-b">
          <TableHeader>
            <TableRow className="hover:bg-white">
              {headers.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentList.map((item: ProfileData) => (
              <TableRow key={item.id} className="hover:bg-white">
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.employee_email}</TableCell>
                <TableCell
                  className={cn(
                    "font-semibold",
                    item.status === "accepted" && "text-green-500",
                    item.status === "pending" && "text-yellow-500",
                    item.status === "rejected" && "text-red-500"
                  )}
                >
                  {item.status}
                </TableCell>
                <TableCell>
                  <BiMessageDetail
                    // TODO: will be uncommented when the api is fully ready
                    // onClick={() =>
                    //   handleRedirectToMessagePage(
                    //     item?.invited_user?.id,
                    //     item.firstName,
                    //     item.lastName
                    //   )
                    // }
                    className="w-6 h-6 hover:text-gray-600 cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default EmployeeList;
