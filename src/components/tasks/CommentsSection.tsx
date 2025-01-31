import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "../ui/input";

type Comment = {
  id: number;
  name: string;
  avatarUrl: string | null;
  content: string;
  time: string;
};

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Jane Doe",
      avatarUrl: "/path-to-avatar.jpg",
      content: "I really appreciate the insights and perspective shared in this article.",
      time: "5 min ago",
    },
    {
      id: 2,
      name: "Jane Doe",
      avatarUrl: "/path-to-avatar.jpg",
      content: "I really appreciate the insights and perspective shared in this article.",
      time: "5 min ago",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData: Comment = {
        id: Date.now(),
        name: "John Doe",
        avatarUrl: "/path-to-user-avatar.jpg",
        content: newComment,
        time: "Just now",
      };
      setComments([newCommentData, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-white">
      {/* Input Section */}
      <div className="flex items-center space-x-3 mb-6 border p-1 rounded-full">
        <Avatar>
          <AvatarImage src="/path-to-user-avatar.jpg" alt="User Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <input
          placeholder="Write a comment..."
          className="flex-1 border-none focus:border-none focus:outline-none h-full"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={handleAddComment} className="h-10 rounded-full">
          Send
        </Button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center space-x-3 border p-1 rounded-lg">
            <Avatar>
              <AvatarImage src={comment.avatarUrl || "/default-avatar.jpg"} alt={comment.name} />
              <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{comment.name}</span>
                <span className="text-gray-500 text-sm">{comment.time}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
              {/* <button className="text-sm text-blue-500 hover:underline mt-1">reply</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
