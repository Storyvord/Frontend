import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { EllipsisVertical } from "lucide-react";
import LoadingUi from "./LoadingUi";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Name = "logistics" | "budget" | "compliance" | "culture" | "sustainability";

type Props = {
  report: string;
  isPending: boolean;
  isError: boolean;
  refetch: () => void;
  handleRegenerateAiWork: (reportName: Name) => Promise<void>;
  name: Name;
};

const ReportDetails = ({
  report,
  isPending,
  isError,
  name,
  refetch,
  handleRegenerateAiWork,
}: Props) => {
  // Render loading state
  if (isPending) {
    return <LoadingUi isPending={isPending} text={`Getting ${name} suggestions...`} />;
  }

  // Render error state
  if (isError) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center pt-8 md:p-6">
        <p className="text-xl font-poppins-semibold text-red-600">
          An error occurred while fetching data. Please try again.
        </p>
        <Button variant="outline" onClick={refetch}>
          Try again
        </Button>
      </div>
    );
  }

  if (typeof report !== "string") {
    return; // Exit if report is a string
  }

  const formatReport = (): string => {
    if (report?.includes(":warning:")) {
      // Replace ":warning:" with "⚠️warning:"
      return report.replaceAll(":warning:", "⚠️");
    }
    return report;
  };
  return (
    <div className="space-y-4 p-2 md:-p-4 relative">
      <Popover>
        <PopoverTrigger className=" absolute right-0">
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent className=" w-fit">
          <Button
            onClick={() => handleRegenerateAiWork(name)}
            className="font-poppins-medium text-sm"
            size="sm"
            variant="outline"
          >
            Re-Generate
          </Button>
        </PopoverContent>
      </Popover>

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
          table({ children }) {
            return (
              <table className="w-full border-collapse border border-gray-300 my-4">
                {children}
              </table>
            );
          },
          thead({ children }) {
            return <thead className="bg-gray-100">{children}</thead>;
          },
          tbody({ children }) {
            return <tbody>{children}</tbody>;
          },
          tr({ children }) {
            return <tr className="border-t border-gray-300">{children}</tr>;
          },
          th({ children }) {
            return (
              <th className="px-4 py-2 text-left font-poppins-medium text-gray-700">{children}</th>
            );
          },
          td({ children }) {
            return <td className="px-4 py-2 text-gray-600">{children}</td>;
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {formatReport()}
      </Markdown>
    </div>
  );
};

export default ReportDetails;
