import { FormEvent, useState } from "react";
import sendFilled from "@/assets/icons/send-filled";
import Image from "next/image";

interface ChatbotSearchProps {
  suggestedQueries: string[];
  isLoading: boolean;
  sendMessage: (incomingQuestion: string) => void;
}

export const ChatbotSearch: React.FC<ChatbotSearchProps> = ({
  suggestedQueries,
  isLoading,
  sendMessage,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(""); //Current question

  // Send button disabled
  const disabled = currentQuestion.length === 0 || isLoading;

  // Handle submit
  const handleSubmit = () => {
    if (currentQuestion && !isLoading) {
      sendMessage(currentQuestion);
      setCurrentQuestion("");
    }
  };

  // Handle enter key - prevent sending when loading
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Always prevent default enter behavior
      if (!isLoading && currentQuestion.length > 0) {
        handleSubmit();
      }
    }
  };

  return (
    <>
      {/* <div className="flex gap-2 overflow-auto">
        {suggestedQueries?.map((item, key) => (
          <p
            key={key}
            className="border border-[color] p-2 rounded-full cursor-pointer max-w-max"
            onClick={() => sendMessage(item)}
          >
            {item}
          </p>
        ))}
      </div> */}
      <div className="flex justify-between align-middle w-full bg-white p-2">
        <input
          type="text"
          name="question"
          className="w-full p-1 focus:outline-none"
          onKeyDown={handleKeyPress}
          value={currentQuestion}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentQuestion(e.target.value);
          }}
          placeholder="Type message here"
        />

        <button
          className={`h-10 w-10 transition-opacity ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}`}
          onClick={handleSubmit}
          disabled={disabled}
        >
          {isLoading ? (
            <div className="w-6 h-6 mx-auto animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
          ) : (
            <Image className="w-[30px]" src={"/send.svg"} width={50} height={10} alt="" />
          )}
        </button>
      </div>
    </>
  );
};
