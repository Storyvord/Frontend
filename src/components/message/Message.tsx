"use client";
import React, { useState, useEffect, useRef, FormEvent, Suspense, useLayoutEffect } from "react";
import { w3cwebsocket as W3CWebSocket, IMessageEvent } from "websocket";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

import ChatWindow from "@/components/message/ChatWindow";
import {
  useGetConversationsList,
  useGetMessages,
} from "@/lib/react-query/queriesAndMutations/message";
import Loader from "../Loader";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";
import { useToast } from "../ui/use-toast";

type Message = {
  message: string;
  sender?: number;
};

const Message: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isErrorConnection, setIsErrorConnection] = useState<boolean>(false);
  const [senderId, setSenderId] = useState();
  const [isReceiverOnline, setIsReceiverOnline] = useState<boolean>(false);
  const clientRef = useRef<W3CWebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const token = Cookies.get("accessToken");
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId") || "";
  const receiverName = searchParams.get("name") || "";

  const { data: userDetails } = useGetUserProfile();
  useLayoutEffect(() => {
    if (userDetails) {
      setSenderId(userDetails.data.personal_info.user);
    }
  }, [userDetails]);
  const { data: conversationsList } = useGetConversationsList();
  const { data } = useGetMessages(receiverId);
  useEffect(() => {
    if (data) {
      const newMappedMessages = data?.results.map(
        (item: { text: string; sender: { id: number } }) => ({
          message: item.text,
          sender: item.sender.id,
        })
      );
      setMessages(newMappedMessages);
    }
  }, [data]);

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll effect when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!receiverId || !token) {
      // console.error("Missing receiverId or token.");
      return;
    }

    const wsUrl = `wss://api-dev.storyvord.com:8001/ws/chat/user/${receiverId}/?access_token=${token}`;
    const wsClient = new W3CWebSocket(wsUrl);
    clientRef.current = wsClient;

    wsClient.onopen = () => {
      // console.log("WebSocket Client Connected");
      setIsConnected(true);
    };

    // WebSocket message handler
    wsClient.onmessage = (messageEvent: IMessageEvent) => {
      try {
        const dataFromServer = JSON.parse(messageEvent.data as string);

        // Handle user status updates
        if (dataFromServer.status && dataFromServer.user_id) {
          // console.log(`User ${dataFromServer.user_id} is ${dataFromServer.status}`);
          if (dataFromServer.user_id === receiverId) {
            setIsReceiverOnline(dataFromServer.status === "online");
          }
          return;
        }

        // Handle messages
        if (dataFromServer.message) {
          // Only add message if it's from the other user or it's an echo of our message
          const newMessage: Message = {
            message: dataFromServer.message,
            sender: dataFromServer.sender || Number(senderId),
          };

          // Check for duplicate messages
          setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (
              lastMessage?.message === newMessage.message &&
              lastMessage?.sender === newMessage.sender
            ) {
              return prevMessages;
            }
            return [...prevMessages, newMessage];
          });
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    wsClient.onerror = (error) => {
      setIsErrorConnection(true);
      // console.error("WebSocket Error:", error);
      // alert("WebSocket connection failed. Please try again.");
      toast({
        title: "connection failed. Please try again.",
      });
    };

    wsClient.onclose = (event) => {
      // console.warn("WebSocket closed:", event);
      setIsConnected(false);
    };

    return () => {
      if (clientRef.current?.readyState === W3CWebSocket.OPEN) {
        clientRef.current.close();
      }
      clientRef.current = null;
    };
  }, [receiverId, token, senderId]);

  // Handle sending messages
  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (clientRef.current && clientRef.current.readyState === W3CWebSocket.OPEN) {
      const outgoingMessage = JSON.stringify({ message });
      clientRef.current.send(outgoingMessage);

      // Add message to local state with current user as sender
      const newMessage: Message = {
        message: message,
        sender: Number(senderId),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    } else {
      console.log("WebSocket is not open.");
    }
  };
  return (
    <div className="mx-auto -mt-3 sm:mt-1 w-full h-[89vh]">
      <ChatWindow
        receiverName={receiverName}
        messages={messages}
        messagesEndRef={messagesEndRef}
        conversationsList={conversationsList?.results!}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        senderId={senderId!}
        isReceiverOnline={isReceiverOnline}
      />
    </div>
  );
};

const MessageComponent = () => (
  <Suspense
    fallback={
      <div className=" w-full p-4 mt-8 flex justify-center">
        <Loader />
      </div>
    }
  >
    <Message />
  </Suspense>
);

export default MessageComponent;
