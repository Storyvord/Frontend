import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ChatResponse } from "./ChatResponse";
import { ChatbotQuestions } from "./ChatbotQuestions";
import { ChatbotSearch } from "./ChatbotSearch";
import { useGetChatbotSessions } from "@/lib/react-query/queriesAndMutations/chatbot";
import { ChatbotSidebar } from "./ChatbotSidebar";
import { Cross1Icon } from "@radix-ui/react-icons";

interface ChatbotDetailsProps {
  conversation: Array<ChatConversation> | [];
  sendMessage: (incomingQuestion: string) => void;
  prevSessions: Session[];
  setCurrentSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
  setOpenChat: (value: boolean) => void;
  setConversation: React.Dispatch<React.SetStateAction<Array<ChatConversation>>>;
  isLoading: boolean;
}

const initialResponse = {
  data: "Hello! How can I assist you today with your film production needs? If you have specific details about your project, such as the type of shoot, location preferences, crew size, or equipment, please share, and I can provide tailored advice.",
};

export const ChatbotDetails: React.FC<ChatbotDetailsProps> = ({
  conversation,
  sendMessage,
  prevSessions,
  setCurrentSession,
  setOpenChat,
  setConversation,
  isLoading,
}) => {
  const [search, setSearch] = useState(""); // search chat
  const [expanded, setExpanded] = useState<Boolean>(false); // Chatbot size
  const [openHistory, setOpenHistory] = useState<Boolean>(false); // show previous sessions

  // Ref to scroll to bottom
  const messagesEndRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // Filter the results based on search
  let filteredConversation: Array<number> = [];
  conversation.forEach((item: ChatConversation, index) => {
    if (search.length > 0 && item?.queryType === "question" && item?.data?.indexOf(search) > -1) {
      filteredConversation.push(index);
    }
    if (search.length === 0 && item?.queryType === "question") {
      filteredConversation.push(index);
    }
  });

  // Scroll to bottom of response
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [filteredConversation]);

  return (
    <div
      className={
        expanded
          ? "fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  flex flex-col w-[85vw] h-[85vh] rounded-lg bg-white overflow-hidden border border-gray-300"
          : "flex flex-col w-[90vw] md:w-[60vw] xl:w-[30vw] h-[70vh] rounded-lg bg-white overflow-hidden border border-gray-300"
      }
    >
      {/* Header */}
      <div className="flex align-middle justify-between  mx-2 p-2 h-14">
        {!openHistory && (
          <Button
            variant="ghost"
            className="relative w-10 h-10 hover:bg-[#607d8b]/10 active:bg-[#607d8b]/30 "
            onClick={() => setOpenHistory(!openHistory)}
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
              <Image className="w-[30px]" src={"/expand.svg"} width={50} height={10} alt="" />
            </span>
          </Button>
        )}
        {openHistory && (
          <Button
            variant="ghost"
            className="relative w-10 h-10 hover:bg-[#607d8b]/10 active:bg-[#607d8b]/30 "
            onClick={() => setOpenHistory(!openHistory)}
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 ">
              <Image className="w-[30px]" src={"/cancel.svg"} width={50} height={10} alt="" />
            </span>
          </Button>
        )}
        <Image className="w-[150px]" src="/storyvord-ai.svg" width={100} height={10} alt="" />
        <div className=" flex items-center gap-4">
          <button onClick={() => setExpanded(!expanded)}>
            <Image className="w-[30px]" src={"/circle-expand.svg"} width={50} height={10} alt="" />
          </button>
          <button className=" hover:bg-gray-100 p-2 rounded-2xl" onClick={() => setOpenChat(false)}>
            <Image className="w-[30px]" src={"/cancel.svg"} width={50} height={10} alt="" />
          </button>
        </div>
      </div>
      <div className="flex flex-grow overflow-hidden relative">
        {openHistory && !expanded && (
          <div className="absolute left-0 w-[50%] h-[calc(70vh_-_7rem)] overflow-y-scroll">
            <ChatbotSidebar
              data={prevSessions}
              setCurrentSession={setCurrentSession}
              setOpenHistory={setOpenHistory}
              expanded={expanded}
              setConversation={setConversation}
            />
          </div>
        )}
        {openHistory && expanded && (
          <div className="w-[25%] overflow-y-scroll">
            <ChatbotSidebar
              data={prevSessions}
              setCurrentSession={setCurrentSession}
              setOpenHistory={setOpenHistory}
              expanded={expanded}
              setConversation={setConversation}
            />
          </div>
        )}
        <div
          className={`p-3 overflow-x-hidden bg-gray-100 overflow-y-scroll ${expanded && openHistory && "w-[70%]"}`}
        >
          <ChatResponse data={initialResponse} isLoading={false} error={""} showLoading={false} />
          {filteredConversation?.map((item, key) => {
            return (
              <>
                <div className={`flex mt-4 justify-end`}>
                  <ChatbotQuestions item={conversation[item]} />
                </div>

                <div className={`flex mt-4`} key={`answer${key}`}>
                  <ChatResponse
                    data={conversation[item + 1]}
                    isLoading={!conversation[item + 1]}
                    error={""}
                    showLoading={key === filteredConversation.length - 1} //only show loading for latest question
                  />
                </div>
              </>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="h-14 w-[100%] ">
        <ChatbotSearch 
          suggestedQueries={[]} 
          sendMessage={sendMessage} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
