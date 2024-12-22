"use client";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";

interface CrewProfileCardProps {
  id: number;
  profileImageUrl: string;
  name: string;
  location: string;
  description: string;
  rate: string;
  handleSendInvitation: (userId: number) => void;
}

const CrewProfileCard: React.FC<CrewProfileCardProps> = ({
  id,
  profileImageUrl,
  name,
  location,
  description,
  rate,
  handleSendInvitation,
}) => {
  return (
    <Card
      key={id}
      className="shadow-lg border flex flex-col justify-between border-gray-200 rounded-lg"
    >
      <CardHeader className="flex items-center gap-4 p-4">
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt={name}
            width={60}
            height={60}
            className="rounded-full border border-gray-300"
          />
        ) : (
          <CgProfile className=" w-20 h-20 text-gray-600" />
        )}
        <div>
          <CardTitle className="text-xl font-poppins-semibold text-gray-800">{name}</CardTitle>
          <CardDescription className="text-sm text-gray-500">{location}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-2">
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </CardContent>

      <CardFooter className="px-4 py-3 mt-auto flex justify-between items-center bg-gray-50 border-t border-gray-200">
        <p className="text-base font-poppins-semibold text-primary">{rate}</p>
        <Button
          onClick={() => handleSendInvitation(id)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CrewProfileCard;
