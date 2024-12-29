import Image from "next/image";
import React from "react";
import { CgProfile } from "react-icons/cg";

interface ChatbotQuestionsProps {
  item: ChatConversation;
}

export const ChatbotQuestions: React.FC<ChatbotQuestionsProps> = ({ item }) => {
  return (
    <div className="flex align-middle justify-end gap-2 p-1 w-9/12 ">
      <p className="p-4 rounded-md bg-black rounded-tr-none rounded-tl-[16px] rounded-br-[16px] rounded-bl-[16px] text-white">
        {item?.data}
      </p>
      {/* <Image width={30} height={30} className=" w-10 h-10" src={"/profile.png"} alt="profile" /> */}
      <CgProfile className=" w-10 h-10 text-gray-800" />
    </div>
  );
};
