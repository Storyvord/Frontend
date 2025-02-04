import React, { ReactNode } from "react";
import LoadingUi from "./LoadingUi";
import Markdown from "react-markdown";
import { Button } from "../ui/button";
import remarkGfm from "remark-gfm";

interface ReportDetailsProps {
  report: string;
  isPending: boolean;
  isError: boolean;
  refetch: () => void;
}
interface ComponentProps {
  children: ReactNode;
}

const ReportDetails = ({ isPending, isError, report, refetch }: ReportDetailsProps) => {
  if (isPending) {
    return <LoadingUi isPending={isPending} text="Getting suggestions..." />;
  }

  if (isError && !isPending) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center pt-8 md:p-6">
        <p className="text-xl font-poppins-semibold text-red-600">
          An error occurred while fetching data. Please try again.
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  const filteredData = report?.includes("```markdown\n")
    ? report?.replace("```markdown\n", "")
    : report;

  return (
    <div className="mt-6 space-y-4 px-4 relative">
      {/* <Button onClick={() => refetch()} className=" absolute right-0 -top-2">
        Regenerate
      </Button> */}
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
        {filteredData}
      </Markdown>
    </div>
  );
};

export default ReportDetails;
