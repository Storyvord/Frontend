"use client";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import matter, { GrayMatterFile } from "gray-matter";
import { useParams, useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

// Import markdown files statically
import { text } from "../_markdown/text";
import { onboarding } from "../_markdown/onboarding";
import { onboardingCrew } from "../_markdown/onboarding-crew";
import { producerDashboard } from "../_markdown/dashboard-producer";
import { crewDashboard } from "../_markdown/crew-dashboard";
import { aiCopilot } from "../_markdown/ai-copilot";
import { marketplace } from "../_markdown/marketplace";

// Define types for the markdown file content
type MarkdownFile = {
  content: string;
  data: {
    title: string;
    [key: string]: any;
  };
};

// Parse and ensure title is present
const parseMarkdown = (content: string): MarkdownFile => {
  const parsed = matter(content);
  return {
    content: parsed.content,
    data: {
      title: parsed.data.title || "Untitled", // Add default title
      ...parsed.data,
    },
  };
};

const markdownFiles: Record<string, MarkdownFile> = {
  text: parseMarkdown(text),
  onboarding: parseMarkdown(onboarding),
  "onboarding-crew": parseMarkdown(onboardingCrew),
  "producer-dashboard": parseMarkdown(producerDashboard),
  "crew-dashboard": parseMarkdown(crewDashboard),
  "ai-copilot": parseMarkdown(aiCopilot),
  marketplace: parseMarkdown(marketplace),
};

const ArticleDetail: React.FC = () => {
  const router = useRouter();
  const { slug } = useParams();

  // Check if the slug is a valid key in markdownFiles
  const markdownFile = slug ? markdownFiles[slug as keyof typeof markdownFiles] : undefined;

  if (!slug || !markdownFile) {
    return <p>Loading...</p>;
  }

  const { content, data } = markdownFile;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="border py-2 px-4 rounded-xl bg-white flex items-center"
      >
        <IoMdArrowRoundBack className="w-6 h-6" />
      </button>
      <Markdown
        components={{
          a({ children, href }) {
            return (
              <a href={href} target="_blank" className="text-blue-500 hover:underline">
                {children}
              </a>
            );
          },
          h1({ children }) {
            return <h1 className="text-2xl font-poppins-bold text-gray-900 my-4">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-poppins-semibold text-gray-800 my-3">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-poppins-medium text-gray-700 my-2">{children}</h3>;
          },
          strong({ children }) {
            return (
              <strong className="text-base font-poppins-semibold text-gray-800 my-2">
                {children}
              </strong>
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
        className="prose"
      >
        {content}
      </Markdown>
    </div>
  );
};

export default ArticleDetail;
