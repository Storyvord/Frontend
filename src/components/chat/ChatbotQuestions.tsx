import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";
import Image from "next/image";
import React from "react";
import { CgProfile } from "react-icons/cg";

interface ChatbotQuestionsProps {
  item: ChatConversation;
}

export const ChatbotQuestions: React.FC<ChatbotQuestionsProps> = ({ item }) => {
  const { data: userProfile } = useGetUserProfile();

  return (
    <div className="flex align-middle justify-end gap-2 p-1 w-9/12 ">
      <p className="p-4 rounded-md bg-black rounded-tr-none rounded-tl-[16px] rounded-br-[16px] rounded-bl-[16px] text-white">
        {item?.data}
      </p>
      {userProfile?.data?.personal_info?.image ? (
        <Image
          src={userProfile?.data?.personal_info.image}
          alt="Profile"
          className="rounded-full w-12 h-12 border-4 border-white"
          width={96}
          height={96}
        />
      ) : (
        <CgProfile className="rounded-full w-12 h-12 border-4 border-white text-gray-500" />
      )}
    </div>
  );
};
