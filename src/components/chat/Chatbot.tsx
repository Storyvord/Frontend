"use client";
import creation from "@/assets/icons/creation";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";
import { ChatbotDetails } from "./ChatbotDetails";
import {
  useGetChatbotSessions,
  useGetSessionDetails,
} from "@/lib/react-query/queriesAndMutations/chatbot";
import Image from "next/image";
import { Cross } from "lucide-react";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function Chatbot() {
  const [openChat, setOpenChat] = useState(false); //open or close modal
  const [conversation, setConversation] = useState<Array<ChatConversation>>([]); //store conversation
  const [currentSession, setCurrentSession] = useState<Session>();
  const [wsClient, setWsClient] = useState<W3CWebSocket | null>(null);

  const clientRef = useRef<W3CWebSocket | null>(null);

  const { data: prevSessions } = useGetChatbotSessions();
  const { data: sessionsDetails } = useGetSessionDetails(currentSession?.session_id ?? "");

  const token = Cookies.get("accessToken");

  // Initialize WebSocket connection when sending first message
  const initializeWebSocket = () => {
    const wsUrl = `wss://api-dev.storyvord.com:8001/ws/ai_assistant/?token=${token}&agent=1`;
    const newWsClient = new W3CWebSocket(wsUrl);
    clientRef.current = newWsClient;
    setWsClient(newWsClient);

    // WebSocket message handler
    newWsClient.onmessage = (messageEvent: IMessageEvent) => {
      try {
        const dataFromServer = JSON.parse(messageEvent.data as string);
        if (dataFromServer.ai_response) {
          setConversation((prevConvo) => [
            ...prevConvo,
            { queryType: "answer", data: dataFromServer.ai_response },
          ]);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    newWsClient.onerror = (error) => {
      alert("WebSocket connection failed. Please try again.");
    };
  };

  useEffect(() => {
    return () => {
      if (clientRef.current?.readyState === W3CWebSocket.OPEN) {
        clientRef.current.close();
      }
      clientRef.current = null;
      setWsClient(null);
    };
  }, []);

  useEffect(() => {
    if (currentSession) {
      let localConversations: any = [];
      sessionsDetails?.results?.forEach((item: any) => {
        localConversations.push(
          { data: item.user_message, queryType: "question" },
          { data: item.ai_response, queryType: "answer" }
        );
      });
      setConversation(localConversations);
    }
  }, [sessionsDetails, currentSession]);

  // Handle sending messages
  const sendMessage = (question: string) => {
    // Update conversation immediately to show user's message
    setConversation((prevConvo) => [...prevConvo, { queryType: "question", data: question }]);

    if (!wsClient) {
      initializeWebSocket();
    }
    
    const sendMessageToServer = () => {
      if (clientRef.current?.readyState === W3CWebSocket.OPEN) {
        const outgoingMessage = JSON.stringify({ message: question });
        clientRef.current.send(outgoingMessage);
      } else {
        console.log("WebSocket connection failed.");
      }
    };

    if (clientRef.current?.readyState === W3CWebSocket.OPEN) {
      sendMessageToServer();
    } else {
      // If WebSocket is not ready yet, wait for a brief moment and try again
      setTimeout(sendMessageToServer, 500);
    }
  };

  return (
    <div className="opacity-100">
      <button
        onClick={() => setOpenChat(!openChat)}
        className="fixed bottom-0 lg:bottom-5 right-0 lg:right-5 grid place-items-center"
      >
        <Image src="/icons/ai-chat.svg" width={30} height={30} alt="icon" className=" w-20 h-20" />
      </button>
      {openChat && (
        <div className="fixed bottom-5 md:right-16 right-5 z-50 shadow-xl animate-slide-up">
          <ChatbotDetails
            conversation={conversation}
            sendMessage={sendMessage}
            prevSessions={prevSessions}
            setCurrentSession={setCurrentSession}
            setOpenChat={setOpenChat}
          />
        </div>
      )}
    </div>
  );
}
