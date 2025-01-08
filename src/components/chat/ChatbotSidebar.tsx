import { format } from "date-fns/format";
import React, { Key } from "react";

interface ChatbotSidebarProps {
  data: Session[];
  setCurrentSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
  setOpenHistory: React.Dispatch<React.SetStateAction<Boolean>>;
  expanded: Boolean;
  setConversation: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ChatbotSidebar: React.FC<ChatbotSidebarProps> = ({
  data,
  setCurrentSession,
  setOpenHistory,
  expanded,
  setConversation,
}) => {
  const handleNewChat = () => {
    setCurrentSession(undefined);
    setConversation([]);
    !expanded && setOpenHistory(false);
  };

  return (
    <div className="flex flex-col gap-2 bg-white p-2">
      <button
        onClick={handleNewChat}
        className="p-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 font-poppins-semibold transition-colors"
      >
        Start a new chat
      </button>
      
      <div className="space-y-2 mt-2">
        {data?.map((item: Session, key: Key) => (
          <div 
            className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" 
            key={key}
            onClick={() => {
              setCurrentSession({ id: 2, session_id: item.session_id });
              !expanded && setOpenHistory(false);
            }}
          >
            <p className="font-poppins-medium">
              {item.title?.replaceAll('"', "")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
