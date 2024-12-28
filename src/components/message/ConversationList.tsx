"use client";
import React from "react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

type User = {
  id: number;
  email: string;
  user_type: string; // Consider "crew" | "client" if these are the only values
  name: string | null; // Name can be null based on your data
  you: boolean;
};

type Conversation = {
  id: number;
  user1: User;
  user2: User;
};

const ConversationList: React.FC<{
  conversations: Conversation[] | undefined;
  senderId: number;
}> = ({ conversations = [], senderId }) => {
  // Filter conversations where the sender is involved
  const filteredConversations = conversations.filter(
    (convo) => convo.user1.id === senderId || convo.user2.id === senderId
  );

  // Get the name of the other participant
  const getOtherUserName = (convo: Conversation) => {
    if (convo.user1.id === senderId) {
      return { name: convo.user2.name || "Unnamed User", id: convo.user2.id };
    }
    return { name: convo.user1.name || "Unnamed User", id: convo.user1.id };
  };
  return (
    <div
      className="conversation-list mt-4 overflow-y-auto flex flex-col gap-2 max-h-[80%]"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {filteredConversations.length > 0 ? (
        filteredConversations.map((convo) => {
          const { name, id } = getOtherUserName(convo);
          return (
            <Link
              href={`?receiverId=${id}&name=${name}`}
              key={convo.id}
              className="my-1 p-3 hover:bg-gray-100 cursor-pointer border rounded-lg shadow-sm flex items-center gap-3"
            >
              <CgProfile className="w-12 h-12 text-gray-500" />
              <span>
                <h1 className="text-[#0A0A41] font-poppins-semibold text-base truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-60">
                  {name}
                </h1>
                <p>...</p>
              </span>
            </Link>
          );
        })
      ) : (
        <p className="text-gray-500">No conversations available.</p>
      )}
    </div>
  );
};

export default ConversationList;
