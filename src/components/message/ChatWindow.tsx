"use client";
import React, { FormEvent, useState } from "react";
import ConversationList from "./ConversationList";
import MessageInput from "./MessageInput";
import DisplayMessage from "./DisplayMessage";
import ChatHeader from "./ChatHeader";
import { RxCross2 } from "react-icons/rx";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

type User = {
  id: number;
  email: string;
  user_type: string; // You may want to specify this as "crew" | "client" if these are the only values
  name: string | null; // Name can be null based on your data
  you: boolean;
};

type Conversation = {
  id: number;
  user1: User;
  user2: User;
};

type Message = {
  message: string;
  sender?: number;
};

type ChatWindowProps = {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  receiverName: string;
  conversationsList: Conversation[];
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: FormEvent) => void;
  senderId: number;
  isReceiverOnline: boolean;
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  messagesEndRef,
  receiverName,
  conversationsList,
  message,
  setMessage,
  sendMessage,
  senderId,
  isReceiverOnline,
}) => {
  const [isConversationListVisible, setIsConversationListVisible] = useState(true);

  const toggleConversationList = () => setIsConversationListVisible((prev) => !prev);

  return (
    <main className="flex h-full">
      <section
        className={cn(
          "flex-[0.25] p-2 px-4 bg-white relative pt-4 border-r-2",
          isConversationListVisible && "block",
          !isConversationListVisible && "hidden"
        )}
      >
        <RxCross2
          onClick={toggleConversationList}
          className="w-6 h-6 sm:hidden block absolute cursor-pointer"
        />
        <h1 className="w-full text-left font-poppins-semibold text-green-500 text-lg tracking-widest">
          Messages
        </h1>
        <Input className="my-2 rounded-3xl" placeholder="Search" />
        <div className="flex gap-2">
          <button className=" bg-[#0A0A41] text-white py-1 px-3 rounded-lg text-sm">
            All Messages{" "}
          </button>
          <button className=" py-1 border px-2 rounded-lg text-sm">Unread </button>
        </div>
        <ConversationList conversations={conversationsList} senderId={senderId} />
      </section>
      <section className="flex-1 flex flex-col justify-between relative">
        {receiverName && (
          <>
            <ChatHeader
              receiverName={receiverName}
              isReceiverOnline={isReceiverOnline}
              onMenuClick={toggleConversationList}
            />

            <DisplayMessage
              messages={messages}
              messagesEndRef={messagesEndRef}
              senderId={senderId}
            />

            <MessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </>
        )}
      </section>
    </main>
  );
};

export default React.memo(ChatWindow);
