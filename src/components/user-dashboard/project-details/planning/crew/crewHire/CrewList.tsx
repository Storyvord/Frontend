"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Tabs from "@/components/Tabs";
import { BiMessageDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";

const headers = ["Profile", "Name", "Position", "Location", "Message"];

type PersonalInfo = {
  full_name: string;
  job_title: string;
  location: string;
};

type User = {
  id: number;
  personal_info: PersonalInfo;
};

type Profile = {
  user: User;
};

type Props = {
  data: Profile[];
  isLoading?: boolean;
};

const tabs = ["Accepted", "Pending", "Rejected"];

const CrewList = ({ data, isLoading }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [filteredData, setFilteredData] = useState<Profile[]>([]);

  const { data: profile } = useGetUserProfile();

  // Filter data when `data` or `currentUserId` changes
  useEffect(() => {
    const currentUserId = profile?.data?.personal_info?.user;
    if (data && currentUserId) {
      setFilteredData(data?.filter((item) => item.user.id !== currentUserId));
    }
  }, [data, profile]);

  const handleRedirectToMessagePage = (id: number, name: string) => {
    router.push(`/dashboard/message/?receiverId=${id}&name=${name}`);
  };

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} className="text-sm" />
      {isLoading && <p className="w-full text-center">Loading...</p>}
      <Table className="mt-4 bg-white p-2 border-b">
        <TableHeader>
          <TableRow className="hover:bg-white">
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData?.map((item) => (
            <TableRow key={item.user.id} className="hover:bg-white">
              <TableCell>
                <Link href={`crew/crew-profile/${item.user.id}`}>
                  <CgProfile className="w-8 h-8 cursor-pointer hover:text-gray-700 text-gray-500" />
                </Link>
              </TableCell>
              <TableCell>{item.user.personal_info.full_name}</TableCell>
              <TableCell>{item.user.personal_info.job_title}</TableCell>
              <TableCell>{item.user.personal_info.location}</TableCell>
              <TableCell>
                <BiMessageDetail
                  onClick={() =>
                    handleRedirectToMessagePage(item.user.id, item.user.personal_info.full_name)
                  }
                  className="w-6 h-6 hover:text-gray-600 cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CrewList;
