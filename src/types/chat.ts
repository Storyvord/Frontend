type ChatConversation = {
  data: string;
  queryType?: "question" | "answer";
  timestamp?: string;
};

type Session = {
  id: Number;
  title?: string;
  session_id: string;
  user?: Number;
  created_at?: String;
};
