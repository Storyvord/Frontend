"use client";
import React, { useEffect, useState } from "react";
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

const headers = ["Name", "Position", "Location", "Email", "Message"];
const tabs = ["Accepted", "Pending", "Rejected"];

type UserDetails = {
  user_id: number;
  full_name: string | null;
  job_title: string | null;
  location: string | null;
  email: string | null;
};

type Invite = {
  invite_id: string;
  status: string;
  user_details: UserDetails;
};

type Props = {
  data: {
    invites: Invite[];
  };
  isLoading?: boolean;
};

const CrewList = ({ data, isLoading }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabs[1]); // Default to "Pending"
  const [accepted, setAccepted] = useState<Invite[]>([]);
  const [pending, setPending] = useState<Invite[]>([]);
  const [rejected, setRejected] = useState<Invite[]>([]);

  const handleRedirectToMessagePage = (id: number, name: string) => {
    router.push(`/dashboard/message/?receiverId=${id}&name=${encodeURIComponent(name)}`);
  };

  useEffect(() => {
    const acceptedInvites: Invite[] = [];
    const pendingInvites: Invite[] = [];
    const rejectedInvites: Invite[] = [];

    data?.invites?.forEach((item) => {
      if (item.status === "ACCEPTED") {
        acceptedInvites.push(item);
      } else if (item.status === "PENDING") {
        pendingInvites.push(item);
      } else {
        rejectedInvites.push(item);
      }
    });

    setAccepted(acceptedInvites);
    setPending(pendingInvites);
    setRejected(rejectedInvites);
  }, [data]);

  const getCurrentList = () => {
    switch (activeTab) {
      case "Accepted":
        return accepted || [];
      case "Pending":
        return pending || [];
      case "Rejected":
        return rejected || [];
      default:
        return [];
    }
  };

  const currentList = getCurrentList();

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      {isLoading && <p className="w-full text-center">Loading...</p>}
      {!isLoading && currentList.length === 0 && (
        <p className="w-full text-center text-gray-500 mt-8">No crew members found</p>
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
            {currentList.map((invite) => (
              <TableRow key={invite.invite_id} className="hover:bg-white">
                <TableCell>{invite.user_details.full_name || "N/A"}</TableCell>
                <TableCell>{invite.user_details.job_title || "N/A"}</TableCell>
                <TableCell>{invite.user_details.location || "N/A"}</TableCell>
                <TableCell>{invite.user_details.email || "N/A"}</TableCell>
                <TableCell>
                  <BiMessageDetail
                    onClick={() =>
                      handleRedirectToMessagePage(
                        invite.user_details.user_id,
                        invite.user_details.full_name || "Unknown"
                      )
                    }
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

export default CrewList;
