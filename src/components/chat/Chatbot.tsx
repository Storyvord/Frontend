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

export default function Chatbot() {
  const [openChat, setOpenChat] = useState(false); //open or close modal
  const [conversation, setConversation] = useState<Array<ChatConversation>>([]); //store conversation
  const [currentSession, setCurrentSession] = useState<Session>();

  const clientRef = useRef<W3CWebSocket | null>(null);

  const { data: prevSessions } = useGetChatbotSessions();
  const { data: sessionsDetails } = useGetSessionDetails(currentSession?.id ?? 0);

  const token = Cookies.get("accessToken");
  useEffect(() => {
    let wsUrl = "";
    if (!currentSession) {
      wsUrl = `wss://api-dev.storyvord.com:8001/ws/ai_assistant/?token=${token}&agent=1`;
    } else {
      wsUrl = `wss://api-dev.storyvord.com:8001/ws/ai_assistant/?session_id=${currentSession.session_id}&token=${token}`;
    }
    const wsClient = new W3CWebSocket(wsUrl);
    clientRef.current = wsClient;

    // WebSocket message handler
    wsClient.onmessage = (messageEvent: IMessageEvent) => {
      try {
        const dataFromServer = JSON.parse(messageEvent.data as string);
        // Check for response
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

    wsClient.onerror = (error) => {
      alert("WebSocket connection failed. Please try again.");
    };

    return () => {
      if (clientRef.current?.readyState === W3CWebSocket.OPEN) {
        clientRef.current.close();
      }
      clientRef.current = null;
    };
  }, [token, currentSession]);

  useEffect(() => {
    if (currentSession) {
      let localConversations: any = [];
      sessionsDetails?.forEach((item: any) => {
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
    if (clientRef.current && clientRef.current.readyState === W3CWebSocket.OPEN) {
      const outgoingMessage = JSON.stringify({ message: question });
      clientRef.current.send(outgoingMessage);
      setConversation((prevConvo) => [...prevConvo, { queryType: "question", data: question }]);
    } else {
      console.log("WebSocket is not open.");
    }
  };

  return (
    <div className="opacity-100">
      <button
        onClick={() => setOpenChat(!openChat)}
        className="fixed bottom-5 right-5 lg:bottom-5 lg:right-10 grid place-items-center"
      >
        <Image
          src="/icons/ai-chat.svg"
          width={30}
          height={30}
          alt="icon"
          className=" md:w-20 w-12 md:h-20 h-12"
        />
      </button>
      {openChat && (
        <div className="fixed bottom-20 lg:bottom-24 right-5 lg:right-10 z-50 shadow-xl">
          <ChatbotDetails
            conversation={conversation}
            sendMessage={sendMessage}
            prevSessions={prevSessions}
            setCurrentSession={setCurrentSession}
          />
        </div>
      )}
    </div>
  );
}
